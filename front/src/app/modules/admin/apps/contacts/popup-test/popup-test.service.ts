import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; 
import { PopUpTestComponent } from './popup-test.component';

@Injectable({
  providedIn: 'root',
})
export class PopupTestService {
  constructor(private dialog: MatDialog) {}

  openPopup(configuration: any): void { 

      this.dialog.open(PopUpTestComponent, {

        data: { configuration },
        width: '1570px',
        height: '1390px', 
      
      });

  }
}
