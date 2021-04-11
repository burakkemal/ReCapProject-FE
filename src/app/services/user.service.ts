import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "https://localhost:44390/api/users/"
  constructor(private httpClient:HttpClient) { }

  
  getUsers() :Observable<ListResponseModel<User>>{
    let newPath =this.apiUrl+"/getall"
    return this.httpClient.get<ListResponseModel<User>>(newPath);
    
  }
  getbyid(id:number) :Observable<SingleResponseModel<User>>{
    let newPath =this.apiUrl+"/getbyid?id="+id
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
    
  }
  getByEmail(email:string) : Observable<SingleResponseModel<User>>{

    let newPath =this.apiUrl+"/getbyemail?email="+email
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }
  getUserByName(name:string) : Observable<ListResponseModel<User>>{
    let newPath =this.apiUrl+"/getbyname?name="+name
    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }

  update(user: User): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'update';
    return this.httpClient.post<ResponseModel>(newPath, user);
  }


}
