import {
    collection,
    query,
    where,
    getDocs,
    onSnapshot,
    doc,
    setDoc,
    updateDoc,
    deleteDoc,
    limit,
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
} from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { TransactionModel } from '../../utils/models/transaction.model';
import { BookingModel } from '../../utils/models/booking.model';

const transactionConverter: FirestoreDataConverter<TransactionModel> = {
    toFirestore(transaction: TransactionModel): DocumentData {
        return { ...transaction };
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ): TransactionModel {
        const data = snapshot.data(options);
        // Ensure you handle the conversion of nested objects and timestamps if necessary
        return data as TransactionModel;
    },
};

export class TransactionsService {
    private transactionsCollection = collection(db, 'transactions').withConverter(transactionConverter);

    async singleTransaction(bookingId: string): Promise<TransactionModel | null> {
        const q = query(this.transactionsCollection, where('bookingId', '==', bookingId), limit(1));
        try {
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                return querySnapshot.docs[0].data();
            }
            return null;
        } catch (error) {
            console.error('Error getting single transaction:', error);
            return null;
        }
    }

    async getAllTransactions(): Promise<TransactionModel[]> {
        try {
            const querySnapshot = await getDocs(this.transactionsCollection);
            return querySnapshot.docs.map(doc => doc.data());
        } catch (error) {
            console.error('Error fetching all transactions:', error);
            throw new Error('Error fetching transactions');
        }
    }

    getMyTransactions(uid: string, callback: (transactions: TransactionModel[]) => void): () => void {
        const q = query(this.transactionsCollection, where('uid', '==', uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const transactions = querySnapshot.docs.map(doc => doc.data());
            callback(transactions);
        });
        return unsubscribe;
    }

    async hasUserTransactions(uid: string): Promise<boolean> {
        const q = query(this.transactionsCollection, where('uid', '==', uid), limit(1));
        const querySnapshot = await getDocs(q);
        return !querySnapshot.empty;
    }
    
    getMyUTransactions(uid: string, callback: (transactions: TransactionModel[]) => void): () => void {
        const q = query(this.transactionsCollection, where('uid', '==', uid));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const transactions = querySnapshot.docs
                .map(doc => doc.data())
                .filter(transaction => 
                    transaction.bookingModel?.some(booking => booking.status === "booked")
                );
            callback(transactions);
        });
        return unsubscribe;
    }

    getMyPartnersBooking(uid: string, callback: (transactions: TransactionModel[]) => void): () => void {
        const q = query(this.transactionsCollection, where('uid', '==', uid), where('type', '==', 'partner'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const transactions = querySnapshot.docs.map(doc => doc.data());
            callback(transactions);
        });
        return unsubscribe;
    }

    async addTransaction(model: TransactionModel): Promise<void> {
        if (!model.bookingId) throw new Error("Booking ID is required to add a transaction.");
        const docRef = doc(this.transactionsCollection, model.bookingId);
        await setDoc(docRef, model);
    }

    async updateTransaction(model: Partial<TransactionModel>): Promise<void> {
        if (!model.bookingId) throw new Error("Booking ID is required to update a transaction.");
        const docRef = doc(this.transactionsCollection, model.bookingId);
        await updateDoc(docRef, model);
    }

    async cancelBooking(bookingModel: BookingModel): Promise<void> {
        if (!bookingModel.activity?.id || !bookingModel.id || !bookingModel.bookingId) {
            throw new Error('Invalid booking model for cancellation');
        }
        // NOTE: The original Dart code `collection(bookingModel.id!)` was ambiguous.
        // This assumes `bookingModel.id` is the intended subcollection name under the activity.
        const bookingDocRef = doc(db, 'bookings', bookingModel.activity.id, bookingModel.id, bookingModel.bookingId);
        try {
            await deleteDoc(bookingDocRef);
            console.log("Booking deleted successfully");
        } catch (error) {
            console.error('Error cancelling booking:', error);
            throw new Error('Error cancelling booking');
        }
    }

    async deleteTransaction(bookingId: string): Promise<void> {
        const docRef = doc(this.transactionsCollection, bookingId);
        await deleteDoc(docRef);
    }

    async updateTransactionStatus(bookingId: string, status: string): Promise<void> {
        const docRef = doc(this.transactionsCollection, bookingId);
        await updateDoc(docRef, { status: status });
    }

    async getMyBookings(uid: string): Promise<BookingModel[]> {
        const q = query(this.transactionsCollection, where('uid', '==', uid));
        try {
            const querySnapshot = await getDocs(q);
            const myBookings: BookingModel[] = [];
            querySnapshot.docs.forEach(doc => {
                const transaction = doc.data();
                if (transaction.status !== 'cancelled' && transaction.bookingModel) {
                    myBookings.push(...transaction.bookingModel);
                }
            });
            return myBookings;
        } catch (error) {
            console.error('Error fetching my bookings:', error);
            throw new Error('Error fetching bookings');
        }
    }
} 