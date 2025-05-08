import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosPostsComponent } from './videos-posts.component';

describe('VideosPostsComponent', () => {
  let component: VideosPostsComponent;
  let fixture: ComponentFixture<VideosPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideosPostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideosPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
