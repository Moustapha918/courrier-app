import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {InitMailService} from '../../app/services/init-mail.service';
import {AutoGenParamsModel} from '../../app/models/auto-gen-params.model';

@Component({
  selector: 'app-init-mail',
  templateUrl: './init-mail.component.html',
  styleUrls: ['./init-mail.component.scss']
})
export class InitMailComponent implements OnInit {

    form: FormGroup;
    autoGenParams: AutoGenParamsModel;
    autoIdEntry: string;


    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private _formBuilder: FormBuilder,
        private initMailService: InitMailService,


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
        // init params: to get idEntry, idDirectory and receptionDate from
        // this.initMailService.getInitParamsFromBackend()

        // this.initMailService.saveAutoGenParamsToFirebase();
        this.initMailService.getAutoGenParamsFromFirebase(this.initMailService.urlFirebase);
        this.autoGenParams = this.initMailService.autoGenParams2;
        // this.autoIdEntry = this.autoGenParams.idEntry; // getAutoIdEntry(); // 'AR2019001'; // this.autoGenParams['idEntry'];
        console.log(this.autoGenParams);
        // Reactive Form
        this.form = this._formBuilder.group({
            receptionDate :  [{value: null, disabled: true }],
            idDirectory :  [{value: null, disabled: true }],
            idEntry :  [{value: null, disabled: true }],
            idReceivedDocument : ['', Validators.required],
            dateReceivedDocument  : [],
            subject  : ['', Validators.required],
            sender  : ['', Validators.required],
            attachments : [],
            observations : [],
            priorityDegree : []
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


    validateArrivedMail(): void{

        console.log(this.form.value);
        // TO CHECK ??
        // this.initMailService.saveArrivedMailToBackend(this.form.value);
    }
}
