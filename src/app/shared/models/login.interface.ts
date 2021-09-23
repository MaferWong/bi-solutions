import { Roles } from "./rol.interface";

export interface LoginSolicitud {
    login_correo: string;
    login_contrasena: string;
}

export interface LoginRespuesta {
    message: string;
    login_correo: string;
    login_token: string;
    login_usuario_rol: Roles;
    login_usuario_rol_id: Roles;
}