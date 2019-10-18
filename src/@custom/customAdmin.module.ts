import {NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {AngularSvgIconModule} from 'angular-svg-icon';


@NgModule({
    declarations: [
        HeaderComponent
    ],
    exports: [
        HeaderComponent
    ],
    imports: [AngularSvgIconModule]
})
export class CustomAdminModule
{
}
