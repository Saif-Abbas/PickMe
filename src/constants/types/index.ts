import i18n from "i18n-js";
import { ITheme } from "./theme";
import { Auth } from "firebase/auth";

export * from "./components";
export * from "./theme";

export interface IUser {
  data: {
    id: string;
    phone: string;
    name: string;
    avatar: string;
    nationalId: string;
    dob: string;
    type: string;
    gender: string;
  };
  auth: Auth;
}

export interface IDriver {
  data: {
    id: string;
    phone: string;
    name: string;
    avatar: string;
    nationalId: string;
    dob: string;
    car: string;
    license: string;
    carLicense: string;
    carPlate: string;
    type: string;
    gender: string;
  };
  auth: Auth;
}

export interface ICard {
  cardId: string;
  cardName: string;
  cardPicture: string;
  type: string;
}
export interface ICategory {
  id?: number;
  name?: string;
}

export interface ILocation {
  id?: number;
  city?: string;
  country?: string;
}
export interface IUseData {
  isDark: boolean;
  handleIsDark: (isDark?: boolean) => void;
  theme: ITheme;
  setTheme: (theme?: ITheme) => void;
  user: IUser;
  users: IUser[];
  handleUser: (data?: IUser) => void;
  handleUsers: (data?: IUser[]) => void;
  notifications: INotification[];
  handleNotifications: (data?: INotification[]) => void;
}

export interface ITranslate {
  locale: string;
  setLocale: (locale?: string) => void;
  t: (scope?: i18n.Scope, options?: i18n.TranslateOptions) => string;
  translate: (scope?: i18n.Scope, options?: i18n.TranslateOptions) => string;
}

export interface INotification {
  id?: number;
  subject?: string;
  message?: string;
  read?: boolean;
  createdAt?: number | Date;
  type: "approve" | "reject" | "chat" | "notification";
}
