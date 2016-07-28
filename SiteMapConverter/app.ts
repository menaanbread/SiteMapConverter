class SiteMapController {

    private _viewModel: SiteMapViewModel;

    constructor() {
        this._viewModel = new SiteMapViewModel();
    }

    public setup(): void {
        this._viewModel.generate.addEventListener("click", () => this.generateSiteMap());
        this._viewModel.download.addEventListener("click", () => this.download(this._viewModel.output, "sitemap.xml", "xml"));
    }

    private generateSiteMap() {
        let siteMapModel = new SiteMapModel();
        let inputUrls = this._viewModel.input.split("\n");

        inputUrls.forEach((inputUrl) => {
            siteMapModel.urlset.push(new SiteMapModelUrl(inputUrl, this._viewModel.changeFrequency, this._viewModel.priority));
        });

        let xmlSer = new X2JS();
        let siteMap = "<?xml version=\"1.0\" encoding=\"UTF- 8\"?>" + xmlSer.json2xml_str(siteMapModel);

        this._viewModel.output = siteMap;
        this._viewModel.download.style.display = "block";
    }

    private download(text: string, name: string, type: string) {
        let downloadLink = document.createElement("a");
        let file = new Blob([text], { type: type });
        downloadLink.href = URL.createObjectURL(file);
        downloadLink.setAttribute("download", name);
        downloadLink.click();
    }
}

class SiteMapViewModel {

    public get input(): string {
        return (<HTMLInputElement>document.getElementById("site-map-input")).value;
    }

    public get changeFrequency(): string {
        return (<HTMLInputElement>document.getElementById("site-map-change-frequency")).value;
    }

    public get priority(): string {
        return (<HTMLInputElement>document.getElementById("site-map-priority")).value;
    }

    public get generate(): HTMLButtonElement {
        return <HTMLButtonElement>document.getElementById("site-map-generate-button");
    }

    public get download(): HTMLButtonElement {
        return <HTMLButtonElement>document.getElementById("site-map-download-button");
    }

    public get output(): string {
        return document.getElementById("site-map-output").innerText;
    }
    public set output(value: string) {
        document.getElementById("site-map-output").innerText = value;
    }
}

class SiteMapModel {
    public urlset: Array<SiteMapModelUrl> = new Array<SiteMapModelUrl>();
}

class SiteMapModelUrl {
    public url: SiteMapModelUrlData;

    constructor(urlLocation: string, changeFrequency: string, priority: string) {
        this.url = new SiteMapModelUrlData(urlLocation, changeFrequency, priority);
    }
}

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

window.onload = () => {
    let controller = new SiteMapController();
    controller.setup();
};
