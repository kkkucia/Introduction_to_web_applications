import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './postsPage/posts.component';
import { PhotosComponent } from './photosPage/photos.component';
import { StartComponent } from './startPage/start.component';
import { HttpClientModule } from '@angular/common/http';
import { OnePhotoComponent } from './onePhoto/one-photo.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { DataServiceService } from './services/data-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    PhotosComponent,
    StartComponent,
    OnePhotoComponent,
    NavigationBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DataServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
