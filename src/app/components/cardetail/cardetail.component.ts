import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Image } from 'src/app/models/image';
import { ImageService } from 'src/app/services/image.service';
import { Car } from '../../models/car';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-cardetail',
  templateUrl: './cardetail.component.html',
  styleUrls: ['./cardetail.component.css']
})
export class CardetailComponent implements OnInit {

  cars:Car[]=[];
  images : Image[]=[];
  ImagePaths: string[] = [];
  imageUrl = "https://localhost:44390/uploads/";
  defaultImage="default.jpg";
  
  constructor(private carService : CarService) { }

  ngOnInit(): void {
    this.getCars()
}
getCars(){

  this.carService.getCars().subscribe(response =>{
    this.cars = response.data
    console.log( response.data)
  })
  
}


}
