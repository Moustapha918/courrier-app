import { Component, OnDestroy, OnInit } from '@angular/core';

import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import {ArrivedMailModelModel} from '../../../../../models/arrived-mail.model';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
    selector   : 'carded-left-sidebar-1',
    templateUrl: './left-sidebar-1.component.html',
    styleUrls  : ['./left-sidebar-1.component.scss']
})
export class CardedLeftSidebar1Component
{

    test = 'test';
    arrivedMail = new ArrivedMailModelModel('AR2019001',
        'DOSS001',
        'objet 1',
        'expéditeur1',
        '01/09/2019 14:30:20',
        'documents ref',
        '2019-10-24T22:00:00.000Z',
        'Trés urgent',
        'piéce',
        'observation');
    form: FormGroup;


    /**
     * Constructor
     *
     * @param {FuseSidebarService} _fuseSidebarService
     */
    constructor(
        private _fuseSidebarService: FuseSidebarService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar
     *
     * @param name
     */
    toggleSidebar(name): void
    {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}
