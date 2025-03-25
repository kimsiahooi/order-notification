export interface LineItem {
  readonly id: number;
  name: string;
  product_id: number;
  variation_id: number;
  quantity: number;
  tax_class: string;
  subtotal: string;
  readonly subtotal_tax: string;
  total: string;
  readonly total_tax: string;
  readonly taxes:
    | {
        readonly id: number;
        total: string;
        subtotal: string;
      }[];
  readonly sku: string;
  readonly price: number;
  image: {
    readonly id: number;
    src: string;
  };
  parent_name: string;
}

export interface Order {
  readonly id: number;
  readonly date_created: Date;
  billing: {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    email: string;
    phone: string;
  };
  line_items: LineItem[];
}
