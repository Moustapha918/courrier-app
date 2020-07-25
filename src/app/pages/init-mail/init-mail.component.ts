import {Component, OnDestroy,  ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {InitMailService} from '../../services/init-mail.service';
import { NotificationService } from '../../services/notification.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FileUploader, FileItem, ParsedResponseHeaders} from 'ng2-file-upload';
import {LoadingService} from '../../services/loading.service';
import {MatDialogRef} from '@angular/material';
import {SpinnerModalComponent} from '../spinner-modal/spinner-modal.component';
import {ReferentialService} from '../../services/referential.service';
import {DepartmentModel} from '../../models/departement.model';
import {ErrorDilaogComponent} from '../error-dilaog/error-dilaog.component';
import {MatDialog} from '@angular/material/dialog';
import {DialogModel} from '../confirm-dialog/confirm-dialog.component';
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-init-mail',
    templateUrl: './init-mail.component.html',
    styleUrls: ['./init-mail.component.scss']
})
export class InitMailComponent implements OnInit, OnDestroy {

    // @ts-ignore
    @ViewChild('fileInput') fileInput: ElementRef;

    uploader: FileUploader;

    form: FormGroup;
    scanFileName: string;
    uploadFileMessage: string;
    departments: DepartmentModel[];

    private _unsubscribeAll: Subject<any>;

    constructor(
        public dialog: MatDialog,
        private _formBuilder: FormBuilder,
        private initMailService: InitMailService,
        private router: Router,
        private notifyService: NotificationService,
        private activatedRoute: ActivatedRoute,
        private loadingService: LoadingService,
        private referentialService: ReferentialService,
        private notificationService: NotificationService,
        public auth: AuthService
    ) {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {


        this.form = this._formBuilder.group({
            receptionDate: [
                {
                    value: '',
                    disabled: true
                }, Validators.required
            ],
            idDirectory: [
                {
                    value: '',
                    disabled: true
                }, Validators.required
            ],
            idEntry: [{
                value: '',
                disabled: true
            }, Validators.required
            ],
            idReceivedDocument: ['', Validators.required],
            dateReceivedDocument: [],
            subject: ['', Validators.required],
            sender: ['', Validators.required],
            attachments: [],
            observations: [],
            priorityDegree: [],
            inputScanFile: ['', Validators.required],
            idScanFile: [],

        });

        this.initMailService.getAutoGeneratedParamsFromBackend()
            .subscribe(
                (autoGeneratedParams) => {
                    this.form.controls['idDirectory'].setValue(autoGeneratedParams.idDirectory);
                    this.form.controls['receptionDate'].setValue(autoGeneratedParams.receptionDate);
                    this.form.controls['idEntry'].setValue(autoGeneratedParams.idEntry);
                    // console.log(this.form.getRawValue());
                },
                (error) => {
                    console.log('Error ! : ' + error);
                    const message = 'une erreur technique est survenue.  Veuillez réessayer ultérieurement';
                    const dialogData = new DialogModel('title', message);
                    const dialogRefError = this.dialog.open(ErrorDilaogComponent, {
                        width: '4000px',
                        data: dialogData,
                    });
                    dialogRefError.afterClosed();
                }
            );
    }


    uploadScanFile(): void {
        let refDialog: MatDialogRef<SpinnerModalComponent, any>;
        this.fileInput.nativeElement.click();


        const headers = [{name: 'Accept', value: 'application/json'},
            {name: 'Authorization', value:  `Bearer ${this.auth.getToken()}`}];
        this.uploader = new FileUploader({url: this.initMailService.uploadScanFileURI + '/'
                + this.form.controls['idDirectory'].value + '/'
                + this.form.controls['idEntry'].value, allowedMimeType: ['application/pdf'],
            autoUpload: true, headers: headers});

        this.uploader.onAfterAddingFile = item => { // to allow cross origin
            item.withCredentials = false;
            console.log('onAfterAddingFile');
            refDialog = this.loadingService.displaySpinner();
        };
        this.uploader.onCompleteAll = () =>  {
            console.log('onCompleteAll');
        };

        this.uploader.onWhenAddingFileFailed = message => {
            console.log('onWhenAddingFileFailed', message);
            const errorMessage = 'format de fichier invalide';
            const dialogData = new DialogModel('Erreur', errorMessage);
            const dialogRefError = this.dialog.open(ErrorDilaogComponent, {
                width: '1000px',
                data: dialogData
            });
            dialogRefError.afterClosed().subscribe(result => {

            });
        };

        this.uploader.onSuccessItem = (item: FileItem, idScanFile: string, status: number) => {
            if (status === 200){
                this.scanFileName = this.fileInput.nativeElement.files[0].name;
                this.uploadFileMessage = 'Fichier chargé: ' + this.scanFileName;
                this.notifyService.openSnackBar('le fichier a été chargé avec succès', 'Notification');
                // alert('le fichier a été chargé avec succès');
            }
            else{
                this.uploadFileMessage = 'Le fichier n\'a pas été charger, Veuillez réessayer';

                this.notifyService.openSnackBar('erreur du téléchargement du fichier', 'Notification');
                const message = 'une erreur technique est survenue.  Veuillez réessayer ultérieurement';
                const dialogData = new DialogModel('title', message);
                const dialogRefError = this.dialog.open(ErrorDilaogComponent, {
                    width: '4000px',
                    data: dialogData,
                });
                dialogRefError.afterClosed().subscribe(result => {
                    if (result === true) {
                    }
                });
            }
            this.uploader.onErrorItem = (errorItem: FileItem, errorIdScanFile: string, errorStatus: number, errorHeaders: ParsedResponseHeaders) => {
                if (status === 404){
                    const message = 'Le fichier est introuvable.  Veuillez réessayer ultérieurement';
                    const dialogData = new DialogModel('title', message);
                    const dialogRefError = this.dialog.open(ErrorDilaogComponent, {
                        width: '4000px',
                        data: dialogData
                    });
                    dialogRefError.afterClosed().subscribe(result => {
                        if (result === true) {
                        }
                    });
                }
                else{

                    const message = 'une erreur technique est survenue lors du chargement du fichier.  Veuillez réessayer ultérieurement';
                    const dialogData = new DialogModel('title', message);
                    const dialogRefError = this.dialog.open(ErrorDilaogComponent, {
                        width: '4000px',
                        data: dialogData
                    });
                    dialogRefError.afterClosed().subscribe(result => {
                        if (result === true) {
                        }
                    });
                }


            };


            if (refDialog){
                refDialog.close();
            }
            this.form.controls['idScanFile'].setValue(idScanFile);
        };



    }
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    validateArrivedMail(): void {

        // console.log(this.form.getRawValue());
        const refDialog = this.loadingService.displaySpinner();

        this.initMailService.sendArrivedMailFormToBackend(this.form.getRawValue())
             .subscribe(
                 () => {
                     this.router.navigate(['../arrivedMail-sc'], { relativeTo: this.activatedRoute });
                     refDialog.close();
                 },
                 (error) => {
                     refDialog.close();
                     this.notificationService.openSnackBar('Unne Erreur est survenu lors de la création du courrier', 'close');
                     const message = 'une erreur technique est survenue.  Veuillez réessayer ultérieurement';
                     const dialogData = new DialogModel('title', message);
                     const dialogRefError = this.dialog.open(ErrorDilaogComponent, {
                         width: '4000px',
                         data: dialogData
                     });
                     dialogRefError.afterClosed().subscribe(result => {

                     });
                 });
    }



}
