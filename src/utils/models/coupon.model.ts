import { Timestamp } from 'firebase/firestore';

export class CouponModel {
  isActive?: boolean;
  couponId?: string;
  type?: string;
  description?: string;
  image?: string;
  agentId?: string;
  activities?: string[];
  useLimit?: number;
  totalUsed?: number;
  reliefPercentage?: number;
  start?: Date;
  end?: Date;

  constructor(data: Partial<CouponModel> = {}) {
    Object.assign(this, data);
  }

  static fromJson(json: any): CouponModel {
    return new CouponModel({
      couponId: json['couponId'],
      description: json['description'],
      image: json['image'],
      type: json['type'],
      isActive: json['isActive'],
      reliefPercentage: json['reliefPercentage'],
      useLimit: json['useLimit'],
      totalUsed: json['totalUsed'],
      activities: Array.isArray(json['activities']) ? json['activities'] : [],
      start: json['start'] instanceof Timestamp ? json['start'].toDate() : json['start'],
      end: json['end'] instanceof Timestamp ? json['end'].toDate() : json['end'],
      agentId: json['agentId'],
    });
  }

  toJson(): any {
    return {
      couponId: this.couponId,
      description: this.description,
      image: this.image,
      type: this.type,
      isActive: this.isActive,
      reliefPercentage: this.reliefPercentage,
      activities: this.activities,
      agentId: this.agentId,
      start: this.start ? Timestamp.fromDate(this.start) : null,
      end: this.end ? Timestamp.fromDate(this.end) : null,
      totalUsed: this.totalUsed,
      useLimit: this.useLimit,
    };
  }
}

export class LocalCouponModel {
  isActive?: boolean;
  couponId?: string;
  type?: string;
  description?: string;
  image?: string;
  agentId?: string;
  activities?: string[];
  useLimit?: number;
  totalUsed?: number;
  reliefPercentage?: number;

  constructor(data: Partial<LocalCouponModel> = {}) {
    Object.assign(this, data);
  }

  static fromJson(json: any): LocalCouponModel {
    return new LocalCouponModel({
      couponId: json['couponId'],
      description: json['description'],
      image: json['image'],
      type: json['type'],
      isActive: json['isActive'],
      reliefPercentage: json['reliefPercentage'],
      useLimit: json['useLimit'],
      totalUsed: json['totalUsed'],
      activities: Array.isArray(json['activities']) ? json['activities'] : [],
      agentId: json['agentId'],
    });
  }

  toJson(): any {
    return {
      couponId: this.couponId,
      description: this.description,
      image: this.image,
      type: this.type,
      isActive: this.isActive,
      reliefPercentage: this.reliefPercentage,
      activities: this.activities,
      agentId: this.agentId,
      totalUsed: this.totalUsed,
      useLimit: this.useLimit,
    };
  }
} 