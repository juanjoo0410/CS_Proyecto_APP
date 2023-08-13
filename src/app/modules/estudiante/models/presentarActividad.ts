export interface PresentarActividad{
    id_actividad: number;
    id_entrega: number;
    nombre_actividad: string;
    descripcion_actividad: string;
    tipo_actividad: string;
    fechaPublicacion_actividad: string;
    fechaVencimiento_actividad: string;
    fechaEnvio_entrega: string;
    fechaModificacion_entrega: string;
    actividad_entrega: number;
    archivo_entrega: string;
    calificacion_entrega: number;
    estado_entrega: string;
}