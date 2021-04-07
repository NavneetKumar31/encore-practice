import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private $router: Router) {}

  routeTo(
    parent: string = null,
    parameter: any = null,
    child: string = null
  ): void {
    if (child === null && parameter === null) {
      this.$router.navigate([parent.toLowerCase()]);
    }

    if (child === null && parameter !== null) {
      this.$router.navigate([parent.toLowerCase(), parameter]);
    }

    if (child !== null && parameter === null) {
      this.$router.navigate([parent.toLowerCase(), child.toLowerCase()]);
    }

    if (child !== null && parameter !== null) {
      this.$router.navigate([
        parent.toLowerCase(),
        child.toLowerCase(),
        parameter,
      ]);
    }
  }
}
