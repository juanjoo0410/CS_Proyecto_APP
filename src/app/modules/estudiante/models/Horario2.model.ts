export interface Horario2{
    nombre_materia: string;
    modulo_materia: number;
    nombre_paralelo: string;
    docente_curso: string;
    horario_ordenado:Horario_Ordenado[];
    
}

export interface Horario_Ordenado{
dia_horario: string;
hora_horario: string;


}
