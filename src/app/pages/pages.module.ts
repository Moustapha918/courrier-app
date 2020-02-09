import {ArrivedMailScComponent} from './arrived-mail-sc/arrived-mail-sc.component';
// @ts-ignore
import { ReferentialComponent } from './referential/referential.component';
import {ScHomeComponent} from './sc-home/sc-home.component';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {InitMailComponent} from './init-mail/init-mail.component';
import {
    MatCardModule, MatCheckboxModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatStepperModule
} from '@angular/material';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {ViewingEmailComponent} from './viewing-email/viewing-email/viewing-email';
import {FuseDemoModule, FuseSidebarModule} from '../../@fuse/components';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {InitMailService} from '../services/init-mail.service';
import {FileUploadModule} from 'ng2-file-upload';
import {MailService} from '../services/mail.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FuseSharedModule} from '../../@fuse/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import {ScWorkflowComponent} from './sc-workflow/sc-workflow.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DirectionComponent } from './direction/direction.component';
import { NewDirectionComponent } from './new-direction/new-direction.component';
import { ServiceEntityComponent } from './service-entity/service-entity.component';
import { DivisionComponent } from './division/division.component';
import { DepartementComponent } from './departement/departement.component';
import { NewServiceEntityComponent } from './new-service-entity/new-service-entity.component';
import { NewDepartementComponent } from './new-departement/new-departement.component';
// @ts-ignore
import { NewDivisionComponent } from './new-division/new-division.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
// @ts-ignore




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
    },
    {
        path     : 'referentiel',
        component: ReferentialComponent
    },
    {
        path     : 'direction',
        component: DirectionComponent
    },
    {
        path     : 'service',
        component: ServiceEntityComponent
    },
    {
        path     : 'division',
        component: DivisionComponent
    },
    {
        path     : 'departement',
        component: DepartementComponent
    },
    {
        /*path     : 'lecture-mail/:id',
        component: ViewingEmailComponent,*/
       /* resolve : {
          data: MailService
        }*/

        path  : 'sc-workflow',
        component  : ScWorkflowComponent,
        children: [
            {
                path     : 'arrivedMail-sc',
                component: ArrivedMailScComponent,
                resolve  : {
                    data: InitMailService
                }
            },
            {
                path     : 'new-arrived-mail',
                component: InitMailComponent
            },
            {
                path     : 'lecture-mail/:id',
                component: ViewingEmailComponent
            }
        ]
    }

];

@NgModule({
    declarations: [
        ArrivedMailScComponent, ScHomeComponent, InitMailComponent,
        // tslint:disable-next-line:max-line-length
        ViewingEmailComponent, ReferentialComponent, DirectionComponent, NewDirectionComponent, ServiceEntityComponent, DivisionComponent, DepartementComponent, NewServiceEntityComponent, NewDivisionComponent, NewDepartementComponent, ConfirmDialogComponent

    ],
    exports: [
        ArrivedMailScComponent, ScHomeComponent, InitMailComponent, ViewingEmailComponent, ReferentialComponent
    ],
    imports: [
        MatIconModule,
        RouterModule.forRoot(routes),
        MatTabsModule,
        MatFormFieldModule,
        MatChipsModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        MatDatepickerModule,
        AngularSvgIconModule,
        MatProgressBarModule,
        AngularSvgIconModule,
        MatSortModule,
        AngularSvgIconModule,
        MatSortModule,
        FuseDemoModule,
        FuseSidebarModule,
        FileUploadModule,
        MatCheckboxModule,
        FuseSharedModule,
        TranslateModule,
        MatProgressSpinnerModule
    ],
    entryComponents: [NewDirectionComponent, NewServiceEntityComponent, NewDepartementComponent, NewDivisionComponent, ConfirmDialogComponent]
})
export class PagesModule
{
}
