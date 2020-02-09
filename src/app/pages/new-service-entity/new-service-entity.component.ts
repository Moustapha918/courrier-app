import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ReferentialService} from '../../services/referential.service';
import {FileUploader} from 'ng2-file-upload';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';




export interface DirectionCst {
    code: '1';
    label: 'Libellé Direction';
    address: 'Adresse';
}

@Component({
  selector: 'app-new-service-entity',
  templateUrl: './new-service-entity.component.html',
  styleUrls: ['./new-service-entity.component.scss']
})
export class NewServiceEntityComponent implements OnInit {

    // @ts-ignore
    @ViewChild('fileInput') fileInput: ElementRef;

    uploader: FileUploader;

    form: FormGroup;

    private _unsubscribeAll: Subject<any>;



    constructor(
        public dialogRef: MatDialogRef<NewServiceEntityComponent>,
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
            codeDirection: ['',
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

    validateDirection(): void {

        console.log(this.form.getRawValue());

        this.referentialService.sendServiceEntityFormToBackend(this.form.getRawValue())
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
