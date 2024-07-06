import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Inject } from '@angular/core'; 

@Component({
    selector: 'app-product-dialog-labels',
    templateUrl: 'product-dialog-labels.component.html',
    styleUrls  : ['./../products.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDialogLabels implements OnInit {
 
    card: any;
    CodeDiv = '';  
    type: string;  
 
    formGroup: FormGroup; 
    safeURL: SafeResourceUrl | null = null;

    @ViewChild('fileInput') fileInput!: ElementRef;
    
    constructor( 
                private formBuilder: FormBuilder,
                public dialogRef: MatDialogRef<ProductDialogLabels>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private cdr: ChangeDetectorRef
    ) { 
   
        this.card = { ...data.card }; 

        /* thumbnails */
        this.type = data.type; 
        switch (this.type) {

            case 'card':
                this.CodeDiv = 'card';
                break; 

            case 'thumbs':
            case 'thumbs_video':
            case 'thumbs_drawer_top':
            case 'thumbs_drawer_footer':
            case 'project': 
                this.CodeDiv = 'thumb';
                break; 
        }   
         
    }

    ngOnInit(): void { 

        this.formGroup = this.formBuilder.group({
            card_title:         [''],
            card_subtitle:      [''],
            card_thumbnail:     [''],
            card_link_video:    [''],
            card_link_page:     [''],
            card_godfather:     [''],

            card_price:         [''], 
            card_price_installment: [''], 
            card_price_num: [''],
            card_max_installments: [''],
            price_link_payment: [''],

            thumb_image: [''],
            thumb_link_video: [''],
            thumb_title: [''],
            thumb_subtitle: ['']
        });  
 
        this.setFormValues(); 
    }

    setFormValues(): void { 
 
        /* card principal */
        this.formGroup.patchValue({

            card_title:         this.card.title,
            card_subtitle:      this.card.subtitle,
            card_thumbnail:     this.card.thumbnail,  

        });  

        /* thumbnails */
        switch (this.type) {
            case 'thumbs':
            case 'thumbs_video':
            case 'thumbs_drawer_top': 
            case 'thumbs_drawer_footer':
            case 'project':

                this.formGroup.patchValue({ 
                });
                break; 
        } 
    } 
    
    close(): void { 
        this.dialogRef.close(null);
    } 

    save(): void { 
 
        this.dialogRef.close(this.card); 

    }  


    
}