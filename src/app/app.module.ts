import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './shared/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { ToastrModule } from 'ngx-toastr';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './booksBase/home.component';
import { BookService } from './shared/book.service';
import { BookFormComponent } from './booksBase/bookForm/book-form.component';
import { from } from 'rxjs';
import { environment } from '../environments/environment';
import { BookListComponent } from './booksBase/bookList/book-list.component';
import { DeleteDialogComponent } from './booksBase/delete-dialog/delete-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BookFormComponent,
    BookListComponent,
    DeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ToastrModule.forRoot({
      progressBar: true,
      timeOut: 7000,
      preventDuplicates: true
    })
  ],
  providers: [BookService],
  bootstrap: [AppComponent],
  entryComponents: [BookFormComponent, DeleteDialogComponent]
})
export class AppModule { }
