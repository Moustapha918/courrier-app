import {ArrivedMailScComponent} from './arrived-mail-sc/arrived-mail-sc.component';
import {ScHomeComponent} from '../../@custom/sc-home/sc-home.component';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {FuseSharedModule} from '../../@fuse/shared.module';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipsModule} from '@angular/material/chips';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';

const routes = [
    {
        path     : 'arrivedMail-sc',
        component: ArrivedMailScComponent
    }
];

@NgModule({
    declarations: [
        ArrivedMailScComponent
    ],
    exports: [
        ArrivedMailScComponent
    ],
    imports: [
        FuseSharedModule,
        MatIconModule,
        RouterModule.forRoot(routes),
        MatTabsModule,
        MatFormFieldModule,
        MatChipsModule,
        MatButtonModule
    ]
})
export class PagesModule
{
}
