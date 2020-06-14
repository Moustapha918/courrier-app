import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TranslateService} from '@ngx-translate/core';
import {ReferentialService} from '../../services/referential.service';
import {MinisterOfficeModel} from '../../models/minister-office.model';
import {LoadingService} from '../../services/loading.service';

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
              private _formBuilder: FormBuilder,
              public translate: TranslateService,
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
                    console.log('Error ! : ' + error);
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
                    console.log('Error ! : ' + error);
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
