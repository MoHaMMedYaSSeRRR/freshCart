import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  cartId: any;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _CartService: CartService
  ) {}
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartId = params.get('cartid');
      },
    });
  }

  orderForm: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
  });
  handleOrder() {
    console.log(this.orderForm.value);

    this._CartService.payment(this.cartId, this.orderForm.value).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response.status == 'success') {
          window.open(response.session.url, '_self');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
