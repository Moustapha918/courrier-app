import { Component, OnDestroy, OnInit } from '@angular/core';

import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, ActivatedRouteSnapshot, Router, RouterState, RouterStateSnapshot} from '@angular/router';
import {InitMailService} from '../../../services/init-mail.service';
import {ArrivedMailModel} from '../../../models/arrived-mail.model';
import {MatDialog} from '@angular/material';
// @ts-ignore
import {VisualizePdfComponent} from '../../visualize-pdf/visualize-pdf.component';

const annotations  = [{id: 'classed' , label: 'classé'}, {id: 'ventilated', label: 'ventilé'}, {id: 'studying', label: 'à etudier'}];
const directions  = [{idDirection: '1' , name: 'direction technique'}, {idDirection: '2', name: 'direction des operation'}, {idDirection: '3', name: 'direction des etudes'}];

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
    directions: any[];


    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private activatedRoute: ActivatedRoute, private  initMailService: InitMailService,
        private _formBuilder: FormBuilder, private router: Router,
        private matDialog: MatDialog
    )
    {

    }


    ngOnInit(): void {
        // Horizontal Stepper form steps

        this.annotations = annotations;
        this.directions = directions;
        this.activatedRoute.params.subscribe( param => {
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

    visualizeMailPDF(): void{
        this.matDialog.open(VisualizePdfComponent, {
            width: '90%',
            height: '95%',
            data: this.mail
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------



    annotate(): void {
        this.mail.directions = this.directions.filter(dir => dir.value);
        this.mail.annotations = this.annotations.filter( ann => ann.value);
        this.initMailService.annotate(this.mail).subscribe( data => {
            console.log(data);
            this.router.navigate(['../../arrivedMail-sc'], { relativeTo: this.activatedRoute });
        },
                error => console.log(error));
    }

    canConfirm(): boolean {
        return  this.annotations.some( annotation => annotation.value) &&
            this.directions.some(dir => dir.value);
    }
}
