import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Brand } from '../models/brand';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  apiUrl = 'https://localhost:44390/api/';
  constructor(private httpClient: HttpClient) {}


  getBrands(): Observable<ListResponseModel<Brand>> {
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl+"brands/getall");
  }

  addBrand(brand: Brand): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'brands/add',
      brand
    );
  }

  update(brand: Brand): Observable<ListResponseModel<Brand>> {
    let newPath = this.apiUrl + 'brands/update';
    return this.httpClient.post<ListResponseModel<Brand>>(newPath, brand);
  }

  delete(brand: Brand): Observable<ListResponseModel<Brand>> {
    let newPath = this.apiUrl + 'brands/delete';
    return this.httpClient.post<ListResponseModel<Brand>>(newPath, brand);
  }

  getById(id: number): Observable<SingleResponseModel<Brand>> {
    let newPath = this.apiUrl + 'brands/getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<Brand>>(newPath);
  }

}
