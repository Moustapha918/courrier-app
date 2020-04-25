import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {ReferentialService} from '../../services/referential.service';
import {NotificationService} from '../../services/notification.service';
import {TranslateService} from '@ngx-translate/core';
import {GeneralSecretaryModel} from '../../models/general-secretary.model';
import {NewSecretaireGeneraleComponent} from '../new-secretaire-generale/new-secretaire-generale.component';
import {ConfirmDialogComponent, ConfirmDialogModel} from '../confirm-dialog/confirm-dialog.component';
import {LoadingService} from '../../services/loading.service';


@Component({
  selector: 'app-secretaire-generale',
  templateUrl: './secretaire-generale.component.html',
  styleUrls: ['./secretaire-generale.component.scss']
})
export class SecretaireGeneraleComponent implements OnInit {

    displayedColumns: string[] = ['code', 'label', 'address', 'update', 'delete'];
    // @ts-ignore
    dataSource: MatTableDataSource;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public dialog: MatDialog, public dialog1: MatDialog,
              private referentialService: ReferentialService,
              private notifyService: NotificationService,
              private loadingService: LoadingService,
              private translate: TranslateService) { }

    // tslint:disable-next-line:typedef
  ngOnInit() {
      this.updateGeneralSecretaryTable();
  }

    private updateGeneralSecretaryTable(): void {
        this.referentialService.getAllGeneralSecretaryFromBackend().subscribe((data) => {

            this.dataSource = new MatTableDataSource<GeneralSecretaryModel>(data);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    addGeneralecretary(): void {
        const dialogRef = this.dialog.open(NewSecretaireGeneraleComponent, {
            width: '4000px',
        });

        dialogRef.afterClosed().subscribe(result => {


            if (result === true) {
                this.loadingService.closeSpinner();
                this.updateGeneralSecretaryTable();
                this.notifyService.openSnackBar(this.translate.instant('REFERENTIAL.ADDMINISTEROFFICEMSG'), this.translate.instant('mail.NOTIFICATION'));
            }
        });
    }

    deleteGeneralSecretary(generalSecretary): void {
        this.referentialService.deleteGeneralSecretary(generalSecretary.code)
            .subscribe(
                () => {
                    console.log('successful generalSecretary delete');
                    this.updateGeneralSecretaryTable();
                },
                (error) => {
                    console.log('Error ! : ' + error);
                }
            );
    }

    deleteConfirm(generalSecretary): void {
        const message = this.translate.instant('REFERENTIAL.DELETEMSGCONFIRMATIONMINISTEROFFICE');

        const dialogData = new ConfirmDialogModel(this.translate.instant('REFERENTIAL.DELETECONFIRMATION'), message);


        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: '4000px',
            data: dialogData
        });
        dialogRef.afterClosed().subscribe(result => {

            if (result === true) {
                this.deleteGeneralSecretary(generalSecretary);
                this.loadingService.closeSpinner();
                this.notifyService.openSnackBar(this.translate.instant('REFERENTIAL.DELETEMINISTEROFFICEMSG'), this.translate.instant('mail.NOTIFICATION'));
            }
        });
    }

    updateGeneralSecretary(generalSecretary): void {

        const dialogRef = this.dialog.open(NewSecretaireGeneraleComponent, {
            width: '4000px',
            data: generalSecretary,
        });
        dialogRef.afterClosed().subscribe(result => {
            // tslint:disable-next-line:triple-equals
            if (result == true) {
                this.loadingService.closeSpinner();
                this.updateGeneralSecretaryTable();
                this.notifyService.openSnackBar(this.translate.instant('REFERENTIAL.UPDATEMINISTEROFFICEMSG'), this.translate.instant('mail.NOTIFICATION'));
            }
        });

    }

}
