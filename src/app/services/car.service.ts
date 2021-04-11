import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  currentCar: Car;
  apiUrl = "https://localhost:44390/api/"
  constructor(private HttpClient :HttpClient) { }

  getCars() :Observable<ListResponseModel<Car>>{
    let newPath =this.apiUrl+"cars/getcardetails"
    return this.HttpClient.get<ListResponseModel<Car>>(newPath);
    
  }
  getCarsByBrand(brandId:number) :Observable<ListResponseModel<Car>>{
    let newPath =this.apiUrl+"cars/getbybrand?brandId="+brandId
    return this.HttpClient.get<ListResponseModel<Car>>(newPath);
    
  }
  getCarsByColor(colorId:number) :Observable<ListResponseModel<Car>>{
    let newPath =this.apiUrl+"cars/getbycolor?colorId="+colorId
    return this.HttpClient.get<ListResponseModel<Car>>(newPath);
    
  }
  getCarDetailsById(carId:number) :Observable<ListResponseModel<Car>>{
    let newPath =this.apiUrl+"cars/getcardetailbycarid?carId="+carId
    return this.HttpClient.get<ListResponseModel<Car>>(newPath);
    
  }
  getCarFiltered(brandId:number,colorId:number) :Observable<ListResponseModel<Car>>{
    let newPath =this.apiUrl+"cars/getbybrandandcolor?brandId="+brandId+"&colorId="+colorId
    return this.HttpClient.get<ListResponseModel<Car>>(newPath);
    
  }
  getCarsById(id:number) :Observable<SingleResponseModel<Car>>{
    let newPath =this.apiUrl+"cars/getbyid?id="+id
    return this.HttpClient.get<SingleResponseModel<Car>>(newPath);
    
  }
  add(car:Car):Observable<ResponseModel>{
    return this.HttpClient.post<ResponseModel>(this.apiUrl+"cars/add",car)
  }
  update(car:Car):Observable<ResponseModel>{
    return this.HttpClient.post<ResponseModel>(this.apiUrl+"cars/update",car)
  }
  getCurrentCar() {
    return this.currentCar;
  }
}