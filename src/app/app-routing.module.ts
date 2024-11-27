import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { ResponseComponent } from './response/response.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: '/form',
    pathMatch:'full',
    title:'Reactive Form'
  },

  {
    path:'form',
    component:FormComponent,
    title:'Form'
  },
  {
    path:'response',
    component:ResponseComponent,
    title:'Form Response'
  },
  {
    path:'edit/:id',
    component:EditComponent,
    title:'Edit Response'
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
