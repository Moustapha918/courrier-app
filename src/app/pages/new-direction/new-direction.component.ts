import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FileUploader} from 'ng2-file-upload';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {ReferentialService} from '../../services/referential.service';
import {DirectionModel} from '../../models/direction.model';
import {ConfirmDialogModel} from '../confirm-dialog/confirm-dialog.component';




@Component({
  selector: 'app-new-direction',
  templateUrl: './new-direction.component.html',
  styleUrls: ['./new-direction.component.scss']
})
export class NewDirectionComponent implements OnInit {


    form: FormGroup;

    private _unsubscribeAll: Subject<any>;



    constructor(
        public dialogRef: MatDialogRef<NewDirectionComponent>,
        private _formBuilder: FormBuilder,
        private referentialService: ReferentialService,
        @Inject(MAT_DIALOG_DATA) public data: DirectionModel)
    {
        this._unsubscribeAll = new Subject();

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
          address: [
              '',
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


    validateDirection(): void {

        console.log(this.form.getRawValue());

        this.referentialService.sendDirectionFormToBackend(this.form.getRawValue())
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

    updateDirection(): void {

        console.log(this.form.getRawValue());

        this.referentialService.updateDirection(this.form.getRawValue())
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
            return this.updateDirection();
        }
        else{
            return this.validateDirection();
        }

    }

}
