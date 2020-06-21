import { Component, OnDestroy, OnInit } from '@angular/core';

import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {InitMailService} from '../../../services/init-mail.service';
import {ArrivedMailModel} from '../../../models/arrived-mail.model';
import {MatDialog} from '@angular/material';
import {VisualizePdfComponent} from '../../visualize-pdf/visualize-pdf.component';
import {ReferentialService} from '../../../services/referential.service';
import {TranslateService} from '@ngx-translate/core';
import {ConfirmDialogModel} from '../../confirm-dialog/confirm-dialog.component';
import {ErrorDilaogComponent} from '../../error-dilaog/error-dilaog.component';


@Component({
    selector   : 'viewing-email',
    templateUrl: './viewing-email.html',
    styleUrls  : ['./viewing-email.scss']
})
export class ViewingEmailComponent implements OnInit
{

    horizontalStepperStep1: FormGroup;
    horizontalStepperStep2: FormGroup;
    horizontalStepperStep3: FormGroup;

    form: FormGroup;
    mail: ArrivedMailModel = new ArrivedMailModel();
    annotations: any;
    directions: any;
    index1: any;
    index2: any;
    specificInstructions: any;


    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     */
    constructor(
        public dialog: MatDialog,
        private _fuseSidebarService: FuseSidebarService,
        private activatedRoute: ActivatedRoute, private  initMailService: InitMailService,
        private _formBuilder: FormBuilder, private router: Router,
        private matDialog: MatDialog, private referentialService: ReferentialService, public translate: TranslateService
    )
    {

    }

    ngOnInit(): void {

        this.annotations = this.initMailService.annotations;
        this.index1 = this.initMailService.index1;
        this.index2 = this.initMailService.index2;

        this.activatedRoute.params.subscribe( param => {
            // console.log(param);
            this.initMailService.getArrivedMail(param.id).
            subscribe(
                arrivedMail => {
                    // console.log(arrivedMail);
                    this.mail = arrivedMail;
                },
                error => {
                    console.log('Error ! : ' + error);
                    const message = 'une erreur technique est survenue lors de la suppression de la direction.  Veuillez réessayer ultérieurement';
                    const dialogData = new ConfirmDialogModel('title', message);
                    const dialogRefError = this.dialog.open(ErrorDilaogComponent, {
                        width: '4000px',
                        data: dialogData
                    });
                    dialogRefError.afterClosed().subscribe(result => {
                    });
                }
            );
        });

        this.referentialService.getAllDirectionsFromBackend()
            .subscribe(
                dirs => {
                    // console.log(dirs);
                    this.directions = dirs;
                },
                (error) => {
                    console.log('Error ! : ' + error);
                    const message = 'une erreur technique est survenue lors de la suppression de la direction.  Veuillez réessayer ultérieurement';
                    const dialogData = new ConfirmDialogModel('title', message);
                    const dialogRefError = this.dialog.open(ErrorDilaogComponent, {
                        width: '4000px',
                        data: dialogData
                    });
                    dialogRefError.afterClosed().subscribe(result => {
                        
                    });
                }
            );


        this.horizontalStepperStep1 = this._formBuilder.group({
        });

        this.horizontalStepperStep2 = this._formBuilder.group({

        });

        this.horizontalStepperStep3 = this._formBuilder.group({
        });


    }

    visualizeMailPDF(): void{
        this.matDialog.open(VisualizePdfComponent, {
            width: '90%',
            height: '95%',
            data: this.mail
        });
    }


    annotateAndVentilate(): void {
        this.mail.directions = this.directions.filter(dir => dir.value);
        this.mail.annotations = this.annotations.filter( ann => ann.value);
        this.mail.specificInstructions = this.specificInstructions;
        console.log(this.mail);
        this.initMailService.annotateAndVentilate(this.mail).subscribe( data => {
            this.router.navigate(['../../arrivedMail-sc'], { relativeTo: this.activatedRoute });
        },
                error => console.log(error));
        const message = 'une erreur technique est survenue lors de la suppression de la direction.  Veuillez réessayer ultérieurement';
        const dialogData = new ConfirmDialogModel('title', message);
        const dialogRefError = this.dialog.open(ErrorDilaogComponent, {
            width: '4000px',
            data: dialogData
        });
        dialogRefError.afterClosed().subscribe(result => {

        });

    }

    canConfirm(): boolean {
        if (!this.annotations || !this.directions) {
            return false;
        }
        return  this.annotations.some( annotation => annotation.value) &&
            this.directions.some(dir => dir.value);

    }

}
