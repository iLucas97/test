import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { RESTService } from '../../app/services/RESTService';
import { ServerStatusModel } from '../../app/model/ServerStatusModel';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pageTitle: string ="Home"

  devProj: string = "iLucas Developer ";
    text: string = "Questa è un applicazione di prova, ciao ciao ciao"
  title: string ="Home"
  serverResponse: ServerStatusModel = new ServerStatusModel()
  constructor(public navCtrl: NavController, private restService: RESTService, private loadingCtrl: LoadingController) {

  }
   loading = null;
  presentLoadingDefault() {
     this.loading = this.loadingCtrl.create({
     // content: 'Please wait...'
    });
  
    this.loading.present();
  }  
  onTest() {
  this.presentLoadingDefault();
    this.restService.test().then(result =>{ 
      this.serverResponse = result; 
      console.log("Result onTest():",this.serverResponse);
      this.loading.dismiss();
    }); 

            
  }

}
