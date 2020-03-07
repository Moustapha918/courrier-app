import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FileUploader} from 'ng2-file-upload';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {ReferentialService} from '../../services/referential.service';
import {DepartmentModel} from '../../models/departement.model';



@Component({
  selector: 'app-new-departement',
  templateUrl: './new-departement.component.html',
  styleUrls: ['./new-departement.component.scss']
})
export class NewDepartementComponent implements OnInit {

    // @ts-ignore
    @ViewChild('fileInput') fileInput: ElementRef;

    uploader: FileUploader;

    form: FormGroup;

    private _unsubscribeAll: Subject<any>;
    private directions: any;



    constructor(
        public dialogRef: MatDialogRef<NewDepartementComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DepartmentModel,
        private _formBuilder: FormBuilder,
        private referentialService: ReferentialService,
        private router: Router)
    {
        this._unsubscribeAll = new Subject();

    }


    onNoClick(): void {
        this.dialogRef.close();

    }
    // tslint:disable-next-line:typedef
    ngOnInit() {
        this.directions = this.referentialService.getAllDirectionsFromBackend().subscribe(
            data => this.directions = data
        );
        this.form = this._formBuilder.group({
            code: ['',
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

    validateDepartment(): void {

        console.log(this.form.getRawValue());

        this.referentialService.sendDepartementFormToBackend(this.form.getRawValue())
            .subscribe(
                () => {
                    this.dialogRef.close();
                    console.log('succes');
                },

                (error) => {
                    console.log('Error ! : ' + error);
                }
            );

    }

    updateDepartment(): void {

        console.log(this.form.getRawValue());

        this.referentialService.updateDepartement(this.form.getRawValue())
            .subscribe(
                () => {
                    this.dialogRef.close(this.form.getRawValue());
                    console.log('succes');
                },

                (error) => {
                    console.log('Error ! : ' + error);
                }
            );
    }

    updateOrValidate(): void {
        if (this.data != null) {
            return this.updateDepartment();
        }
        else{
            return this.validateDepartment();
        }

    }


}
