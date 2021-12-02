const flat = {
    flat: 'flat',
    day: 'day',
    night: 'night',
    clean: 'clean',
    dirty: 'dirty',
    wopened: 'wopen',
    wclosed: 'wclosed',
};

export const concatinator = (isWindowOpen, impurity) => {
    let dirtiness = impurity > 0 ? flat.dirty : flat.clean;
    let windowOC = isWindowOpen ? flat.wopened : flat.wclosed;

    return `${flat.flat}_${flat.day}_${dirtiness}_${windowOC}`;
};
