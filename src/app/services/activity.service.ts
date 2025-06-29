import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, limit, orderBy } from 'firebase/firestore';
import { Activity, ActivityModel } from '../../utils/models/activity.model';
import { BookingsFeedback } from '../../utils/models/feedback.model';
import {db} from "../../utils/firebase";
// Firebase configuration (replace with your own)


class ActivityService {
  private ref = collection(db, 'activities').withConverter<Activity>({
    fromFirestore: (snapshot) => Activity.fromJson({ id: snapshot.id, ...snapshot.data() }),
    toFirestore: (value: Activity) => value.toJson(),
  });
  private reviewsRef = collection(db, 'bookingsFeedback').withConverter<BookingsFeedback>({
    fromFirestore: (snapshot) => BookingsFeedback.fromJson({ id: snapshot.id, ...snapshot.data() }),
    toFirestore: (value: BookingsFeedback) => value.toJson(),
  });

  async activityById(id?: string): Promise<Activity> {
    try {
      const q = query(this.ref, where('id', '==', id), limit(1));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data(); // This should now work
      }
      throw new Error('Activity Not Found');
    } catch (error) {
      console.error('Error fetching activity by ID:', error);
      throw new Error('Activity Not Found');
    }
  }

  async getActivities(): Promise<Activity[]> {
    try {
      const q = query(this.ref, orderBy('priorityIndex', 'asc'));
      const querySnapshot = await getDocs(q);
      const activities = querySnapshot.docs.map((doc) => doc.data());
      return activities;
    } catch (error) {
      console.error('Error fetching activities:', error);
      throw new Error('Error fetching activities');
    }
  }

  async getAllReviews(id: string): Promise<BookingsFeedback[]> {
    try {
      const q = query(this.reviewsRef, where('activityId', '==', id));
      const querySnapshot = await getDocs(q);
      const reviews = querySnapshot.docs.map((doc) => doc.data());
      return reviews;
    } catch (error) {
      console.error(`Error fetching reviews for activity ${id}:`, error);
      throw new Error('Error fetching reviews');
    }
  }
}

export const activityService = new ActivityService();