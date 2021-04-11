import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandListComponent } from './components/brand-list/brand-list.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { CardetailComponent } from './components/cardetail/cardetail.component';
import { Cardetails2Component } from './components/cardetails2/cardetails2.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { CustomerComponent } from './components/customer/customer.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalComponent } from './components/rental/rental.component';
import { UserComponent } from './components/user/user.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"customers",component:CustomerComponent},
  {path:"rentals",component:RentalComponent},
  {path:"cars/car/:carId",component:CardetailComponent},
  {path:"cars/cardetails",component:CardetailComponent},
  {path:"cars/cardetails2",component:Cardetails2Component},
  {path:"cars/cardetails2/:carId",component:Cardetails2Component},
  {path:"cars/filter/:brandId/:colorId",component:CarComponent},
  {path:"cars/add",component:CarAddComponent,canActivate:[LoginGuard]},
  {path:"cars/update/:carId",component:CarUpdateComponent},
  {path:"payments", component:PaymentComponent},
  {path: "rental", component:RentalComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path: 'profile', component: UserComponent },
  {path:'brands/add',component: BrandAddComponent,canActivate: [LoginGuard],},
  {path: 'brands/update/:brandId',component: BrandUpdateComponent,canActivate: [LoginGuard],},
  { path: 'brands/list', component: BrandListComponent,canActivate: [LoginGuard] },
  { path: 'colors/list', component: ColorListComponent,canActivate: [LoginGuard] },
  {
    path: 'colors/add',
    component: ColorAddComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'colors/update/:colorId',
    component: ColorUpdateComponent,
    canActivate: [LoginGuard],
  }

      
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
