import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { ServerStatusModel } from '../model/ServerStatusModel';
import { ServerModel } from '../model/ServerModel';
@Injectable()
export class RESTService {
    apiUrl: string = "https://webstatusdetector.herokuapp.com/webstatus/api"; //"http://localhost:8080/webstatus/api"
    constructor (private http: Http){
    }
    private buildBody(key: string, value: string) {
        return key + "=" + value;
    };
   private requestServer(protocol: string, domain: string, port: string, name: string) : Promise<ServerStatusModel>{
        var body = "?";
     
        var protocolBody = this.buildBody("protocol", protocol);
        var domainBody = this.buildBody("domain", domain);
        var portBody = this.buildBody("port", port);
        var nameBody = this.buildBody("name", name);

        if(protocol)
         body += ("&" + protocolBody);
        if(domain)
         body += ("&" + domainBody);
        if(port)
         body += ("&" + portBody);
         if(name)
         body += ("&" + nameBody);
        var url = this.apiUrl + "/check" + body;
        
        var response = this.http.get(url).toPromise() 
        .then(response => response.json()); 
        return response;
    };
    test(): Promise<ServerStatusModel> {
        return this.http .get(this.apiUrl + "/test").toPromise() 
                .then(response => response.json()); 
       };
    addiLucas() {
        var response = this.http.get(this.apiUrl + "/add").toPromise() 
        .then(response => response.json()); ;
        return response;
    };
    addServer(server: ServerModel): Promise<ServerStatusModel> {
       return this.requestServer(server.protocol, server.domain,server.port, server.name);
    }
    addFromText(text: string): Promise<ServerStatusModel[]> {
        var body = ("?" + this.buildBody("text", text));
        var url = this.apiUrl + "/add/fromText" + body;
        
        var response = this.http.get(url).toPromise() 
        .then(response => response.json()); 
        return response;
     }

    checkServer(server: ServerModel): Promise<ServerStatusModel> {
        return this.addServer(server);
    }
}