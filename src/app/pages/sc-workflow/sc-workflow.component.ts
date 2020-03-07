import { Component, OnInit } from '@angular/core';
import {MatTabChangeEvent} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sc-workflow',
  templateUrl: './sc-workflow.component.html',
  styleUrls: ['./sc-workflow.component.scss']
})
export class ScWorkflowComponent implements OnInit {
    activeIndex = 0;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

    goToReferentiel($event: MatTabChangeEvent): void {

      console.log($event);

        if ($event.index === 4){
            // this.router.navigate(['../sc-workflow/referentiel']);
            this.router.navigate([{outlets: {ref: 'referentiel'}}]);

            // if (this.router.url.match('../sc-workflow/referentiel/division')){
            //     this.router.navigate(['../sc-workflow/referentiel/division']);
            //     console.log(this.router.url);
            // }
        }
     /*   if ($event.index === 1){
            this.router.navigate(['../sc-workflow/arrivedMail-sc']);
        }*/

    }
}
