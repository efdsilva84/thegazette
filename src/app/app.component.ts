import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { BlogSlideComponent } from './blog-slide/blog-slide.component';
import { MainContentComponent } from './main-content/main-content.component';
import { CategoryPostsComponent } from './category-posts/category-posts.component';
import { VideosPostsComponent } from './videos-posts/videos-posts.component';
import { EditorialComponent } from './editorial/editorial.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, BlogSlideComponent, MainContentComponent,
    CategoryPostsComponent, VideosPostsComponent, EditorialComponent, FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'gazzete';



  constructor(){
    if (typeof window !== 'undefined' && window.localStorage) {
      const user = localStorage.getItem('yourKey');
      console.log(user);
    }
  }
}
