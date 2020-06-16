import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {ReferentialService} from '../../services/referential.service';
import {MinisterOfficeModel} from '../../models/minister-office.model';
import {LoadingService} from '../../services/loading.service';
import {ConfirmDialogModel} from '../confirm-dialog/confirm-dialog.component';
import {ErrorDilaogComponent} from '../error-dilaog/error-dilaog.component';

@Component({
  selector: 'app-new-cabinet-minstre',
  templateUrl: './new-cabinet-minstre.component.html',
  styleUrls: ['./new-cabinet-minstre.component.scss']
})
export class NewCabinetMinstreComponent implements OnInit {

    form: FormGroup;
    title: any;
    private _unsubscribeAll: Subject<any>;


  constructor(public dialogRef: MatDialogRef<NewCabinetMinstreComponent>,
              public dialog: MatDialog,
              private _formBuilder: FormBuilder,
              private translate: TranslateService,
              private referentialService: ReferentialService,
              private loadingService: LoadingService,
              @Inject(MAT_DIALOG_DATA) public data: MinisterOfficeModel)
  {
      this._unsubscribeAll = new Subject();
  }

    // tslint:disable-next-line:typedef
  ngOnInit() {
        // title of popup
      if (this.data != null) {
          this.title = this.translate.instant('REFERENTIAL.EDITMINISTEROFFICETITLE');
      }
      else{
          this.title = this.title = this.translate.instant('REFERENTIAL.ADDMINISTEROFFICETITLE');
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

    validateMinisterOffice(): void {

        console.log(this.form.getRawValue());

        this.referentialService.sendMinisterOfficeFormToBackend(this.form.getRawValue())
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

    updateMisterOffice(): void {

        console.log(this.form.getRawValue());

        this.referentialService.updateMinisterOffice(this.form.getRawValue())
            .subscribe(
                () => {
                    this.dialogRef.close(this.form.getRawValue());
                    this.dialogRef.close(true);
                    console.log('succes');
                },

                (error) => {
                    const message = 'une erreur technique est survenue.  Veuillez réessayer ultérieurement';
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
            this.updateMisterOffice();
            this.loadingService.displaySpinner();
        }
        else{
            this.validateMinisterOffice();
            this.loadingService.displaySpinner();
        }

    }


}
