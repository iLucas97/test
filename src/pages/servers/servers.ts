import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ServerModel } from '../../app/model/ServerModel';
import { RESTService } from '../../app/services/RESTService';
import { ServerDetailsPage } from '../server-details/server-details';
import { SavedDataService } from '../../app/services/SavedDataService';

@Component({
  selector: 'page-servers',
  templateUrl: 'servers.html',
})
export class ServersPage {
  pageTitle: string = "Servers"
  servers: ServerModel[] = [];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private restService: RESTService,
    private loadingCtrl: LoadingController,
    private savedDataService: SavedDataService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServersPage');
    this.loadServers();
   
  }


  loadServers() {
    this.savedDataService.get().then( servers => {
      this.servers = servers
    });
    console.log("Result loadServers():", this.servers);
      };
  onSelectDetail(server: ServerModel) {
    let loading = this.loadingCtrl.create({
      // content: 'Please wait...'
    });
    loading.present()
    this.restService.checkServer(server).then(result => {
      console.log("Result onSelectDetail():", result);
      loading.dismiss();
      this.navCtrl.push(ServerDetailsPage, { response: result })
    })
  };
  onDelete(idx) {
    this.savedDataService.remove(idx);
  }
}
