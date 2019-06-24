import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private firebase: AngularFireDatabase) { }

  clientList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    // _id: new FormControl(''),
    pseudonim: new FormControl('', Validators.required),
    imie: new FormControl('', Validators.required),
    nazwisko: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefon: new FormControl('', [Validators.required, Validators.minLength(9)]),
    plec: new FormControl('', Validators.required)
  });

  getClients() {
    this.clientList = this.firebase.list('kontakty');
    return this.clientList.snapshotChanges();
  }

  insertClient(client) {
    this.clientList.push({
      pseudonim: client.pseudonim,
      imie: client.imie,
      nazwisko: client.nazwisko,
      email: client.email,
      telefon: client.telefon,
      plec: client.plec
    });
  }

  updateClient(client) {
    this.clientList.update(client.$key,
      {
        pseudonim: client.pseudonim,
        imie: client.imie,
        nazwisko: client.nazwisko,
        email: client.email,
        telefon: client.telefon,
        plec: client.plec
      });
  }

  deleteClient($key: string) {
    this.clientList.remove($key);
  }

  populateForm(client) {
    this.form.setValue(client);
  }

}
