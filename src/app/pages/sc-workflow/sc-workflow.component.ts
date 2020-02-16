import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';

@Component({
  selector: 'app-sc-workflow',
  templateUrl: './sc-workflow.component.html',
  styleUrls: ['./sc-workflow.component.scss']
})
export class ScWorkflowComponent implements OnInit {

    activeIndex = 0;

  constructor(private router: Router) { }

  ngOnInit(): void{

     if (this.router.url.match('sc-workflow')){
         this.activeIndex = 1;
     }

     if (this.router.url.match('referentiel')){
         this.activeIndex = 3;
     }


  }

    goToReferentiel($event: any): void {
      // this.router.url = 'referentiel';
        //

        console.log('clicked ---------------------', $event.index);
        if ($event.index === 4){
            this.router.navigate(['../sc-workflow/referentiel']);

            // if (this.router.url.match('../sc-workflow/referentiel/division')){
            //     this.router.navigate(['../sc-workflow/referentiel/division']);
            //     console.log(this.router.url);
            // }
        }
        if ($event.index === 1){
            this.router.navigate(['../sc-workflow/arrivedMail-sc']);

            // if (this.router.url.match('../sc-workflow/referentiel/division')){
            //     this.router.navigate(['../sc-workflow/referentiel/division']);
            //     console.log(this.router.url);
            // }
        }

    }
}
