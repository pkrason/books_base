import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookListComponent } from './booksBase/bookList/book-list.component';
import { BookFormComponent } from './booksBase/bookForm/book-form.component';

const routes: Routes = [
  { path: '', component: BookListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
