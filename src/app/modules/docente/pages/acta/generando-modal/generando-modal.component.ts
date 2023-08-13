import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CursoModel } from '../../../models/cursoModel';

@Component({
  selector: 'app-generando-modal',
  templateUrl: './generando-modal.component.html',
  styleUrls: ['./generando-modal.component.css']
})
export class GenerandoModalComponent implements OnInit{
  @Input() public curso!: CursoModel;
  isLoading: boolean = false; 
  modalRef: any; 
  redirectTimeout: any; 
  cargando = true;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.cargando = false;
    }, 5000);
    const modalOptions: NgbModalOptions = {
      backdrop: 'static'
    };

  }


}

