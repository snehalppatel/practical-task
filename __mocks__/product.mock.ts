import { IProduct } from "@/types";

export const product: IProduct = {
  id: 1,
  title: "Product 1",
  description: "Description 1",
  category: "Category 1",
  price: 100,
  discountPercentage: 10,
  rating: 4.5,
  stock: 10,
  tags: ["tag1", "tag2"],
  availabilityStatus: "In stock",
  brand: "Brand 1",
  dimensions: { depth: 10, height: 20, width: 30 },
  images: ["image1", "image2"],
  meta: {
    barcode: "barcode1",
    createdAt: "2022-01-01",
    qrCode: "qrCode1",
    updatedAt: "2022-01-01",
  },
  minimumOrderQuantity: 1,
  returnPolicy: "Return policy 1",
  reviews: [
    {
      date: "2022-01-01",
      rating: 5,
      reviewerEmail: "test@gmail.com",
      reviewerName: "Test User",
      comment: "Comment 1",
    },
  ],
  shippingInformation: "",
  sku: "sku1",
  thumbnail: "thumbnail1",
  warrantyInformation: "",
  weight: 1,
};
