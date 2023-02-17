function roundNumberToTwoDecimals(amount: number): number {
    return Math.round(amount * 100) / 100;
}

function convertWattsToKilowatts(watts: number): number {
    return roundNumberToTwoDecimals(watts / 1000);
}

export function convertWattsPer15minToKilowattsPerHour(watts: number): number {
    return roundNumberToTwoDecimals(convertWattsToKilowatts(watts) / 4);
}

export function getTotalKilowattsPerHour(wattsPer15min: number, indexes:{indexStart:number,indexEnd:number}): number {
    return roundNumberToTwoDecimals(convertWattsPer15minToKilowattsPerHour(wattsPer15min) * ((indexes.indexEnd - indexes.indexStart)+1));
}
