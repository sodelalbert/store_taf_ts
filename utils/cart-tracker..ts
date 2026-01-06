import { ProductData } from "../models/product-data";
import { ProductItem } from "../pages/product-item";

// Utility class to track products added to cart during tests
// Class is using ProductData objects as data structure to store product info

export class CartTracker {
  private products: ProductData[];

  constructor() {
    this.products = [];
  }

  public addProductToTracking(product: ProductData): void {
    const existingProduct = this.products.find(
      (p) => p.productId === product.productId
    );

    if (existingProduct) {
      // If product item already in cart (based on product ID) - update quantity ++
      existingProduct.quantity = (existingProduct.quantity || 0) + 1;
    } else {
      // If product item not in cart - add new entry and quantity = 1
      this.products.push({ ...product, quantity: 1 });
    }
  }

  public decreaseProductQuantity(product: ProductData): void {
    const existingProduct = this.products.find(
      (p) => p.productId === product.productId
    );

    if (
      existingProduct &&
      existingProduct.quantity &&
      existingProduct.quantity > 0
    ) {
      existingProduct.quantity -= 1;

      // If quantity = 0 - remove entry from cart tracking
      if (existingProduct.quantity === 0) {
        this.removeProductFromTracking(existingProduct);
      }
    }
  }

  public removeProductFromTracking(product: ProductData): void {
    const index = this.products.findIndex(
      (p) => p.productId === product.productId
    );
    if (index !== -1) {
      this.products.splice(index, 1);
    }
  }

  public async isProductTracked(productId: number): Promise<boolean> {
    return this.products.some((product) => product.productId === productId);
  }

  public async getTrackedProductById(
    productId: number
  ): Promise<ProductData | null> {
    const product = this.products.find(
      (product) => product.productId === productId
    );
    return product || null;
  }

  public getTrackedProductByName(productName: string): ProductData | null {
    const product = this.products.find(
      (product) => product.title === productName
    );
    return product || null;
  }

  public getAllTrackedProducts(): ProductData[] {
    return [...this.products];
  }
}
