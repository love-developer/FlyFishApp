import { db } from '../../utils/firebase';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where
} from 'firebase/firestore';
import { PackageModel } from '../../utils/models/package.model';
import { EXPORT_DETAIL } from 'next/dist/shared/lib/constants';

const PACKAGES_COLLECTION = 'packages';
const PACKAGES_BOOKINGS_COLLECTION = 'packagesBookings';

class PackageService {
  packagesRef = collection(db, PACKAGES_COLLECTION);

  async getPackages(): Promise<PackageModel[]> {
    const snapshot = await getDocs(this.packagesRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PackageModel));
  }

  async packageById(id: string): Promise<PackageModel> {
    const q = query(this.packagesRef, where('id', '==', id));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() } as PackageModel;
    }
    throw new Error('Package Not Found');
  }

  async addAPackage(pkg: PackageModel): Promise<void> {
    if (!pkg.id) throw new Error('Package id is required');
    await setDoc(doc(this.packagesRef, pkg.id), pkg);
  }

  async addAPackageBooking(pkg: PackageModel): Promise<void> {
    if (!pkg.id) throw new Error('Package id is required');
    const bookingsRef = collection(db, PACKAGES_BOOKINGS_COLLECTION);
    await setDoc(doc(bookingsRef, pkg.id), pkg);
  }

   

} 


export const packageService = new PackageService();
