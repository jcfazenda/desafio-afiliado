import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder,FormControl , UntypedFormControl } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { Subject } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';

import { PopupService } from '../popup/popup.service';
import { ConfigurationService } from '../../../../auth/api-authenticate/configuration/configuration.service';
import { ConfigurationFilterService } from '../../../../auth/api-authenticate/configuration/configuration-filter.service';
import { MatDialogRef } from '@angular/material/dialog';
import { PopupTestService } from '../popup-test/popup-test.service';

@Component({
    selector       : 'headers-list',
    templateUrl    : './list.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsListComponent implements OnInit, OnDestroy
{
    @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;

    Configurations:any[] = []; 
    headersCount: number = 0;  
    drawerMode: 'side' | 'over';
    searchInputControl: UntypedFormControl = new UntypedFormControl(); 

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    formGroup: FormGroup; 
    menuList: any;  

	enum_country:           any[] = [];
	enum_operation_type:    any[] = [];
	enum_brand:             any[] = [];
    
	radioOptions:   any[] = []; 
	optionsEnabledDisabled:  any[] = [];   

	selectedModeOption: any;
	selectedStatusOption: any; 
    
    /**
     * Constructor
     */
    constructor(
        private _configuration: ConfigurationService,
        private _configurationFilter: ConfigurationFilterService, 

        private _activatedRoute: ActivatedRoute,
        private _popupService: PopupService,
        private _changeDetectorRef: ChangeDetectorRef, 
        
        private router: Router,
        private _router: Router, 
        private _popupTestService: PopupTestService,
        private formBuilder: FormBuilder,
    )
    {
    }

    ngOnInit(): void
    {
        this.formGroup = this.formBuilder.group({
			searchText:                 [''],
			select_enum_country:        [''],
			select_enum_operation_type: [''],
			select_enum_brand:          [''],
            select_elabled_disabled:    [''],
            
		});

		this.radioOptions            = []; 
		this.optionsEnabledDisabled  = [];  
		
		this.selectedModeOption   = this.radioOptions[0];  
		this.selectedStatusOption = null;     
 
        /* Get all Configurations */
        this._configuration.getConfigurations().subscribe((data) => {
            this.Configurations = data; 
            this._changeDetectorRef.detectChanges();
        });
      
        /* Get Enum Brands  */
        this._configurationFilter.getBrands().subscribe((data) => { 
            this.enum_brand = data;
        });

        /* Get Enum Brands  */
        this._configurationFilter.getOperationTypes().subscribe((data) => {
            this.enum_operation_type = data;
        });

        /* Get Enum Country  */
        this._configurationFilter.getCountryes().subscribe((data) => {
            this.enum_country = data;
        });

        this.menuList = [
            { action: 'gotoTest',        label: 'Test', icon: 'edit' },
            { action: 'gotoPaths',       label: 'Goto Path', icon: 'database' },
            { action: 'generateArchive', label: 'Generate Archive', icon: 'database' }, 
        ]; 

    } 
 
    openPopup(configuration: any): void {

        this._popupService.openPopup(configuration);
    }

    gotoPaths(configurationId: string) {
        this.router.navigate(['/apps/tags', configurationId]);
    }

    /**
     * Goto test
    */
    gotoTest(item: any): void
    {
        this._popupTestService.openPopup(item); 

    }

    /**
     * Generate Archive 
    */
    generateArchive(item: any): void
    {
        this._configuration.generateArchive(item.id).subscribe((data) => { 
            
        }); 

    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
 
    onBackdropClicked(): void
    {
        // Go back to the list
        this._router.navigate(['./'], {relativeTo: this._activatedRoute});

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }
 
    createHeader(): void
    {
        /* Create the contact
        this._connectionService.createHeader().subscribe((newContact) => {

            // Go to the new contact
            this._router.navigate(['./', newContact.id], {relativeTo: this._activatedRoute});

            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
        */
    }
 
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    ActionMenu(action: string, item: any): void {  

        switch (action) {

            case 'gotoPaths':
                    this.gotoPaths(item.id);
                    break; 

            case 'gotoTest':
                this.gotoTest(item);
                break; 

            case 'generateArchive':
                    this.generateArchive(item);
                    break; 

            default:
                break;
        }

    }

}
