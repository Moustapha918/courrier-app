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
import {DialogModel} from '../../confirm-dialog/confirm-dialog.component';
import {ErrorDilaogComponent} from '../../error-dilaog/error-dilaog.component';
import {StepsModel} from '../../../models/stepsModel';
import {DirectionModel} from '../../../models/direction.model';
import {ServiceEntityModel} from '../../../models/service-entity.model';
import {DivisionModel} from '../../../models/division.model';
import {LoadingService} from '../../../services/loading.service';


@Component({
    selector: 'viewing-email',
    templateUrl: './viewing-email.html',
    styleUrls: ['./viewing-email.scss']
})
export class ViewingEmailComponent implements OnInit {

    horizontalStepperStep1: FormGroup;
    horizontalStepperStep2: FormGroup;
    horizontalStepperStep3: FormGroup;
    horizontalStepperStep4: FormGroup;

    form: FormGroup;
    mail: ArrivedMailModel = new ArrivedMailModel();
    mailSteps: StepsModel[];
    steps: StepsModel = new StepsModel();
    annotations: any;
    ventilationList: any;
    index1: any;
    index2: any;
    specificInstructions: any;
    codeDirectionList = [];
    direc5tion: any;
    ventilationsDirections: DirectionModel[] = [];
    ventilationsSecrvices: ServiceEntityModel[] = [];
    ventilationsDivision: DivisionModel[] = [];




    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     */
    constructor(
        public dialog: MatDialog,
        private _fuseSidebarService: FuseSidebarService,
        private activatedRoute: ActivatedRoute, private  initMailService: InitMailService,
        private _formBuilder: FormBuilder, private router: Router, private loadingService: LoadingService,
        private matDialog: MatDialog, private referentialService: ReferentialService, public translate: TranslateService
    )
    {

    }

    ngOnInit(): void {

        this.annotations = this.initMailService.annotations;
        this.index1 = this.initMailService.index1;
        this.index2 = this.initMailService.index2;
        this.loadingService.displaySpinner();
        this.activatedRoute.params.subscribe(param => {
            // console.log(param);
            this.initMailService.getArrivedMail(param.id).subscribe(

                arrivedMail => {
                    // console.log(arrivedMail);

                    this.mail = arrivedMail;
                    this.mailSteps = this.mail.steps;
                    this.loadingService.closeSpinner();

                },
                error => {
                    console.log('Error ! : ' + error);
                    const message = 'une erreur technique est survenue lors de la suppression de la direction.  Veuillez réessayer ultérieurement';
                    const dialogData = new DialogModel('title', message);
                    const dialogRefError = this.dialog.open(ErrorDilaogComponent, {
                        width: '4000px',
                        data: dialogData
                    });
                    dialogRefError.afterClosed().subscribe(result => {
                    });
                }
            );
        });

        this.referentialService.getVentilationList()
            .subscribe(
                dirs => {
                    // console.log(dirs);
                    this.ventilationList = dirs;
                },
                (error) => {
                    console.log('Error ! : ' + error);
                    const message = 'une erreur technique est survenue';
                    const dialogData = new DialogModel('title', message);
                    const dialogRefError = this.dialog.open(ErrorDilaogComponent, {
                        width: '600px',
                        data: dialogData
                    });
                    dialogRefError.afterClosed().subscribe(result => {

                    });
                }
            );




        this.horizontalStepperStep1 = this._formBuilder.group({});

        this.horizontalStepperStep2 = this._formBuilder.group({});

        this.horizontalStepperStep3 = this._formBuilder.group({});

        this.horizontalStepperStep4 = this._formBuilder.group({
        });


    }

    visualizeMailPDF(): void {
        this.matDialog.open(VisualizePdfComponent, {
            width: '90%',
            height: '95%',
            data: this.mail
        });
    }


    annotateAndVentilate(): void {
        console.log(this.annotations.filter(ann => ann.value));
        this.steps.annotations = this.annotations.filter(ann => ann.value);
        console.log(this.steps.annotations);

     /*   for (const direction of this.directions.filter(dir => dir.value)){
            this.codeDirectionList.push(direction.code);
        }*/
        console.log(this.codeDirectionList);
        this.steps.ventilations = this.ventilationList.filter(dir => dir.value);
        this.steps.specificInstructions = this.specificInstructions;

        console.log(this.steps);
        this.initMailService.annotateAndVentilate(this.mail, this.steps).subscribe(data => {
                this.router.navigate(['../../arrivedMail-sc'], {relativeTo: this.activatedRoute});
                this.loadingService.displaySpinner();
            },
            error => {
                console.log(error);
                const message = 'une erreur technique est survenue lors de la suppression de la direction.  Veuillez réessayer ultérieurement';
                const dialogData = new DialogModel('title', message);
                const dialogRefError = this.dialog.open(ErrorDilaogComponent, {
                    width: '4000px',
                    data: dialogData
                });
            });
        }

    canConfirm(): boolean {
        if (!this.annotations || !this.ventilationList) {
            return false;
        }

        return  this.annotations.some( annotation => annotation.value) &&
            this.ventilationList.some(dir => dir.value);

    }

    translateLabel(ventilation: any): string {
        return this.translate.currentLang === 'ar' ? ventilation.labelAR : ventilation.labelFR;

    }
}
