import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { cards, certificateHolders } from '../../../../mock-api/data/cards-dada';
import { Contents, Vantage } from '../../../../mock-api/data/product-content';
import { ProductLabels, ProductDetail } from '../../../../mock-api/data/product-label';
import { Projects, createNewProject, createNewThumb, createNewContent } from '../../../../mock-api/data/projects';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    constructor(private _httpClient: HttpClient) {}

    getProjects() {
        return Projects;
    }

    newProject() {
        return createNewProject();
    }

    createNewThumb() {
        return createNewThumb();
    }

    createNewContent() {
        return createNewContent();
    }

    getCards() {
        return cards;
    }

    getCardById(id: string) {
        return cards.find(card => card.id === id);
    }

    getProductConteudo() {
        return Contents;
    }

    getProductVantage() {
        return Vantage;
    }

    getProductLabels() {
        return ProductLabels;
    }

    getProductDetail() {
        return ProductDetail;
    }

    getCertificateHolders() {
        return certificateHolders;
    }
}
