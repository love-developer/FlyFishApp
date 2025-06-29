export class NotificationsModel {
    uid: string;
    id: string;
    itemId: string;
    img: string;
    title: string;
    body: string;
    notificationType: string;
    createdAt: Date | null;
    bookingId: string;
    read: boolean;

    constructor({
        uid = "",
        id = "",
        itemId = "",
        img = "",
        title = "",
        body = "",
        notificationType = "",
        createdAt = null,
        bookingId = "",
        read = false
    }: Partial<NotificationsModel> = {}) {
        this.uid = uid;
        this.id = id;
        this.itemId = itemId;
        this.img = img;
        this.title = title;
        this.body = body;
        this.notificationType = notificationType;
        this.createdAt = createdAt;
        this.bookingId = bookingId;
        this.read = read;
    }

    static fromJson(json: any): NotificationsModel {
        return new NotificationsModel({
            uid: json.uid || "",
            itemId: json.itemId || "",
            id: json.id || "",
            img: json.img || "",
            title: json.title || "",
            bookingId: json.bookingId || "",
            read: json.read || false,
            body: json.body || "",
            createdAt: json.createdAt && json.createdAt.toDate ? json.createdAt.toDate() : json.createdAt,
            notificationType: json.notificationType || ""
        });
    }

    toJson(): any {
        return {
            uid: this.uid,
            itemId: this.itemId,
            body: this.body,
            img: this.img,
            title: this.title,
            id: this.id,
            read: this.read,
            createdAt: this.createdAt,
            notificationType: this.notificationType,
            bookingId: this.bookingId
        };
    }
}
