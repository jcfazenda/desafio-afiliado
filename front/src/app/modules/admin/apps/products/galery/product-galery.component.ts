import { ChangeDetectorRef, Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-product-galery',
    templateUrl: './product-galery.component.html',
    styleUrls: ['./../products.component.scss'  ]
})
export class ProductGaleryComponent implements OnInit {

        constructor( private cdr: ChangeDetectorRef
    ) {
        const currentUserString = localStorage.getItem('currentUser');
 
    }

    ngOnInit(): void {

      
 

    }


}