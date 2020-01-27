import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-sc-home',
  templateUrl: './sc-home.component.html',
  styleUrls: ['./sc-home.component.scss']
})
export class ScHomeComponent implements OnInit {




     /* param = {value: 'world'};*/

    // tslint:disable-next-line:adjacent-overload-signatures
    constructor( ) {


       /* // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('ar');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('ar');*/
    }


    // tslint:disable-next-line:typedef
  ngOnInit() {
  }

}
