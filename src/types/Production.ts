export interface ProductionCurve {
    id : string;
    name: string;
    svg: string;
    description: string,
    solar: number[];
    wind: number[];
    hydro: number[];
    total: number[];
}
