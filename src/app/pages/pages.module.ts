import {ArrivedMailScComponent} from './arrived-mail-sc/arrived-mail-sc.component';
import {ScHomeComponent} from './sc-home/sc-home.component';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {FuseSharedModule} from '../../@fuse/shared.module';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {InitMailComponent} from './init-mail/init-mail.component';
import {
    MatCardModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatStepperModule
} from '@angular/material';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {FileUploadModule} from 'ng2-file-upload';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {InitMailService} from '../services/init-mail.service';
import {TranslateModule} from '@ngx-translate/core';



const routes = [
    {
        path     : 'arrivedMail-sc',
        component: ArrivedMailScComponent,
        resolve  : {
            data: InitMailService
        }
    }, {
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
        ArrivedMailScComponent, ScHomeComponent, InitMailComponent
    ],
    exports: [
        ArrivedMailScComponent, ScHomeComponent, InitMailComponent
    ],
    imports: [
        FuseSharedModule,
        MatIconModule,
        RouterModule.forRoot(routes),
        MatTabsModule,
        MatFormFieldModule,
        MatChipsModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatCardModule,
        FuseSharedModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        MatDatepickerModule,
        AngularSvgIconModule,
        FileUploadModule,
        MatProgressBarModule,
        AngularSvgIconModule,
        MatSortModule,
        TranslateModule,
    ]
})
export class PagesModule
{
}
