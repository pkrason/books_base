import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../shared/client.service';
import { NotificationsService } from '../../shared/notifications.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  constructor(public service: ClientService,
    private notifications: NotificationsService,
    private dialogRef: MatDialogRef<ClientComponent>) { }

  genders = [
    { id: 1, value: 'Kobieta' },
    { id: 2, value: 'Mężczyzna' },
    { id: 3, value: 'Nieokreślona' }
  ];

  ngOnInit() {
    this.service.getClients();
  }

  onReset() {
    this.service.form.reset();
    this.notifications.showWarning();
  }
  onSubmit() {
    if (this.service.form.valid) {
      if (!this.service.form.get('$key').value) {
        this.service.insertClient(this.service.form.value);
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
