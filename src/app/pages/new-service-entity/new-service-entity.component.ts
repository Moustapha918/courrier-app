import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ReferentialService} from '../../services/referential.service';
import {FileUploader} from 'ng2-file-upload';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ServiceEntityModel} from '../../models/service-entity.model';
import {DirectionModel} from '../../models/direction.model';
import {TranslateService} from '@ngx-translate/core';
import {LoadingService} from '../../services/loading.service';
import {DialogModel} from '../confirm-dialog/confirm-dialog.component';
import {ErrorDilaogComponent} from '../error-dilaog/error-dilaog.component';





@Component({
  selector: 'app-new-service-entity',
  templateUrl: './new-service-entity.component.html',
  styleUrls: ['./new-service-entity.component.scss']
})
export class NewServiceEntityComponent implements OnInit {

    form: FormGroup;
    title: any;


    private _unsubscribeAll: Subject<any>;
    public directions: DirectionModel[];



    constructor(
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<NewServiceEntityComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ServiceEntityModel,
        private _formBuilder: FormBuilder,
        public translate: TranslateService,
        private referentialService: ReferentialService,
        private loadingService: LoadingService,
        private router: Router)
    {
        this._unsubscribeAll = new Subject();

    }


    onNoClick(): void {
        this.dialogRef.close();

    }

    // tslint:disable-next-line:typedef
    ngOnInit() {

        // chane the title of popup

        if (this.data != null) {
            this.title = this.translate.instant('REFERENTIAL.EDITSERVICETITLE');
        }
        else{
            this.title = this.title = this.translate.instant('REFERENTIAL.ADDSERVICETITLE');
        }


        // POUR LA LISTE DEROULANTE DES DIRECTIONS
        this.referentialService.getAllDirectionsFromBackend().subscribe(
            data => this.directions = data
        );


        this.form = this._formBuilder.group({
            code: ['',
                {
                    value: '',
                }, Validators.required
            ],
            codeDirection: [,
                {
                    value: '',
                }, Validators.required
            ],
            labelAR: ['',
                {
                    value: '',

                }, Validators.required
            ],
            labelFR: ['',
                {
                    value: '',

                }, Validators.required
            ],
            address: ['',
                {
                value: '',

            }, Validators.required
            ],


        });
        if (this.data != null) {

            delete this.data.id;
            this.form.controls['code'].setValue(this.data.code);
            this.form.controls['codeDirection'].setValue(this.data.codeDirection);
            this.form.controls['labelAR'].setValue(this.data.labelAR);
            this.form.controls['labelFR'].setValue(this.data.labelFR);
            this.form.controls['address'].setValue(this.data.address);
            /*this.form.setValue( this.data);*/
            this.form.controls['code'].disable();
        }

    }


    // tslint:disable-next-line:use-lifecycle-interface
    ngOnDestroy(): void {
    }

    validateServiceEntity(): void {

        console.log(this.form.getRawValue());

        this.referentialService.sendServiceEntityFormToBackend(this.form.getRawValue())
            .subscribe(
                () => {
                    this.dialogRef.close();
                    this.dialogRef.close(true);
                    console.log('succes');
                },

                (error) => {
                    console.log('Error ! : ' + error);
                    this.dialogRef.close(false);
                    console.log('Error ! : ' , error.status);
                    let message: string;
                    if (error.status === 406){
                        message = 'Le code que vous avez choisi existe.  Veuillez choisir un autre code';
                    }
                    else{
                        message = 'une erreur technique est survenue.  Veuillez réessayer ultérieurement';
                    }
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

    updateServiceEntity(): void {

        console.log(this.form.getRawValue());

        this.referentialService.updateServiceEntity(this.form.getRawValue())
            .subscribe(
                () => {
                    this.dialogRef.close(this.form.getRawValue());
                    this.dialogRef.close(true);
                    console.log('succes');
                },

                (error) => {
                    console.log('Error ! : ' + error);
                    this.dialogRef.close(false);
                    console.log('Error ! : ' , error.status);
                    let message: string;
                    if (error.status === 406){
                        message = 'Le code que vous avez choisi existe.  Veuillez choisir un autre code';
                    }
                    else{
                        message = 'une erreur technique est survenue.  Veuillez réessayer ultérieurement';
                    }
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

    updateOrValidate(): void {
        if (this.data != null) {
            this.updateServiceEntity();
            this.loadingService.displaySpinner();
        }
        else{
            this.validateServiceEntity();
            this.loadingService.displaySpinner();
        }

    }


}
