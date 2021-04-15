import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SharedService } from "../shared/services/shared.service";
import { UserService } from "../shared/services/user.service";
import { UtilitiesService } from "../shared/services/utilities.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private $fb: FormBuilder,
    private $user: UserService,
    private $shared: SharedService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.loginForm = this.$fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(8)]],
    });
  }

  routeTo(path: string): void {
    this.$shared.routeTo(path.toLowerCase());
  }

  authenticateUser(): void {
    const user = {
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value,
    };

    this.$user.authenticateUser(user).subscribe((data) => {
      if (data.success) {
        console.log(data);
        localStorage.setItem("user", JSON.stringify(data.results));
        localStorage.setItem("token", JSON.stringify(data.token));
        this.$user.isUserLoggedIn.next(true);
        this.$shared.routeTo("home");
      }
    });
  }
}
