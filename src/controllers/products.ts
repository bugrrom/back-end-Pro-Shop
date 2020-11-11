import { Products as ProductsModel } from '../models';

export class Products {
    private models: any;

    constructor(data?: any) {
      this.models = {
        products: new ProductsModel(data),
      };
    }

    async getAllProducts() {
      const data = await this.models.products.getAllProducts();
      return data;
    }

    async getProductsById() {
      const data = await this.models.products.getOneProduct();
      return data;
    }

    async removeProduct() {
      const data = await this.models.products.removeProduct();
      return data;
    }

    async updateProduct() {
      const data = await this.models.products.updateProduct();
      return data;
    }

    async createProduct() {
      const data = await this.models.products.createProduct();
      return data;
    }
}
