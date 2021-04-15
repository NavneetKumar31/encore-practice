import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SharedService } from "../shared/services/shared.service";
import { UserService } from "../shared/services/user.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private $fb: FormBuilder,
    private $user: UserService,
    private $shared: SharedService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.registerForm = this.$fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      mobile: ["", [Validators.required]],
      gender: [""],
      password: ["", [Validators.required, Validators.minLength(8)]],
    });
  }

  routeTo(path: string): void {
    this.$shared.routeTo(path.toLowerCase());
  }

  registerUser(): void {
    console.log(this.registerForm.controls);

    const newUser = {
      name: this.registerForm.controls.name.value.toLowerCase(),
      email: this.registerForm.controls.email.value,
      mobile: this.registerForm.controls.mobile.value,
      gender: this.registerForm.controls.gender.value,
      password: this.registerForm.controls.password.value,
    };

    this.$user.registerUser(newUser).subscribe((data) => {
      if (data.success) {
        this.registerForm.reset();
        this.$shared.routeTo("login");
      }
    });
  }
}
