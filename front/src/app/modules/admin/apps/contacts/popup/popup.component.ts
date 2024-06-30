import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'; 

import { ConfigurationFilterService } from '../../../../auth/api-authenticate/configuration/configuration-filter.service'; 

@Component({
    selector       : 'app-pop-up',
    templateUrl    : './popup.component.html',
    styleUrls      : ['./popup.component.css'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopUpComponent  implements OnInit, OnDestroy
{
  
    formGroup: FormGroup; 

    configuration:      any;
    menuList: any;  

    enum_brand:          any[] = [];
	enum_operation_type: any[] = [];
	enum_country:        any[] = [];  

    /**
     * Constructor
     */
    constructor(private _configurationFilter: ConfigurationFilterService, 
                @Inject(MAT_DIALOG_DATA) private data: any,
                private dialogRef: MatDialogRef<PopUpComponent>,
                private formBuilder: FormBuilder,
                private cdRef: ChangeDetectorRef, )
    {
        this.configuration = data.configuration; 
    }

    /**
     * On init
    */
    ngOnInit(): void {

        // Open the drawer
        this.formGroup = this.formBuilder.group({
            id          : [''],
            avatar      : [null],
            name        : [''], 
            description        : [''],  
            select_enum_country:     [''],
            select_enum_brand:        [''],
            select_enum_operation_type: ['']
        }); 

        /* Get Enum Brands  */
        this._configurationFilter.getBrands().subscribe((data) => { 

            this.enum_brand = data;

            /* Get Enum Brands  */
            this._configurationFilter.getOperationTypes().subscribe((data) => {
                
                this.enum_operation_type = data;

                /* Get Enum Country  */
                this._configurationFilter.getCountryes().subscribe((data) => {
                    this.enum_country = data;

                    this.edit(this.configuration);
                }); 

            });

        });

    }

    /**
     * On destroy
    */
    ngOnDestroy(): void
    {
        
    }

    close(){
        this.dialogRef.close();
    }
    save () : any {
        
    }
 

    edit(item: any): void 
    {   

        const selectedEnumCountry       = this.enum_country.find(option => option.id        === item.enum_country.id);
        const selectedEnumBrand         = this.enum_brand.find(option => option.id          === item.enum_brand.id);
        const selectedEnumOperationType = this.enum_operation_type.find(option => option.id === item.enum_operation_type.id); 
 
        this.formGroup.patchValue({

            name:        item.name,
            description: item.description,

            select_enum_country:        selectedEnumCountry,
            select_enum_brand:          selectedEnumBrand,
            select_enum_operation_type: selectedEnumOperationType

        }); 

        this.cdRef.detectChanges();

    }
  

}
