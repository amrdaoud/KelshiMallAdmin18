import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostReportListComponent } from './post-report-list.component';

describe('PostReportListComponent', () => {
  let component: PostReportListComponent;
  let fixture: ComponentFixture<PostReportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostReportListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
