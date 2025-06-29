import { Timestamp } from 'firebase/firestore';

export interface UserModel {
  referralCode?: string;
  userRole?: string;
  referredByCode?: string;
  stripeId?: string;
  phone?: string;
  email?: string;
  gender?: string;
  fullName?: string;
  uid?: string;
  profilePic?: string;
  verified?: boolean;
  enabled?: boolean;
  deleted?: boolean;
  socialLoggedIn?: boolean;
  rewardPoints: number;
  revenue?: number;
  referredPoints?: number;
  referralPercentage?: number;
  usersPercentage?: number;
  createdAt?: Date;
  lastActive?: Date;
}

export class User implements UserModel {
  referralCode: string;
  userRole: string;
  referredByCode: string;
  stripeId: string;
  phone: string;
  email: string;
  gender: string;
  fullName: string;
  uid: string;
  profilePic: string;
  verified: boolean;
  enabled: boolean;
  deleted: boolean;
  socialLoggedIn: boolean;
  rewardPoints: number;
  revenue: number;
  referredPoints: number;
  referralPercentage: number;
  usersPercentage: number;
  createdAt: Date;
  lastActive: Date;

  constructor({
    referralCode = "",
    userRole = "user",
    referredByCode = "",
    stripeId = "",
    phone = "",
    email = "",
    gender = "",
    fullName = "",
    uid = "",
    profilePic = "",
    verified = false,
    enabled = true,
    deleted = false,
    socialLoggedIn = false,
    rewardPoints = 0,
    revenue = 0,
    referredPoints = 0,
    referralPercentage = 0,
    usersPercentage = 10,
    createdAt = new Date(),
    lastActive = new Date(),
  }: Partial<UserModel> = {}) {
    this.referralCode = referralCode;
    this.userRole = userRole;
    this.referredByCode = referredByCode;
    this.stripeId = stripeId;
    this.phone = phone;
    this.email = email;
    this.gender = gender;
    this.fullName = fullName;
    this.uid = uid;
    this.profilePic = profilePic;
    this.verified = verified;
    this.enabled = enabled;
    this.deleted = deleted;
    this.socialLoggedIn = socialLoggedIn;
    this.rewardPoints = rewardPoints;
    this.revenue = revenue;
    this.referredPoints = referredPoints;
    this.referralPercentage = referralPercentage;
    this.usersPercentage = usersPercentage;
    this.createdAt = createdAt;
    this.lastActive = lastActive;
  }

  static fromFirestore(doc: any): User {
    const data = doc.data();
    return new User({
      createdAt: data.createdAt?.toDate(),
      lastActive: data.lastActive?.toDate(),
      revenue: data.revenue,
      referralPercentage: data.referralPercentage,
      usersPercentage: data.usersPercentage,
      deleted: data.deleted,
      userRole: data.userRole,
      referredPoints: data.referredPoints,
      referralCode: data.referralCode || "",
      referredByCode: data.referredByCode || "",
      rewardPoints: data.rewardPoints,
      fullName: data.fullName,
      phone: data.phone,
      gender: data.gender || "",
      email: data.email,
      stripeId: data.stripeId,
      profilePic: data.profilePic,
      verified: data.verified,
      uid: data.uid,
      socialLoggedIn: data.socialLoggedIn || false,
      enabled: data.enabled,
    });
  }

  toFirestore(): any {
    return {
      referralPercentage: this.referralPercentage,
      usersPercentage: this.usersPercentage,
      deleted: this.deleted,
      revenue: this.revenue,
      userRole: this.userRole,
      referredPoints: this.referredPoints,
      referralCode: this.referralCode,
      rewardPoints: this.rewardPoints,
      socialLoggedIn: this.socialLoggedIn,
      fullName: this.fullName,
      uid: this.uid,
      profilePic: this.profilePic,
      gender: this.gender || "",
      phone: this.phone,
      email: this.email,
      verified: this.verified,
      enabled: this.enabled,
      createdAt: Timestamp.fromDate(this.createdAt),
      lastActive: Timestamp.fromDate(this.lastActive),
      stripeId: this.stripeId,
      referredByCode: this.referredByCode,
    };
  }
} 