import {NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {ScHomeComponent} from './sc-home/sc-home.component';
import {RouterModule} from '@angular/router';
import {
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule, MatStepperModule, MatDatepickerModule
} from '@angular/material';
import {InitMailComponent} from './init-mail/init-mail.component';
import {FuseSharedModule} from '../@fuse/shared.module';
import {} from '@angular/material';

const routes = [
    {
        path     : 'sc-home',
        component: ScHomeComponent
    },
    {
        path     : 'new-arrived-mail',
        component: InitMailComponent
    }
];

@NgModule({
    declarations: [
        HeaderComponent, ScHomeComponent, InitMailComponent
    ],
    exports: [
        HeaderComponent, ScHomeComponent, InitMailComponent
    ],
    imports: [AngularSvgIconModule,
        RouterModule.forRoot(routes),
        MatCardModule,
        FuseSharedModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        MatDatepickerModule
    ]
})
export class CustomAdminModule
{
}
