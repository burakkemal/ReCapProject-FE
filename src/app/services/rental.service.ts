import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RentalDtoResponseModel } from '../models/rentalDtoResponseModel';
@Injectable({
  providedIn: 'root'
})
export class RentalService {
  
  apiUrl2="https://localhost:44390/api/rentals/getrentaldetails";
  constructor(private httpClient: HttpClient) { }

  
  getRentalDetails():Observable<RentalDtoResponseModel>{
    return this.httpClient.get<RentalDtoResponseModel>(this.apiUrl2)
  }
}