import { NgModule } from '@angular/core';



import { HorizontalLayout1Module } from 'app/layout/horizontal/layout-1/layout-1.module';
import {VerticalLayout1Module} from './vertical/layout-1/layout-1.module';
import {VerticalLayout2Module} from './vertical/layout-2/layout-2.module';
import {VerticalLayout3Module} from './vertical/layout-3/layout-3.module';

@NgModule({
    imports: [
        HorizontalLayout1Module, VerticalLayout1Module, VerticalLayout2Module, VerticalLayout3Module
    ],
    exports: [
        HorizontalLayout1Module, VerticalLayout1Module, VerticalLayout2Module, VerticalLayout3Module
    ]
})
export class LayoutModule
{
}
