import { Product } from '../odm';

export class Products {
    private data: any;

    constructor(data: any) {
      this.data = data;
    }

    async getAllProducts() {
      try {
        const product = await Product.find({});
        return product;
      } catch (e) {
        return { status: 404, message: e.message };
      }
    }

    async getOneProduct() {
      try {
        const product = await Product.findById(this.data);
        return product;
      } catch (e) {
        return { status: 404, message: e.message };
      }
    }

    async removeProduct() {
      try {
        const product = await this.getOneProduct();
        if (product) {
          // @ts-ignore
          await product.remove();
          return { status: 200 };
        }
        return { status: 404 };
      } catch (e) {
        return { status: 404, message: e.message };
      }
    }

    async createProduct() {
      const { data } = this;
      try {
        const product = await Product;
        if (product) {
          await product.create(data);
          const newProduct = await Product.findOne({ name: data.name });
          return { status: 200, newProduct };
        }
        return { status: 404 };
      } catch (e) {
        return { message: e.message };
      }
    }

    async updateProduct() {
      const { data } = this;
      try {
        const product = await Product.findById(data.id);
        if (!product) {
          return { status: 401, message: 'invalid credentials' };
        }
        // @ts-ignore
        product.name = data.name || product.name;
        // @ts-ignore
        product.image = data.image || product.image;
        // @ts-ignore
        product.description = data.description || product.image;
        // @ts-ignore
        product.brand = data.brand || product.brand;
        // @ts-ignore
        product.category = data.category || product.category;
        // @ts-ignore
        product.price = data.price || product.price;
        // @ts-ignore
        product.countInStock = data.countInStock || product.countInStock;
        const updateProduct = await product.save();
        return { status: 200, updateProduct };
      } catch (e) {
        return { status: 400, message: e.message };
      }
    }
}
