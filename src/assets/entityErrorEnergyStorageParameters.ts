import { EnergyStorageParameters } from '../types/Energy';

export const errorEnergyStorageParameters = {
    isEnergyStorage: false,
    initialStoredEnergy: 0,
    numberOfBatteries: 0,
    batteryIndividualCapacity: 0,
    batteryPrice: 0,
    batteryChargeEquipmentTypeId: 'battery_charge' as string,
    batteryDischargeEquipmentTypeId: 'battery_discharge' as string
} as EnergyStorageParameters;
