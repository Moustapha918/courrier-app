import {Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {debounceTime, distinctUntilChanged, map, takeUntil} from 'rxjs/operators';
import {FuseUtils} from '../../../@fuse/utils';
import {BehaviorSubject, fromEvent, merge, Observable, Subject} from 'rxjs';
import {fuseAnimations} from '../../../@fuse/animations';
import {InitMailService} from '../../services/init-mail.service';
import {MatPaginator, MatSort} from '@angular/material';
import {DataSource} from '@angular/cdk/table';
import {LoadingService} from '../../services/loading.service';
import {ErrorDilaogComponent} from '../error-dilaog/error-dilaog.component';
import {MatDialog} from '@angular/material/dialog';
import {ApplicationUserModel} from '../../models/applicationUser';

@Component({
  selector: 'app-arrived-mail-sc',
  templateUrl: './arrived-mail-sc.component.html',
  styleUrls: ['./arrived-mail-sc.component.scss'],
    animations   : fuseAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ArrivedMailScComponent implements OnInit{
    loading: boolean;
    user: ApplicationUserModel;

    dataSource: FilesDataSource | null;
    displayedColumns: string[] = ['instance', 'idEntry', 'subject', 'sender', 'receptionDate'];


    @ViewChild(MatPaginator, {static: true})
    paginator: MatPaginator;

    @ViewChild(MatSort, {static: true})
    sort: MatSort;

    @ViewChild('filter', {static: true})
    filter: ElementRef;

    constructor(private initMailService: InitMailService, public dialog: MatDialog, private loadingService: LoadingService)
    {
        // Set the defaults
        this.loading = true;
    }
    ngOnInit(): void{

        this.user = JSON.parse(localStorage.getItem('user'));

        this.initMailService.onarrivedMailsChanged.subscribe( (data) => {
            this.loadingService.closeSpinner();
        },
            (error) => {
                console.log('Error ! : ' + error);
                this.dialog.open(ErrorDilaogComponent, {
                    width: '4000px',
                });

            }
        );
        this.dataSource = new FilesDataSource(this.initMailService, this.paginator, this.sort);


        fromEvent(this.filter.nativeElement, 'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged()
            )
            .subscribe(() => {
                if ( !this.dataSource )
                {
                    return;
                }

                this.dataSource.filter = this.filter.nativeElement.value;
            });
    }
}

export class FilesDataSource extends DataSource<any>
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
        private initMailService: InitMailService,
        private _matPaginator: MatPaginator,
        private _matSort: MatSort
    )
    {
        super();

        this.filteredData = this.initMailService.arrivedMails || [];
    }

    /**
     * Connect function called by the table to retrieve one stream containing the data to render.
     *
     * @returns {Observable<any[]>}
     */
    connect(): Observable<any[]>
    {
        const displayDataChanges = [
            this.initMailService.onarrivedMailsChanged,
            this._matPaginator.page,
            this._filterChange,
            this._matSort.sortChange
        ];

        return merge(...displayDataChanges)
            .pipe(
                map(() => {



                    // console.log('__ data _____________ : ',  this.initMailService.arrivedMails);
                    if (this.initMailService.arrivedMails == null) {
                        return [];
                    }

                    let data = this.initMailService.arrivedMails.slice();
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

                    [propertyA, propertyB] = [Date.parse(a.receptionDate), Date.parse(b.receptionDate)];
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


