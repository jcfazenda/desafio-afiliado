import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductLandingComponent } from './product-landing/product-landing.component';
import { ProductCreateComponent } from './product-create/product-create.component';

const routes: Routes = [
    {
        path: '',
        component: ProductsComponent,
        children: []
    },
    {
        path: 'product-landing/:id',
        component: ProductLandingComponent,
        children: []
    },
    {
        path: 'product-create/:id',
        component: ProductCreateComponent,
        children: []
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule { }
