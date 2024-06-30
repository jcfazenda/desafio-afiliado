import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Inject } from '@angular/core';
import { UpdateVideoService } from '../../../../services/update-video.service';

@Component({
    selector: 'app-product-dialog',
    templateUrl: 'product-dialog.component.html',
    styleUrls  : ['./../products.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDialog implements OnInit {

    card: any;
    type: string;

    /* preços */
    installments: { description: string,interestFree: string, amount: string }[] = []; 
    maxInstallments = 12; // Máximo de parcelas 
    maxInstallmentsWithoutInterest = 3;
    interestRate = 5.0; // Taxa de juros (5% neste exemplo)
    
    prices = [
        {
          date_validate: '',
          price_link: 'https://go.hotmart.com/K93642514D?ap=6979',
          price: '97,00',
          price_installment: [],
          payment_type: 2,
          principal: true
        }
    ];

    formGroup: FormGroup;

    selectedFile: File | undefined;
    fileInputs: HTMLInputElement[] = [];
    safeURL: SafeResourceUrl | null = null;
    
    constructor(private updateVideo: UpdateVideoService,
                private formBuilder: FormBuilder,
                public dialogRef: MatDialogRef<ProductDialog>,
                @Inject(MAT_DIALOG_DATA) public data: any
    ) {

        this.card = data.card;
        this.type = data.type;    
        
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
        });  
 
        this.setFormValues(this.card);  
        
    }
    setFormValues(card: any): void { 
 
        this.formGroup.patchValue({
            card_title:         card.title,
            card_subtitle:      card.subtitle,
            card_thumbnail:     card.thumbnail, 
            card_link_page:     card.link_page,
            card_godfather:     card.godfather,
            card_link_video:    card.link_video,

            card_price:             card.price,
            card_price_installment: '',
            card_price_num: 3,
            card_max_installments: 12
        });  
 
        this.setUrl(); 

        this.formGroup.get('card_title')?.valueChanges.subscribe(value => {
            this.card.title = value;
        }); 
        this.formGroup.get('card_subtitle')?.valueChanges.subscribe(value => {
            this.card.subtitle = value;
        });
        this.formGroup.get('card_price')?.valueChanges.subscribe(value => {
            this.card.price = value;
        });
    } 

    generateInstallments(): void { 

        let cardPriceString: string          = this.formGroup.get('card_price')?.value; 
        this.maxInstallmentsWithoutInterest  = this.formGroup.get('card_price_num')?.value;
        this.maxInstallments                 = this.formGroup.get('card_max_installments')?.value;

        let principalPrice: number = parseFloat(cardPriceString.replace('R$', '').trim());
        
        this.installments = [];

        for (let i = 1; i <= this.maxInstallments; i++) {

            const installmentAmount = this.calculateInstallmentAmount(principalPrice, i);
            if (isNaN(installmentAmount)) {
                break; // Sai do loop se o cálculo retornar NaN
            }
            const totalAmount = (installmentAmount * i).toFixed(2);
            let description = `${i}x de R$ ${installmentAmount.toFixed(2)}`;
            let interestFree = '';
        
            if (i <= this.maxInstallmentsWithoutInterest) {
                interestFree = ' - sem Juros';
            } 
            
            this.installments.push({
                description: description,
                interestFree: interestFree,
                amount: `R$ ${totalAmount}`
            });

        }

      }
       
      calculateInstallmentAmount(principal: number, installments: number): number {
        if (installments <= this.maxInstallmentsWithoutInterest) {
          return principal / installments; // Parcelas sem juros
        } else {
          const rate = this.interestRate / 100;
          return (principal * (rate + 1)) / installments; // Parcelas com juros
        }
      }

    /* update video */ 
    setVideo(isVideo: boolean) { 
        this.card.isVideo = isVideo;  
    }

    setUrl() {  
        this.safeURL = this.updateVideo.setUrl(this.formGroup.get('card_link_video')?.value);   
    }
    
    close(): void { 
        this.dialogRef.close(this.card);
    }

    save(): void {
 
        this.card.title      = this.formGroup.get('card_title')?.value;
        this.card.subtitle   = this.formGroup.get('card_subtitle')?.value;
        this.card.link_video = this.formGroup.get('card_link_video')?.value; 
        
        this.dialogRef.close(this.card);
    }  

    
}