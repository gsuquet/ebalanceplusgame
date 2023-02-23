export interface EnergyStorageParameters {
    isEnergyStorage: boolean;
    initialStoredEnergy: number;
    numberOfBatteries: number;
    batteryIndividualCapacity: number;
    batteryPrice: number;
    batteryChargeEquipmentTypeId: string;
    batteryDischargeEquipmentTypeId: string;
}


export interface EnergyMarketParameters {
    salePricesList: number[],
    constantPrice: number
}