export class OuterbasePluginConfig {
    // Meta data from Outerbase for us to retain

    tableValue = undefined
    count = 0
    page = 1
    offset = 50
    limit = 0
    offset = 0
    pageCount= 0
    theme = "light"
    
    //Input from the configuration
    latitudeKey = undefined;
    longitudeKey = undefined;
    isClustering = undefined;
    iconurl = undefined


    constructor(object) {
        this.latitudeKey = object?.latitudeKey;
        this.longitudeKey = object?.longitudeKey;
        this.isClustering = object?.isClustering;
        this.iconurl = object?.iconurl;
    }

    toJSON() {
        return {
            "latitudeKey": this.latitudeKey,
            "longitudeKey": this.longitudeKey,
            "isClustering": this.isClustering,
            "iconurl": this.iconurl
        }
    }
}