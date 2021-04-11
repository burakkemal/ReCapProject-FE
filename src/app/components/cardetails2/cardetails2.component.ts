import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';
import { CarDto } from '../../models/carDto';
import { Image } from '../../models/image';
import { CarService } from '../../services/car.service';
import { ImageService } from '../../services/image.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Rental } from 'src/app/models/rental';
import { FindexService } from 'src/app/services/findex.service';

@Component({
  selector: 'app-cardetails2',
  templateUrl: './cardetails2.component.html',
  styleUrls: ['./cardetails2.component.css'],
})
export class Cardetails2Component implements OnInit {
  rentalAddForm: FormGroup;
  rental: Rental[] = [];
  car: Car;
  brand: Brand;
  color: Color;
  customers: Customer[] = [];
  customerId: number;
  DateTimeNow: Date = new Date();

  rentDate: Date;
  returnDate: Date;
  totalPrice: number;

  carId: number;

  cars: Car[] = [];
  images: Image[] = [];
  ImagePaths: string[] = [];
  imageUrl = 'https://localhost:44390/uploads/';
  currentCar: CarDto;
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private ImageService: ImageService,
    private toastrService: ToastrService,
    private rentalService: RentalService,
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private findexService: FindexService
  ) {}

  ngOnInit(): void {
    this.rentDate = new Date();
    this.returnDate = new Date();
    this.getCustomerDetails();
    this.createRentalAddForm();

    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarsById(params['carId']);
        this.getImages();
        this.carId = params['carId'];
      }
    });
  }

  getCustomerDetails() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
      console.log(this.customers);
    });
  }

  createRentalAddForm() {
    this.rentalAddForm = this.formBuilder.group({
      customerId: ['', Validators.required],
      rentDate: ['', Validators.required],
      carId: [''],
      returnDate: [''],
    });
  }

  getCarsById(carId: number) {
    this.carService.getCarDetailsById(carId).subscribe((response) => {
      this.cars = response.data;
      this.car = response.data[0];
    });
  }

  getImages() {
    this.ImageService.getAll().subscribe((response) => {
      this.images = response.data;
    });
  }
  add() {
    if (this.rentalAddForm.valid) {
      let rentalModel = Object.assign({}, this.rentalAddForm.value);
      rentalModel.customerId = Number(
        this.rentalAddForm.controls['customerId'].value
      );
      rentalModel.carId = Number(this.carId);

      let customerPoint = this.findexService.getPointByCustomerId(
        rentalModel.customerId
      );
      let carPoint = this.findexService.getPointByCarId(rentalModel.carId);
      if (customerPoint >= carPoint) {
        this.rentalService.add(rentalModel).subscribe(
          (response) => {
            this.toastrService.success(response.message, 'Başarılı');
            console.log("müşteri puanı "+customerPoint+" araç puanı "+carPoint)
          },
          (responseError) => {
            this.toastrService.error(responseError.error, 'Doğrulama hatası');
            console.log(responseError);
          }
        );
      } else {
        this.toastrService.error('Findex puanınız yetersiz', 'Hata');
      }
    } else {
      this.toastrService.error('Formunuz eksik', 'Dikkat');
    }
  }

  calcTotalPrice() {
    let startDate = new Date(this.rentalAddForm.value.rentDate);
    let endDate = new Date(this.rentalAddForm.value.returnDate);
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      this.totalPrice = 0;
    } else if (startDate > endDate) {
      this.totalPrice = 0;
    } else {
      let dateDiff = Math.floor(
        (endDate.getTime() - startDate.getTime()) / 1000 / 60 / 60 / 24
      );
      this.totalPrice = dateDiff * this.car.dailyPrice;
    }
  }
}
