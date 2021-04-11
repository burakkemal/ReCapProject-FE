import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  filterText = '';  
  isAuth: boolean;
  id: number;
  user: User[];
  firstName: string;
  lastName: string;

  constructor(  private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private storageService:LocalStorageService ) { }

  ngOnInit(): void {
    this.isAuth = this.authService.isAuthenticated();
  }

  getFullName(): string {
    return this.authService.getCurrentFullName();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
    this.isAuth = this.authService.isAuthenticated();
  }
  roleIfExist(claim: string) {
    return this.authService.tokenDetail?.claims?.indexOf(claim) > -1;
  }

}
