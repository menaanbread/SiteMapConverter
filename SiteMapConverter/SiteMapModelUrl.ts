class SiteMapModelUrl {
    public url: SiteMapModelUrlData;

    constructor(urlLocation: string, changeFrequency: string, priority: string) {
        this.url = new SiteMapModelUrlData(urlLocation, changeFrequency, priority);
    }
}
