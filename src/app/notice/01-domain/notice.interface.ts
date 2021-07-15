import { Guid } from "guid-typescript";

export interface Inotice {
    id?: Guid,
    code?: string,
    header: string,
    description?: string,
    image?: string,
    category?: string,
    position?: string,
    createdDate?: Date,
    createdBy?: string,
    isActive:boolean
  }
  