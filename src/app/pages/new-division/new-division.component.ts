import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ReferentialService} from '../../services/referential.service';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-new-division',
  templateUrl: './new-division.component.html',
  styleUrls: ['./new-division.component.scss']
})
export class NewDivisionComponent implements OnInit {

    form: FormGroup;

    private _unsubscribeAll: Subject<any>;

    constructor(
        public dialogRef: MatDialogRef<NewDivisionComponent>,
        // @Inject(MAT_DIALOG_DATA) public data: DirectionCst,
        private _formBuilder: FormBuilder,
        private referentialService: ReferentialService,
        private router: Router)
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
            codeDirection: ['',
                {
                    value: '',
                }, Validators.required
            ],
            codeService: ['',
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

    validateDivision(): void {

        console.log(this.form.getRawValue());

        this.referentialService.sendDivisionFormToBackend(this.form.getRawValue())
            .subscribe(
                () => {
                    this.dialogRef.close();
                    console.log('success');
                },

                (error) => {
                    console.log('Error ! : ' + error);
                }
            );
    }

}
