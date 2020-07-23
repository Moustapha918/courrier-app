import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../../services/notification.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector     : 'login',
    templateUrl  : './login.component.html',
    styleUrls    : ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations,
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(private _formBuilder: FormBuilder, private authService: AuthService,
                private router: Router, private _fuseConfigService: FuseConfigService,
                private notificationService: NotificationService,
                public translate: TranslateService) {  }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {

        this._fuseConfigService.config = {
            layout: {
                navbar   : {
                    hidden: true
                },
                toolbar  : {
                    hidden: true
                },
                footer   : {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
        this.loginForm = this._formBuilder.group({
            username   : ['', [Validators.required]],
            password: ['', Validators.required]
        });
    }

    login(): void {
        console.log(this.loginForm.value);
        this.authService.login(this.loginForm.value['username'], this.loginForm.value['password']).subscribe(
            (res) => {
                localStorage.setItem('token', res.body['Authorization']);
                this.router.navigate(['arrivedMail-sc']);
            }, error => {

                this.notificationService.openSnackBar(this.translate.instant('LOGIN.LOGIN_ERROR'), this.translate.instant('mail.NOTIFICATION'));
                console.log(error.status);

            });
    }
}
