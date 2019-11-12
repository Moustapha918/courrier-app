import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {map, takeUntil} from 'rxjs/operators';
import {FuseUtils} from '../../../@fuse/utils';
import {BehaviorSubject, merge, Observable, Subject} from 'rxjs';
import {fuseAnimations} from '../../../@fuse/animations';
import {ArrivedMailModelModel} from '../../models/arrived-mail.model';
import {InitMailService} from '../../services/init-mail.service';
import {DataSource} from '@angular/cdk/typings/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';



@Component({
  selector: 'app-arrived-mail-sc',
  templateUrl: './arrived-mail-sc.component.html',
  styleUrls: ['./arrived-mail-sc.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ArrivedMailScComponent {


    arrivedMails: ArrivedMailModelModel[];
    displayedColumns: string[] = ['idEntry', 'subject', 'sender', 'receptionDate'];



    constructor(private initMailService: InitMailService)
    {

    }


    /**
     * On init
     */

    // tslint:disable-next-line:use-lifecycle-interface
    ngOnInit(): void{


        this.initMailService.getAllArrivedMailsFromBackend()
            .subscribe(
                (allArrivedMAils) => {
                    this.arrivedMails = allArrivedMAils;
                },
                (error) => {
                    console.log('Error ! : ' + error);
                }
            );

    }


}




