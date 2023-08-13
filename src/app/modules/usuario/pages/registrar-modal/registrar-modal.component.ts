import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registrar-modal',
  templateUrl: './registrar-modal.component.html',
  styleUrls: ['./registrar-modal.component.css']
})
export class RegistrarModalComponent {
  @Input() public docente!: boolean;
  isLoading: boolean = false; 
  modalRef: any; 
  redirectTimeout: any; 
  cargando = true;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {

    if(this.docente == true){
      this.cargando = false;
    }else{
      setTimeout(() => {
        this.cargando = false;
      }, 5000);
    }
    const modalOptions: NgbModalOptions = {
      backdrop: 'static'
    };

  }
}
