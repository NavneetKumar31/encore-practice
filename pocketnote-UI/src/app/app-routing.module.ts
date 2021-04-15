import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ErrorComponent } from "./error/error.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { PostFormComponent } from "./post-form/post-form.component";
import { PostsComponent } from "./posts/posts.component";
import { ProfileComponent } from "./profile/profile.component";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "posts", component: PostsComponent },
  { path: "my-posts", component: PostsComponent },
  { path: "post-form/:id", component: PostFormComponent },
  { path: "profile", component: ProfileComponent },
  {
    path: "admin",
    loadChildren: () =>
      import(`./admin/admin.module`).then((m) => m.AdminModule),
  },
  { path: "**", component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
