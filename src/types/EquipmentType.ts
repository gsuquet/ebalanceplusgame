export interface EquipmentType{
    id: string,
    names: EquipmentTypeName[],
    icon_name: string,
    color: string,
    isConsumptionEditable: boolean,
    hasCost: boolean
}

export interface EquipmentTypeLocale{
    id: string,
    name: string,
    icon_name: string,
    color: string,
    isConsumptionEditable: boolean,
    hasCost: boolean
}

export interface EquipmentTypeName{
    lang: string,
    name: string
}
