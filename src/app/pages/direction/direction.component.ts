import {ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {NewDirectionComponent} from '../new-direction/new-direction.component';
import {ReferentialService} from '../../services/referential.service';
import {ConfirmDialogComponent, ConfirmDialogModel} from '../confirm-dialog/confirm-dialog.component';
import { NotificationService } from '../../services/notification.service';
import {TranslateService} from '@ngx-translate/core';
import {MatTableDataSource} from '@angular/material/table';
import {DirectionModel} from '../../models/direction.model';

export interface Dessert {
    calories: number;
    carbs: number;
    fat: number;
    name: string;
    protein: number;
}


@Component({
  selector: 'app-direction',
  templateUrl: './direction.component.html',
  styleUrls: ['./direction.component.scss']
})
export class DirectionComponent implements OnInit {

    displayedColumns: string[] = ['code', 'label', 'address', 'update', 'delete'];
    // @ts-ignore
    dataSource: MatTableDataSource;

    // localstorage
    storedLang = localStorage.getItem('language');


    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;



    constructor(public dialog: MatDialog, public dialog1: MatDialog,
                private referentialService: ReferentialService,
                private notifyService: NotificationService,
                private translate: TranslateService,

                ) {}


    // tslint:disable-next-line:typedef
    ngOnInit() {
        this.updateDirectionsTable();
    }


    private updateDirectionsTable(): void {
        this.referentialService.getAllDirectionsFromBackend().subscribe((data) => {
            this.dataSource = new MatTableDataSource<DirectionModel>(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    addDirection(): void {
        const dialogRef = this.dialog.open(NewDirectionComponent, {
            width: '4000px',

        });

        dialogRef.afterClosed().subscribe(result => {
            this.updateDirectionsTable();

            if (result === true) {
                this.notifyService.openSnackBar(this.translate.instant('REFERENTIAL.ADDDIRECTIONMSG'), this.translate.instant('mail.NOTIFICATION'));
            }
        });
    }



    deleteDirection(direction): void {
        this.referentialService.deleteDirection(direction.code)
            .subscribe(
                () => {
                    console.log('successful direction delete');
                },
                (error) => {
                    console.log('Error ! : ' + error);
                }
            );

    }

    deleteConfirm(direction): void {
        const message = this.translate.instant('REFERENTIAL.DELETEMSGCONFIRMATIONDIRECTION');

        const dialogData = new ConfirmDialogModel(this.translate.instant('REFERENTIAL.DELETECONFIRMATION'), message);


        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: '4000px',
            data: dialogData
        });
        dialogRef.afterClosed().subscribe(result => {

            if (result === true) {
                this.deleteDirection(direction);
                this.updateDirectionsTable();
                this.notifyService.openSnackBar(this.translate.instant('REFERENTIAL.DELETEDIRECTIONMSG'), this.translate.instant('mail.NOTIFICATION'));
            }
        });

    }

    updateDirection(direction): void {

        const dialogRef = this.dialog.open(NewDirectionComponent, {
            width: '4000px',
            data: direction,
        });
        dialogRef.afterClosed().subscribe(result => {
            // tslint:disable-next-line:triple-equals
            if (result == true) {
                // this.dataSource = this.referentialService.getAllDirectionsFromBackend();
                this.updateDirectionsTable();
                this.notifyService.openSnackBar(this.translate.instant('REFERENTIAL.UPDATEDIRECTIONMSG'), this.translate.instant('mail.NOTIFICATION'));
            }
        });

    }
}


