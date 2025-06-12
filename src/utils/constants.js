// Shared Preference Keys
export const SharedPreferenceKeys = {
    isLoggedIn: "isLoggedIn",
    user: "user",
    activities: "activities",
    firstName: "firstName",
    stripeId: "stripeId",
    phone: "phone",
    email: "email",
    lastName: "lastName",
    fcmToken: "fcmToken",
    uid: "uid",
    rewardPoints: "rewardPoints",
  };
  
  // Notification Types
  export const NotificationTypes = {
    bookingConfirmed: "bookingConfirmed",
    cartItemDeleted: "booking_conflict_detected",
    bookingCancelled: "bookingCancelled",
    partnerRequestReceived: "partnerRequestReceived",
  };
  
  // Firebase/Firestore Collection Names
  export const Collections = {
    users: "Users",
    packages: "packages",
    packagesBookings: "packagesBookings",
    blogs: "blogs",
    reserved: "reserved",
    referredUsers: "referredUsers",
    referrells: "referrells",
    referredBookings: "referredBookings",
    attractions: "attractions",
    bookingsFeedback: "bookingsFeedback",
    coupons: "coupons",
    payouts: "payouts",
    history: "history",
    workWithUs: "workWithUs",
    jobApplications: "jobApplications",
    partners: "partners",
    partnersOffers: "partnersOffers",
    activities: "activities",
    bookings: "bookings",
    notifications: "notifications",
    transactions: "transactions",
    partnerBookings: "partnerBookings",
    attractionsCart: "attractionsCart",
  };
  
  // User Fields
  export const Users = {
    firstName: "firstName",
    lastName: "lastName",
    fullName: "fullName",
    uid: "uid",
    email: "email",
    phone: "phone",
  };
  
  // Activity Identifiers
  export const Activities = {
    donutRide: "donut_ride",
    jetski: "jetski",
    bananaRide: "banana_ride",
    kneeBoard: "KneeBoard",
    wakeboard: "Wakeboard",
    waterSki: "WaterSki",
    flyboard: "Flyboard",
    zegoBoat: "ZegoBoat",
    jetCa: "JetCa",
    parasailing: "Parasailing",
    standupPaddleBoard: "StandupPaddleBoard",
    doubleKayaking: "DoubleKayaking",
    singleKayaking: "SingleKayaking",
    abratrip: "Abratrip",
  };
  
  // Activity Fields
  export const Activity = {
    id: "id",
    items: "items",
    people: "people",
    price: "price",
    time: "time",
    description: "description",
    title: "title",
  };
  
  // Booking Statuses
  export const BookingStatus = {
    pending: "pending",
    rejected: "rejected",
    approved: "approved",
    booked: "booked",
    cancelled: "cancelled",
    completed: "completed",
  };
  
  // Transaction Types
  export const TransactionType = {
    flyFish: "flyFish",
    partner: "partner",
  };
  
  // Booking Fields
  export const Bookings = {
    id: "id",
    rewardsPointsUsed: "rewardsPointsUsed",
    vat: "vat",
    bonus: "bonus",
    rewardPoints: "rewardPoints",
    status: "status",
    userRewards: "userRewards",
    docId: "docId",
    people: "people",
    noOfItems: "noOfItems",
    start: "start",
    end: "end",
    price: "price",
    duration: "duration",
    itemId: "itemId",
    bookingId: "bookingId",
    tax: "tax",
    completed: "completed",
    reviewAdded: "reviewAdded",
    transacId: "transacId",
    createdAt: "createdAt",
    total: "total",
    activities: "activities",
  };
  