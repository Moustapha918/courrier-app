import { FuseNavigation } from '@fuse/types';
import {ArrivedMailScComponent} from '../pages/arrived-mail-sc/arrived-mail-sc.component';


export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'courrier arrivé',
        translate: 'NAV.ARRIVED',
        type     : 'group',
        url : 'arrivedMail-sc',
        children : [
            {
                id     : 'arrivedMail-sc',
                translate: 'NAV.LIST',
                title: 'Courrier arrivé',
                type     : 'item',
                url : 'arrivedMail-sc'
            },
            {
                id     : 'new-arrived-mail',
                url     : 'new-arrived-mail',
                title: 'creer un courrier',
                translate: 'NAV.NEWMAIIL',
                type: 'item'
            }
        ]
    },
    {
        id       : 'departure',
        title    : 'departure',
        translate: 'NAV.DEPARTURE',
        type     : 'group',
    },
    {
        id       : 'référentiel',
        title    : 'référentiel',
        translate: 'NAV.REFERENTIEL',
        type     : 'group',
    },
    {
        id       : 'archive',
        title    : 'archive',
        translate: 'NAV.ARCHIVE',
        type     : 'group',
    }
];


/* {
                id       : 'sample',
                title    : 'Simple Title',
                translate: 'NAV.SAMPLE.TITLE',
                type     : 'item',
                icon     : 'email',
                url      : '/',
                badge    : {
                    title    : '25',
                    translate: 'NAV.SAMPLE.BADGE',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            },*/