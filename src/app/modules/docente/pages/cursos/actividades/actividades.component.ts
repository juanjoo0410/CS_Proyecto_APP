import { Component, HostListener, OnInit, Output, EventEmitter  } from '@angular/core';
import { CursoModel } from '../../../models/cursoModel';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgregarActividadModalComponent } from './agregar-actividad-modal/agregar-actividad-modal.component';
import { ModificarActividadModalComponent } from './modificar-actividad-modal/modificar-actividad-modal.component';
import { InformacionActividadModalComponent } from './informacion-actividad-modal/informacion-actividad-modal.component';
import { BorrarActividadModalComponent } from './borrar-actividad-modal/borrar-actividad-modal.component';
import { DocentesService } from '../../../services/docentes.service';
import { ActividadModel } from '../../../models/actividadModel';
import { ActivatedRoute, Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], filtro: string): any[] {
    if (!items || !filtro) {
      return items;
    }
    return items.filter(item => item.nombre_actividad.toLowerCase().includes(filtro.toLowerCase()));
  }

}

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {

  public mostrarContenido = false;
  public curso!: CursoModel;
  public actividades!: ActividadModel[];
  public filtroActividad: string = '';
  


  constructor(
    private modalService: NgbModal,
    private _docentesService: DocentesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.curso = history.state.curso;    
    this.obtenerActividades();
    this._docentesService.getUpdate().subscribe((value: boolean) => {
      if(value) {
        this.obtenerActividades();
      }
    })
  }

  navigateToCalificaciones(actividad: ActividadModel): void {
    this._docentesService.updateMenu(true);
    this.router.navigate(['../calificaciones'], { 
      relativeTo: this.route, 
      state: { 
        actividad: actividad,
        curso: this.curso
      } 
    });
  }

  obtenerActividades(): void {
    this._docentesService.obtenerActividades(this.curso.id_curso).subscribe(data => {
      this.actividades = data.data;
    });
  }

  openAgregar(): void {
    const modalRef = this.modalService.open(AgregarActividadModalComponent, { centered: true, size: 'md' });
  }

  openModificar(actividad: ActividadModel): void {
    const modalRef = this.modalService.open(ModificarActividadModalComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.actividad = actividad;
  }

  openInformacion(actividad: ActividadModel): void {
    const modalRef = this.modalService.open(InformacionActividadModalComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.actividad = actividad;
  }

  openBorrar(actividad: ActividadModel): void {
    const modalRef = this.modalService.open(BorrarActividadModalComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.actividad = actividad;
  }

}