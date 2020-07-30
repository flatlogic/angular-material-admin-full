export interface Order {
  id: string,
  date: string,
  img: string,
  client: {
    name: string,
    company: string,
    email: string,
    phone: string,
    fax: string,
    note: string,
  },
  company: {
    name: string,
    status: string,
    address: string,
    email: string,
    phone: string,
    fax: string,
    location: string,
  },
  items: Item[],
  note: string,
  subtotal: string,
  tax: string,
  total: string,
  consultantName: string
}

export interface Item {
  id: string,
  name: string,
  description: string,
  quantity: string,
  price: string,
  total: string
}
