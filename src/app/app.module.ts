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
import { ClientsComponent } from './clients/clients.component';
import { DetailsComponent } from './clients/details/details.component';
import { EditComponent } from './clients/edit/edit.component';
import { ClientService } from './shared/client.service';
import { ClientComponent } from './clients/client/client.component';
import { from } from 'rxjs';
import { environment } from '../environments/environment';
import { ClientListComponent } from './clients/client-list/client-list.component';
import { DeleteDialogComponent } from './clients/delete-dialog/delete-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    DetailsComponent,
    EditComponent,
    ClientComponent,
    ClientListComponent,
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
  providers: [ClientService],
  bootstrap: [AppComponent],
  entryComponents: [ClientComponent, DeleteDialogComponent]
})
export class AppModule { }
