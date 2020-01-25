import { Component, OnInit } from '@angular/core';
// @ts-ignore
import { NotificationService } from '../srvices/notification.service';



@Component({
  selector: 'app-sc-home',
  templateUrl: './sc-home.component.html',
  styleUrls: ['./sc-home.component.scss']
})
export class ScHomeComponent implements OnInit {


     /* param = {value: 'world'};*/


    // tslint:disable-next-line:adjacent-overload-signatures
    constructor(private notifyService: NotificationService ) {

       /* // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('ar');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('ar');*/
    }
    // tslint:disable-next-line:typedef
    showToaster(){
        this.notifyService.showSuccess('Data shown successfully !!', 'Notification');
    }

    // tslint:disable-next-line:typedef
  ngOnInit() {
  }

}
