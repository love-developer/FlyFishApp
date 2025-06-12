// models/BlogModel.ts
import { Timestamp } from 'firebase/firestore';

export class BlogModel {
  id?: string;
  title?: string;
  titleRussian?: string;
  location?: string;
  description?: string;
  descriptionRussian?: string;
  image?: string;
  motive?: string;
  motiveRussian?: string;
  createdAt?: Date;

  constructor(data: Partial<BlogModel>) {
    Object.assign(this, data);
  }

  static fromJson(json: any): BlogModel {
    return new BlogModel({
      id: json.id,
      title: json.title ?? '',
      titleRussian: json.titleRussian ?? '',
      location: json.location ?? '',
      description: json.description ?? '',
      descriptionRussian: json.descriptionRussian ?? '',
      image: json.image ?? '',
      motive: json.motive ?? '',
      motiveRussian: json.motiveRussian ?? '',
      createdAt: json.createdAt instanceof Timestamp
        ? json.createdAt.toDate()
        : json.createdAt ?? null,
    });
  }

  toJson() {
    return {
      title: this.title,
      titleRussian: this.titleRussian,
      location: this.location,
      description: this.description,
      descriptionRussian: this.descriptionRussian,
      image: this.image,
      motive: this.motive,
      motiveRussian: this.motiveRussian,
      createdAt: this.createdAt ? Timestamp.fromDate(this.createdAt) : null,
    };
  }
}
