import {ArrivedMailScComponent} from './arrived-mail-sc/arrived-mail-sc.component';
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
    MatDatepickerModule, MatDialogModule,
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
import {FuseSharedModule} from '../../@fuse/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import {ScWorkflowComponent} from './sc-workflow/sc-workflow.component';
import { VisualizePdfComponent } from './visualize-pdf/visualize-pdf.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';



const routes = [
 {
        path     : 'sc-home',
        component: ScHomeComponent,
    },
    {
        path: 'sc-workflow',
        component: ScWorkflowComponent,
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
        ViewingEmailComponent,
        VisualizePdfComponent
    ],
    exports: [
        ArrivedMailScComponent, ScHomeComponent, InitMailComponent, ViewingEmailComponent
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
        PdfViewerModule,
        MatDialogModule
    ],
    entryComponents: [VisualizePdfComponent]
})
export class PagesModule
{
}
