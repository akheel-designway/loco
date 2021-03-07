import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from './../models/product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Output() valueChange = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  // async addToCart(product: Product) {

  // }

  valueChanged(){
    this.valueChange.emit(this.product);
  }
}
