import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';





@Component({
  selector: 'app-sc-home',
  templateUrl: './sc-home.component.html',
  styleUrls: ['./sc-home.component.scss']
})
export class ScHomeComponent implements OnInit {

    // tslint:disable-next-line:adjacent-overload-signatures
    constructor(private router: Router ) {}

    // tslint:disable-next-line:typedef
  ngOnInit() {
  }

    goToArrivedMail(): void {
        this.router.navigate(['sc-workflow/arrivedMail-sc']);
    }
}
