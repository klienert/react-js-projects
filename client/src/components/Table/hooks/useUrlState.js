import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * useUrlState
 *
 * Syncs a flat state object to/from URL search params.
 * Only serializes keys that have a non-null, non-undefined, non-empty value
 * so the URL stays clean.
 *
 * Depends on react-router-dom v6+ (useSearchParams).
 * If you're not using react-router, see the fallback at the bottom of this file.
 *
 * @param {object} defaults  - default values; used when a param is absent from URL
 * @param {object} options
 * @param {string}   options.prefix   - optional key prefix to namespace params
 *                                      e.g. prefix='roles' → ?roles_page=2
 *                                      Useful when multiple tables share one URL
 *
 * @returns {object}
 *   urlState   {object}  - current state, merged with defaults
 *   setUrlState {fn}     - (patch: object) => void — merges patch into current state
 *   clearUrlState {fn}   - resets all keys back to defaults
 */

export function useUrlState(defaults = {}, { prefix = '' } = {}) {
    const [searchParams, setSearchParams] = useSearchParams();

    const key = (k) => (prefix ? `${prefix}_${k}` : k);

    // Read current state from URL, falling back to defaults
    const urlState = Object.keys(defaults).reduce((acc, k) => {
        const raw = searchParams.get(key(k));
        if (raw === null) {
            acc[k] = defaults[k];
        } else {
            // Coerce back to the same type as the default
            acc[k] = coerce(raw, defaults[k]);
        }
        return acc;
    }, {});

    const setUrlState = useCallback((patch) => {
        setSearchParams(
            (prev) => {
                const next = new URLSearchParams(prev);
                Object.entries(patch).forEach(([k, v]) => {
                    const paramKey = key(k);
                    const isEmpty = v === null || v === undefined || v === '' || v === defaults[k];
                    if (isEmpty) {
                    next.delete(paramKey);
                    } else {
                    next.set(paramKey, String(v));
                    }
                });
                return next;
            },
            { replace: true } // use replace so back-button skips intermediate states
        );
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [setSearchParams, prefix]
    );

    const clearUrlState = useCallback(() => {
        setSearchParams(
            (prev) => {
                const next = new URLSearchParams(prev);
                Object.keys(defaults).forEach((k) => next.delete(key(k)));
                return next;
            },
            { replace: true }
            );
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [setSearchParams, prefix]);

        return { urlState, setUrlState, clearUrlState };
    }

    // Coerce a URL string back to the same primitive type as the default value
    function coerce(raw, defaultValue) {
        if (typeof defaultValue === 'number')  return Number(raw);
        if (typeof defaultValue === 'boolean') return raw === 'true';
    return raw; // string
}


/* ─────────────────────────────────────────────────────────────────────────────
   FALLBACK — no react-router
   If you're not using react-router-dom, swap out useSearchParams for this
   lightweight implementation that reads/writes window.location.search directly.

   Usage: replace the import at the top with this, uncomment, and delete the
   react-router import.

import { useState, useCallback, useEffect } from 'react';

function useSearchParams() {
  const [params, setParamsRaw] = useState(
    () => new URLSearchParams(window.location.search)
  );

  useEffect(() => {
    const handler = () =>
      setParamsRaw(new URLSearchParams(window.location.search));
    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  const setParams = useCallback((updater, { replace = false } = {}) => {
    const next = updater(new URLSearchParams(window.location.search));
    const url = `${window.location.pathname}?${next.toString()}`;
    if (replace) window.history.replaceState(null, '', url);
    else         window.history.pushState(null, '', url);
    setParamsRaw(next);
  }, []);

  return [params, setParams];
}
   ───────────────────────────────────────────────────────────────────────────── */