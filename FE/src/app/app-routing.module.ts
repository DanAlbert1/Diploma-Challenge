import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { SignUpPageComponent } from './Components/sign-up-page/sign-up-page.component';
import { CreateUserPageComponent } from './Components/create-user-page/create-user-page.component';

// Import the authentication guard
import { AuthGuard } from '@auth0/auth0-angular';
import { MyPetsComponent } from './Components/my-pets/my-pets.component';
import { TreatmentPageComponent } from './Components/treatment-page/treatment-page.component';
import { ProcedurePageComponent } from './Components/procedure-page/procedure-page.component';
import { UserDetailsPageComponent } from './Components/user-details-page/user-details-page.component';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'sign-up', component: SignUpPageComponent },
  { path: 'pets', component: MyPetsComponent, canActivate: [AuthGuard] },
  { path: 'treatments', component: TreatmentPageComponent, canActivate: [AuthGuard] },
  { path: 'procedures', component: ProcedurePageComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserDetailsPageComponent, canActivate: [AuthGuard] },
  { path: 'create-user', component: CreateUserPageComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo:'/pets'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
