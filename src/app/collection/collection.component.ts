import { Component } from '@angular/core';
import { Collection } from 'src/model/collection.model';
import { CollectionService } from 'src/service/collection.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent {
  highlightedCollection: Array<Collection>= [];
  normalCollection: Array<Collection>= [];
  constructor(private collectionService: CollectionService) {
    this.collectionService.getCollections().subscribe(
      (data: Array<Collection>) => {
        // lấy 5 collection đầu tiên làm highlighted
        this.highlightedCollection = data.slice(0,5)
        this.normalCollection = data.slice(5,data.length)
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
