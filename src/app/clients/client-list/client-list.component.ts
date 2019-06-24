import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from 'src/app/shared/client.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ClientComponent } from '../client/client.component';
import { NotificationsService } from '../../shared/notifications.service';
import { DialogService } from 'src/app/shared/dialog.service';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  constructor(private service: ClientService,
              private dialog: MatDialog,
              private notifications: NotificationsService,
              private dialogService: DialogService) { }

  clientList: MatTableDataSource<any>;
  displayedColumns: string[] = ['pseudonim', 'imie', 'nazwisko', 'email', 'telefon', 'plec', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    this.service.getClients().subscribe(
      list => {
        const array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
        this.clientList = new MatTableDataSource(array);
        this.clientList.sort = this.sort;
        this.clientList.paginator = this.paginator;
      });
  }


  onSearchClear() {
    this.searchKey = '';

    this.applyFilter();
  }

  applyFilter() {
    this.clientList.filter = this.searchKey.trim().toLowerCase();
  }

  onAdd() {
    this.service.form.reset();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '65%';
    this.dialog.open(ClientComponent, dialogConfig);
  }

  onEdit(row) {
    this.service.populateForm(row);
    // Otwieramy dialog - tu zamienić na nowy komponent
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '65%';
    this.dialog.open(ClientComponent, dialogConfig);
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

