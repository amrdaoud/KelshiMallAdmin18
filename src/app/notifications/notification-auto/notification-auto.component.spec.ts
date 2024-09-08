import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationAutoComponent } from './notification-auto.component';

describe('NotificationAutoComponent', () => {
  let component: NotificationAutoComponent;
  let fixture: ComponentFixture<NotificationAutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationAutoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
