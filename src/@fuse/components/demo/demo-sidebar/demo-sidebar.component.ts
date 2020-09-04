import {Component, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import {InitMailService} from '../../../../app/services/init-mail.service';
import {ArrivedMailModel} from '../../../../app/models/arrived-mail.model';

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



}
