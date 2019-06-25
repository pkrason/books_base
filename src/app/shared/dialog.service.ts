import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DeleteDialogComponent } from '../booksBase/delete-dialog/delete-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog() {
    return this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
    });
  }
}
