import { Roles } from "./rol.interface";

export interface Usuario {
    message: string;
    usuario_id: number;
    usuario_nombre: string;
    usuario_correo: string;
    usuario_contrasena: string;
    usuario_rol_id: Roles;
    usuario_rol_descripcion: string;
}