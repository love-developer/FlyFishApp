// services/partner.service.js
import { PartnerModel } from '../../utils/models/partner.model';
import { db, auth } from '../../utils/firebase';
import { 
  collection, 
  getDocs, 
} from 'firebase/firestore';

const COLLECTIONS = {
  partnersOffers: 'partnersOffers',
};

class PartnerService {
  constructor() {}

  async getAllPartners() {
    try {
      const partnersRef = collection(db, COLLECTIONS.partnersOffers); // ← moved here
      const querySnapshot = await getDocs(partnersRef);
      const partners = querySnapshot.docs.map(doc => PartnerModel.fromJson(doc.data()));
      return partners;
    } catch (error) {
      console.error('Error fetching partners:', error);
      throw new Error('Error fetching partners');
    }
  }


}

export default PartnerService;
