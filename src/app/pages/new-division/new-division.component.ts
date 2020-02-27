import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReferentialService} from '../../services/referential.service';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {DivisionModel} from '../../models/division.model';
import {DirectionModel} from '../../models/direction.model';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-new-division',
  templateUrl: './new-division.component.html',
  styleUrls: ['./new-division.component.scss']
})
export class NewDivisionComponent implements OnInit {

    form: FormGroup;
    title: any;

    private _unsubscribeAll: Subject<any>;
    private directions: DirectionModel[];

    constructor(
        public dialogRef: MatDialogRef<NewDivisionComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DivisionModel,
        private _formBuilder: FormBuilder,
        private translate: TranslateService,
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
            label: ['',
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
            this.form.setValue( this.data);
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
                    console.log('Error ! : ' + error);
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
                    console.log('Error ! : ' + error);
                }
            );
    }

    updateOrValidate(): void {
        if (this.data != null) {
            return this.updateDivision();
        }
        else{
            return this.validateDivision();
        }

    }

}
