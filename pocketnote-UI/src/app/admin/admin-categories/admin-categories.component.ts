import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin-categories",
  templateUrl: "./admin-categories.component.html",
  styleUrls: ["./admin-categories.component.scss"],
})
export class AdminCategoriesComponent implements OnInit {
  categories = [
    {
      name: "cat 1",
      type: "cat 1",
      description: "cat 1",
      createdOn: Date.now(),
      modifiedOn: Date.now(),
      createdBy: "navneet kumar",
    },
    {
      name: "cat 1",
      type: "cat 1",
      description: "cat 1",
      createdOn: Date.now(),
      modifiedOn: Date.now(),
      createdBy: "navneet kumar",
    },
    {
      name: "cat 1",
      type: "cat 1",
      description: "cat 1",
      createdOn: Date.now(),
      modifiedOn: Date.now(),
      createdBy: "navneet kumar",
    },
    {
      name: "cat 1",
      type: "cat 1",
      description: "cat 1",
      createdOn: Date.now(),
      modifiedOn: Date.now(),
      createdBy: "navneet kumar",
    },
    {
      name: "cat 1",
      type: "cat 1",
      description: "cat 1",
      createdOn: Date.now(),
      modifiedOn: Date.now(),
      createdBy: "navneet kumar",
    },
  ];
  constructor(private $router: Router) {}

  ngOnInit(): void {}

  routeTo(path: string, params: any): void {
    this.$router.navigate(["admin", path.toLowerCase(), params]);
  }
}
