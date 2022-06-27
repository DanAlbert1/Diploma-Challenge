import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountPageComponent } from './Components/account-page/account-page.component';
import { CustomersTableComponent } from './Components/customers-table/customers-table.component';
import { LoginPageComponent } from './Components/login-page/login-page.component';
import { OrderComponent } from './Components/order/order.component';
import { OrderFormComponent } from './Components/orders/order-form/order-form.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { PetsPageComponent } from './Components/pets-page/pets-page.component';
import { TreatmentPageComponent } from './Components/treatment-page/treatment-page.component';

const routes: Routes = [
  { path: 'customers', component: CustomersTableComponent },
  { path: 'customer/:id', component: OrdersComponent },
  { path: 'order-form/:id', component: OrderFormComponent },
  { path: 'order/:id', component: OrderComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'pets', component: PetsPageComponent },
  { path: 'treatment', component: TreatmentPageComponent },
  { path: 'account', component: AccountPageComponent },
  { path: '**', redirectTo:'customers' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
