import {Component, OnInit, ViewChild} from '@angular/core';
import {NewDirectionComponent} from '../new-direction/new-direction.component';
import {MatDialog} from '@angular/material/dialog';
import {ReferentialService} from '../../services/referential.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {NewDivisionComponent} from '../new-division/new-division.component';
import {ConfirmDialogComponent, ConfirmDialogModel} from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.scss']
})
export class DivisionComponent implements OnInit {

    displayedColumns: string[] = ['code', 'codeDirection', 'codeService', 'label', 'address', 'update', 'delete'];
    dataSource: any;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    code: string;
    codeDirection: string;
    codeService: string;
    label: string;
    address: string;

  constructor(public dialog: MatDialog,
              private referentialService: ReferentialService) { }


    AddDivision(): void {
        const dialogRef = this.dialog.open(NewDivisionComponent, {
            width: '4000px',

        });
        dialogRef.afterClosed().subscribe(result => {
            this.dataSource = this.referentialService.getAllDivisionsFromBackend();


        });

    }

    // tslint:disable-next-line:typedef
  ngOnInit() {
        this.dataSource = this.referentialService.getAllDivisionsFromBackend();
        console.log(this.dataSource);
        /*  this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;*/
    }

    confirmDialog(division): void {
        const message = `Vous êtes sûr de vouloir supprimer cette division`;

        const dialogData = new ConfirmDialogModel('Confirmation de suppression', message);


        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: '4000px',
            data: dialogData
        });
        dialogRef.afterClosed().subscribe(result => {
            // tslint:disable-next-line:triple-equals
            if (result == true) {
                this.deleteDivision(division);
                this.dataSource = this.referentialService.getAllDivisionsFromBackend();
            }
        });

    }

    deleteDivision(division): void {
        this.referentialService.deleteDivision(division.code)
            .subscribe(
                () => {
                    console.log('successful division delete');
                },
                (error) => {
                    console.log('Error ! : ' + error);
                }
            );

    }

    updateDivision(division): void {

        const dialogRef = this.dialog.open(NewDivisionComponent, {
            maxWidth: '4000px',
            data: division
        });
        dialogRef.afterClosed().subscribe(result => {
            this.dataSource = this.referentialService.getAllDivisionsFromBackend();
        });

    }

}
