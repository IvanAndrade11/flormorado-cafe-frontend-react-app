export interface ICoffeeGrower {
  id: string;
  name: string;
  img: string;
}

export interface ICategory {
  id: string;
  name: string;
  imageUrl: string;
}

export interface ICoffeeProduct {
  id: string;
  stock: boolean;
  brand: string;
  name: string;
  imageUrl: string;
  shortDescription: string;
  grinding: string;
  roastOptions: string;
  variety: string;
  availableWeights: string;
  price: string;
  shippingPrice: number;
  process: {
    benefit: string;
    drying: string;
    controlledFermentation: string;
  };
  productDescription: string;
  tags: string[];
  category: string;
  type: string;
  origin: string;

  createdAt?: string | number | Date;
}
