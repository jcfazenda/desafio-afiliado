import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DATE_FORMATS, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatLuxonDateModule } from '@angular/material-luxon-adapter';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { SharedModule } from 'app/shared/shared.module';
import { FuseHighlightModule } from '@fuse/components/highlight';

import { PopUpComponent } from './popup/popup.component'; 
import { ContactsComponent } from '../../../../../app/modules/admin/apps/contacts/contacts.component'; 
import { ContactsListComponent } from '../../../../../app/modules/admin/apps/contacts/list/list.component';
import { contactsRoutes } from './contacts.routing';
import { PopUpTestComponent } from './popup-test/popup-test.component';

@NgModule({
    declarations: [
        ContactsComponent,
        ContactsListComponent, 
        PopUpComponent,
        PopUpTestComponent
    ],
    imports     : [
        RouterModule.forChild(contactsRoutes),
        MatButtonModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatLuxonDateModule,
        MatMenuModule,
        MatProgressBarModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatTableModule,
        MatTooltipModule,
        FuseFindByKeyPipeModule,
        FuseHighlightModule,
        SharedModule,
        MatTableModule,
        MatTabsModule,
    ],
    providers   : [
        {
            provide : MAT_DATE_FORMATS,
            useValue: {
                parse  : {
                    dateInput: 'D'
                },
                display: {
                    dateInput         : 'DDD',
                    monthYearLabel    : 'LLL yyyy',
                    dateA11yLabel     : 'DD',
                    monthYearA11yLabel: 'LLLL yyyy'
                }
            }
        }
    ]
})
export class ContactsModule
{
}
