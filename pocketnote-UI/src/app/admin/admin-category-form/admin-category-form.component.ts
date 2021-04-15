import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ICategory } from "src/app/shared/models/ICategory";

@Component({
  selector: "app-admin-category-form",
  templateUrl: "./admin-category-form.component.html",
  styleUrls: ["./admin-category-form.component.scss"],
})
export class AdminCategoryFormComponent implements OnInit {
  categoryId: string;
  category: ICategory;
  categoryForm: FormGroup;
  pageInfo: any = {
    title: "",
    subtitle: "",
  };

  constructor(
    private $router: Router,
    private $activateRoute: ActivatedRoute,
    private $fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.$activateRoute.params.subscribe((data) => {
      this.categoryId = data["id"];
      this.formInitializer(this.categoryId);
    });
  }

  routeTo(path: string): void {
    this.$router.navigate(["admin", path.toLowerCase()]);
  }

  formInitializer(categoryID: string): void {
    if (categoryID.toLowerCase() === "new") {
      this.pageInfo.title = "add new category";
      this.pageInfo.subtitle = "Here you can add a new category of products...";

      this.categoryForm = this.$fb.group({
        name: ["", [Validators.required]],
        type: ["", [Validators.required]],
        description: [""],
      });
    } else {
      this.pageInfo.title = "update category";
      this.pageInfo.subtitle = "Here you can update a category of products...";

      this.categoryForm = this.$fb.group({
        name: [this.category.name, [Validators.required]],
        type: [this.category.type, [Validators.required]],
        description: [this.category.description],
      });
    }
  }

  onSubmit(): void {
    console.log(this.categoryForm);
  }
}
