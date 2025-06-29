import { db } from '../../utils/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { BookingModel } from '../../utils/models/booking.model';

export class CartService {
  private ref = collection(db, 'attractionsCart');

  async addAttraction(bookingModel: BookingModel): Promise<void> {
    if (!bookingModel.bookingId) throw new Error('Booking ID is required');
    const bookingRef = doc(this.ref, bookingModel.bookingId);
    await setDoc(bookingRef, bookingModel);
  }
}

export const cartService = new CartService(); 