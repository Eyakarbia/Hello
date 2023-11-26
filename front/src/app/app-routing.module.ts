import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionLayoutComponent } from './layout/inscription-layout/inscription-layout.component';

const routes: Routes = [
  {
    path: '', component:InscriptionLayoutComponent,children:[
      { path: 'a', loadChildren: () => import('./views/inscription/connection/connection.module').then(m => m.ConnectionModule) },
      { path: 'b', loadChildren: () => import('./views/inscription/registre/registre.module').then(m => m.RegistreModule) },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
