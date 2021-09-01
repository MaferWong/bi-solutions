import { Roles } from "./rol.interface";

export interface Usuario {
    usuario_id: number;
    usuario_nombre: string;
    usuario_correo: string;
    usuario_contrasena: string;
    usuario_rol_id: Roles;
}