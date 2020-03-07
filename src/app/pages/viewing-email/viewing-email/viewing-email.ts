import { Component, OnDestroy, OnInit } from '@angular/core';

import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {InitMailService} from '../../../services/init-mail.service';
import {ArrivedMailModel} from '../../../models/arrived-mail.model';
import {MatDialog} from '@angular/material';
import {VisualizePdfComponent} from '../../visualize-pdf/visualize-pdf.component';
import {ReferentialService} from '../../../services/referential.service';

const annotations  = [
    {code: '1' , label: 'M’en Parler'},
    {code: '2', label: 'Suite à Donner'},
    {code: '3', label: 'Exploitation'},
    {code: '4', label: 'Suivi'},
    {code: '5', label: 'Attribution'},
    {code: '6', label: 'Etude et Avis'},
    {code: '7', label: 'Disposition à prendre'},
    {code: '8', label: 'Faire Nécessaire'}

    ];
const index1 = [0, 1, 2, 3];
const index2 = [4, 5, 6, 7];



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
    annotations: any;
    directions: any;
    index1: any;
    index2: any;


    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService,
        private activatedRoute: ActivatedRoute, private  initMailService: InitMailService,
        private _formBuilder: FormBuilder, private router: Router,
        private matDialog: MatDialog, private referentialService: ReferentialService
    )
    {

    }


    ngOnInit(): void {
        // Horizontal Stepper form steps

        this.annotations = annotations;
        this.index1 = index1;
        this.index2 = index2;


        this.referentialService.getAllDirectionsFromBackend()
            .subscribe(
                dirs => {
                    console.log(dirs);
                    this.directions = dirs;
                },
                (error) => {
                    console.log('Error ! : ' + error);
                }
            );


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
        this.matDialog.open(VisualizePdfComponent,{
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
        this.initMailService.annotate(this.mail).subscribe( data =>{
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
