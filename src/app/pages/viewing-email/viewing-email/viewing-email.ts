import { Component, OnDestroy, OnInit } from '@angular/core';

import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot} from '@angular/router';
import {InitMailService} from '../../../services/init-mail.service';
import {ArrivedMailModel} from '../../../models/arrived-mail.model';

const annotations  = [{id: 'classed' , label: 'classé'}, {id: 'ventilated', label: 'ventilé'}, {id: 'studying', label: 'à etudier'}];

@Component({
    selector   : 'carded-left-sidebar-1',
    templateUrl: './viewing-email.html',
    styleUrls  : ['./viewing-email.scss']
})
export class ViewingEmailComponent implements OnInit
{

    horizontalStepperStep1: FormGroup;
    horizontalStepperStep2: FormGroup;
    horizontalStepperStep3: FormGroup;

    form: FormGroup;
    mail: ArrivedMailModel = new ArrivedMailModel();
    annotations: any[];


    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private route: ActivatedRoute, private  initMailService: InitMailService,
        private _formBuilder: FormBuilder
    )
    {

    }


    ngOnInit(): void {
        // Horizontal Stepper form steps

        this.annotations = annotations;
        this.route.params.subscribe( param => {
            console.log(param);
            this.initMailService.getArrivedMails().then( mails => {
                console.log(mails);
                this.mail = mails.find( m => m.idEntry === param.id);
                console.log(this.mail);
            });
        });

        this.horizontalStepperStep1 = this._formBuilder.group({
        });

        this.horizontalStepperStep2 = this._formBuilder.group({

        });

        this.horizontalStepperStep3 = this._formBuilder.group({
            city      : ['', Validators.required],
            state     : ['', Validators.required],
            postalCode: ['', [Validators.required, Validators.maxLength(5)]]
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------



    annotate(): void {
        this.initMailService.annotate(this.annotations, this.mail.idEntry);
    }
}
