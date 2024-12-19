export interface Order {
  uuid: string;
  client_id: string;
  products: Array<{ id: string; quantity: number }>;
  total: string;
  created_at: string;
  updated_at: string;
}
