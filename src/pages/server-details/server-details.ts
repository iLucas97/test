import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { ServerStatusModel } from '../../app/model/ServerStatusModel';

@Component({
  selector: 'page-server-details',
  templateUrl: 'server-details.html',
})
export class ServerDetailsPage {
  serverDetail: ServerStatusModel
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.serverDetail = this.navParams.get('response');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServerDetailsPage');
  }

}
