import { ISubCategory } from "./ISubCategory";

export interface ICategory {
  _id?: string;
  name?: string;
  type?: string;
  description?: string;
  addedOn?: string;
  modifiedOn?: string;
  addedBy?: string;
  subCategories?: ISubCategory[];
}
