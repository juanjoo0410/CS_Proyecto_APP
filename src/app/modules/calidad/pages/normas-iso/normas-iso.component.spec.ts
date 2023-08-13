import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormasIsoComponent } from './normas-iso.component';

describe('NormasIsoComponent', () => {
  let component: NormasIsoComponent;
  let fixture: ComponentFixture<NormasIsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NormasIsoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NormasIsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
