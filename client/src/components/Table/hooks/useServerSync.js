import { useEffect, useRef, useCallback } from 'react';
import { useUrlState } from './useUrlState';

/**
 * useServerSync
 *
 * The brain of ServerTable. Combines sort, filter, and pagination state into
 * one params object, optionally syncs it to the URL, and fires onFetch
 * whenever any parameter changes.
 *
 * State lives in the URL when syncToUrl is true — meaning the table state
 * survives page refresh and is shareable via link. When false, state is
 * derived from the URL defaults on mount and managed internally via callbacks.
 *
 * @param {object}  options
 * @param {fn}      options.onFetch         - (params) => void | Promise<void>
 *                                            Called on mount and every param change.
 *                                            Params shape: { page, perPage, sortKey,
 *                                            sortDir, search }
 * @param {object}  options.initialParams   - override any default starting values
 * @param {boolean} options.syncToUrl       - sync state to URL params (default: true)
 * @param {string}  options.urlPrefix       - namespace for URL params (e.g. 'users')
 *                                            Prevents clashes when multiple tables
 *                                            exist on one page
 *
 * @returns {object}
 *   params        {object}  - current { page, perPage, sortKey, sortDir, search }
 *   setPage       {fn}      - (page: number) => void
 *   setPerPage    {fn}      - (n: number) => void  — resets to page 1
 *   setSort       {fn}      - (key, dir) => void   — resets to page 1
 *   cycleSort     {fn}      - (key) => void        — for header click
 *   setSearch     {fn}      - (query: string) => void — resets to page 1
 *   resetParams   {fn}      - resets everything to defaults
 */
export function useServerSync({
    onFetch,
    initialParams = {},
    syncToUrl = true,
    urlPrefix = '',
} = {}) {

  const DEFAULTS = {
    page:    1,
    perPage: 10,
    sortKey: '',
    sortDir: 'asc',
    search:  '',
    ...initialParams,
  };

  // ── State: URL-synced or local ref ──────────────────────────────────────
  const { urlState, setUrlState, clearUrlState } = useUrlState(
    DEFAULTS,
    { prefix: urlPrefix }
  );

  // When syncToUrl is false we still call useUrlState (hooks must be
  // unconditional) but we shadow the state with a local ref instead.
  const localRef = useRef({ ...DEFAULTS });

  const params = syncToUrl ? urlState : localRef.current;

  const setParams = useCallback(
    (patch) => {
      if (syncToUrl) {
        setUrlState(patch);
      } else {
        localRef.current = { ...localRef.current, ...patch };
      }
    },
    [syncToUrl, setUrlState]
  );

  // ── onFetch — fire whenever params change ───────────────────────────────
  // Use a ref for onFetch so we don't re-run the effect when the consumer
  // re-renders and passes a new function reference.
  const onFetchRef = useRef(onFetch);
  useEffect(() => { onFetchRef.current = onFetch; }, [onFetch]);

  useEffect(() => {
    onFetchRef.current?.(params);
    // Intentionally spread params into deps so the effect re-runs on any change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.page, params.perPage, params.sortKey, params.sortDir, params.search]);

  // ── Param setters ───────────────────────────────────────────────────────
  const setPage = useCallback(
    (page) => setParams({ page }),
    [setParams]
  );

  const setPerPage = useCallback(
    (perPage) => setParams({ perPage, page: 1 }),
    [setParams]
  );

  const setSort = useCallback(
    (sortKey, sortDir = 'asc') => setParams({ sortKey: sortKey ?? '', sortDir, page: 1 }),
    [setParams]
  );

  const cycleSort = useCallback(
    (key) => {
      if (params.sortKey !== key) {
        setParams({ sortKey: key, sortDir: 'asc', page: 1 });
      } else if (params.sortDir === 'asc') {
        setParams({ sortDir: 'desc', page: 1 });
      } else {
        setParams({ sortKey: '', sortDir: 'asc', page: 1 });
      }
    },
    [params.sortKey, params.sortDir, setParams]
  );

  const setSearch = useCallback(
    (search) => setParams({ search, page: 1 }),
    [setParams]
  );

  const resetParams = useCallback(() => {
    if (syncToUrl) clearUrlState();
    else localRef.current = { ...DEFAULTS };
  }, [syncToUrl, clearUrlState]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    params,
    setPage,
    setPerPage,
    setSort,
    cycleSort,
    setSearch,
    resetParams,
  };
}