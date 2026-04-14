export interface ICoffeeGrower {
  id: string;
  name: string;
  img: string;
}

export interface ICategory {
  id: string;
  name: "CAFÉ" | "SAGÚ" | "OTROS PRODUCTOS";
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

export interface IBlogFlormorado {
  blogFlormorado: IBlog;
}

export interface IBlog {
  title: string;
  description: string;
  language: string;
  entries: IBlogEntry[];
}

export interface IBlogEntry {
  id: string;
  slug: string;
  status: "draft" | "published";

  title: string;
  excerpt?: string;

  content: IBlogContent;

  featuredImage?: IBlogImage;

  author?: IBlogAuthor;

  categories?: string[];
  tags?: string[];

  readingTimeMinutes?: number;

  publishedAt: string; // ISO 8601
  updatedAt?: string; // ISO 8601

  seo?: IBlogSEO;
}

export interface IBlogContent {
  type: "html";
  body: string;
}

export interface IBlogImage {
  url: string;
  alt: string;
  caption?: string;
}
``;

export interface IBlogAuthor {
  name: string;
  role?: string;
  avatarUrl?: string;
}

export interface IBlogSEO {
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: string;
}
