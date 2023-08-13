export interface ActividadModel {
    id_actividad?: number,
    curso_actividad?: number,
    fechaPublicacion_actividad: string,
    fechaVencimiento_actividad: string,
    nombre_actividad: string,
    descripcion_actividad : string,
    archivosPermitidos_actividad : string,
    tipo_actividad : string,
    envios?: number,
}
