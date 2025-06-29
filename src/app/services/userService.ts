import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  query, 
  where, 
  getDocs,
  increment 
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, auth } from '../../utils/firebase';
import { User } from '../../utils/models/user.model';

export class UserService {
  private readonly USERS_COLLECTION = 'Users';
  private readonly UTILS_COLLECTION = 'utils';
  private storage = getStorage();

  async getUserById(uid: string): Promise<User | null> {
    try {
      const userDoc = await getDoc(doc(db, this.USERS_COLLECTION, uid));
      if (userDoc.exists()) {
        return User.fromFirestore(userDoc);
      }
      return null;
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  }

  async getUserByReferralCode(referralCode: string): Promise<User | null> {
    try {
      const q = query(
        collection(db, this.USERS_COLLECTION),
        where('referralCode', '==', referralCode)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        return User.fromFirestore(querySnapshot.docs[0]);
      }
      return null;
    } catch (error) {
      console.error('Error getting user by referral code:', error);
      throw error;
    }
  }

  async createUser(user: User): Promise<void> {
    try {
      // Get total referrals count
      const utilsDoc = await getDoc(doc(db, this.UTILS_COLLECTION, 'utils'));
      const totalReferrals = utilsDoc.exists() ? utilsDoc.data().totalRefferals || 0 : 0;

      // Generate referral code if not exists
      if (!user.referralCode) {
        const lastName = user.fullName.split(' ').pop()?.toUpperCase() || '';
        user.referralCode = `${lastName}${totalReferrals}`;
      }

      // Update total referrals count
      await updateDoc(doc(db, this.UTILS_COLLECTION, 'utils'), {
        totalRefferals: increment(1)
      });

      // Create user document
      await setDoc(doc(db, this.USERS_COLLECTION, user.uid), user.toFirestore());

      // If user was referred, update referrer's points
      if (user.referredByCode) {
        const referrer = await this.getUserByReferralCode(user.referredByCode);
        if (referrer) {
          await updateDoc(doc(db, this.USERS_COLLECTION, referrer.uid), {
            referredPoints: increment(5)
          });
        }
      }
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async updateUser(uid: string, data: Partial<User>): Promise<void> {
    try {
      const userRef = doc(db, this.USERS_COLLECTION, uid);
      await updateDoc(userRef, data);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  async checkReferralCode(referralCode: string): Promise<boolean> {
    try {
      const user = await this.getUserByReferralCode(referralCode);
      return user !== null;
    } catch (error) {
      console.error('Error checking referral code:', error);
      throw error;
    }
  }

  async uploadProfilePicture(uid: string, file: File): Promise<string> {
    try {
      const storageRef = ref(this.storage, `profile_pictures/${uid}/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      
      await this.updateUser(uid, { profilePic: downloadURL });
      
      return downloadURL;
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      throw error;
    }
  }
} 