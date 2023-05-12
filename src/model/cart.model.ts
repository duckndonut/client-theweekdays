export class ProductInCart {
  public _id: string = '';
  public variants: string = '';
  public quantity: number = 0;

  constructor(data: any = {}) {
    this.loadFromJSON(data);
  }

  loadFromJSON(json: any): void {
    this._id = json._id || this._id;
    this.variants = json.variants || this.variants;
    this.quantity = json.quantity || this.quantity;
  }
}

export class Cart {
  public _id: any;
  public products: ProductInCart[] = [];

  constructor(data: any = {}) {
    this.loadFromJSON(data);
  }

  loadFromJSON(json: any): void {
    this._id = json._id || this._id;
    this.products = json.products || this.products;
  }

  addProductFromJSONArray(json: any[]): void {
    json.forEach(product => {
      this.addProductFromJSON(product);
    });
  }

  addProductFromProductInCart(product: ProductInCart): void {
    // if product already in cart, increase quantity
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i]._id == product._id && this.products[i].variants == product.variants) {
        this.products[i].quantity += product.quantity;
        return;
      }
    }
    // if product not in cart, add new product
    this.products.push(product);
  }

  addProductFromJSON(product: any = {}): void {
    let productInCart = new ProductInCart(product);
    this.addProductFromProductInCart(productInCart);
  }

  addProduct(product_id: string, variants: string, quantity: number): void {
    let product = {
      "_id": product_id,
      "variants": variants,
      "quantity": quantity
    }
    this.addProductFromJSON(product);
  }

  decreaseProductQuantity(product_id: string, variants: string): void {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i]._id == product_id && this.products[i].variants == variants) {
        this.products[i].quantity--;
        if (this.products[i].quantity == 0) {
          this.products.splice(i, 1);
        }
        return;
      }
    }
  }

  increaseProductQuantity(product_id: string, variants: string): void {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i]._id == product_id, this.products[i].variants == variants) {
        this.products[i].quantity++;
        return;
      }
    }
  }

  removeProduct(product_id: string, variants: string): void {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i]._id == product_id && this.products[i].variants == variants) {
        this.products.splice(i, 1);
        return;
      }
    }
  }
}
