import {NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {ScHomeComponent} from './sc-home/sc-home.component';
import {RouterModule} from '@angular/router';
import {MatCardModule} from '@angular/material';

const routes = [
    {
        path     : 'sc-home',
        component: ScHomeComponent
    }
];

@NgModule({
    declarations: [
        HeaderComponent, ScHomeComponent
    ],
    exports: [
        HeaderComponent, ScHomeComponent
    ],
    imports: [AngularSvgIconModule, RouterModule.forRoot(routes), MatCardModule]
})
export class CustomAdminModule
{
}
