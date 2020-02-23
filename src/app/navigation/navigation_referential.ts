import { FuseNavigation } from '@fuse/types';

// tslint:disable-next-line:variable-name
export const navigation_referential: FuseNavigation[] = [
    {
        id       : 'referential',
        title    : 'referential',
        translate: 'NAV.REFERENTIAL',
        type     : 'group',
        children : [
            {
                id       : 'Direction',
                title    : 'Direction',
                translate: 'Direction',
                type     : 'item',
                icon     : 'email',
                url      : '/pages/direction',
                badge    : {
                    title    : '25',
                    translate: 'NAV.SAMPLE.BADGE',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }

            },

            {
                id       : 'sample',
                title    : 'Sample',
                translate: 'NAV.SAMPLE.TITLE',
                type     : 'item',
                icon     : 'email',
                url      : '/pages/division',
                badge    : {
                    title    : '25',
                    translate: 'NAV.SAMPLE.BADGE',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }

            }

        ]
    }
];
