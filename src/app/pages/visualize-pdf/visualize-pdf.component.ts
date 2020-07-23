import {Component, Inject, OnInit} from '@angular/core';
import {Environment} from '@angular/compiler-cli/src/ngtsc/typecheck/src/environment';
import {environment} from '../../../environments/environment';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ArrivedMailModel} from '../../models/arrived-mail.model';
import {FileUploadService} from "../../services/file-upload.service";
import {NotificationService} from "../../services/notification.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-visualize-pdf',
  templateUrl: './visualize-pdf.component.html',
  styleUrls: ['./visualize-pdf.component.scss']
})
export class VisualizePdfComponent implements OnInit {
    pdfSrc: string;

  constructor(public dialogRef: MatDialogRef<VisualizePdfComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ArrivedMailModel,
              private fileService: FileUploadService,
              private notificationService: NotificationService,
              private translate: TranslateService) { }

  ngOnInit(): void {

      this.fileService.downLoadFile(this.data.idDirectory, this.data.idScanFile)
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
