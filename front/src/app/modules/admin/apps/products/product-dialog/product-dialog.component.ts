import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Inject } from '@angular/core';
import { UpdateVideoService } from '../../../../services/update-video.service';
import { PriceService } from '../price/price.service';

@Component({
    selector: 'app-product-dialog',
    templateUrl: 'product-dialog.component.html',
    styleUrls  : ['./../products.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDialog implements OnInit {

    originalCard: any;
    card: any;
    CodeDiv = '';

    thumbnail = {
        id: 0,
        isVideo: true,
        icon: 'tangerine-svgrepo-com',
        thumbnail: 'assets/images/produtos/no-thumbnail-video.jpg',
        link_video: 'https://www.youtube.com/watch?v=tDs09U9up7M&t=2s',
        safeUrl: null,
        title: '0000-0',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur a'
    };

    thumbs_video: any;
    type: string;  

    /* preços */
    priceInstalment: any;
    installments: { selected: boolean, description: string, interestFree: string, amount: string }[] = []; 
 
    formGroup: FormGroup; 
    safeURL: SafeResourceUrl | null = null;

    @ViewChild('fileInput') fileInput!: ElementRef;
    
    constructor(private updateVideo: UpdateVideoService,
                private price: PriceService,
                private formBuilder: FormBuilder,
                public dialogRef: MatDialogRef<ProductDialog>,
                @Inject(MAT_DIALOG_DATA) public data: any,
                private cdr: ChangeDetectorRef
    ) { 
 
        this.originalCard = JSON.parse(JSON.stringify(data.card));
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

                this.thumbnail = data.item; 
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
            card_link_page:     this.card.link_page,
            card_godfather:     this.card.godfather,
            card_link_video:    this.card.link_video, 

            card_price:             this.card.price,
            card_price_installment: this.card.card_price_installment,
            card_price_num:         3,
            card_max_installments:  12,
            price_link_payment:     this.card.price_link_payment, 

        });  

        /* thumbnails */
        switch (this.type) {
            case 'thumbs':
            case 'thumbs_video':
            case 'thumbs_drawer_top': 
            case 'thumbs_drawer_footer':

                this.formGroup.patchValue({
                    thumb_image:    this.thumbnail.thumbnail,
                    thumb_title:    this.thumbnail.title,
                    thumb_subtitle: this.thumbnail.subtitle,
                    thumb_link_video:  this.thumbnail.link_video,
                });
                break; 
        }

        if (this.thumbnail.isVideo === true) {  this.setUrl(); }

        /* atualiza labels ao digitar */
        this.formGroup.get('thumb_title')?.valueChanges.subscribe(value => {
            this.thumbnail.title = value;
        });
        this.formGroup.get('thumb_subtitle')?.valueChanges.subscribe(value => { 
            this.thumbnail.subtitle = value;
        });
        
        this.formGroup.get('card_title')?.valueChanges.subscribe(value => {
            this.card.title = value;
        }); 
        this.formGroup.get('card_subtitle')?.valueChanges.subscribe(value => {
            this.card.subtitle = value;
        });
        this.formGroup.get('card_price')?.valueChanges.subscribe(value => {
            this.card.price = value;
        });
        this.formGroup.get('card_price_installment')?.valueChanges.subscribe(value => {
            this.card.card_price_installment = value;
        });

    } 

    /* Price & Parecelas */ 
    Prices(): void {  

        let principalPrice: number = parseFloat(this.formGroup.get('card_price')?.value.replace('R$', '').trim());

        let price = {

            principalPrice:         principalPrice, 
            card_price_num:         this.formGroup.get('card_price_num')?.value,
            card_max_installments:  this.formGroup.get('card_max_installments')?.value
        }
        
        this.installments             = this.price.generateInstallments(price);  
        this.priceInstalment          = this.installments.slice().reverse().find(inst => inst.interestFree !== ''); 
        this.priceInstalment.selected = true;

        this.card.price_installment         = 'ou até ' + this.priceInstalment.description + ' ' + this.priceInstalment.interestFree;  
        this.card.price_installment_mode    = this.installments;
    } 

    /* update video */ 
    setVideo(isVideo: boolean) { 
        this.card.isVideo = isVideo;  
    }

    /* SET URL */ 
    setUrl() {   

        /* thumbnails */ 
        switch (this.type) {

            case 'card':
                this.safeURL = this.updateVideo.setUrl(this.formGroup.get('card_link_video')?.value);
                break; 

            case 'thumbs':
            case 'thumbs_video':
            case 'thumbs_drawer_top':
            case 'thumbs_drawer_footer':

                this.safeURL     =  this.updateVideo.setUrl(this.formGroup.get('thumb_link_video')?.value);   
                let thumb        =  this.card.thumbs_video.find(id => id.id === this.thumbnail.id);
                    thumb.safeUrl    = null;
                    thumb.link_video = this.formGroup.get('thumb_link_video')?.value; 

                this.thumbnail   = thumb; 
    
                this.cdr.detectChanges(); 

                break; 
        }  
    }

    /* update image */ 
    triggerFileInput(): void {
        if (this.fileInput) {
            this.fileInput.nativeElement.click();
        } else {
            console.error('fileInput is not defined');
        }
    }
    onFileSelected(event: Event): void {

        const input = event.target as HTMLInputElement;

        if (input.files && input.files.length > 0) {

            const file = input.files[0];
            const reader = new FileReader();

            reader.onload = (e: ProgressEvent<FileReader>) => {
                if (e.target) {
                    this.thumbnail.thumbnail = e.target.result as string;
                    this.cdr.detectChanges(); 
                }
            };

            reader.readAsDataURL(file);
        }
    } 
    
    close(): void { 
        this.dialogRef.close(null);
    } 

    save(): void {

        /* thumbnails */ 
        switch (this.type) {

            case 'card':
                this.card.title                 = this.formGroup.get('card_title')?.value;
                this.card.subtitle              = this.formGroup.get('card_subtitle')?.value;
                this.card.link_video            = this.formGroup.get('card_link_video')?.value; 
                this.card.price                 = this.formGroup.get('card_price')?.value;  
                this.card.price_link_payment    = this.formGroup.get('price_link_payment')?.value;    

                break; 

            case 'thumbs':
            case 'thumbs_video':
            case 'thumbs_drawer_top':
            case 'thumbs_drawer_footer':

                let thumb = this.card.thumbs.find(crd => crd.id === this.thumbnail.id); 
                if (thumb) { 
                    thumb.title         = this.formGroup.get('thumb_title')?.value;
                    thumb.subtitle      = this.formGroup.get('thumb_subtitle')?.value; 
                    thumb.link_video    = this.formGroup.get('thumb_link_video')?.value; 

                    //this.card.thumbnail = thumb.thumbnail; 
                }

                break; 
        }  
        
        this.dialogRef.close(this.card); 

    }  


    
}