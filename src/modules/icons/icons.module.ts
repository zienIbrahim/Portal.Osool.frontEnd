/* tslint:disable: ordered-imports*/

import { NgModule } from '@angular/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { FeatherModule } from 'angular-feather';

import { featherIcons } from './icons.feather';


@NgModule({
    imports: [FeatherModule.pick(featherIcons)],
    exports: [FeatherModule, FontAwesomeModule],
})
export class IconsModule {
    constructor(library: FaIconLibrary) {
        library.addIconPacks(

        );
    }
}
