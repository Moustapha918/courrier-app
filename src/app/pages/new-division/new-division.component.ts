import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReferentialService} from '../../services/referential.service';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {DivisionModel} from '../../models/division.model';
import {DirectionModel} from '../../models/direction.model';
import {TranslateService} from '@ngx-translate/core';
import {ServiceEntityModel} from '../../models/service-entity.model';
import {MatSelectChange} from '@angular/material/select';
import {LoadingService} from '../../services/loading.service';
import {ConfirmDialogModel} from '../confirm-dialog/confirm-dialog.component';
import {ErrorDilaogComponent} from '../error-dilaog/error-dilaog.component';


@Component({
  selector: 'app-new-division',
  templateUrl: './new-division.component.html',
  styleUrls: ['./new-division.component.scss']
})
export class NewDivisionComponent implements OnInit {

    form: FormGroup;
    title: any;

    private _unsubscribeAll: Subject<any>;
    public directions: DirectionModel[];
    public services: ServiceEntityModel[];

    constructor(
        public dialog: MatDialog,
        public dialogRef: MatDialogRef<NewDivisionComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DivisionModel,
        private _formBuilder: FormBuilder,
        public translate: TranslateService,
        private loadingService: LoadingService,
        private referentialService: ReferentialService,
        private router: Router)
    {
        this._unsubscribeAll = new Subject();

    }

    // tslint:disable-next-line:typedef
    ngOnInit() {

        // FOR FILL TITLE
        if (this.data != null) {
            this.title = this.translate.instant('REFERENTIAL.EDITDIVISIONTITLE');
        }
        else{
            this.title = this.title = this.translate.instant('REFERENTIAL.ADDDIVISIONTITLE');
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
            codeDirection: ['',
                {
                    value: '',
                }, Validators.required
            ],
            codeService: ['',
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
        console.log(this.data);
        this.referentialService.getAllServiceEntityFromBackend().subscribe(
            data => this.services = data
        );


        if (this.data != null) {

            delete this.data.id;
            this.form.controls['code'].setValue(this.data.code);
            this.form.controls['codeDirection'].setValue(this.data.codeDirection);
            this.form.controls['codeService'].setValue(this.data.codeService);
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

    validateDivision(): void {

        console.log(this.form.getRawValue());

        this.referentialService.sendDivisionFormToBackend(this.form.getRawValue())
            .subscribe(
                () => {
                    this.dialogRef.close();
                    this.dialogRef.close(true);
                    console.log('success');
                },

                (error) => {
                    this.dialogRef.close(false);
                    console.log('Error ! : ' , error.status);
                    let message: string;
                    if (error.status === 406){
                        message = 'Le code que vous avez choisi existe.  Veuillez choisir un autre code';
                    }
                    else{
                        message = 'une erreur technique est survenue.  Veuillez réessayer ultérieurement';
                    }
                    const dialogData = new ConfirmDialogModel('title', message);
                    const dialogRefError = this.dialog.open(ErrorDilaogComponent, {
                        width: '4000px',
                        data: dialogData
                    });
                    dialogRefError.afterClosed().subscribe(result => {

                    });
                }
            );
    }

    updateDivision(): void {

        console.log(this.form.getRawValue());

        this.referentialService.updateDivision(this.form.getRawValue())
            .subscribe(
                () => {
                    this.dialogRef.close(this.form.getRawValue());
                    this.dialogRef.close(true);
                    console.log('succes');
                },

                (error) => {
                    this.dialogRef.close(false);
                    console.log('Error ! : ' , error.status);
                    let message: string;
                    if (error.status === 406){
                        message = 'Le code que vous avez choisi existe.  Veuillez choisir un autre code';
                    }
                    else{
                        message = 'une erreur technique est survenue.  Veuillez réessayer ultérieurement';
                    }
                    const dialogData = new ConfirmDialogModel('title', message);
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
            this.updateDivision();
            this.loadingService.displaySpinner();
        }
        else{
            this.validateDivision();
            this.loadingService.displaySpinner();
        }

    }

    // for dropdown list
    updateServices($event: MatSelectChange): void{
        this.referentialService.getServiceByCodeDirection($event.value).subscribe((services) => {
            this.services = services;
        });

        console.log($event.value);

    }
}
