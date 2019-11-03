import {Component, OnDestroy,  ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {InitMailService} from '../../services/init-mail.service';
import {Router} from '@angular/router';
import {FileUploader, FileItem} from 'ng2-file-upload';

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
    uploadFileMessage: string


    private _unsubscribeAll: Subject<any>;

    constructor(
        private _formBuilder: FormBuilder,
        private initMailService: InitMailService,
        private router: Router
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
                    console.log(this.form.getRawValue());
                },
                (error) => {
                    console.log('Error ! : ' + error);
                }
            );
    }


    uploadScanFile(): void {
        this.fileInput.nativeElement.click();

        const headers = [{name: 'Accept', value: 'application/json'}];
        this.uploader = new FileUploader({url: this.initMailService.uploadScanFileURI + '/'
                + this.form.controls['idDirectory'].value + '/'
                + this.form.controls['idEntry'].value, autoUpload: true, headers: headers});

        this.uploader.onAfterAddingFile = item => { // to allow cross origin
            item.withCredentials = false;
        };

        this.uploader.onCompleteAll = () =>  {

            // console.log(this.fileInput.nativeElement.files[0].name);
        };

        this.uploader.onSuccessItem = (item: FileItem, idScanFile: string, status: number) => {
            if (status === 200){
                this.scanFileName = this.fileInput.nativeElement.files[0].name;
                this.uploadFileMessage = 'Fichier chargé: ' + this.scanFileName;
                alert('le fichier a été chargé avec succès');
            }
            else{
                this.uploadFileMessage = 'Le fichier n\'a pas été charger, Veuillez réessayer';
                alert('erreur du téléchargement du fichier');
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

        console.log(this.form.getRawValue());

        this.initMailService.sendArrivedMailFormToBackend(this.form.getRawValue())
             .subscribe(
                 () => {
                     this.router.navigate(['arrivedMail-sc']);
                 },
                 (error) => {
                     console.log('Error ! : ' + error);
                 }
             );

    }

}
