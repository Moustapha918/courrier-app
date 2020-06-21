import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ReferentialService} from '../../services/referential.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {NewDivisionComponent} from '../new-division/new-division.component';
import {ConfirmDialogComponent, ConfirmDialogModel} from '../confirm-dialog/confirm-dialog.component';
import {MatTableDataSource} from '@angular/material/table';
import {DivisionModel} from '../../models/division.model';
import {NotificationService} from '../../services/notification.service';
import {TranslateService} from '@ngx-translate/core';
import {LoadingService} from '../../services/loading.service';
import {ErrorDilaogComponent} from '../error-dilaog/error-dilaog.component';



@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.scss']
})
export class DivisionComponent implements OnInit {

    displayedColumns: string[] = ['code', 'codeDirection', 'codeService', 'label', 'address', 'update', 'delete'];
    // @ts-ignore
    dataSource: MatTableDataSource;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;



  constructor(public dialog: MatDialog,
              private notifyService: NotificationService,
              public translate: TranslateService,
              private loadingService: LoadingService,
              private referentialService: ReferentialService) {}




    // tslint:disable-next-line:typedef
  ngOnInit() {
      this.updateDivisionsTable();
    }

    private updateDivisionsTable(): void {
        this.referentialService.getAllDivisionsFromBackend().subscribe((divisions) => {
            divisions.map(division  => {
                this.referentialService.getDirectionByCode(division.codeDirection).subscribe((direction) => {
                    division.labelDirection = [direction.labelAR, direction.labelFR];
                },

                    (error) => {
                        console.log('Error ! : ' + error);
                        const message = 'une erreur technique est survenue.  Veuillez réessayer ultérieurement';
                        const dialogData = new ConfirmDialogModel('title', message);
                        const dialogRefError = this.dialog.open(ErrorDilaogComponent, {
                            width: '4000px',
                            data: dialogData
                        });
                        dialogRefError.afterClosed().subscribe(result => {

                        });
                    }
                    );
                this.referentialService.getServiceByCode(division.codeService).subscribe((service) => {
                    division.labelService = [service.labelAR, service.labelFR];
                },

                    (error) => {
                        console.log('Error ! : ' + error);
                        const message = 'une erreur technique est survenue.  Veuillez réessayer ultérieurement';
                        const dialogData = new ConfirmDialogModel('title', message);
                        const dialogRefError = this.dialog.open(ErrorDilaogComponent, {
                            width: '4000px',
                            data: dialogData
                        });
                        dialogRefError.afterClosed().subscribe(result => {

                        });
                    });
                return division;
            });

            this.dataSource = new MatTableDataSource<DivisionModel>(divisions);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    AddDivision(): void {

        const dialogRef = this.dialog.open(NewDivisionComponent, {
            width: '4000px',

        });
        dialogRef.afterClosed().subscribe(result => {
            this.updateDivisionsTable();
            if (result === true) {
                this.loadingService.closeSpinner();
                this.notifyService.openSnackBar(this.translate.instant('REFERENTIAL.ADDDIVISIONMSG'), this.translate.instant('mail.NOTIFICATION'));
            }
        });

    }

    deleteDivision(division): void {
        this.referentialService.deleteDivision(division.code)
            .subscribe(
                () => {
                    console.log('successful division delete');
                    this.updateDivisionsTable();
                },
                (error) => {
                    const message = 'une erreur technique est survenue lors de la suppression de la division.  Veuillez réessayer ultérieurement';
                    const dialogData = new ConfirmDialogModel('title', message);
                    const dialogRefError = this.dialog.open(ErrorDilaogComponent, {
                        width: '400px',
                        data: dialogData
                    });
                    dialogRefError.afterClosed().subscribe(result => {
                        if (result === true) {
                            this.updateDivisionsTable();
                        }
                    });
                }
            );

    }

    deleteConfirm(division): void {
        const message = this.translate.instant('REFERENTIAL.DELETEMSGCONFIRMATIONDIVISION');

        const dialogData = new ConfirmDialogModel(this.translate.instant('REFERENTIAL.DELETECONFIRMATION'), message);


        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: '4000px',
            data: dialogData
        });
        dialogRef.afterClosed().subscribe(result => {
            // tslint:disable-next-line:triple-equals
            if (result == true) {
                this.loadingService.closeSpinner();
                this.deleteDivision(division);

                this.notifyService.openSnackBar(this.translate.instant('REFERENTIAL.DELETEDIVISIONMSG'), this.translate.instant('mail.NOTIFICATION'));
            }
        });

    }



    updateDivision(division): void {

        const dialogRef = this.dialog.open(NewDivisionComponent, {
            width: '4000px',
            data: division
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.loadingService.closeSpinner();
                this.updateDivisionsTable();
                this.notifyService.openSnackBar(this.translate.instant('REFERENTIAL.UPDATEDIVISIONMSG'), this.translate.instant('mail.NOTIFICATION'));
            }
        });

    }

}
