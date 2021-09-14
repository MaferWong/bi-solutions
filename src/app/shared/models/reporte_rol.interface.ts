import { Reporte } from "./reporte.interface";
import { Roles } from "./rol.interface";

export interface ReporteRol {
    message: string;
    reporte_rol_id: number;
    rol_id: Roles;
    reporte_id: Reporte;
}