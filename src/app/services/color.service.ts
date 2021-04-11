import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  apiUrl = 'https://localhost:44390/api/';
  constructor(private httpClient: HttpClient) { }


  getColors(): Observable<ListResponseModel<Color>> {
    let newUrl = this.apiUrl + 'colors/getall';
    return this.httpClient.get<ListResponseModel<Color>>(newUrl);
  }

  getByColorId(colorId: number): Observable<SingleResponseModel<Color>> {
    let newPath = this.apiUrl + 'colors/getbyid?id=' + colorId;
    return this.httpClient.get<SingleResponseModel<Color>>(newPath);
  }
  
  addColor(color: Color): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(
      this.apiUrl + 'colors/add',
      color
    );
  }

  update(color: Color): Observable<ListResponseModel<Color>> {
    let newPath = this.apiUrl + 'colors/update';
    return this.httpClient.post<ListResponseModel<Color>>(newPath, color);
  }

  delete(color: Color): Observable<ListResponseModel<Color>> {
    let newPath = this.apiUrl + 'colors/delete';
    return this.httpClient.post<ListResponseModel<Color>>(newPath, color);
  }
}