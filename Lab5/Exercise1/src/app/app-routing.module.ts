import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './postsPage/posts.component';
import { OnePhotoComponent } from './onePhoto/one-photo.component';
import { PhotosComponent } from './photosPage/photos.component';
import { StartComponent } from './startPage/start.component';

const routes: Routes = [
  { path: '', component: StartComponent },
  { path: 'photos/:id', component: OnePhotoComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'photos', component: PhotosComponent },
  { path: '**', component: StartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
