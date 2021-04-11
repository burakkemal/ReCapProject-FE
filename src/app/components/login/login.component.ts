import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators,FormBuilder } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform:FormGroup;

  constructor(private formBuilder:FormBuilder,private authService:AuthService,private toastrService:ToastrService,private storageService:LocalStorageService) { }

  ngOnInit(): void {
    this.createLoginForm()
  }

  createLoginForm(){
    this.loginform=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }
  login() {
    if (this.loginform.valid) {
      console.log(this.loginform.value);
      let loginModel = Object.assign({}, this.loginform.value);
      this.authService.login(loginModel).subscribe(
        (response) => {
          console.log(response);
          this.toastrService.info(response.message, 'Bilgi');
          this.storageService.set('token', response.data.token);     
        },
        (responseError) => {
          console.log(responseError);
          this.toastrService.error(responseError.error, 'Doğrulama Hatası');
        }
      );
    } else {
      this.toastrService.error('Bilgilerinizi eksiksiz giriniz.', 'Hata');
    }
  }

}
