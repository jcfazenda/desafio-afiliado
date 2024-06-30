import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from '../popup/popup.component';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  constructor(private dialog: MatDialog) {}

  openPopup(configuration: any): void { 
    this.dialog.open(PopUpComponent, {

      data: { configuration },
      width: '900px',
      height: '1100px',  
     
    });
  }
}
