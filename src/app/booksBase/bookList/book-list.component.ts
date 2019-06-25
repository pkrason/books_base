import { Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from 'src/app/shared/book.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { BookFormComponent } from '../bookForm/book-form.component';
import { NotificationsService } from '../../shared/notifications.service';
import { DialogService } from 'src/app/shared/dialog.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  constructor(private service: BookService,
              private dialog: MatDialog,
              private notifications: NotificationsService,
              private dialogService: DialogService) { }

  booksList: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'tytul', 'autor', 'dataWydania', 'pozyczona', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    this.service.getBooks().subscribe(
      list => {
        const array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
        this.booksList = new MatTableDataSource(array);
        this.booksList.sort = this.sort;
        this.booksList.paginator = this.paginator;
      });
  }


  onSearchClear() {
    this.searchKey = '';

    this.applyFilter();
  }

  applyFilter() {
    this.booksList.filter = this.searchKey.trim().toLowerCase();
  }

  onAdd() {
    this.service.form.reset();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '65%';
    this.dialog.open(BookFormComponent, dialogConfig);
  }

  onEdit(row) {
    this.service.populateForm(row);
    // Otwieramy dialog - tu zamienić na nowy komponent
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '65%';
    this.dialog.open(BookFormComponent, dialogConfig);
  }

  onDelete($key) {
    this.dialogService.openConfirmDialog()
      .afterClosed().subscribe(res => {
        if (res) {
          this.service.deleteClient($key);
          this.notifications.showOnDelete();
        }
      });
  }
}

