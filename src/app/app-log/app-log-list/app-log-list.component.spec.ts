import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppLogListComponent } from './app-log-list.component';

describe('AppLogListComponent', () => {
  let component: AppLogListComponent;
  let fixture: ComponentFixture<AppLogListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppLogListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppLogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
