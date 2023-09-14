export class OuterbasePluginConfig_$PLUGIN_ID {
    imageKey = undefined
    titleKey = undefined
    descriptionKey = undefined
    subtitleKey = undefined

    constructor(object) {
        this.imageKey = object?.imageKey
        this.titleKey = object?.titleKey
        this.descriptionKey = object?.descriptionKey
        this.subtitleKey = object?.subtitleKey
    }

    toJSON() {
        return {
            "imageKey": this.imageKey,
            "titleKey": this.titleKey,
            "descriptionKey": this.descriptionKey,
            "subtitleKey": this.subtitleKey
        }
    }
}