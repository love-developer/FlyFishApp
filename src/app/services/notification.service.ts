import {
    collection,
    query,
    where,
    getDocs,
    doc,
    setDoc,
    updateDoc,
    deleteDoc,
    onSnapshot,
    DocumentData,
    QuerySnapshot,
    orderBy
} from 'firebase/firestore';
import { db } from '../../utils/firebase';
import { NotificationsModel } from '../../utils/models/notification.model';

const notificationsCollection = collection(db, 'notifications');

const notificationConverter = {
    fromFirestore: (snapshot: DocumentData): NotificationsModel => {
        return NotificationsModel.fromJson(snapshot.data()!);
    },
    toFirestore: (notification: NotificationsModel): DocumentData => {
        return notification.toJson();
    },
};

class NotificationsService {
    
    async getMyNotifications(uid: string): Promise<NotificationsModel[]> {
        const q = query(
            collection(db, 'notifications'), 
            where('uid', '==', uid),
        ).withConverter(notificationConverter);
        
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => doc.data());
    }

    subscribeToMyNotifications(uid: string, callback: (notifications: NotificationsModel[]) => void): () => void {
        const q = query(
            collection(db, 'notifications'), 
            where('uid', '==', uid),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
            const notifications = snapshot.docs.map(doc => NotificationsModel.fromJson(doc.data()!));
            callback(notifications);
        });
        return unsubscribe;
    }
    
    async addNotification(notificationData: any): Promise<void> {
        const notification = NotificationsModel.fromJson(notificationData);
        if (!notification.id) {
            // Firestore can auto-generate an ID if one isn't provided.
            const docRef = doc(collection(db, 'notifications'));
            notification.id = docRef.id;
        }
        const docRefWithId = doc(db, 'notifications', notification.id).withConverter(notificationConverter);
        await setDoc(docRefWithId, notification);
    }

    async updateNotification(id: string): Promise<void> {
        const docRef = doc(db, 'notifications', id);
        await updateDoc(docRef, { read: true });
    }
    
    async markAllAsRead(uid: string): Promise<void> {
        const q = query(collection(db, 'notifications'), where('uid', '==', uid), where('read', '==', false));
        const snapshot = await getDocs(q);
        
        const updates = snapshot.docs.map(documentSnapshot => 
            updateDoc(documentSnapshot.ref, { read: true })
        );

        await Promise.all(updates);
    }

    async deleteNotification(id: string): Promise<void> {
        const docRef = doc(db, 'notifications', id);
        await deleteDoc(docRef);
    }
}

export const notificationsService = new NotificationsService(); 