import {Component, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import {InitMailService} from '../../../services/init-mail.service';
import {ArrivedMailModel} from '../../../models/arrived-mail.model';

@Component({
    selector   : 'fuse-demo-sidebar',
    templateUrl: './demo-sidebar.component.html',
    styleUrls  : ['./demo-sidebar.component.scss'],
})
export class FuseDemoSidebarComponent
{
    form: FormGroup;
    mail: ArrivedMailModel = new ArrivedMailModel();

    /**
     * Constructor
     */
    constructor(private _formBuilder: FormBuilder,
                private route: ActivatedRoute, private  initMailService: InitMailService)
    {
    }

    // tslint:disable-next-line:use-lifecycle-interface
    ngOnInit(): void {

        this.route.params.subscribe( param => {
            console.log(param);
            this.initMailService.getArrivedMails().then( mails => {
                console.log(mails);
                this.mail = mails.find( m => m.idEntry === param.id);
                console.log(this.mail);
            });
        });

    }



}
