import { Orders as OrderModel } from '../models';

export class Orders {
    private models: any;

    constructor(data?: any) {
      this.models = {
        order: new OrderModel(data),
      };
    }

    async getOrderById() {
      const data = await this.models.order.getOrderById();
      return data;
    }

    async addNewOrder() {
      const data = await this.models.order.addNewOrder();
      return data;
    }

    async getAllOrder() {
      const data = await this.models.order.getAllOrder();
      return data;
    }

    async getAdminAllOrder() {
      const data = await this.models.order.getAdminAllOrder();
      return data;
    }
}
