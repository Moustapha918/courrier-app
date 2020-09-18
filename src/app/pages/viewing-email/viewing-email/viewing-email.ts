import {Component, OnDestroy, OnInit} from '@angular/core';

import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {InitMailService} from '../../../services/init-mail.service';
import {ArrivedMailModel} from '../../../models/arrived-mail.model';
import {MatDialog} from '@angular/material';
import {VisualizePdfComponent} from '../../visualize-pdf/visualize-pdf.component';
import {ReferentialService} from '../../../services/referential.service';
import {TranslateService} from '@ngx-translate/core';
import {ConfirmDialogComponent, DialogModel} from '../../confirm-dialog/confirm-dialog.component';
import {ErrorDilaogComponent} from '../../error-dilaog/error-dilaog.component';
import {StepsModel} from '../../../models/stepsModel';
import {LoadingService} from '../../../services/loading.service';
import {NotificationService} from '../../../services/notification.service';
import {ArchiveService} from '../../../services/archive.service';
import {ArchiveModel} from '../../../models/archive.model';


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
    specificInstructions: any;
    codeDirectionList = [];


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
        private matDialog: MatDialog, private referentialService: ReferentialService, public translate: TranslateService,
        private notifyService: NotificationService, private notificationService: NotificationService, private archiveService: ArchiveService
    ) {
    }

    ngOnInit(): void {

        this.referentialService.getAnnotations().subscribe(
            annotations =>
                this.annotations = annotations
        );


        this.loadingService.displaySpinner();
        this.activatedRoute.params.subscribe(param => {
            console.log(param.archive);


            if (param.archive === 'arrived') {
                this.initMailService.getArrivedMail(param.id).subscribe(
                    arrivedMail => {
                        // console.log(arrivedMail);

                        this.mail = arrivedMail;
                        this.mailSteps = this.mail.steps;
                        this.loadingService.closeSpinner();

                    },
                    error => {
                        console.log('Error ! : ' + error);
                        const message = 'Le courrier est introuvable.  Veuillez réessayer ultérieurement';
                        const dialogData = new DialogModel('title', message);
                        const dialogRefError = this.dialog.open(ErrorDilaogComponent, {
                            width: '4000px',
                            data: dialogData
                        });
                        dialogRefError.afterClosed().subscribe(result => {
                        });
                    }
                );
            } else {
                this.archiveService.getArchiveMail(param.id).subscribe(
                    (archiveMail: ArchiveModel) => {

                        const archiveMailT = new ArchiveModel();
                        Object.assign(archiveMailT, archiveMail);

                        this.mail = archiveMailT.mapToArrivedMail();

                        this.mailSteps = this.mail.steps;
                        this.loadingService.closeSpinner();

                    },
                    error => {
                        console.log('Error ! : ' + error);
                        const message = 'Le courrier est introuvable.  Veuillez réessayer ultérieurement';
                        const dialogData = new DialogModel('title', message);
                        const dialogRefError = this.dialog.open(ErrorDilaogComponent, {
                            width: '4000px',
                            data: dialogData
                        });
                        dialogRefError.afterClosed().subscribe(result => {
                        });
                    }
                );

            }
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

        this.horizontalStepperStep4 = this._formBuilder.group({});


    }

    visualizeMailPDF(): void {
        this.matDialog.open(VisualizePdfComponent, {
            width: '90%',
            height: '95%',
            data: {mail: this.mail, type: 'arrived'}
            // data: this.mail
        });
    }


    annotateAndVentilate(): void {
        console.log(this.annotations.filter(ann => ann.value));
        this.steps.annotations = this.annotations.filter(ann => ann.value);

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

        return this.annotations.some(annotation => annotation.value) &&
            this.ventilationList.some(dir => dir.value);

    }

    translateLabel(ventilation: any): string {
        return this.translate.currentLang === 'ar' ? ventilation.labelAR : ventilation.labelFR;

    }

    closeMail(): void {

        this.steps.annotations = this.annotations.filter(ann => ann.value);
        const clotureAnnotation = {code: '99', labelFR: 'Clôture', labelAR: 'اغلاق'};
        this.steps.annotations.push(clotureAnnotation);
        this.steps.specificInstructions = this.specificInstructions;
        this.initMailService.closeMail(this.mail.idEntry, this.steps).subscribe(
            success => {

                console.log(success);
                this.notificationService.openSnackBar('Courrier bien clôturé', 'Notification');

                this.router.navigate(['arrivedMail-sc']);
            }, error => {
                console.log(error);
                const message = 'Une erreur technique est survenue lors du cloture du mail.  Veuillez réessayer ultérieurement';
                const dialogData = new DialogModel('title', message);
                this.dialog.open(ErrorDilaogComponent, {
                    width: '2500px',
                    data: dialogData
                });
            });
    }

    confirmCloseMail(): void {
        const message = this.translate.instant('mail.CLOSEMSGCONFIRMATION');

        const dialogData = new DialogModel(this.translate.instant('mail.CLOSECONFIRMATION'), message);

        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: '4000px',
            data: dialogData
        });
        dialogRef.afterClosed().subscribe(result => {

            if (result === true) {
                this.closeMail();
                this.loadingService.closeSpinner();
            }
        });

    }
}

