export interface ActivityModel {
    title?: string;
    location?: string;
    partnerId?: string;
    description?: string;
    time?: number[];
    price?: number[];
    people?: number;
    active?: boolean;
    images?: string[];
    items?: number;
    maxParticipants?: number;
    priorityIndex: number;
    id?: string;
    descriptionRussian?: string;
    titleRussian?: string;
    rewardPointsPercentage?: number;
    // Optionally add toJson if needed, but not required since Activity handles it
    // toJson?: () => Record<string, any>;
  }
  
  export class Activity {
    title?: string;
    location?: string;
    partnerId?: string;
    description?: string;
    time?: number[];
    price?: number[];
    people?: number;
    active?: boolean;
    images?: string[];
    items?: number;
    maxParticipants?: number;
    priorityIndex: number;
    id?: string;
    descriptionRussian?: string;
    titleRussian?: string;
    rewardPointsPercentage?: number;
  
    constructor(data: ActivityModel) {
      this.title = data.title ?? "";
      this.location = data.location ?? "";
      this.partnerId = data.partnerId ?? "";
      this.description = data.description ?? "";
      this.time = data.time ?? [];
      this.price = data.price ?? [];
      this.people = data.people ?? 0;
      this.active = data.active ?? false;
      this.images = data.images ?? [];
      this.items = data.items ?? 0;
      this.maxParticipants = data.maxParticipants ?? 0;
      this.priorityIndex = data.priorityIndex;
      this.id = data.id ?? "";
      this.descriptionRussian = data.descriptionRussian ?? "";
      this.titleRussian = data.titleRussian ?? "";
      this.rewardPointsPercentage = data.rewardPointsPercentage ?? 0;
    }
  
    static fromJson(json: any): Activity {
      return new Activity({
        title: json.title ?? "",
        titleRussian: json.titleRussian ?? "",
        descriptionRussian: json.descriptionRussian ?? "",
        rewardPointsPercentage: json.rewardPointsPercentage ?? 0,
        description: json.description ?? "",
        partnerId: json.partnerId ?? "",
        location: json.location ?? "",
        time: json.time ? (json.time as number[]) : [],
        images: json.images ? (json.images as string[]) : [],
        price: json.price ? (json.price as number[]) : [],
        people: json.people ?? 0,
        maxParticipants: json.maxParticipants ?? 0,
        items: json.items ?? 0,
        active: json.active ?? false,
        id: json.id ?? "",
        priorityIndex: json.priorityIndex ?? 0,
      });
    }
  
    toJson(): Record<string, any> {
      return {
        title: this.title,
        titleRussian: this.titleRussian,
        descriptionRussian: this.descriptionRussian,
        location: this.location,
        partnerId: this.partnerId,
        rewardPointsPercentage: this.rewardPointsPercentage,
        description: this.description,
        time: this.time,
        price: this.price,
        active: this.active,
        maxParticipants: this.maxParticipants,
        people: this.people,
        items: this.items,
        id: this.id,
        images: this.images,
        priorityIndex: this.priorityIndex,
      };
    }
  }