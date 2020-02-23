import {Component, OnDestroy, OnInit} from '@angular/core';
import {FuseNavigationService} from '../../../@fuse/components/navigation/navigation.service';


@Component({
  selector: 'app-referential',
  templateUrl: './referential.component.html',
  styleUrls: ['./referential.component.scss']
})

export class ReferentialComponent implements OnInit {

    navigation: any;

  constructor(private _fuseNavigationService: FuseNavigationService) {

      this.navigation = [ {
          id       : 'components',
          title    : 'COMPONENTS',
          translate: 'Direction',
          type     : 'group',
          url  : 'direction',

      },
          ];

      // Register the navigation to the service
      this._fuseNavigationService.register('main1', this.navigation);

      // Set the main navigation as our current navigation
      this._fuseNavigationService.setCurrentNavigation('main1');
  }

    // tslint:disable-next-line:typedef
  ngOnInit() {

  }

}
