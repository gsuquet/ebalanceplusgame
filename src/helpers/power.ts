function roundNumberToTwoDecimals(amount: number): number {
    return Math.round(amount * 100) / 100;
}

function convertWattsToKilowatts(watts: number): number {
    return watts / 1000;
}

export function convertWattsPer15minToKilowattsPerHour(watts: number): number {
    return roundNumberToTwoDecimals(convertWattsToKilowatts(watts) / 4);
}

export function getTotalKilowattsPerHour(wattsPer15min: number, indexes:{indexStart:number,indexEnd:number}): number {
    return roundNumberToTwoDecimals((convertWattsToKilowatts(wattsPer15min) / 4) * ((indexes.indexEnd - indexes.indexStart)+1));
}
