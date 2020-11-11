import * as bcrypt from 'bcryptjs';
import { User } from '../odm';

export class Users {
    private data: any;

    constructor(data: any) {
      this.data = data;
    }

    async getUserByLogin(email: string) {
      try {
        const user = await User.findOne({ email });
        return user;
      } catch (e) {
        return { message: e.message };
      }
    }

    async getUserById() {
      try {
        const user = await User.findById(this.data);
        return user;
      } catch (e) {
        return { status: 404, message: e.message };
      }
    }

    async getAllUsers() {
      try {
        const user = await User.find();
        return user;
      } catch (e) {
        return { status: 404, message: e.message };
      }
    }

    async removeUser() {
      try {
        const user = await this.getUserById();
        if (user) {
          // @ts-ignore
          await user.remove();
          return user;
        }
        return { status: 404 };
      } catch (e) {
        return { status: 404, message: e.message };
      }
    }

    async login() {
      const { email, password } = this.data;
      try {
        const data = await this.getUserByLogin(email);
        if (!data) {
          return {
            message: 'invalid credentials',
            status: 400,
          };
        }
        // @ts-ignore
        const passwordCheck = bcrypt.compareSync(password, data.password);
        if (!passwordCheck) {
          return {
            message: 'invalid credentials',
            status: 401,
          };
        }
        return {
          email,
          // @ts-ignore
          _id: data._id,
          // @ts-ignore
          name: data.name,
          // @ts-ignore
          isAdmin: data.isAdmin,
        };
      } catch (e) {
        return {
          message: 'invalid credentials',
          status: 401,
        };
      }
    }

    async updateUser() {
      const { data } = this;
      try {
        const checkUser = await User.findById(data._id);
        if (!checkUser) {
          return { status: 401, message: 'invalid credentials' };
        }
        // @ts-ignore
        checkUser.name = data.name || checkUser.name;
        // @ts-ignore
        checkUser.email = data.email || checkUser.email;
        if (data.password) {
          // @ts-ignore
          checkUser.password = await bcrypt.hash(data.password, 11);
        }
        const updateUser = await checkUser.save();
        return {
          // @ts-ignore
          email: updateUser.email,
          // @ts-ignore
          name: updateUser.name,
          _id: updateUser._id,
          // @ts-ignore
          isAdmin: updateUser.isAdmin,
        };
      } catch (e) {
        return { message: e.message };
      }
    }

    async createNewUser() {
      const { data } = this;
      try {
        const checkUser = await this.getUserByLogin(data.email);
        if (checkUser) {
          return { status: 401, message: 'Email exist' };
        }
        const user = await this._transformCreateUser(data);
        await User.create(user);
        const newUser = await this.getUserByLogin(user.email);
        return {
          // @ts-ignore
          email: newUser.email,
          // @ts-ignore
          name: newUser.name,
          // @ts-ignore
          _id: newUser._id,
          // @ts-ignore
          isAdmin: newUser.isAdmin,
        };
      } catch (e) {
        return { message: e.message };
      }
    }

    async _transformCreateUser(data: any) {
      const { name, email, password } = data;
      const hashedPassword = await bcrypt.hash(password, 11);
      const user = {
        name,
        email,
        password: hashedPassword,
      };

      return user;
    }
}
