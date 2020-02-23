import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ReferentialService} from '../../services/referential.service';
import {FileUploader} from 'ng2-file-upload';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subject} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ServiceEntityModel} from '../../models/service-entity.model';
import {DirectionModel} from '../../models/direction.model';





@Component({
  selector: 'app-new-service-entity',
  templateUrl: './new-service-entity.component.html',
  styleUrls: ['./new-service-entity.component.scss']
})
export class NewServiceEntityComponent implements OnInit {






    form: FormGroup;


    private _unsubscribeAll: Subject<any>;
    private directions: DirectionModel[];



    constructor(
        public dialogRef: MatDialogRef<NewServiceEntityComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ServiceEntityModel,
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



        this.referentialService.getAllDirectionsFromBackend().subscribe(
            data => this.directions = data
        );
        console.log(this.directions);

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
                }
            );
    }

    updateOrValidate(): void {
        if (this.data != null) {
            return this.updateServiceEntity();
        }
        else{
            return this.validateServiceEntity();
        }

    }


}
