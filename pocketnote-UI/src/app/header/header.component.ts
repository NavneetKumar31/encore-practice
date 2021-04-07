import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared/services/shared.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isUserLoggedIn: boolean;
  user: any;

  constructor(private $user: UserService, private $shared: SharedService) {}

  ngOnInit(): void {
    this.isUserLoggedIn = this.$user.userLoggedIn();

    if (this.isUserLoggedIn) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
    this.$user.isUserLoggedIn.subscribe((data) => {
      if (data) {
        this.isUserLoggedIn = this.$user.userLoggedIn();

        if (this.isUserLoggedIn) {
          this.user = JSON.parse(localStorage.getItem('user'));
        }
      }
    });
  }

  routeTo(path: string): void {
    this.$shared.routeTo(path.toLowerCase());
  }

  logOut(): void {
    this.isUserLoggedIn = false;
    this.$user.isUserLoggedIn.next(false);
    localStorage.clear();
    this.$shared.routeTo('login');
  }
}
