import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {FileUploadModule} from 'ng2-file-upload';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import {MatSelectModule} from '@angular/material';
import {PagesModule} from './pages/pages.module';
import {InitMailService} from './services/init-mail.service';
import { LoginComponent } from './login/login.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FuseTranslationLoaderService} from '../@fuse/services/translation-loader.service';

// @ts-ignore
import { locale as arabe } from './login/ar';
// @ts-ignore
import { locale as french } from './login/en';



const appRoutes: Routes = [
    {
        path        : 'ui',
        loadChildren: './main/ui/ui.module#UIModule'
    },
    {
        path      : '**',
        redirectTo: 'sc-home'
    },

];

// tslint:disable-next-line:typedef
/*export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}*/



@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,

    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        FileUploadModule,
        TranslateModule,
        TranslateModule.forRoot(),
        /*TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),*/
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

        // App modules
        LayoutModule,
        SampleModule,
        PagesModule,
        MatSelectModule,
        MatMenuModule,
        MatToolbarModule
    ],
    providers   : [
        InitMailService
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
