import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FileUploader} from 'ng2-file-upload';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {ReferentialService} from '../../services/referential.service';




export interface DirectionCst {
    code: '1';
    label: 'Libellé Direction';
    address: 'Adresse';

}

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



    constructor(
        public dialogRef: MatDialogRef<NewDepartementComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DirectionCst,
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

    }

    // tslint:disable-next-line:use-lifecycle-interface
    ngOnDestroy(): void {
    }

    validateDepartement(): void {

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


}
