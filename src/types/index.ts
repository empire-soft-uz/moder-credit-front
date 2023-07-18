export * from "./client";
export * from "./credit";
export * from "./expense";
export * from "./payment";
export * from "./product";
export * from "./user";


export type Token = {
  access_token: string;
  refresh_token: string;
};

export type BaseData = {
  id: number;
  createdAt: string;
  updatedAt: string;
};

export type MultiLanguageName = {
  en: string;
  ru: string;
  uz: string;
};

export type BaseUser = BaseData & {
  name: string;
  phoneNumber: string;
  role: ROLES;
};

export enum LANGUAGES {
  EN = "en",
  RU = "ru",
  UZ = "uz",
}

export enum ROLES {
  SUPERADMIN = "SUPERADMIN",
  ADMIN = "ADMIN",
  TRAINER = "TRAINER",
  USER = "USER",
}



export type NotificationMessage = {
  type: "success" | "error";
  message: string;
};