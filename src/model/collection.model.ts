export class Collection
{
  public _id:any = "";
  public name:string = "";
  public image:string = "";
  public createdDate:Date = new Date();
  public lookbook:lookbook[] = [];

  loadFromJSON(json:any):void
  {
    this._id = json._id || this._id;
    this.name = json.name || this.name;
    this.image = json.image || this.image;
    this.createdDate = json.createdDate || this.createdDate;
    this.lookbook = json.lookbook || this.lookbook;
  }

  lookbookCount()
  {
    return this.lookbook.length;
  }

  get lookbookNumber()
  {
    return this.lookbookCount();
  }
}

export class lookbook{
  public image:string = "";
  public products:string[] = [""]; // product_id
}
