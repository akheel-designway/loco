import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { ProductService } from 'src/app/service/product.service';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product = {
    title: null,
    description: null,
    price: null,
    imageUrl: null
  };
  id;
  categories = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService) {

    this.id = this.route.snapshot.paramMap.get('id');
  }

  save(product) {
    this.productService.create(product)
        .then(result => {
          console.log(result);
        })
        .catch(error => {
          console.log(error);
          if (error) {
            if (error.status == 400) {
            } else {
            }
          }
        });
    this.router.navigate(['/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.router.navigate(['/admin/products']);
  }

  ngOnInit() {
  }

}
