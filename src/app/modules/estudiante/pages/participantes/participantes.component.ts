import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CursoModel } from '../../models/cursoModel';
import { Participantes } from '../../models/participantes.model';
import { ParticipantesService } from './servicios/services/participantes.service';

@Component({
  selector: 'app-participantes',
  templateUrl: './participantes.component.html',
  styleUrls: ['./participantes.component.css']
})
export class ParticipantesComponent implements OnInit {
  @Input() public curso!: CursoModel;
  displayedColumns = ['no', 'nombres', 'email', 'rol'];
  listaParticipantes: Participantes[] = [];
  searchTerm: string = '';
  filtro: string = '';


  constructor(private participantes: ParticipantesService) { }
  selected = '0';


  ngOnInit() {
    if (!this.curso) {
      this.curso = history.state.curso;
    }
    this.participantes.ObtenerParticipantes(this.curso.id_curso).subscribe((data) => {      
      this.listaParticipantes = data.data;      

    }

    

    )
    
  }

  filtrar() {
    const valor = this.filtro.toLowerCase();
    return this.listaParticipantes.filter(participante =>
      participante.nombrescompletos_participante.toLowerCase().includes(valor)
    );
  }

  
  
  
}
