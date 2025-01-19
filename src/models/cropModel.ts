export class Crops {
    id: string;
    commonName: string;
    scientificName: string;
    category: string;
    season: string;
    img: string;

    constructor(id: string, commonName: string, scientificName: string, category: string, season: string, img: string) {
        this.id = id;
        this.commonName = commonName;
        this.scientificName = scientificName;
        this.category = category;
        this.season = season;
        this.img = img;
    }
}