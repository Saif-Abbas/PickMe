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
    avatar?: string;
    nationalId: string;
    dob: string;
    type: string;
    gender: string;
    car?: string;
    license?: string;
    carLicense?: string;
    carPlate?: string;
    rating: number;
  };
  auth: Auth;
}

export interface IHistory {
  name: string;
  avatar: string;
  car: string;
  carPlate: string;
  rating: string;
  price: number;
  date: string;
  trip: ITrip;
}

export interface ITrip {
  date: Date;
  user: IUser;
  status: "pending" | "approved" | "rejected" | "completed";
  availability: "available" | "unavailable";
  from: {
    latitude: number;
    longitude: number;
  };
  to: {
    latitude: number;
    longitude: number;
  };
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
  selectedLocation: any;
  setSelectedLocation: (data?: any) => void;
  locationSelected: boolean;
  mapRegion: any;
  setMapRegion: (data?: any) => void;
  setLocationSelected: (data?: boolean) => void;
  handleSelectedLocation: (lat: any, lng: any) => void;
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
