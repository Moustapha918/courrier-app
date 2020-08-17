import { FuseNavigation } from '@fuse/types';






export const navigation: FuseNavigation[] = [
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
                children : [
                    {
                        id     : 'arrivedMail-sc',
                        translate: 'NAV.ARRIVED',
                        title: 'Courrier arrivé',
                        type     : 'item',
                        url : 'arrivedMail-sc'
                    },
                    {
                        id     : 'new-arrived-mail',
                        url     : 'new-arrived-mail',
                        title: 'NAV.NEWMAIIL',
                        translate: 'NAV.NEWMAIIL',
                        type: 'item'
                    }
                ]
            },

            {
                id       : 'Departure',
                title    : 'NAV.DEPARTURE',
                translate: 'NAV.DEPARTURE',
                type     : 'collapsable',
                children : [
                    {
                        id     : 'departureMail-sc',
                        translate: 'NAV.DEPARTURE',
                        title: 'Courrier Depart',
                        type     : 'item',
                        // url : 'arrivedMail-sc'
                    },
                    {
                        id     : 'new-departure-mail',
                        url     : 'new-departure-mail',
                        title: 'NAV.NEWMAIIL',
                        translate: 'NAV.NEWMAIIL',
                        type: 'item'
                    }

                ]
            },
            {
                id       : 'référentiel',
                title    : 'Référentiel',
                translate: 'NAV.REFERENTIEL',
                type     : 'collapsable',
                // url      : 'referentiel',
                children :
                    [
                        {
                            id     : 'cabinet-ministre',
                            url     : 'cabinet-ministre',
                            title: 'Cabinet du ministre',
                            translate: 'REFERENTIAL.MINISTEROFFICE',
                            type: 'item'
                        },
                        {
                            id     : 'secretaire-general',
                            url     : 'secretaire-general',
                            title: 'Secretariat generale',
                            translate: 'REFERENTIAL.GENERALSECRETARY',
                            type: 'item'
                        },
                        {
                            id     : 'new-arrived-mail',
                            url     : 'direction',
                            title: 'Directions',
                            translate: 'REFERENTIAL.DIRECTIONS',
                            type: 'item'
                        },
                        {
                            id     : 'new-arrived-mail',
                            url     : 'service',
                            title: 'Services',
                            translate: 'REFERENTIAL.SERVICES',
                            type: 'item'
                        },
                        {
                            id     : 'new-arrived-mail',
                            url     : 'division',
                            title: 'Divisions',
                            translate: 'REFERENTIAL.DIVISIONS',
                            type: 'item'
                        }

                    ]
            },

            {
                id       : 'archive',
                title    : 'archive',
                translate: 'NAV.ARCHIVE',
                type     : 'group',
            }
        ]
    },



];
