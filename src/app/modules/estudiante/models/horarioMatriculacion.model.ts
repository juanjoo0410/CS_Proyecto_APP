export interface horarioMatriculacion{
    id_curso?: number;
    materia?: string;
    paralelo_curso: string;
    cupo_curso: number;
    horario_ordenado:Horario_Ordenado[];
    
}

export interface Horario_Ordenado{
dia_horario: string;
hora:string;

}

    

