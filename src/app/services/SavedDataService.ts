import { ServerModel } from "../model/ServerModel";
import { Storage } from '@ionic/storage';
import { Injectable } from "@angular/core";
import { RESTService } from "./RESTService";

@Injectable()
export class SavedDataService {
    private storageKey: string = 'servers_saved';
    constructor(public storage: Storage, public restService: RESTService) { }
    private servers: ServerModel[] = [];
    private save() {
        this.storage.set(this.storageKey, this.servers);
    };

    public clearData() {
        this.storage.remove(this.storageKey);
    }
   public get() {
       return this.storage.get(this.storageKey).then(result => {
            this.servers = (result == null || result == undefined) ? [] : result;
            return this.servers;
        });
       
    }
    public add(addingServer: ServerModel) {

        this.servers.push(addingServer);
        this.save();
    }
    public remove(idx) {
        this.servers.splice(idx, 1)
        this.save();
    }
}