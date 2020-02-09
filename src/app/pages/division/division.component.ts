import {Component, OnInit, ViewChild} from '@angular/core';
import {NewDirectionComponent} from '../new-direction/new-direction.component';
import {MatDialog} from '@angular/material/dialog';
import {ReferentialService} from '../../services/referential.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {NewDivisionComponent} from '../new-division/new-division.component';

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


    openDialog(): void {
        const dialogRef = this.dialog.open(NewDivisionComponent, {
            width: '4000px',

        });

    }

    // tslint:disable-next-line:typedef
  ngOnInit() {
        this.dataSource = this.referentialService.getAllDivisionsFromBackend();
        console.log(this.dataSource);
        /*  this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;*/
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

}
