import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ServerModel } from '../../app/model/ServerModel';
import { RESTService } from '../../app/services/RESTService';
import { SavedDataService } from '../../app/services/SavedDataService';
@Component({
  selector: 'page-add-servers',
  templateUrl: 'add-servers.html',
})
export class AddServersPage {
  pageTitle: string = "Add new server";
  newServer: ServerModel;
  textWithUrl: string;
  protocols: string[] = ["http", "https", "ftp"];
  metodsTypes: string[] = ["TEXT", "CUSTOM"];
  addingMethod: string = ""
  loadingView: any = null;
  loading() {
    this.loadingView = this.loadingCtrl.create({
      // content: 'Please wait...'
    });
    this.loadingView.present();
  }

  showSuccess(successText: string) {
    let successToast = this.toastCtrl.create({
      message: successText,
      position: 'top',
      duration: 3000
    });
    successToast.present()
  }
  showError(errorText: string) {
    let errorToast = this.toastCtrl.create({
      message: errorText,
      position: 'top',
      duration: 3000,
      cssClass: "dangerToast",
    });
    errorToast.present();
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private restService: RESTService, private loadingCtrl: LoadingController,
    private toastCtrl: ToastController, private savedDataService: SavedDataService) {
    this.initData();
  }
  initData() {
    this.newServer = new ServerModel();
    this.newServer.name = "";
    this.newServer.domain = "";
    this.newServer.port = "80";
    this.newServer.protocol = "http";
    this.textWithUrl = "";
    this.addingMethod = ""
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AddServersPage');
    this.initData()
  }
  onSubmit() {
    switch (this.addingMethod) {
      case "TEXT":
        this.addingFromText()
        break;
      case "CUSTOM":
        this.addingFromCustom();
        break;
      default:
        this.showError("Select type of adding method")
        break;
    }
  }
  addingFromText() {
    if (this.textWithUrl == '') {
      this.showError("Insert the text");
      return;
    }

    this.loading()
    console.log("Form text: ", this.textWithUrl)
    this.restService.addFromText(this.textWithUrl).then(response => {
      console.log("Response  addingFromText() ", response)
      this.loadingView.dismiss();
      response.forEach(serverResponse => {
        this.savedDataService.add(serverResponse.server);
      })

      this.showSuccess(response.length + " Servers added successfully")
      this.initData();
    });

  }
  addingFromCustom() {
    if (!this.customServerIsFilled()) {
      this.showError("Compile all fields");
      return;
    }
    this.loading();
    console.log("Form data: ", this.newServer)
    this.restService.addServer(this.newServer).then(response => {
      console.log("Response  addingFromCustom() ", response)
      this.loadingView.dismiss();
      this.savedDataService.add(response.server);
      this.showSuccess("Server added successfully")
      this.initData();
    })
  }
  customServerIsFilled(): boolean {
    if (this.newServer.name == "")
      return false;
    if (this.newServer.domain == "")
      return false;
    return true;
  }
}
