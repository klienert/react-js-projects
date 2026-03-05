import React, { useRef, useState, useEffect } from 'react';

/**
 * Custom Hook that combines useEffect and useRef
 * @param {*} effectFn - this is the update function
 * @param {*} deps - the array of dependencies typically used on useEffect
 */
const useEffectOnUpdate = (effectFn, deps) => {
    const firstRender = useRef(true);
    
    useEffect(() => {
        firstRender.current ? firstRender.current = false : effectFn()

    }, deps);

}

export default useEffectOnUpdate;