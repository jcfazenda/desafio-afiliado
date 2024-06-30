import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog'; 
import { PopUpTemplatesComponent } from './popup-templates.component';

@Injectable({
  providedIn: 'root',
})
export class PopUpTemplatesService {

  constructor(private dialog: MatDialog) {}

    openPopup(item: any): MatDialogRef<any, any> {

      return this.dialog.open(PopUpTemplatesComponent, {
        data: { item },
        width: '1350px',
        height: '1260px',

    });


  }

  
}
