export class Category {
  constructor(
    public _id: any = null,
    public type : string = "",
    public name: string = "",
    public image: string="",
    public count:number = 0,
    public can_delete: boolean = true,
    public date_added: Date = new Date(),
    public date_modified: Date = new Date(),
  ) { }
}
