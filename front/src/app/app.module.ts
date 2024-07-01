import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';

import { MatSelectModule } from '@angular/material/select';
import { CoreModule } from '../app/core/core.module';
import { appConfig } from '../app/core/config/app.config';
import { mockApiServices } from '../app/mock-api';
import { LayoutModule } from '../app/layout/layout.module';
import { AppComponent } from '../app/app.component';
import { appRoutes } from '../app/app.routing';
import { ConnectionService } from './modules/auth/api-authenticate/connection.service';
import { ConfigurationService } from './modules/auth/api-authenticate/configuration/configuration.service';
import { ConfigurationFilterService } from './modules/auth/api-authenticate/configuration/configuration-filter.service';
import { PathService } from './modules/auth/api-authenticate/path/paths.service';
import { MacrosService } from './modules/auth/api-authenticate/macros/macros.service';
import { TemplatesService } from './modules/auth/api-authenticate/templates/templates.service';
import { MatCardModule } from '@angular/material/card';
import { ProductLandingService } from './modules/auth/api-authenticate/products/product-landing.service';  
import { MatTableModule } from '@angular/material/table';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { IconService } from '../assets/icon.service';
import {MatMenuModule} from '@angular/material/menu'; 

const routerConfig: ExtraOptions = {
    preloadingStrategy       : PreloadAllModules,
    scrollPositionRestoration: 'enabled'
};

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig), 

        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),
 
        MatCardModule,
        CoreModule, 
        LayoutModule,
        MatSelectModule, 
        MatTableModule,
        MatIconModule,
        MatMenuModule
    ],
    bootstrap   : [
        AppComponent
    ],
    providers: [
        ProductLandingService,
        ConnectionService, ConfigurationService, ConfigurationFilterService, 
        PathService, MacrosService, TemplatesService
    ]
})
export class AppModule
{
    /* instanciando icons */
    constructor(private iconService: IconService) { }
    
}
