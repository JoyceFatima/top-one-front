import { Role } from "@/enums";
import { IUser } from "@/interfaces";

export const seller: IUser = {
  id: '1',
  username: 'John Doe',
  email: 'seller@example.com',
  password: 'password',
  role: Role.SELLER,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const admin: IUser = {
  id: '1',
  username: 'John Doe',
  email: 'admin@example.com',
  password: 'password',
  role: Role.ADMIN,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const defineUser = (email: string): IUser | undefined => {
  switch (email) {
    case seller.email: {
        localStorage.setItem("token", email)
      return seller;
    }
    case admin.email: {
        localStorage.setItem("token", email)
      return admin;
    }
    default: {
      return;
    }
  }
}