class SiteMapController {
    constructor() {
        this._viewModel = new SiteMapViewModel();
    }
    setup() {
        this._viewModel.generate.addEventListener("click", () => this.generateSiteMap());
        this._viewModel.download.addEventListener("click", () => this.download(this._viewModel.output, "sitemap.xml", "xml"));
    }
    generateSiteMap() {
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
    download(text, name, type) {
        let downloadLink = document.createElement("a");
        var file = new Blob([text], { type: type });
        downloadLink.href = URL.createObjectURL(file);
        downloadLink.setAttribute("download", name);
        downloadLink.click();
    }
}
class SiteMapViewModel {
    get input() {
        return document.getElementById("site-map-input").value;
    }
    get changeFrequency() {
        return document.getElementById("site-map-change-frequency").value;
    }
    get priority() {
        return document.getElementById("site-map-priority").value;
    }
    get generate() {
        return document.getElementById("site-map-generate-button");
    }
    get download() {
        return document.getElementById("site-map-download-button");
    }
    get output() {
        return document.getElementById("site-map-output").innerText;
    }
    set output(value) {
        document.getElementById("site-map-output").innerText = value;
    }
}
class SiteMapModel {
    constructor() {
        this.urlset = new Array();
    }
}
class SiteMapModelUrl {
    constructor(urlLocation, changeFrequency, priority) {
        this.url = new SiteMapModelUrlData(urlLocation, changeFrequency, priority);
    }
}
class SiteMapModelUrlData {
    constructor(urlLocation, changeFrequency, priority) {
        this.loc = urlLocation;
        this.changefreq = changeFrequency;
        this.priority = priority;
    }
    ;
}
window.onload = () => {
    var controller = new SiteMapController();
    controller.setup();
};
//# sourceMappingURL=app.js.map