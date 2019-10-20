import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-init-mail',
  templateUrl: './init-mail.component.html',
  styleUrls: ['./init-mail.component.scss']
})
export class InitMailComponent implements OnInit {

    form: FormGroup;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _formBuilder: FormBuilder
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Reactive Form
        this.form = this._formBuilder.group({
            receptionDate : [{value: '', disabled: true}, Validators.required],
            idDirectory : [{value: '', disabled: true}, Validators.required],
            idEntry : [{value: '', disabled: true}, Validators.required],
            idReceivedDocument : ['', Validators.required],
            dateReceivedDocument  : ['', Validators.required],
            subject  : ['', Validators.required],
            sender  : ['', Validators.required],
            attachment : [],
            observations : [],
            address   : [],
            priorityDegree   : []
        });

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Finish the horizontal stepper
     */
    finishHorizontalStepper(): void
    {
        alert('You have finished the horizontal stepper!');
    }

    /**
     * Finish the vertical stepper
     */
    finishVerticalStepper(): void
    {
        alert('You have finished the vertical stepper!');
    }
}
