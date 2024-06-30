import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'; 
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTabsModule } from '@angular/material/tabs';  
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core'; 
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import {MatMenuModule} from '@angular/material/menu'; 

import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductsComponent } from './products.component';
import { ProductLandingComponent } from './product-landing/product-landing.component'; 
import { ProductsRoutingModule } from './products-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { CookieService } from '../../../services/cookie.service';
import { ProductDialog } from './product-dialog/product-dialog.component';


@NgModule({
    declarations: [
        ProductCreateComponent,
        ProductsComponent,
        ProductLandingComponent,
        ProductDialog
    ],
    imports: [
        ProductsRoutingModule, 

        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatIconModule,
        MatBadgeModule,
        MatTabsModule, 
        MatDividerModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatOptionModule,
        MatTableModule,
        ReactiveFormsModule,
        MatRadioModule,
        FormsModule,
        MatMenuModule,
        MatDialogModule 
 
    ],
    providers: [CookieService]
})
export class ProductsModule { }
