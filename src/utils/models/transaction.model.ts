import { Timestamp } from "firebase/firestore";
import { BookingModel } from "./booking.model";

export interface TransactionModel {
  payNow?: boolean;
  totalPrice?: number;
  grandTotal?: number;
  uid?: string;
  createdAt?: Timestamp;
  transacId?: string;
  bookingId?: string;
  status?: string;
  userName?: string;
  phone?: string;
  type?: string;
  email?: string;
  couponDiscount?: number;
  rewardsDiscount?: number;
  rafferedUsersDiscount?: number;
  couponItems?: string[];
  bookingModel?: BookingModel[];
} 