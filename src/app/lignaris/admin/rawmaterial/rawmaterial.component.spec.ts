import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RawmaterialComponent } from './rawmaterial.component';

describe('RawmaterialComponent', () => {
  let component: RawmaterialComponent;
  let fixture: ComponentFixture<RawmaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RawmaterialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RawmaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
