import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';





@Component({
  selector: 'app-sc-home',
  templateUrl: './sc-home.component.html',
  styleUrls: ['./sc-home.component.scss']
})
export class ScHomeComponent implements OnInit {

    constructor(private router: Router ) {}

  ngOnInit(): void {
  }

    goToArrivedMail(): void {
        this.router.navigate(['arrivedMail-sc']);
    }
}
