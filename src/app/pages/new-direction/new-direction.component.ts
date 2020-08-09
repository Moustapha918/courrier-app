import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FileUploader} from 'ng2-file-upload';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {ReferentialService} from '../../services/referential.service';
import {DirectionModel} from '../../models/direction.model';
import {DialogModel} from '../confirm-dialog/confirm-dialog.component';
import {TranslateService} from '@ngx-translate/core';
import {SpinnerModalComponent} from '../spinner-modal/spinner-modal.component';
import {LoadingService} from '../../services/loading.service';
import {ErrorDilaogComponent} from '../error-dilaog/error-dilaog.component';




@Component({
  selector: 'app-new-direction',
  templateUrl: './new-direction.component.html',
  styleUrls: ['./new-direction.component.scss']
})
export class NewDirectionComponent implements OnInit {


    form: FormGroup;
    title: any;

    private _unsubscribeAll: Subject<any>;



    constructor(
        public dialogRef: MatDialogRef<NewDirectionComponent>,
        public dialog: MatDialog,
        private _formBuilder: FormBuilder,
        public translate: TranslateService,
        private loadingService: LoadingService,
        private referentialService: ReferentialService,
        @Inject(MAT_DIALOG_DATA) public data: DirectionModel)
    {
        this._unsubscribeAll = new Subject();

    }


    // tslint:disable-next-line:typedef
  ngOnInit() {

        // titte of popup
      if (this.data != null) {
          this.title = this.translate.instant('REFERENTIAL.EDITDIRECTIONTITLE');
      }
      else{
          this.title = this.title = this.translate.instant('REFERENTIAL.ADDDIRRECTIONTITLE');
      }

      this.form = this._formBuilder.group({
          code: ['',
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
          address: [
              '',
              {
              value: '',

          }, Validators.required
          ],

      });

      // fill this form in Edit case
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
                    this.dialogRef.close(false);
                    let message: string;
                    if (error.status === 406){
                        message = 'Le code que vous avez choisi existe.  Veuillez choisir un autre code';
                    }
                    else{
                        message = 'une erreur technique est survenue.  Veuillez réessayer ultérieurement';
                    }
                    const dialogData = new DialogModel('title', message);
                    const dialogRefError = this.dialog.open(ErrorDilaogComponent, {
                        width: '600px',
                        data: dialogData
                    });
                    dialogRefError.afterClosed().subscribe(result => {

                    });
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
                        width: '600px',
                        data: dialogData
                    });
                    dialogRefError.afterClosed().subscribe(result => {

                    });
                }
            );

    }

    updateOrValidate(): void {

        if (this.data != null) {
            // setTimeout(() => { console.log('____________');  this.updateDirection()}, 10000)
            this.updateDirection();
            this.loadingService.displaySpinner();
        }
        else{
            this.validateDirection();
            this.loadingService.displaySpinner();
        }
    }

}
