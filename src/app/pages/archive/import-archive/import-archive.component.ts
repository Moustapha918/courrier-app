import {Component, ElementRef, Inject, LOCALE_ID, OnInit, ViewChild} from '@angular/core';
import {FileItem, FileUploader, ParsedResponseHeaders} from 'ng2-file-upload';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {DepartmentModel} from '../../../models/departement.model';
import {MatDialog} from '@angular/material/dialog';
import {InitMailService} from '../../../services/init-mail.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../../../services/notification.service';
import {LoadingService} from '../../../services/loading.service';
import {ReferentialService} from '../../../services/referential.service';
import {AuthService} from '../../../services/auth.service';
import {DateAdapter, MatDialogRef} from '@angular/material';
import {Subject} from 'rxjs';
import {DialogModel} from '../../confirm-dialog/confirm-dialog.component';
import {ErrorDilaogComponent} from '../../error-dilaog/error-dilaog.component';
import {SpinnerModalComponent} from '../../spinner-modal/spinner-modal.component';
import {ArchiveService} from '../../../services/archive.service';
import {ArchiveModel} from '../../../models/archive.model';
import {formatDate} from '@angular/common';
import {arch} from 'os';

@Component({
  selector: 'app-import-archive',
  templateUrl: './import-archive.component.html',
  styleUrls: ['./import-archive.component.scss']
})
export class ImportArchiveComponent implements OnInit {
    uploader: FileUploader;

    form: FormGroup;
    scanFileName: string;
    uploadFileMessage: string;
    departments: DepartmentModel[];
    listDirectories: string[] = [];
    autoDirectory: string;
    filteredOptions: any;
    @ViewChild('fileInput',  {static: false}) fileInput: ElementRef;
    private _unsubscribeAll: Subject<any>;
    constructor(
        public dialog: MatDialog,
        private _formBuilder: FormBuilder,
        private archiveService: ArchiveService,
        private router: Router,
        private notifyService: NotificationService,
        private activatedRoute: ActivatedRoute,
        private loadingService: LoadingService,
        private referentialService: ReferentialService,
        private notificationService: NotificationService,
        public auth: AuthService,
        private dateAdapter: DateAdapter<Date>,
        @Inject(LOCALE_ID) private locale: string

    ) {
        this._unsubscribeAll = new Subject();
        this.dateAdapter.setLocale('fr');
    }

  ngOnInit(): void {
      this.form = this._formBuilder.group({
          receptionDate: ['', Validators.required],
          idDirectory: ['', Validators.required],
          idEntry: ['', Validators.required],
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
  }

    private requireMatch(control: FormControl): ValidationErrors | null {
        const selection: any = control.value;
        if (this.listDirectories && this.listDirectories.indexOf(selection) < 0) {
            return { requireMatch: true };
        }
        return null;
    }

    validateArrivedMail(): void {
        const refDialog = this.loadingService.displaySpinner();

        const archive: ArchiveModel = new ArchiveModel();
        archive.type = 'ARRIVED';
        archive.idEntry = this.form.getRawValue().idEntry,
        archive.idDirectory = this.form.getRawValue().idDirectory,
        archive.subject = this.form.getRawValue().subject,
        archive.senderOrReceiver = this.form.getRawValue().sender,
        archive.dateCreation = formatDate(this.form.getRawValue().receptionDate, 'dd/MM/yyyy  HH:mm:ss', this.locale);
        // archive.dateCreation = this.form.getRawValue().receptionDate,
        archive.observations = null;
        archive.idScanFile = this.form.getRawValue().receptionDate.idScanFile;
        archive.dateCloture = Date.now().toString();
        archive.ampliations = '';
        archive.steps = [];
        archive.attachments = null;
        archive.idScanFile = this.form.getRawValue().idScanFile

        formatDate(this.form.getRawValue().receptionDate, 'dd/MM/yyyy  HH:mm:ss', this.locale);

        this.archiveService.addArchiveMail(archive)
            .subscribe(
                () => {
                    this.router.navigate(['../archive'], { relativeTo: this.activatedRoute });
                    refDialog.close();
                },
                (error) => {
                    refDialog.close();
                    this.notificationService.openSnackBar('Unne Erreur est survenu lors de la création du courrier', 'close');
                    const message = 'une erreur technique est survenue.  Veuillez réessayer ultérieurement';
                    const dialogData = new DialogModel('title', message);
                    const dialogRefError = this.dialog.open(ErrorDilaogComponent, {
                        width: '600px',
                        data: dialogData
                    });
                    dialogRefError.afterClosed().subscribe(result => {

                    });
                });
    }

    uploadScanFile(): void {
        let refDialog: MatDialogRef<SpinnerModalComponent, any>;
        this.fileInput.nativeElement.click();

        const headers = [{name: 'Accept', value: 'application/json'},
            {name: 'Authorization', value:  `Bearer ${this.auth.getToken()}`}];
        this.uploader = new FileUploader({url: this.archiveService.uploadScanFileURI + '/'
                + this.form.controls['idDirectory'].value + '/'
                + this.form.controls['idEntry'].value, allowedMimeType: ['application/pdf'],
            autoUpload: true, headers: headers});

        this.uploader.onAfterAddingFile = item => { // to allow cross origin
            item.withCredentials = false;
            refDialog = this.loadingService.displaySpinner();
        };


        this.uploader.onWhenAddingFileFailed = message => {
            console.log('onWhenAddingFileFailed', message);
            const errorMessage = 'format de fichier invalide';
            const dialogData = new DialogModel('Erreur', errorMessage);
            const dialogRefError = this.dialog.open(ErrorDilaogComponent, {
                width: '600px',
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
                    width: '600px',
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
                        width: '600px',
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
                        width: '600px',
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

}
