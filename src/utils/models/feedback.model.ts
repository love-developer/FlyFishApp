import { Timestamp } from 'firebase/firestore';

export class BookingsFeedback {
  uid?: string;
  message?: string;
  rating?: number;
  activityId?: string;
  feedbackId?: string;
  createdAt?: Timestamp;
  images?: string[];

  constructor(data: Partial<BookingsFeedback>) {
    Object.assign(this, data);
  }

  static fromJson(json: any): BookingsFeedback {
    return new BookingsFeedback({
      uid: json.uid ?? '',
      createdAt: json.createdAt as Timestamp,
      message: json.message ?? '',
      rating: typeof json.rating === 'number' ? json.rating : 0.0,
      activityId: json.activityId ?? '',
      feedbackId: json.feedbackId ?? '',
      images: Array.isArray(json.images) ? json.images : [],
    });
  }

  toJson(): Record<string, any> {
    return {
      uid: this.uid,
      createdAt: this.createdAt,
      activityId: this.activityId,
      feedbackId: this.feedbackId,
      rating: this.rating,
      message: this.message,
      images: this.images,
    };
  }
} 