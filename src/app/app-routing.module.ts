import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditComponent } from './clients/edit/edit.component';
import { DetailsComponent } from './clients/details/details.component';
import { ClientListComponent } from './clients/client-list/client-list.component';
import { ClientComponent } from './clients/client/client.component';

const routes: Routes = [
  { path: '', component: ClientListComponent},
  { path: 'edit', component: EditComponent },
  { path: 'details', component: DetailsComponent,
  children: [
    {
      path: ':id',
      component: ClientComponent
    }
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
