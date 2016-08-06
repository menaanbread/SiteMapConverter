/// <reference path="./Dependencies/typings/x2js/xml2json.d.ts" />

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
        this._viewModel.showGreyout();

        let siteMapModel = new SiteMapModel();
        let inputUrls = this._viewModel.input.split("\n");

        inputUrls.forEach((inputUrl) => {
            siteMapModel.urlset.url.push(new SiteMapModelUrlData(inputUrl, this._viewModel.changeFrequency, this._viewModel.priority));
        });

        let xmlSer = new X2JS();
        let siteMap = "<?xml version=\"1.0\" encoding=\"UTF- 8\"?>" + xmlSer.json2xml_str(siteMapModel);

        this._viewModel.output = siteMap;
        this._viewModel.download.style.display = "block";

        this._viewModel.hideGreyout();
    }

    private download(text: string, name: string, type: string) {
        let downloadLink = document.createElement("a");
        let file = new Blob([text], { type: type });
        downloadLink.href = URL.createObjectURL(file);
        downloadLink.setAttribute("download", name);
        downloadLink.click();
    }
}
