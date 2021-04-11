import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  customers: Customer[] = [];
  paymentAddForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private paymentService: PaymentService,
    private toastrService: ToastrService,
    private customerService:CustomerService
  ) {}

  ngOnInit(): void {
   this.getCustomerDetails();
   this.createPaymentAddForm()
   this.add()
  }


  getCustomerDetails() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
    });
  }

  createPaymentAddForm() {
    this.paymentAddForm = this.formBuilder.group({
      name: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expiryDate: ['', Validators.required],
      securityCode: ['', Validators.required],
      saveCard: [''],
    });  
  }
  add(){
    if(this.paymentAddForm.valid){
      let paymentModel =Object.assign({},this.paymentAddForm.value) 
      this.paymentService.add(paymentModel).subscribe(response=>{
        this.toastrService.success(response.message,"Başarılı")
      },responseError=>{
        this.toastrService.error(responseError.error,"Doğrulama hatası")
        console.log(responseError)
      })
    }else{
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
  }
}
