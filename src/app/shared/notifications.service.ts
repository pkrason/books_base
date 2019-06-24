import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private toastr: ToastrService) { }

  showSuccess() {
    this.toastr.success('Nowy kontakt został dodany.', 'Powodzenie!');
  }

  showConfirmation() {
    this.toastr.success('Kontakt został edytowany.', 'Powodzenie!');
  }

  showOnDelete() {
    this.toastr.success('Kontakt został usunięty.', 'Powodzenie!');
  }

  showWarning() {
    this.toastr.warning('Dane formularza zostały wyczyszczone.', 'Uwaga!');
  }

}
