class SiteMapModelUrlData {
    public loc: string;
    public changefreq: string;
    public priority: string;

    constructor(urlLocation: string, changeFrequency: string, priority: string) {
        this.loc = urlLocation;
        this.changefreq = changeFrequency;
        this.priority = priority;
    };
}
