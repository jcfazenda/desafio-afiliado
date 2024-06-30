import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder,FormControl , UntypedFormControl } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { switchMap } from 'rxjs'; 
  
import { TemplatesService } from '../../../../auth/api-authenticate/templates/templates.service';
import { PathService } from '../../../../auth/api-authenticate/path/paths.service';
import { PopupPathService } from '../popup-paths/popup-path.service';
import { ConfigurationService } from '../../../../auth/api-authenticate/configuration/configuration.service';
import { ConfigurationType } from '../../../../auth/api-authenticate/configuration/configuration-types';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PopUpTemplatesService } from '../templates/popup-templates.service';
 
interface PathItem {
    name: string;
    // other properties
  }
  
  
@Component({
    selector       : 'tags-list',
    templateUrl    : './list.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagListComponent implements OnInit, OnDestroy
{
    @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;
    messageEmitter = new EventEmitter<string>();

    configuration: ConfigurationType;
    configurationId: any;

    isDrawerOpen = false;
    jsonData = {};

    Templates:any[] = []; 
    Paths:any[] = []; 
    processedPaths: { key: string; values: PathItem[] }[] = [];

    pathCount: number = 0;  

    formGroup: FormGroup; 
	typeOptionsResponseRequest: any[] = []; 
    
    /**
     * Constructor
    */
   
    constructor(
        private _pathService: PathService, 
        private _configurationService: ConfigurationService, 
        private _templateService: TemplatesService,
        private _popupTemplatesService: PopUpTemplatesService,

        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef, 
        private _popupPathService: PopupPathService, 
        private formBuilder: FormBuilder,
        private dialog: MatDialog
    )
    {
     
    }

    ngOnInit(): void
    {
        this.formGroup = this.formBuilder.group({
			searchText:         [''], 
			select_type:        [''], 
		});

       
		this.typeOptionsResponseRequest = [];  

         /* Get Path by id Configuration */
        this._activatedRoute.params.pipe(
            switchMap(configurationId => {  

                this.configurationId = configurationId['id'];
                return this._configurationService.getById(this.configurationId);
            })
        ).subscribe(
            _configuration => {  
                this.configuration = _configuration[0]; 
            },
            error => {
                console.error('Erro ao obter header:', error);
            }
        );  

        /* tag's from header */   
        this.jsonPaths(this.configurationId);

    }

    ngOnDestroy(): void
    {

    }

    jsonPaths(configurationId: any): void {

        this.Paths = [];
        this.jsonData = {};

        this._pathService.getPathsByConfiguration(configurationId)
        .subscribe(
            tags => {    

                this.pathCount  = tags.length;  
                let paths = [];
        
                tags.forEach(item => {
        
                    Object.keys(item).forEach(key => {
        
                    if (!this.jsonData[key]) { this.jsonData[key] = []; }
                
                    item[key].forEach(subItem => { this.jsonData[key].push(subItem); });

                    let _item = {
                      name: key, 
                      paths: this.jsonData[key] 
                    };
                
                    this.Paths.push(_item);
                  });
        
                }); 
        
                this._changeDetectorRef.markForCheck();

            },
            error => {
                console.error('Error fetching tags:', error);
            }
        );  
    }

    openPopup(item: any): void {

        const dialogRef: MatDialogRef<any, any> = this._popupPathService.openPopup(item, this.configuration.id);
      
        dialogRef.afterClosed().subscribe((message: any) => {
            console.log(message as string);
            this.jsonPaths(this.configurationId);
        });

    }

    /**
     * Drawer templates
    */
    toggleDrawer() {

        this._templateService.getAll().subscribe((data) => {   
            console.log(data);
            this.Templates = data; 
        }); 

        this.isDrawerOpen = !this.isDrawerOpen;
    } 

    openPopupTemplate(item: any): void {

            const dialogRef: MatDialogRef<any, any> = this._popupTemplatesService.openPopup(item);
        
            dialogRef.afterClosed().subscribe((message: any) => {
                console.log(message as string);
                this.jsonPaths(this.configurationId);
            });

    }


}
