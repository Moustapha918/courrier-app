import {Component, Inject, OnInit} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ArrivedMailModel} from '../../models/arrived-mail.model';
import {FileUploadService} from '../../services/file-upload.service';
import {NotificationService} from '../../services/notification.service';
import {TranslateService} from '@ngx-translate/core';
import {DepartureMailModel} from '../../models/departure-mail.model';

@Component({
  selector: 'app-visualize-pdf',
  templateUrl: './visualize-pdf.component.html',
  styleUrls: ['./visualize-pdf.component.scss']
})
export class VisualizePdfComponent implements OnInit {
    pdfSrc: string;
    arrivedMail: ArrivedMailModel;
    departureMail: DepartureMailModel;
    type: string;

  constructor(public dialogRef: MatDialogRef<VisualizePdfComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fileService: FileUploadService,
              private notificationService: NotificationService,
              private translate: TranslateService) { }

  ngOnInit(): void {
      this.type = this.data.type;

      if (this.type === 'arrived') {


          this.arrivedMail = this.data.mail;
          this.fileService.downLoadFile(this.arrivedMail.idDirectory, this.arrivedMail.idScanFile)
              .subscribe(blob => {
                  const objectURL = URL.createObjectURL(blob);
                  console.log(blob);
                  this.pdfSrc = objectURL;
              }, error => {
                  this.notificationService.openSnackBar(
                      this.translate.instant('ERRORS.FILE_DOWNLOAD'), this.translate.instant('mail.NOTIFICATION'));
                  this.dialogRef.close();

              });
      }

      if (this.type === 'depart') {

          this.departureMail = this.data.mail;
          this.fileService.downLoadDepartureFile(this.departureMail.idDirectory, this.departureMail.idScanFile)
              .subscribe(blob => {
                  const objectURL = URL.createObjectURL(blob);
                  console.log(blob);
                  this.pdfSrc = objectURL;
              }, error => {
                  this.notificationService.openSnackBar(
                      this.translate.instant('ERRORS.FILE_DOWNLOAD'), this.translate.instant('mail.NOTIFICATION'));
                  this.dialogRef.close();

              });
      }
  }

}
