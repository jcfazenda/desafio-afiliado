import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl } from '@angular/forms';  
import { countryes, headers, radioOptions, statusOptions, transactions, types } from '../../../../../mock-api/headers';
import { ActivatedRoute, Router } from '@angular/router';
 
@Component({
    selector       : 'app-project-list',
    templateUrl    : './list.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit, OnDestroy
{
    formGroup: FormGroup; 
	
	countryes:      any[] = [];
	transactions:   any[] = [];
	types:          any[] = []; 
	radioOptions:   any[] = []; 
	statusOptions:  any[] = []; 
	headers:        any[] = [];  
	originalHeaders = headers;
	selectedModeOption: any;
	selectedStatusOption: any;
 
    data: any;  
    drawerMode: 'side' | 'over';
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    selectedHeader: any;
     


    /**
     * Constructor
     */
    constructor(
        private cdr: ChangeDetectorRef,
        private formBuilder: FormBuilder,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef, 
    )
    {
    }
    /**
     * On init
     */
    ngOnInit(): void
    {
        this.formGroup = this.formBuilder.group({
			searchText:         [''],
			select_country:     [''],
			select_type:        [''],
			select_transaction: [''],
		});

		// Headers
        this.selectedHeader = null;

		this.transactions   = transactions; 
		this.countryes      = countryes;
		this.types          = types;
		this.radioOptions   = radioOptions; 
		this.statusOptions  = statusOptions; 
		this.headers        = headers; 
		
		this.selectedModeOption = this.radioOptions[0];  
		this.selectedStatusOption =null;    
    }
 

    ngOnDestroy(): void
    {
 
    }
    filterHeaders() {

		const searchTextValue   = this.formGroup.get('searchText')?.value?.toLowerCase();
		const transactionValue  = this.formGroup.get('select_transaction')?.value;
		const countryValue      = this.formGroup.get('select_country')?.value;
		const typeValue         = this.formGroup.get('select_type')?.value;
	  
		if (!searchTextValue && !transactionValue && !countryValue && !typeValue && this.selectedModeOption === null && this.selectedStatusOption === null) {
		  this.headers = [...this.originalHeaders];
		  return;
		}
	  
		let filteredItems = this.originalHeaders;
	  
		if (searchTextValue) {
		  
		  filteredItems = filteredItems.filter((item) =>
			Object.values(item).some(
			  (value) =>
				(typeof value === 'string' || (value && typeof value === 'object' && 'toLowerCase' in value)) &&
				JSON.stringify(value).toLowerCase().includes(searchTextValue)
			) ||
			(item.country && 'country' in item && 'name' in item.country && item.country.name.toLowerCase().includes(searchTextValue.toLowerCase()))
		  );
	
		}    
		
	  
		if (transactionValue) {
		  filteredItems = filteredItems.filter((item) =>
			item.transaction && 'id' in item.transaction && item.transaction.id === parseInt(transactionValue, 10)
		  );
		}
	  
		if (countryValue) {
		  filteredItems = filteredItems.filter((item) =>
			item.country && 'id' in item.country && item.country.id === parseInt(countryValue, 10)
		  );
		} 
	  
		if (typeValue) {
		  filteredItems = filteredItems.filter((item) =>
			item.types && 'id' in item.types && item.types.id === parseInt(typeValue, 10)
		  );
		}
	  
		if (this.selectedModeOption !== null) { 
		  filteredItems = filteredItems.filter((item) => item.enabled === this.selectedModeOption.enabled);
		}
		if (this.selectedStatusOption !== null) {   
		  filteredItems = filteredItems.filter((item) => item.statusOption === this.selectedStatusOption.id);
		}
	 
		if (filteredItems.length > 0) {
		  this.headers = filteredItems;
		} else {
		  console.log('Nenhum item encontrado');
		  this.headers = [];
		}
	 
	
	   
	}
    
    enableSelected(optionId: number) { 
        this.selectedModeOption = this.radioOptions.find((option) => option.id === optionId); 
        this.filterHeaders();
    }
    statusSelected(optionId: number) { 
        this.selectedStatusOption = this.statusOptions.find((option) => option.id === optionId); 
        this.filterHeaders();
    }



   /**
     * funcitons elemnts
     */
    onBackdropClicked(): void
    {
        // Go back to the list
        this._router.navigate(['./'], {relativeTo: this._activatedRoute});

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }
}
