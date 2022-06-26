import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountPageComponent } from './Components/account-page/account-page.component';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { PetsPageComponent } from './Components/pets-page/pets-page.component';
import { TreatmentPageComponent } from './Components/treatment-page/treatment-page.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'pets', component: PetsPageComponent },
  { path: 'treatment', component: TreatmentPageComponent },
  { path: 'account', component: AccountPageComponent },
  { path: '**', redirectTo:'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
