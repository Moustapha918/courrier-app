import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {ReferentialService} from '../../services/referential.service';
import {NewDepartementComponent} from '../new-departement/new-departement.component';
import {ConfirmDialogComponent, ConfirmDialogModel} from '../confirm-dialog/confirm-dialog.component';
import {TranslateService} from '@ngx-translate/core';




@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.scss']
})
export class DepartementComponent implements OnInit {

    displayedColumns: string[] = ['code', 'label', 'address', 'update', 'delete'];
    // @ts-ignore
    dataSource: any; // Promise<any> | null;


    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;


    constructor(public dialog: MatDialog,
                private translate: TranslateService,
                private referentialService: ReferentialService) {


    }

    AddDepartment(): void {
        const dialogRef = this.dialog.open(NewDepartementComponent, {
            width: '4000px',

        });
        dialogRef.afterClosed().subscribe(result => {
            this.dataSource = this.referentialService.getAllDepartmentFromBackend();
        });
    }


    // tslint:disable-next-line:typedef
    ngOnInit() {


        this.dataSource = this.referentialService.getAllDepartmentFromBackend();

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    confirmDialog(departement): void {
        const message = `Vous êtes sûr de vouloir supprimer ce dpartement`;

        const dialogData = new ConfirmDialogModel('Confirmation de suppression', message);


        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxWidth: '4000px',
            data: dialogData
        });
        dialogRef.afterClosed().subscribe(result => {
            // tslint:disable-next-line:triple-equals
            if (result == true) {
                this.deleteDepartement(departement);
                this.dataSource = this.referentialService.getAllDepartmentFromBackend();
            }
        });

    }

    deleteDepartement(departement): void {
        this.referentialService.deleteDepartement(departement.code)
            .subscribe(
                () => {
                    console.log('successful department delete');
                },
                (error) => {
                    console.log('Error ! : ' + error);
                }
            );
    }

    updateDepartment(departement): void {

        const dialogRef = this.dialog.open(NewDepartementComponent, {
            maxWidth: '4000px',
            data: departement
        });
        dialogRef.afterClosed().subscribe(result => {
            // tslint:disable-next-line:triple-equals
            if (result == true) {

            }
            this.dataSource = this.referentialService.getAllDepartmentFromBackend();
        });

    }



}
