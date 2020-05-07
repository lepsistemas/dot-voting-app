import { Component } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  language: string;

  constructor(public electronService: ElectronService, private translate: TranslateService) {
    this.language = 'pt-BR';
    translate.setDefaultLang('pt-BR');
  }
  
  setLanguage(language: string) {
    this.language = language;
    this.translate.setDefaultLang(this.language);
  }

}
