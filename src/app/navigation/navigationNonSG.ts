import { FuseNavigation } from '@fuse/types';

export const navigationNonSG: FuseNavigation[] = [

    {
        id       : 'Applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        icon     : 'apps',
        children : [
            {
                id     : 'arrivedMail-sc',
                translate: 'NAV.ARRIVED',
                title: 'Courrier arrivé',
                type     : 'collapsable',
                url : 'arrivedMail-sc'

            }

        ]
    },



];
