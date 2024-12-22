import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipExtendComponent } from './membership-extend.component';

describe('MembershipExtendComponent', () => {
  let component: MembershipExtendComponent;
  let fixture: ComponentFixture<MembershipExtendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MembershipExtendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MembershipExtendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
