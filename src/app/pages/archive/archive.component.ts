import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ApplicationUserModel} from '../../models/applicationUser';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {DataSource} from '@angular/cdk/table';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {FuseUtils} from '../../../@fuse/utils';
import {ArchiveService} from '../../services/archive.service';
import {MatDialog} from '@angular/material/dialog';
import {LoadingService} from '../../services/loading.service';
import {ErrorDilaogComponent} from '../error-dilaog/error-dilaog.component';
import {fuseAnimations} from '../../../@fuse/animations';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ArchiveComponent implements  OnInit {

    loading: boolean;
    user: ApplicationUserModel;

    dataSource: FilesArchiveSource;
    displayedColumns: string[] = ['type', 'idDirectory', 'idEntry', 'subject', 'senderOrReceiver', 'dateCreation'];


    @ViewChild(MatPaginator, {static: true})
    paginator: MatPaginator;

    @ViewChild(MatSort, {static: true})
    sort: MatSort;

    @ViewChild('filter', {static: true})
    filter: ElementRef;

  constructor(private archiveService: ArchiveService, public dialog: MatDialog,
              private route: ActivatedRoute,
              private loadingService: LoadingService) { }


    ngOnInit(): void {

      this.user = JSON.parse(localStorage.getItem('user'));



      this.archiveService.onArchiveMailsChanged.subscribe( (data) => {
              this.loadingService.closeSpinner();
          },
          (error) => {
              console.log('Error ! : ' + error);
              this.dialog.open(ErrorDilaogComponent, {
                  width: '4000px',
              });

          }
      );

      console.log(this.route.snapshot.data.data);
      this.dataSource = new FilesArchiveSource(this.archiveService, this.paginator, this.sort);

      const archiveMails = this.route.snapshot.data['data'];
      this.archiveService.onArchiveMailsChanged.next(archiveMails);

      this.archiveService.archiveMails = archiveMails;


      fromEvent(this.filter.nativeElement, 'keyup')
          .pipe(
              debounceTime(150),
              distinctUntilChanged()
          )
          .subscribe(() => {
              if ( !this.dataSource)
              {
                  return;
              }

              this.dataSource.filter = this.filter.nativeElement.value;
          });
  }

}

export class FilesArchiveSource extends DataSource<any>
{
    private _filterChange = new BehaviorSubject('');
    private _filteredDataChange = new BehaviorSubject('');

    /**
     * Constructor
     *
     * @param {EcommerceProductsService} _ecommerceProductsService
     * @param {MatPaginator} _matPaginator
     * @param {MatSort} _matSort
     */
    constructor(
        private archiveMailService: ArchiveService,
        private _matPaginator: MatPaginator,
        private _matSort: MatSort
    )
    {
        super();

        this.filteredData = this.archiveMailService.archiveMails || [];
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        const displayDataChanges = [
            this.archiveMailService.onArchiveMailsChanged,
            this._matPaginator.page,
            this._filterChange,
            this._matSort.sortChange
        ];

        return merge(...displayDataChanges)
            .pipe(
                map(() => {

                        // console.log('__ data _____________ : ',  this.initMailService.arrivedMails);
                        if (this.archiveMailService.archiveMails == null) {
                            return [];
                        }

                        let data = this.archiveMailService.archiveMails.slice();
                        data = this.filterData(data);

                        this.filteredData = [...data];

                        data = this.sortData(data);

                        // Grab the page's slice of data.
                        const startIndex = this._matPaginator.pageIndex * this._matPaginator.pageSize;
                        return data.splice(startIndex, this._matPaginator.pageSize);
                    }
                ));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // Filtered data
    get filteredData(): any
    {
        return this._filteredDataChange.value;
    }

    set filteredData(value: any)
    {
        this._filteredDataChange.next(value);
    }

    // Filter
    get filter(): string
    {
        return this._filterChange.value;
    }

    set filter(filter: string)
    {
        this._filterChange.next(filter);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Filter data
     *
     * @param data
     * @returns {any}
     */
    filterData(data): any
    {
        if ( !this.filter )
        {
            return data;
        }
        return FuseUtils.filterArrayByString(data, this.filter);
    }

    /**
     * Sort data
     *
     * @param data
     * @returns {any[]}
     */
    sortData(data): any[]
    {
        if ( !this._matSort.active || this._matSort.direction === '' )
        {
            return data;
        }

        return data.sort((a, b) => {
            let propertyA: number | string = '';
            let propertyB: number | string = '';

            switch ( this._matSort.active )
            {
                case 'idEntry':
                    [propertyA, propertyB] = [a.idEntry, b.idEntry];
                    break;
                case 'subject':
                    [propertyA, propertyB] = [a.subject, b.subject];
                    break;
                case 'sender':
                    [propertyA, propertyB] = [a.sender, b.sender];
                    break;
                case 'receptionDate':
                    [propertyA, propertyB] = [a.receptionDate, b.receptionDate];
                    break;
            }

            const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
            const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

            return (valueA < valueB ? -1 : 1) * (this._matSort.direction === 'asc' ? 1 : -1);
        });
    }

    /**
     * Disconnect
     */
    disconnect(): void
    {
    }
}
