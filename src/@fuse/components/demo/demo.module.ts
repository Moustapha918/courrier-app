import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

import { FuseDemoContentComponent } from './demo-content/demo-content.component';
import { FuseDemoSidebarComponent } from './demo-sidebar/demo-sidebar.component';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatTabsModule} from '@angular/material/tabs';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {MatSortModule} from '@angular/material/sort';

@NgModule({
    declarations: [
        FuseDemoContentComponent,
        FuseDemoSidebarComponent
    ],
    imports: [
        RouterModule,
        MatDividerModule,
        MatListModule,


        FormsModule,
        ReactiveFormsModule,



        MatTabsModule,

        MatChipsModule,

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
        MatSortModule



    ],
    exports     : [
        FuseDemoContentComponent,
        FuseDemoSidebarComponent
    ]
})
export class FuseDemoModule
{
}
