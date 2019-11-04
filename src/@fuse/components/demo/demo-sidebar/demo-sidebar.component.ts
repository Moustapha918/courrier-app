import {Component, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';

@Component({
    selector   : 'fuse-demo-sidebar',
    templateUrl: './demo-sidebar.component.html',
    styleUrls  : ['./demo-sidebar.component.scss'],
})
export class FuseDemoSidebarComponent
{
    form: FormGroup;
    /**
     * Constructor
     */
    constructor(private _formBuilder: FormBuilder)
    {
    }

    // tslint:disable-next-line:use-lifecycle-interface
    ngOnInit(): void {
        this.form = this._formBuilder.group({
            idDirectory: [
                {
                    value: 'acd',
                    disabled: true
                }, Validators.required
            ],
            idEntry: [{
                value: '',
                disabled: true
            }, Validators.required
            ]


        });
    }

}
