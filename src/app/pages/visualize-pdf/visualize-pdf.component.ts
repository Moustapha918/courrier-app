import {Component, Inject, OnInit} from '@angular/core';
import {Environment} from '@angular/compiler-cli/src/ngtsc/typecheck/src/environment';
import {environment} from '../../../environments/environment';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ArrivedMailModel} from '../../models/arrived-mail.model';

@Component({
  selector: 'app-visualize-pdf',
  templateUrl: './visualize-pdf.component.html',
  styleUrls: ['./visualize-pdf.component.scss']
})
export class VisualizePdfComponent implements OnInit {
    pdfSrc: string;

  constructor(public dialogRef: MatDialogRef<VisualizePdfComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ArrivedMailModel) { }

  ngOnInit(): void {

      this.pdfSrc = environment.backendUrl + '/mailing/arrived/download-scan/' + this.data.idDirectory + '/'  + this.data.idScanFile;
  }

}
