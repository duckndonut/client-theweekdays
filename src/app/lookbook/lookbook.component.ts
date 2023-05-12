import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CollectionService } from 'src/service/collection.service';
import { FormatService } from 'src/service/format.service';
import { ProductService } from 'src/service/product.service';
import { Collection } from 'src/model/collection.model';

@Component({
  selector: 'app-lookbook',
  templateUrl: './lookbook.component.html',
  styleUrls: ['./lookbook.component.css']
})
export class LookbookComponent {
  id: any;
  collection: any;
  products: any[] = [];
  listProducts: any[]= [];
  target: any = "";
  videoURL: any;
  lookbook: any;
  index:any;
  shownIndex: number = 0;
  constructor(private _service: CollectionService, private route: ActivatedRoute, private router: Router, private _title: Title, public _format: FormatService, private productService: ProductService, private sanitizer: DomSanitizer) {
    this._title.setTitle("Collection");
    const urlParams = new URLSearchParams(window.location.search);
    this.id = urlParams.get('collection');
    this.index = urlParams.get('index');
    this._service.getCollectionById(this.id).subscribe(
      (data: any) => {
        this.collection = new Collection(data);
        this.lookbook = data.lookbook[this.index]
        this.getProductsByLookbook(this.lookbook);
        this.shownIndex = parseInt(this.index) + 1;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCollectionById() {
    this._service.getCollectionById(this.id).subscribe(
      (data: any) => {
        this.collection = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getProductsByLookbook(lookbook: any) {
    for (let i = 0; i < lookbook.products.length; i++) {
      this.productService.getProductById(lookbook.products[i]).subscribe(
        (data: any) => {
          this.listProducts.push(data);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  nextLookbook() {
    if (this.index < this.collection.lookbook.length - 1) {
      this.index++;
      this.lookbook = this.collection.lookbook[this.index];
      this.listProducts = [];
      this.getProductsByLookbook(this.lookbook);
      this.shownIndex = this.index + 1;
    }
  }

  previousLookbook() {
    if (this.index > 0) {
      this.index--;
      this.lookbook = this.collection.lookbook[this.index];
      this.listProducts = [];
      this.getProductsByLookbook(this.lookbook);
      this.shownIndex = this.index + 1;
    }
  }
}
