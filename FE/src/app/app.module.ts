import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { MaterialModule } from './Modules/material/material.module';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { PetsPageComponent } from './Components/pets-page/pets-page.component';
import { PetsTableComponent } from './Components/pets-page/pets-table/pets-table.component';
import { AddPetPopupFormComponent } from './Components/pets-page/add-pet-popup-form/add-pet-popup-form.component';
import { TreatmentPageComponent } from './Components/treatment-page/treatment-page.component';
import { TreatmentFormDialogComponent } from './Components/treatment-page/treatment-form-dialog/treatment-form-dialog.component';
import { ApiService } from './Services/api.service';
import { AccountPageComponent } from './Components/account-page/account-page.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    NavBarComponent,
    PetsPageComponent,
    PetsTableComponent,
    AddPetPopupFormComponent,
    TreatmentPageComponent,
    TreatmentFormDialogComponent,
    AccountPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  providers: [FormBuilder, CookieService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
