import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AseguramientoComponent } from './aseguramiento.component';

describe('AseguramientoComponent', () => {
  let component: AseguramientoComponent;
  let fixture: ComponentFixture<AseguramientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AseguramientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AseguramientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
