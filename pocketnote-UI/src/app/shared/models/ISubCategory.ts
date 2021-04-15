import { ICategory } from "./ICategory";

export interface ISubCategory {
  _id?: string;
  name?: string;
  type?: string;
  description?: string;
  addedOn?: string;
  modifiedOn?: string;
  addedBy?: string;
  category?: ICategory;
}
