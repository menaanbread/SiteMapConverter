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
