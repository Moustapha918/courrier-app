import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {ReferentialService} from '../../services/referential.service';
import {NotificationService} from '../../services/notification.service';
import {TranslateService} from '@ngx-translate/core';
import {MinisterOfficeModel} from '../../models/minister-office.model';
import {NewCabinetMinstreComponent} from '../new-cabinet-minstre/new-cabinet-minstre.component';
import {ConfirmDialogComponent, DialogModel} from '../confirm-dialog/confirm-dialog.component';
import {LoadingService} from '../../services/loading.service';
import {ErrorDilaogComponent} from '../error-dilaog/error-dilaog.component';

@Component({
  selector: 'app-cabinet-ministre',
  templateUrl: './cabinet-ministre.component.html',
  styleUrls: ['./cabinet-ministre.component.scss']
})
export class CabinetMinistreComponent implements OnInit {

    displayedColumns: string[] = ['code', 'label', 'address', 'update', 'delete'];
    // @ts-ignore
    dataSource: MatTableDataSource;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public dialog: MatDialog, public dialog1: MatDialog,
              private referentialService: ReferentialService,
              private notifyService: NotificationService,
              private loadingService: LoadingService,
              public translate: TranslateService) { }

    // tslint:disable-next-line:typedef
  ngOnInit() {
      this.updateMinisterOfficeTable();
  }

    private updateMinisterOfficeTable(): void {
        this.referentialService.getAllMinistreOfficeFromBackend().subscribe((data) => {

            this.dataSource = new MatTableDataSource<MinisterOfficeModel>(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        },
        error => {
            console.log('Error ! : ' + error);
            const dialogRefError = this.dialog.open(ErrorDilaogComponent, {
                width: '600px',
            });
            dialogRefError.afterClosed().subscribe(result => {
                /*if (result === true) {
                    this.updateMinisterOfficeTable();
                }*/
            });
        }
        );
    }

    addMinisterOffice(): void {
        const dialogRef = this.dialog.open(NewCabinetMinstreComponent, {
            width: '4000px',
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result === true) {
                this.loadingService.closeSpinner();
                this.updateMinisterOfficeTable();
                this.notifyService.openSnackBar(this.translate.instant('REFERENTIAL.ADDMINISTEROFFICEMSG'), this.translate.instant('mail.NOTIFICATION'));
            }
            else{
                this.loadingService.closeSpinner();
            }
        });
    }

    deleteMinisterOffice(minsterOffice): void {
        this.referentialService.deleteMinisterOffice(minsterOffice.code)
            .subscribe(
                () => {
                    console.log('successful minsteroffice delete');
                    this.updateMinisterOfficeTable();
                },
                (error) => {
                    console.log('Error ! : ' + error);
                    const message = 'une erreur technique est survenue';
                    const dialogData = new DialogModel('title', message);
                    const dialogRefError = this.dialog.open(ErrorDilaogComponent, {
                        width: '600px',
                        data: dialogData
                    });
                    dialogRefError.afterClosed().subscribe(result => {
                        if (result === true) {
                            this.updateMinisterOfficeTable();
                        }
                    });
                }
            );
    }

    deleteConfirm(minsterOffice): void {
        const message = this.translate.instant('REFERENTIAL.DELETEMSGCONFIRMATIONMINISTEROFFICE');
        const dialogData = new DialogModel(this.translate.instant('REFERENTIAL.DELETECONFIRMATION'), message);
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: '4000px',
            data: dialogData
        });
        dialogRef.afterClosed().subscribe(result => {

            if (result === true) {
                this.deleteMinisterOffice(minsterOffice);
                this.loadingService.closeSpinner();
                this.notifyService.openSnackBar(this.translate.instant('REFERENTIAL.DELETEMINISTEROFFICEMSG'), this.translate.instant('mail.NOTIFICATION'));
            }
        });
    }

    updateMinisterOffice(minsterOffice): void {

        const dialogRef = this.dialog.open(NewCabinetMinstreComponent, {
            width: '4000px',
            data: minsterOffice,
        });
        dialogRef.afterClosed().subscribe(result => {
            // tslint:disable-next-line:triple-equals
            if (result == true) {
                // this.dataSource = this.referentialService.getAllDirectionsFromBackend();
                this.updateMinisterOfficeTable();
                this.loadingService.closeSpinner();
                this.notifyService.openSnackBar(this.translate.instant('REFERENTIAL.UPDATEMINISTEROFFICEMSG'), this.translate.instant('mail.NOTIFICATION'));
            }
        });

    }

}
