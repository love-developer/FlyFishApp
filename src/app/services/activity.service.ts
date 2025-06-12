import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, limit, orderBy } from 'firebase/firestore';
import { Activity, ActivityModel } from '../../utils/models/activity.model';

// Firebase configuration (replace with your own)
const firebaseConfig = {
  apiKey: "AIzaSyB5mQT5XTpaW8JFaQJ9nS-T8sIS66Qfxnw",
  authDomain: "flyfish-testing.firebaseapp.com",
  projectId: "flyfish-testing",
  storageBucket: "flyfish-testing.appspot.com",
  messagingSenderId: "314575144287",
  appId: "1:314575144287:web:9f698819dc09d32d4e22ea",
  measurementId: "G-920K7BN1TB"
  // apiKey: "AIzaSyB0X7WrQSWhH4mEYPN41n8NHKjLgv43Rjo",
  // authDomain: "flyfish-copy.firebaseapp.com",
  // projectId: "flyfish-copy",
  // storageBucket: "flyfish-copy.appspot.com",
  // messagingSenderId: "99178527815",
  // appId: "1:99178527815:web:e85134b1f40e783c800562",
  // measurementId: "G-X5EK7K1Y3L"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

class ActivityService {
  private ref = collection(db, 'activities').withConverter<Activity>({
    fromFirestore: (snapshot) => Activity.fromJson({ id: snapshot.id, ...snapshot.data() }),
    toFirestore: (value: Activity) => value.toJson(),
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
}

export const activityService = new ActivityService();