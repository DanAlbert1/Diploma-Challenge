import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './Components/login-page/login-page.component';

//--------- Form Builder ----------//
import { FormBuilder, Validators, ReactiveFormsModule, FormsModule} from '@angular/forms';

import { environment } from 'src/environments/environment';

// Import the module from the SDK
import { AuthModule, AuthHttpInterceptor } from '@auth0/auth0-angular';
import { MyPetsComponent } from './Components/my-pets/my-pets.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//---------- Materials Module ---------------//
import { AppMaterialModule } from './app-material/app-material.module';

//------ api modules --------//
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignUpPageComponent } from './Components/sign-up-page/sign-up-page.component';
import { PetsTableComponent } from './Components/my-pets/pets-table/pets-table.component';
import { TreatmentPageComponent } from './Components/treatment-page/treatment-page.component';
import { CreateTreatmentFormComponent } from './Components/treatment-page/create-treatment-form/create-treatment-form.component';
import { ProcedurePageComponent } from './Components/procedure-page/procedure-page.component';
import { UserDetailsPageComponent } from './Components/user-details-page/user-details-page.component';
import { UserDetailsFormComponent } from './Components/user-details-page/user-details-form/user-details-form.component';
import { SignUpFormComponent } from './Components/sign-up-page/sign-up-form/sign-up-form.component';
import { CreateUserPageComponent } from './Components/create-user-page/create-user-page.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MyPetsComponent,
    NavBarComponent,
    SignUpPageComponent,
    PetsTableComponent,
    TreatmentPageComponent,
    CreateTreatmentFormComponent,
    ProcedurePageComponent,
    UserDetailsPageComponent,
    UserDetailsFormComponent,
    SignUpFormComponent,
    CreateUserPageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    AppMaterialModule,
    HttpClientModule,


    AuthModule.forRoot({
      domain:environment.AUTH0.domain,
      clientId: environment.AUTH0.clientId,
      redirectUri: environment.AUTH0.redirectUri,
      audience: environment.AUTH0.audience,
      scope: 'read:message write:admin',

      httpInterceptor: {
        allowedList: [
          {
            uri: `${environment.apiURL}/api/owner/sign-up`,
            allowAnonymous:true
          },
          {
            uri: `${environment.apiURL}/*`,
            tokenOptions: {
              audience: environment.AUTH0.audience,
              scope: 'read:message write:admin',
            }
          }

        ]
      }
    }),

    BrowserAnimationsModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },FormBuilder,Validators],
  bootstrap: [AppComponent]
})
export class AppModule { }
