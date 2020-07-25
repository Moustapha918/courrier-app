import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {ReferentialService} from '../../services/referential.service';
import {GeneralSecretaryModel} from '../../models/general-secretary.model';
import {LoadingService} from '../../services/loading.service';
import {DialogModel} from '../confirm-dialog/confirm-dialog.component';
import {ErrorDilaogComponent} from '../error-dilaog/error-dilaog.component';

@Component({
  selector: 'app-new-secretaire-generale',
  templateUrl: './new-secretaire-generale.component.html',
  styleUrls: ['./new-secretaire-generale.component.scss']
})
export class NewSecretaireGeneraleComponent implements OnInit {

    form: FormGroup;
    title: any;


  constructor(
      public dialog: MatDialog,
      public dialogRef: MatDialogRef<NewSecretaireGeneraleComponent>,
      private _formBuilder: FormBuilder,
      public translate: TranslateService,
      private referentialService: ReferentialService,
      private loadingService: LoadingService,
      @Inject(MAT_DIALOG_DATA) public data: GeneralSecretaryModel
  ) { }

    // tslint:disable-next-line:typedef
  ngOnInit() {

      // titte of popup
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

    validateGeneralSecretary(): void {

        console.log(this.form.getRawValue());

        this.referentialService.sendGeneralSecretaryFormToBackend(this.form.getRawValue())
            .subscribe(
                () => {
                    this.dialogRef.close(this.form.getRawValue());
                    this.dialogRef.close(true);
                    console.log('succes');
                },

                (error) => {
                    console.log('Error ! : ' + error);
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
                        width: '4000px',
                        data: dialogData
                    });
                    dialogRefError.afterClosed().subscribe(result => {

                    });
                }
            );
    }

    updateGenralSecretary(): void {

        console.log(this.form.getRawValue());

        this.referentialService.updateGeneralSecretary(this.form.getRawValue())
            .subscribe(
                () => {
                    this.dialogRef.close(this.form.getRawValue());
                    this.dialogRef.close(true);
                    console.log('succes');
                },

                (error) => {
                    console.log('Error ! : ' + error);
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
            this.updateGenralSecretary();
            this.loadingService.displaySpinner();
        }
        else{
            this.validateGeneralSecretary();
            this.loadingService.displaySpinner();
        }

    }

}
