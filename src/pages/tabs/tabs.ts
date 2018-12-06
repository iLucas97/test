import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ServersPage } from '../servers/servers';
import { AddServersPage } from '../add-servers/add-servers';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AddServersPage;
  tab3Root = ServersPage;
  constructor() {

  }
}
