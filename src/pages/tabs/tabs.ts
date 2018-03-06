import { Component } from '@angular/core';

import { SettingsPage } from '../settings/settings';
import { HomePage } from '../home/home';
import { InfoPage } from '../info/info';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = InfoPage;
  tab3Root = SettingsPage;
  //tab4Root = SettingsPage;

  constructor() {

  }
}
