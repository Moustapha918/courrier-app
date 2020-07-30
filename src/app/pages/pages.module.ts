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
    MatDatepickerModule, MatDialogModule,
    MatInputModule, MatProgressSpinnerModule,
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
import { VisualizePdfComponent } from './visualize-pdf/visualize-pdf.component';
import {PdfViewerModule} from 'ng2-pdf-viewer';
import { SpinnerModalComponent } from './spinner-modal/spinner-modal.component';
import {CabinetMinistreComponent} from './cabinet-ministre/cabinet-ministre.component';
import { NewCabinetMinstreComponent } from './new-cabinet-minstre/new-cabinet-minstre.component';
import { SecretaireGeneraleComponent } from './secretaire-generale/secretaire-generale.component';
import { NewSecretaireGeneraleComponent } from './new-secretaire-generale/new-secretaire-generale.component';
import {ErrorDilaogComponent} from './error-dilaog/error-dilaog.component';
import {LoginModule} from './authentification/login/login.module';
import {LoginComponent} from './authentification/login/login.component';
import {JwtModule} from '@auth0/angular-jwt';
import {AuthGuardService} from '../services/auth-guard.service';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';

export function tokenGetter(): string{
    return localStorage.getItem('token');
}

const routes = [

    {
        path     : 'sc-home',
        component: ScHomeComponent,
        canActivate: [AuthGuardService]
    },

    {
        path     : 'cabinet-ministre',
        component: CabinetMinistreComponent,
        canActivate: [AuthGuardService]
    },

    {
        path     : 'direction',
        component: DirectionComponent,
        canActivate: [AuthGuardService]
    },
    {
        path     : 'service',
        component: ServiceEntityComponent,
        canActivate: [AuthGuardService]
    },
    {
        path     : 'division',
        component: DivisionComponent,
        canActivate: [AuthGuardService]
    },
    {
        path     : 'departement',
        component: DepartementComponent,
        canActivate: [AuthGuardService]
    },
    {
        path     : 'secretaire-general',
        component: SecretaireGeneraleComponent,
        canActivate: [AuthGuardService]
    },
    {
        path     : 'referentiel',
        component: ReferentialComponent,
        children: [

        ]
    },
    {
        path     : 'login',
        component: LoginComponent,
    },
    {
        path     : 'arrivedMail-sc',
        component: ArrivedMailScComponent,
        resolve  : {
            data: InitMailService
        },
        canActivate: [AuthGuardService]
    },
    {
        path     : 'new-arrived-mail',
        component: InitMailComponent,
        canActivate: [AuthGuardService]
    },
    {
        path     : 'lecture-mail/:id',
        component: ViewingEmailComponent,
        canActivate: [AuthGuardService]
    },
];

@NgModule({
    declarations: [
        ArrivedMailScComponent, ScHomeComponent, InitMailComponent,
        ViewingEmailComponent,
        VisualizePdfComponent,
        SpinnerModalComponent,
        // tslint:disable-next-line:max-line-length
        ViewingEmailComponent, ReferentialComponent, DirectionComponent, NewDirectionComponent, ServiceEntityComponent, DivisionComponent, DepartementComponent, NewServiceEntityComponent, NewDivisionComponent, NewDepartementComponent, CabinetMinistreComponent, ConfirmDialogComponent, ViewingEmailComponent,
        VisualizePdfComponent,
        NewCabinetMinstreComponent,
        SecretaireGeneraleComponent,
        NewSecretaireGeneraleComponent,
        ViewingEmailComponent, ReferentialComponent, DirectionComponent, NewDirectionComponent, ServiceEntityComponent,
        DivisionComponent, DepartementComponent, NewServiceEntityComponent, NewDivisionComponent, NewDepartementComponent, ConfirmDialogComponent, ViewingEmailComponent,
        VisualizePdfComponent, SpinnerModalComponent, ErrorDilaogComponent

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
        MatProgressSpinnerModule,
        PdfViewerModule,
        MatDialogModule,
        LoginModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
            },
        }),
        MatExpansionModule,
        MatListModule,
    ],
    entryComponents: [SpinnerModalComponent, NewDirectionComponent,
        NewServiceEntityComponent, NewDepartementComponent, NewDivisionComponent,
        ConfirmDialogComponent, VisualizePdfComponent, NewCabinetMinstreComponent,
        NewSecretaireGeneraleComponent, ErrorDilaogComponent]
})
export class PagesModule
{
}
