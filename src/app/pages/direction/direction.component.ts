import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
// @ts-ignore
import NewDirectionComponent from '../../pages/new-direction';


export interface Direction {
    ID: number;
    Direction_name: string;
    Adresse: string;

}

const ELEMENT_DATA: Direction[] = [
    {ID: 1, Direction_name: 'Hydrogen', Adresse: 'hhhhh'},
    {ID: 2, Direction_name: 'Helium', Adresse: 'hhhh'},
    {ID: 3, Direction_name: 'Lithium', Adresse: 'jyghg'},
    {ID: 4, Direction_name: 'Beryllium', Adresse: 'hhhjk'},
    {ID: 5, Direction_name: 'Boron', Adresse: 'jyuygh'},
    {ID: 6, Direction_name: 'Carbon', Adresse: 'iuiij'},
    {ID: 7, Direction_name: 'Nitrogen', Adresse: 'kjkjk'},
    {ID: 8, Direction_name: 'Oxygen', Adresse: 'ujklj'},
    {ID: 9, Direction_name: 'Fluorine', Adresse: 'ujhg'},
    {ID: 10, Direction_name: 'Neon', Adresse: 'uyhtg'},
];

@Component({
  selector: 'app-direction',
  templateUrl: './direction.component.html',
  styleUrls: ['./direction.component.scss']
})
export class DirectionComponent implements OnInit {

    displayedColumns: string[] = ['ID', 'Direction', 'Adresse'];
    dataSource = ELEMENT_DATA;

    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    Id: number;
    Direction1: string;
    Adresse1: string;

    constructor(public dialog: MatDialog) {
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(NewDirectionComponent, {
            width: '250px',
            data: {Id: this.Id, Direction1: this.Direction1, adresse1: this.Adresse1}
        });



    }
    // tslint:disable-next-line:typedef
    ngOnInit() {
        /*  this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;*/
    }



}



export class NewDirectionComponent {

    constructor(
        public dialogRef: MatDialogRef<NewDirectionComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Direction) {}

    onNoClick(): void {
        this.dialogRef.close();

    }

}

