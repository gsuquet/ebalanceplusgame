import { Equipment, EquipmentConsumptionParams, EquipmentCostParams } from "../types/Equipment";
import { errorEquipmentType } from "./entityErrorEquipmentType";

const errorEquipmentCostParams = {
    originalPrice: 0,
    hasCost: false,
    isCostEditable: false,
    step: 0,
    minCost: 0,
    maxCost: 0
} as EquipmentCostParams;

const errorEquipmentConsumptionParams = {
    originalConsumption: 0,
    isConsumptionEditable: false,
    step: 0,
    minConsumption: 0,
    maxConsumption: 0
} as EquipmentConsumptionParams;

export const errorEquipment = {
    id: '0',
    energy_class: 'Error',
    type: errorEquipmentType,
    equipmentCostParams: errorEquipmentCostParams,
    equipmentConsumptionParams: errorEquipmentConsumptionParams
} as Equipment;
