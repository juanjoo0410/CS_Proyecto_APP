import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarModalComponent } from './registrar-modal.component';

describe('RegistrarModalComponent', () => {
  let component: RegistrarModalComponent;
  let fixture: ComponentFixture<RegistrarModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrarModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
