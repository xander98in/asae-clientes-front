import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { FormComponent } from './components/form/form.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/clientes', pathMatch: 'full'
  },
  {
    path: 'clientes',
    component: ClientesComponent
  },
  {
    path: 'clientes/form',
    component: FormComponent
  },
  {
    path: 'clientes/form/:id',
    component: FormComponent
  },
  {
    path: '**',
    redirectTo: 'clientes'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
