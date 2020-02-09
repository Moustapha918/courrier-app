import {ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {NewDirectionComponent} from '../new-direction/new-direction.component';
import {ReferentialService} from '../../services/referential.service';
import {DirectionModel} from "../../models/direction.model";



@Component({
  selector: 'app-direction',
  templateUrl: './direction.component.html',
  styleUrls: ['./direction.component.scss']
})
export class DirectionComponent implements OnInit {

    displayedColumns: string[] = ['code', 'label', 'address', 'update', 'delete'];
    // @ts-ignore
    dataSource: any;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;


    constructor(public dialog: MatDialog,
                private referentialService: ReferentialService,
                private cdr: ChangeDetectorRef) {}

    openDialog(): void {
        const dialogRef = this.dialog.open(NewDirectionComponent, {
            width: '4000px',
        });
        this.dataSource = this.referentialService.getAllDirectionsFromBackend();
    }


    // tslint:disable-next-line:typedef
    ngOnInit() {


        this.dataSource = this.referentialService.getAllDirectionsFromBackend();
        this.cdr.detectChanges();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    // tslint:disable-next-line:use-lifecycle-interface
    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
    }


    deleteDirection(direction): void {
        this.referentialService.deleteDirection(direction.code)
            .subscribe(
                () => {
                    console.log('successful irection delete');
                },
                (error) => {
                    console.log('Error ! : ' + error);
                }
            );

    }

}


