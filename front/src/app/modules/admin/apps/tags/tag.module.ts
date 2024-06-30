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
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { SharedModule } from '../../../../../app/shared/shared.module';
import { FuseCardModule } from '@fuse/components/card';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog'; 
 
import { tagRoutes } from './tag.routing'; 
import { TagListComponent } from './list/list.component';
import { TagComponent } from './tag.component';  
import { PopUpPathComponent }           from './popup-paths/popup-path.component'; 
import { ConditionalsComponent } from './conditionals/conditionals.component';

import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs'; 
import { PopUpTemplatesComponent } from './templates/popup-templates.component';

@NgModule({
    declarations: [
        TagComponent,
        TagListComponent,  
        PopUpPathComponent,
        ConditionalsComponent,
        PopUpTemplatesComponent 
    ],
    imports     : [
        RouterModule.forChild(tagRoutes),
        MatDialogModule,
        MatIconModule,
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
        MatSidenavModule,
        MatTableModule,
        MatTabsModule,
        MatTooltipModule,  
        MatButtonToggleModule,
        MatSelectModule,
        FuseCardModule,
        FuseFindByKeyPipeModule,
        SharedModule, 
    ],
    providers   : [
        {
            provide : HIGHLIGHT_OPTIONS,
            useValue: {
                parse  : {
                    dateInput: 'D'
                },
                display: {
                    dateInput         : 'DDD',
                    monthYearLabel    : 'LLL yyyy',
                    dateA11yLabel     : 'DD',
                    monthYearA11yLabel: 'LLLL yyyy'
                },
                fullLibraryLoader: () => import('highlight.js'),
                languages: ['typescript', 'javascript'],
            } 
        }
    ]
})
export class TagModule
{
}
