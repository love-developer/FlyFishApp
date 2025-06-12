import { Timestamp } from "firebase/firestore";
import { ActivityModel, Activity } from "./activity.model";


export interface BookingModel {
  noOfItems?: number;
  start?: Timestamp;
  createdAt?: Timestamp;
  end?: Timestamp;
  duration?: number;
  reviewAdded?: boolean;
  people?: number;
  rewardPoints?: number;
  bookingId?: string;
  id?: string;
  uid?: string;
  transacId?: string;
  status?: string;
  price?: number;
  actualPrice?: number;
  activity?: ActivityModel;
}

export class Booking implements BookingModel {
  noOfItems?: number;
  start?: Timestamp;
  createdAt?: Timestamp;
  end?: Timestamp;
  duration?: number;
  reviewAdded?: boolean;
  people?: number;
  rewardPoints?: number;
  bookingId?: string;
  id?: string;
  uid?: string;
  transacId?: string;
  status?: string;
  price?: number;
  actualPrice?: number;
  activity?: ActivityModel;

  constructor(data: BookingModel) {
    Object.assign(this, data);
  }

  overlaps(other: Booking): boolean {
    if (!this.start || !this.end || !other.start || !other.end) return false;
    return this.start.toMillis() < other.end.toMillis() &&
           this.end.toMillis() > other.start.toMillis();
  }

  isDuplicateCartItem(other: Booking): boolean {
    if (
      this.id === other.id &&
      this.start?.isEqual(other.start) &&
      this.end?.isEqual(other.end) &&
      this.activity?.id === other.activity?.id
    ) {
      return true;
    }

    return this.overlaps(other);
  }

  static fromJson(json: any): Booking {
    return new Booking({
      noOfItems: json["noOfItems"],
      start: json["start"],
      createdAt: json["createdAt"],
      end: json["end"],
      duration: json["duration"],
      reviewAdded: json["reviewAdded"] ?? false,
      people: json["people"] ?? 0,
      rewardPoints: json["rewardPoints"] ?? 0,
      bookingId: json["bookingId"],
      id: json["id"],
      uid: json["uid"] ?? "",
      transacId: json["transacId"] ?? "",
      status: json["status"],
      price: json["price"],
      actualPrice: json["actualPrice"],
      activity: json["activity"] ? Activity.fromJson(json["activity"]) : undefined,
    });
  }

  toJson(): any {
    return {
      noOfItems: this.noOfItems,
      start: this.start,
      end: this.end,
      createdAt: this.createdAt,
      duration: this.duration,
      reviewAdded: this.reviewAdded,
      id: this.id,
      bookingId: this.bookingId,
      people: this.people ?? 0,
      rewardPoints: this.rewardPoints ?? 0,
      uid: this.uid ?? "",
      status: this.status,
      price: this.price,
      actualPrice: this.actualPrice,
      transacId: this.transacId,
      activity: this.activity,

    };
  }
}
