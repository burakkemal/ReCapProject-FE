import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginModel } from '../models/loginModel';

import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenDetail, TokenModel } from '../models/tokenModel';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenDetail = new TokenDetail();
  private helper: JwtHelperService = new JwtHelperService();

  
  apiUrl = "https://localhost:44390/api/"

  constructor(private httpClient:HttpClient,private storageService:LocalStorageService) { }

  login(loginModel:LoginModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl+"auth/login",loginModel)
  }
  isAuthenticated(){
    if (localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }
  logout() {
    this.storageService.remove('token');
    this.tokenDetail = new TokenDetail();
  }
  register(registerModel: RegisterModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      this.apiUrl + 'auth/register',
      registerModel
    );
  }
  decodeToken(token: string) {
    let data = this.helper.decodeToken(token);
    this.tokenDetail.email = data.email;
    this.tokenDetail.username =
      data['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    this.tokenDetail.claims =
      data['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  }
  getCurrentFullName(): string {
    let token=localStorage.getItem('token');
    if (token) {
      let decoded = this.helper.decodeToken(token);
      let userName = Object.keys(decoded).filter((x) => x.endsWith('/name'))[0];
      return decoded[userName];
    }
    return "null";
  }

  
}
