import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }
  userDetails;
  accessToken;
  ngOnInit(): void {
    this.userService.getUserProfile().subscribe(
      res => {
        console.log('res-user', res);
        this.userDetails = res;
      },
      err => {
        console.log(err);
      });
    this.accessToken = this.userService.getToken();
  }

  onLogout(){
   this.userService.deleteToken();
   this.router.navigate(['/login']);
  }


}
