import { Timestamp } from 'firebase/firestore';

export interface PackageActivity {
  price?: number;
  items?: number;
  people?: number;
  title?: string;
  url?: string;
  id?: string;
  titleRussian?: string;
  duration?: number;
}

export interface PackageModel {
  grandTotal?: number;
  title?: string;
  uid?: string;
  id?: string;  
  titleRussian?: string;
  subTitle?: string;
  subTitleRussian?: string;
  description?: string;
  descriptionRussian?: string;
  createdAt?: Timestamp;
  location?: string;
  dateTime?: number;
  photographs?: string;
  packageActivity?: PackageActivity[];
} 