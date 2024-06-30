import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PopUpPathComponent } from '../popup-paths/popup-path.component';

@Injectable({
  providedIn: 'root',
})
export class PopupPathService {
  constructor(private dialog: MatDialog) {}

  openPopup(paths: any, id_configuration: any): MatDialogRef<any, any> {
    return this.dialog.open(PopUpPathComponent, {
      data: { paths, id_configuration },
      width: '600px',
      height: '1260px',
    });
  }

  
}
