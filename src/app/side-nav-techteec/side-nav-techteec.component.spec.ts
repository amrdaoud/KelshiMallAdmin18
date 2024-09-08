import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavTechteecComponent } from './side-nav-techteec.component';

describe('SideNavTechteecComponent', () => {
  let component: SideNavTechteecComponent;
  let fixture: ComponentFixture<SideNavTechteecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideNavTechteecComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideNavTechteecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
