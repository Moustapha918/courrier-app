import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {TranslateModule} from '@ngx-translate/core';
import {FileUploadModule} from 'ng2-file-upload';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule} from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import {MatSelectModule, MatTabsModule} from '@angular/material';
import {PagesModule} from './pages/pages.module';
import {InitMailService} from './services/init-mail.service';
import {ReferentialService} from './services/referential.service';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FuseTranslationLoaderService} from '../@fuse/services/translation-loader.service';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { locale as arabe } from '../assets/i18n/ar';
import { locale as french } from '../assets/i18n/fr';

import {ToolbarModule} from './layout/components/toolbar/toolbar.module';
import {ContentModule} from './layout/components/content/content.module';
import {ScWorkflowComponent} from './pages/sc-workflow/sc-workflow.component';
import {FooterModule} from './layout/components/footer/footer.module';
import {ScHomeComponent} from './pages/sc-home/sc-home.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {ReferentialComponent} from './pages/referential/referential.component';
import {ArrivedMailScComponent} from './pages/arrived-mail-sc/arrived-mail-sc.component';
import {AuthGuardService} from './services/auth-guard.service';
import {TokenInterceptorService} from './services/token-interceptor.service';

const appRoutes: Routes = [
    {
        path      : '',
        component: ArrivedMailScComponent,
        resolve  : {
            data: InitMailService
        },
        canActivate: [AuthGuardService]
    }
];

@NgModule({
    declarations: [
        AppComponent,
        ScWorkflowComponent

    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        FileUploadModule,
        TranslateModule.forRoot(),
        MatSnackBarModule,
        BrowserAnimationsModule,
        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,
        MatSidenavModule,

        // App modules
        LayoutModule,
        SampleModule,
        MatSelectModule,
        MatMenuModule,
        MatToolbarModule,

        MatSelectModule,
        MatTabsModule,
        ToolbarModule,
        ContentModule,
        FooterModule
    ],
    providers   : [
        InitMailService,
        ReferentialService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true
        }
        // MailService
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
    constructor(private translationLoader: FuseTranslationLoaderService)
    {
        this.translationLoader.loadTranslations(arabe, french);
    }

}
