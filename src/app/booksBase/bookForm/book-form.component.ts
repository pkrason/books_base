import { Component, OnInit } from '@angular/core';
import { BookService } from '../../shared/book.service';
import { NotificationsService } from '../../shared/notifications.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-client',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  constructor(public service: BookService,
    private notifications: NotificationsService,
    private dialogRef: MatDialogRef<BookFormComponent>) { }

    bookStatus = [
      'Pożyczona',
      'Na półce w sypialni',
      'Na półce w małym pokoju',
      'Na półce w dużym pokoju',
      'Zniszczona'
    ];

  ngOnInit() {
    this.service.getBooks();
  }

  onReset() {
    this.service.form.reset();
    this.notifications.showWarning();
  }
  onSubmit() {
    if (this.service.form.valid) {
      if (!this.service.form.get('$key').value) {
        this.service.insertBook(this.service.form.value);
        this.notifications.showSuccess();
        this.onClose();
      } else {
        this.service.updateClient(this.service.form.value);
        this.notifications.showConfirmation();
        this.onClose();
      }
    }
  }
  onClose() {
    this.dialogRef.close();
  }
}
