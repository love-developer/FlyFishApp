import { db } from '../firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  limit,
  Timestamp,
} from 'firebase/firestore';
import { BookingModel, Booking } from './booking.model';
import { ActivityModel } from './activity.model';
import { CouponModel, LocalCouponModel } from './coupon.model';

// Define CouponModel and FetchModel
export interface FetchModel {
  availableBookings: DateTimeRange[];
  bookings: BookingModel[];
}

export interface DateTimeRange {
  start: Date;
  end: Date;
}

export class BookingService {
  private ref = collection(db, 'bookings');

  async deleteBooking(bookingModel: BookingModel): Promise<void> {
    if (!bookingModel.activity?.id || !bookingModel.id || !bookingModel.bookingId) return;
    const bookingRef = doc(db, 'bookings', bookingModel.activity.id, bookingModel.id, bookingModel.bookingId);
    await deleteDoc(bookingRef);
  }

  async bookingById(id?: string): Promise<BookingModel> {
    const q = query(this.ref, where('id', '==', id), limit(1));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data() as BookingModel;
    }
    throw new Error('Activity Not Found');
  }

  async addBooking(bookingModel: BookingModel): Promise<void> {
    if (!bookingModel.activity?.id || !bookingModel.id || !bookingModel.bookingId) return;
    const bookingRef = doc(db, 'bookings', bookingModel.activity.id, bookingModel.id, bookingModel.bookingId);
    await setDoc(bookingRef, bookingModel);
  }

  async fetchBookedSlotsFuture({
    rideDuration,
    date,
    activityModel,
  }: {
    rideDuration: number;
    date: Date;
    activityModel: ActivityModel;
  }): Promise<FetchModel> {
    const dateStr = this.formatDate(date);
    const slotsRef = collection(db, 'bookings', activityModel.id!, dateStr);
    const querySnapshot = await getDocs(slotsRef);
    const models: BookingModel[] = querySnapshot.docs.map((e) => e.data() as BookingModel);
    return {
      availableBookings: await this.generateAvailableSlots({
        totalItems: activityModel.items ?? 0,
        date,
        bookedSlots: models,
        rideDuration,
      }),
      bookings: models,
    };
  }

  async generateAvailableSlots({
    date,
    rideDuration,
    totalItems,
    bookedSlots,
  }: {
    date: Date;
    rideDuration: number;
    totalItems: number;
    bookedSlots: BookingModel[];
  }): Promise<DateTimeRange[]> {
    let sunset = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 20, 30, 0);
    const docSnap = await getDoc(doc(db, 'utils', 'closingTime'));
    if (docSnap.exists() && docSnap.data().closingTime instanceof Timestamp) {
      const sunsets = (docSnap.data().closingTime as Timestamp).toDate();
      sunset = new Date(sunset.getFullYear(), sunset.getMonth(), sunset.getDate(), sunsets.getHours(), sunsets.getMinutes());
    }
    const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 9, 0, 0);
    const endOfDay = sunset;
    const allSlots: DateTimeRange[] = [];
    let currentStartTime = startOfDay;
    while (currentStartTime < endOfDay) {
      const potentialEndTime = new Date(currentStartTime.getTime() + rideDuration * 60000);
      allSlots.push({ start: new Date(currentStartTime), end: new Date(potentialEndTime) });
      currentStartTime = this.getNextAvailableStartTime(potentialEndTime, bookedSlots, rideDuration);
    }
    let filteredAvailableSlots = [...allSlots];
    if (totalItems === 1) {
      for (const element of bookedSlots) {
        if (!element.start || !element.end) continue;
        filteredAvailableSlots = filteredAvailableSlots.filter((availableSlot) =>
          !(availableSlot.start < (element.end as any).toDate() && availableSlot.end > (element.start as any).toDate())
        );
      }
    } else {
      for (const element of bookedSlots) {
        if (!element.start || !element.end) continue;
        filteredAvailableSlots = filteredAvailableSlots.filter((availableSlot) =>
          !(
            availableSlot.start < (element.end as any).toDate() &&
            availableSlot.end > (element.start as any).toDate() &&
            element.noOfItems === totalItems
          )
        );
      }
    }
    return filteredAvailableSlots.filter((booking) => booking.start > new Date());
  }

  getNextAvailableStartTime(
    endTime: Date,
    bookedSlots: BookingModel[],
    rideDuration: number
  ): Date {
    let nextStartTime = endTime;
    for (const element of bookedSlots) {
      if (!element.start || !element.end) continue;
      const elementStart = (element.start as any).toDate();
      const elementEnd = (element.end as any).toDate();
      if (
        elementStart < new Date(nextStartTime.getTime() + rideDuration * 60000) &&
        elementEnd > nextStartTime
      ) {
        nextStartTime = new Date(elementEnd.getTime() + 5 * 60000);
        break;
      }
    }
    return nextStartTime;
  }

  formatDate(date: Date): string {
    // Format as yyyy-MM-dd or as needed for Firestore subcollections
    return `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
  }

//   async getAllCoupons(): Promise<CouponModel[]> {
//     const ref = collection(db, 'coupons');
//     const querySnapshot = await getDocs(ref);
//     return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//   }

  async updateCoupon(couponId: string, totalUsed: number): Promise<void> {
    const ref = doc(db, 'coupons', couponId);
    await updateDoc(ref, { totalUsed });
  }

  async addReserve(bookingModel: BookingModel): Promise<void> {
    if (!bookingModel.id || !bookingModel.activity?.id) return;
    const userId = bookingModel.uid || 'unknown';
    const ref = doc(db, 'reserved', bookingModel.id, bookingModel.activity.id, userId);
    await setDoc(ref, bookingModel);
  }

  async deleteBookings({ activityId, date, bookingId }: { activityId: string; date: string; bookingId: string }): Promise<void> {
    const ref = doc(db, 'bookings', activityId, date, bookingId);
    await deleteDoc(ref);
  }
}

export const bookingService = new BookingService(); 