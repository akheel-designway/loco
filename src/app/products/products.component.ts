import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products = null;
  itemCount: number = 0;
  amount = 0;
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts()
    .then(result => {
      this.products = result.body;
    })
    .catch(error => {
      console.log(error);
      if (error) {
        if (error.status == 400) {
        } else {
        }
      }
    });
  }

  displayCounter(product) {
    this.amount += product.price; 
    this.itemCount += 1;
  }

}
