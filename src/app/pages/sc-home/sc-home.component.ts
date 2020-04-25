import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoadingService} from '../../services/loading.service';





@Component({
  selector: 'app-sc-home',
  templateUrl: './sc-home.component.html',
  styleUrls: ['./sc-home.component.scss']
})
export class ScHomeComponent implements OnInit {

    constructor(private router: Router, private loadingService: LoadingService ) {}

  ngOnInit(): void {


  }

    goToArrivedMail(): void {
        this.loadingService.displaySpinner();
        this.router.navigate(['arrivedMail-sc']);
    }

}
