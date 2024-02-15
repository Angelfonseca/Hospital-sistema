type BorderStyle = 'single' | 'double' | 'round' | 'singleDouble' | 'doubleSingle' | 'classic';
type BorderConfig = {
    top?: string;
    topMid?: string;
    topLeft?: string;
    topRight?: string;
    bottom?: string;
    bottomMid?: string;
    bottomLeft?: string;
    bottomRight?: string;
    left?: string;
    leftMid?: string;
    mid?: string;
    midMid?: string;
    right?: string;
    rightMid?: string;
    middle?: string;
};
export interface Object {
    asignado: string,
    cve_cabms: string,
    consecutivo: number,
    descrip_bm: string,
    costo_bien: number,
    marca: string,
    modelo: string,
    serie: string,
    motor: string,
    descripcion: string,
    recursos: string,
    responsable: string,
    ubicacion: string,
    consumible: boolean,
    activo: boolean
}

export interface Options {
    borderStyle?: BorderStyle | BorderConfig;
    headerAlign?: 'left' | 'center' | 'right';
    align?: 'left' | 'center' | 'right';
    color?: string;
    truncate?: string;
}
