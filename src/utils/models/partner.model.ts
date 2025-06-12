export class PartnerModel {
    companyName: string;
    location: string;
    description: string;
    descriptionRussian: string;
    image: string;
    id: string;
    timing: string;
    discount: number;

    constructor({
        companyName,
        location,
        description,
        descriptionRussian,
        image,
        id,
        timing,
        discount
    }: {
        companyName: string;
        location: string;
        description: string;
        descriptionRussian: string;
        image: string;
        id: string;
        timing: string;
        discount: number;
    }) {
        this.companyName = companyName;
        this.location = location;
        this.description = description;
        this.descriptionRussian = descriptionRussian;
        this.image = image;
        this.id = id;
        this.timing = timing;
        this.discount = discount;
    }

    static fromJson(json: { [key: string]: any }): PartnerModel {
        return new PartnerModel({
            companyName: json['companyName'] as string,
            description: json['description'] as string,
            descriptionRussian: json['descriptionRussian'] ?? '',
            discount: json['discount'] as number,
            id: json['id'] as string,
            location: json['location'] as string,
            image: json['image'] as string,
            timing: json['timing'] as string
        });
    }

    toJson(): { [key: string]: any } {
        return {
            companyName: this.companyName,
            description: this.description,
            descriptionRussian: this.descriptionRussian,
            discount: this.discount,
            id: this.id,
            location: this.location,
            image: this.image,
            timing: this.timing
        };
    }
}