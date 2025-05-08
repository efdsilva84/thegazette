import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogSlideComponent } from './blog-slide.component';

describe('BlogSlideComponent', () => {
  let component: BlogSlideComponent;
  let fixture: ComponentFixture<BlogSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogSlideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
