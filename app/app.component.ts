import {Component} from "@angular/core";
import * as http from "http";
import * as fs from "file-system";
import * as utilModule from "utils/utils";

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
})
export class AppComponent {
    public downloadAndOpenPDF(): void {
        let filename: string = 'test.pdf';
        let url: string = `https://blog.zgoda.us/content/images/2017/01/${filename}`;
        let path: string = fs.path.join(fs.knownFolders.documents().path, filename);

        http.getFile({
            url: url,
            method: "GET"
        }, path)
            .then(file => {
                console.log(`Downloaded File: ${JSON.stringify(file)}`);
                if (file && fs.File.exists(file.path)) {
                    let opened = utilModule.ios.openFile(file.path);
                    console.log(opened ? 'Opened' : 'Not Opened');
                } else {
                    console.log("File doesn't exist.");
                }
            })
            .catch(error => {
                console.log(`getFile error: ${JSON.stringify(error)}`);
            });
    }
}
