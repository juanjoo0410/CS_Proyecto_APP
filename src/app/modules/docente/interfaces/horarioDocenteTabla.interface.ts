export interface HorarioDocenteTabla{    
    id_curso?: number;
    modulo_materia: number;
    nombre_materia: string;
    nombre_paralelo: string;
    horario_ordenado: Horario_Ordenado[];
}

export interface Horario_Ordenado{
    dia_horario: string;
    hora_horario: string;
}