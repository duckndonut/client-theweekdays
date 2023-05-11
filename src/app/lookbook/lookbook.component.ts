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
  listProducts: any;
  target: any = "";
  videoURL: any;
  lookbook: any;
  index:any;
  constructor(private _service: CollectionService, private route: ActivatedRoute, private router: Router, private _title: Title, public _format: FormatService, private productService: ProductService, private sanitizer: DomSanitizer) {
    this._title.setTitle("Collection");
    const urlParams = new URLSearchParams(window.location.search);
    this.id = urlParams.get('collection');
    this.index = urlParams.get('index');
    this._service.getCollectionById(this.id).subscribe(
      (data: any) => {
        this.collection = data;
        this.lookbook = data.lookbook[this.index]
      },
      (error) => {
        console.log(error);
      }
    );
    this.productService.getAllProducts().subscribe(
      (data: any) => {
        this.listProducts = data.slice(0, 5);
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
}
