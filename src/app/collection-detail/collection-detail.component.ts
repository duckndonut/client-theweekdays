import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CollectionService } from 'src/service/collection.service';
import { FormatService } from 'src/service/format.service';
import { ProductService } from 'src/service/product.service';
import { Collection } from 'src/model/collection.model';

@Component({
  selector: 'app-collection-detail',
  templateUrl: './collection-detail.component.html',
  styleUrls: ['./collection-detail.component.css']
})
export class CollectionDetailComponent {
  id: any;
  collection: any;
  products: any[] = [];
  listProducts: any;
  target: any = "";
  videoURL:any;
  constructor(private _service: CollectionService, private route: ActivatedRoute, private router: Router, private _title: Title, public _format: FormatService, private productService: ProductService, private sanitizer: DomSanitizer) {
    this._title.setTitle("Collection");
    this.id = this.route.snapshot.paramMap.get('id');
    this._service.getCollectionById(this.id).subscribe(
      (data: any) => {
        this.collection = data;
        this.videoURL = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + data.videoId + '?rel=0&playlist='+data.videoId+'&loop=1&version=3&autoplay=1&controls=0&&showinfo=0&disablekb=1&iv_load_policy=3&loop=1&modestbranding=1&mute=1');
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

  getCollectionById(id: string) {
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
