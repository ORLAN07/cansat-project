const minersData = {
    altitude: {values: []},
    temperature: {values: []},
    atmosphericPressure: {values: []},
    vibration: {values: []}
};

const updateValues = () => {
    const now = new Date().getTime();

    Object.keys(minersData).forEach((key) => {
        const e = minersData[key];
        const last = e.values.length ? e.values[e.values.length - 1].speed : 10;
        const newv = Math.round(Math.min(30, Math.max(0, last + (Math.random() * 6) - 3)));
        e.values.push({
            date: now,
            speed: newv
        });
    });
}

const addNewValueAltitude = (x, y) => {
    const now = new Date().getTime();
    minersData.altitude.values = {date: now, speed: y};
    minersData.temperature.values = {date: 0, speed: 0};
    minersData.atmosphericPressure.values = {date: 0, speed: 0};
    return minersData;
}

const addNewValueVibration = (x, y) => {
    const now = new Date().getTime();
    minersData.altitude.values = {date: now, speed: y};
    minersData.temperature.values = {date: 0, speed: 0};
    minersData.atmosphericPressure.values = {date: 0, speed: 0};
    return minersData;
}

const addNewValueTemperature = (x, y) => {
    const now = new Date().getTime();
    minersData.altitude.values = {date: 0, speed: 0};
    minersData.temperature.values = {date: now, speed: y};
    minersData.atmosphericPressure.values = {date: 0, speed: 0};
    return minersData;
}

const addNewValueAtmosphericPressure = (x, y) => {
    const now = new Date().getTime();
    minersData.altitude.values = {date: 0, speed: 0};
    minersData.temperature.values = {date: 0, speed: 0};
    minersData.atmosphericPressure.values = {date: now, speed: y};
    return minersData;
}

const getLatest = () => {
    const latest = Object.keys(minersData).reduce((acc, key) => {
        const miner = minersData[key];
        const l = miner.values.length;
        acc[key] = {
            values: miner.values[l - 1]
        }
        return acc
    }, {});
    return latest;
}

const getMiners = () => {
    return minersData;
}

const validateMinerOneLength = () => {
    return minersData.altitude.values.length > 30;
}

module.exports = {
    updateValues,
    getLatest,
    getMiners,
    validateMinerOneLength,
    addNewValueAltitude,
    addNewValueTemperature,
    addNewValueAtmosphericPressure,
    addNewValueVibration
}
