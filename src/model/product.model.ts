// class Product - use for product list
export class Product {
  public _id: any = '';
  public product_id: string = '';
  public name: string = '';
  public excerpt: string = '';
  public price: number = 1;
  public original_price: number = 1;
  public rating: number = 0.0;
  public image: any = '';
  public category: string = '';
  public in_stock: boolean = true;
  public sale_percent: number = 0;

  constructor(data: any = {}) {
    this.loadFromJSON(data);
  }

  salePercent(): number {
    return Math.floor((this.original_price - this.price) / this.original_price * 100);
  }

  floorRating(): number {
    return Math.floor(this.rating);
  }

  loadFromJSON(json: any): void {
    this._id = json._id || this._id;
    this.product_id = json.product_id || this.product_id;
    this.name = json.name || this.name;
    this.excerpt = json.excerpt || this.excerpt;
    this.price = json.price || this.price;
    this.original_price = json.original_price || this.original_price;
    this.rating = json.rating || this.rating;
    this.image = json.image || this.image;
    this.category = json.category || this.category;
    this.in_stock = json.in_stock || this.in_stock;
    this.sale_percent = this.salePercent();
  }
}

// class Product - use for product detail inheritance from class Product
export class ProductDetails extends Product {
  public description: string = '';
  public on_sale: boolean = false;
  public min_qty: number = 0;
  public max_qty: number = 0;
  public variants: any[] = [
    {
      "name": "S",
      "in_stock": true,
      "available_quantity": 0
    },
    {
      "name": "M",
      "in_stock": true,
      "available_quantity": 0
    },
    {
      "name": "L",
      "in_stock": true,
      "available_quantity": 0
    },
    {
      "name": "XL",
      "in_stock": true,
      "available_quantity": 0
    },
    {
      "name": "XXL",
      "in_stock": true,
      "available_quantity": 0
    }
  ];
  // override image (string) from class Product to image (string[]) from class ProductDetails
  public override image: string[] = [];

  constructor(data: any = {}) {
    super(data);
    this.loadFromJSON(data);
  }

  override loadFromJSON(json: any): void {
    super.loadFromJSON(json);
    this.description = json.description || this.description;
    this.on_sale = json.on_sale || this.on_sale;
    this.min_qty = json.min_qty || this.min_qty;
    this.max_qty = json.max_qty || this.max_qty;
    this.variants = json.variants || this.variants;
    this.image = json.image || this.image;
  }
}

// export class ProductDetails {
//   public _id: any = null;
//   public product_id: string = '';
//   public name: string = '';
//   public excerpt: string = '';
//   public description: string = '';
//   public price: number = 0;
//   public original_price: number = 0;
//   public on_sale: boolean = false;
//   public rating: number = 0.0;
//   public in_stock: boolean = true;
//   public min_qty: number = 0;
//   public max_qty: number = 0;
//   public image: string[] = [];
//   public category: string = '';
//   public variants: any[] = [
//     {
//       "name": "S",
//       "in_stock": true,
//       "available_quantity": 0
//     },
//     {
//       "name": "M",
//       "in_stock": true,
//       "available_quantity": 0
//     },
//     {
//       "name": "L",
//       "in_stock": true,
//       "available_quantity": 0
//     },
//     {
//       "name": "XL",
//       "in_stock": true,
//       "available_quantity": 0
//     },
//     {
//       "name": "XXL",
//       "in_stock": true,
//       "available_quantity": 0
//     }
//   ];

//   constructor( data: any = {} ) {
//     this.loadFromJSON(data);
//   }

//   loadFromJSON(json: any): void {
//     this._id = json._id || this._id;
//     this.product_id = json.product_id || this.product_id;
//     this.name = json.name || this.name;
//     this.excerpt = json.excerpt || this.excerpt;
//     this.description = json.description || this.description;
//     this.price = json.price || this.price;
//     this.original_price = json.original_price || this.original_price;
//     this.on_sale = json.on_sale || this.on_sale;
//     this.rating = json.rating || this.rating;
//     this.in_stock = json.in_stock || this.in_stock;
//     this.min_qty = json.min_qty || this.min_qty;
//     this.max_qty = json.max_qty || this.max_qty;
//     this.image = json.image || this.image;
//     this.category = json.category || this.category;
//     this.variants = json.variants || this.variants;
//   }
// }
