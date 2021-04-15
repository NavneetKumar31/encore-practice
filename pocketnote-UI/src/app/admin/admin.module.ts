import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MaterialModule } from "../shared/modules/material.module";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminRoutingModule } from "./admin-routing.module";

import { AdminHomeComponent } from "./admin-home/admin-home.component";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";
import { AdminStocksComponent } from "./admin-stocks/admin-stocks.component";
import { AdminProductsComponent } from "./admin-products/admin-products.component";
import { AdminCategoriesComponent } from "./admin-categories/admin-categories.component";
import { AdminSubCategoriesComponent } from "./admin-sub-categories/admin-sub-categories.component";
import { AdminUsersComponent } from "./admin-users/admin-users.component";
import { AdminSideNavComponent } from "./admin-side-nav/admin-side-nav.component";
import { AdminCategoryFormComponent } from './admin-category-form/admin-category-form.component';
import { AdminProductFormComponent } from './admin-product-form/admin-product-form.component';
import { AdminSubCategoryFormComponent } from './admin-sub-category-form/admin-sub-category-form.component';
import { AdminUserFormComponent } from './admin-user-form/admin-user-form.component';

@NgModule({
  declarations: [
    AdminHomeComponent,
    AdminDashboardComponent,
    AdminStocksComponent,
    AdminProductsComponent,
    AdminCategoriesComponent,
    AdminSubCategoriesComponent,
    AdminUsersComponent,
    AdminSideNavComponent,
    AdminCategoryFormComponent,
    AdminProductFormComponent,
    AdminSubCategoryFormComponent,
    AdminUserFormComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
  ],
})
export class AdminModule {}
