import { Role } from "@/enums";

export interface IRole {
  id: string
  name: Role
  isActive: boolean;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}