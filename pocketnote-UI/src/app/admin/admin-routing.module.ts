import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminCategoriesComponent } from "./admin-categories/admin-categories.component";
import { AdminCategoryFormComponent } from "./admin-category-form/admin-category-form.component";
import { AdminDashboardComponent } from "./admin-dashboard/admin-dashboard.component";

import { AdminHomeComponent } from "./admin-home/admin-home.component";
import { AdminProductFormComponent } from "./admin-product-form/admin-product-form.component";
import { AdminProductsComponent } from "./admin-products/admin-products.component";
import { AdminSubCategoriesComponent } from "./admin-sub-categories/admin-sub-categories.component";
import { AdminSubCategoryFormComponent } from "./admin-sub-category-form/admin-sub-category-form.component";
import { AdminUserFormComponent } from "./admin-user-form/admin-user-form.component";
import { AdminUsersComponent } from "./admin-users/admin-users.component";

const routes: Routes = [
  {
    path: "",
    component: AdminHomeComponent,
    children: [
      { path: "", redirectTo: "admin-dashboard", pathMatch: "full" },
      { path: "admin-dashboard", component: AdminDashboardComponent },
      { path: "admin-products", component: AdminProductsComponent },
      { path: "admin-categories", component: AdminCategoriesComponent },
      {
        path: "admin-category-form/:id",
        component: AdminCategoryFormComponent,
      },
      {
        path: "admin-subcategory-form/:id",
        component: AdminSubCategoryFormComponent,
      },
      {
        path: "admin-product-form/:id",
        component: AdminProductFormComponent,
      },
      {
        path: "admin-user-form/:id",
        component: AdminUserFormComponent,
      },
      { path: "admin-subcategories", component: AdminSubCategoriesComponent },
      { path: "admin-users", component: AdminUsersComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
