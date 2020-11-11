import { Users as UsersModel } from '../models';

export class Users {
    private models: any;

    constructor(data?: any) {
      this.models = {
        user: new UsersModel(data),
      };
    }

    async getUserById() {
      const data = await this.models.user.getUserById();
      return data;
    }

    async getLogin() {
      const data = await this.models.user.login();
      return data;
    }

    async removeUser() {
      const data = await this.models.user.removeUser();
      return data;
    }

    async getAllUsers() {
      const data = await this.models.user.getAllUsers();
      return data;
    }

    async createNewUser() {
      const data = await this.models.user.createNewUser();
      return data;
    }

    async updateUser() {
      const data = await this.models.user.updateUser();
      return data;
    }
}
