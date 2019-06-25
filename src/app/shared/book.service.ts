import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private firebase: AngularFireDatabase) { }

  booksList: AngularFireList<any>;
  bookId: number = 1;


  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    id: new FormControl(null),
    tytul: new FormControl('', Validators.required),
    autor: new FormControl('', Validators.required),
    dataWydania: new FormControl('', Validators.required),
    pozyczona: new FormControl('', Validators.required),
  });


  getBooks() {
    this.booksList = this.firebase.list('book-base');
    return this.booksList.snapshotChanges();
  }


  insertBook(book) {
    this.booksList.push({
      id: this.bookId,
      tytul: book.tytul,
      autor: book.autor,
      dataWydania: book.dataWydania,
      pozyczona: book.pozyczona,
    });
  }

  updateClient(book) {
    this.booksList.update(book.$key,
      {
      id: book.id,
      tytul: book.tytul,
      autor: book.autor,
      dataWydania: book.dataWydania,
      pozyczona: book.pozyczona,
      });
  }

  deleteClient($key: string) {
    this.booksList.remove($key);
  }

  populateForm(book) {
    this.form.setValue(book);
  }

}
