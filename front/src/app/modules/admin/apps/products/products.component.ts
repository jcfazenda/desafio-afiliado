import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router'; 
import { ProductsService } from './products.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss', '../../../../layout/footer.component.scss']
})
export class ProductsComponent implements OnInit {

    formGroup: FormGroup; 
    cards: any[] = [];
 
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private _service: ProductsService
    ) {
    }

    ngOnInit(): void {

        this.formGroup = this.formBuilder.group({
            searchText: [''],
            select_enum_country: [''],
            select_enum_operation_type: [''],
            select_enum_brand: [''],
            select_elabled_disabled: [''],

        });

        this.cards = this._service.getCards();

        this.orderCards();
    }

    goToProductLanding(productId: string): void {
        this.router.navigate(['/apps/products/product-landing', productId]);
    }
    
    goToCreate(): void {
        this.router.navigate(['/apps/products/product-create', '123']);
    }
      
    orderCards() {

        this.cards.sort((a, b) => {
            return parseInt(b.dataCreate) - parseInt(a.dataCreate);
        });

        this.cards = this.cards;
        this.cards = this.cards.map(card => ({
            ...card,
            dataCreate: this.parseDateStringToDate(card.dataCreate)
        }));

    }

    private parseDateStringToDate(dateString: string): Date {
        const day = parseInt(dateString.substr(0, 2), 10);
        const month = parseInt(dateString.substr(2, 2), 10) - 1; // Mês é 0-based (0 = Janeiro)
        const year = parseInt(dateString.substr(4, 4), 10);

        return new Date(year, month, day);
    }

}
