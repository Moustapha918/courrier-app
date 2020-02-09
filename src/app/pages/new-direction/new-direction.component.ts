import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FileUploader} from 'ng2-file-upload';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {ReferentialService} from '../../services/referential.service';
import {DirectionModel} from '../../models/direction.model';




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
        private router: Router)
    {
        this._unsubscribeAll = new Subject();

    }


    onNoClick(): void {


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

  }

    // tslint:disable-next-line:use-lifecycle-interface
    ngOnDestroy(): void {
    }

    validateDirection(): void {

        console.log(this.form.getRawValue());

        this.referentialService.sendDirectionFormToBackend(this.form.getRawValue())
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
