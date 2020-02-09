import {ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {NewDirectionComponent} from '../new-direction/new-direction.component';
import {ReferentialService} from '../../services/referential.service';
import {ConfirmDialogComponent, ConfirmDialogModel} from '../confirm-dialog/confirm-dialog.component';



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

    Id: number;
    Direction1: string;
    Adresse1: string;

    constructor(public dialog: MatDialog, public dialog1: MatDialog,
                private referentialService: ReferentialService,
                private cdr: ChangeDetectorRef) {}

    openDialog(): void {
        const dialogRef = this.dialog.open(NewDirectionComponent, {
            width: '4000px',
            // data: {Id: this.Id, Direction1: this.Direction1, adresse1: this.Adresse1}
        });
        this.dataSource = this.referentialService.getAllDirectionsFromBackend();
    }

    confirmDialog(direction): void {
        const message = `Are you sure you want to do this?`;

        const dialogData = new ConfirmDialogModel('Confirm Action', message);


        const dialogRef = this.dialog1.open(ConfirmDialogComponent, {
            maxWidth: '4000px',
            data: dialogData
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            // tslint:disable-next-line:triple-equals
            if (result == true) {
                this.deleteDirection(direction);
            }
            });
    }



    // tslint:disable-next-line:typedef
    ngOnInit() {

        console.log(this.referentialService.getAllDirectionsFromBackend());
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


