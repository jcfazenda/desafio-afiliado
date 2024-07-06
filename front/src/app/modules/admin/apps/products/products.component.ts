import { AfterViewInit, ChangeDetectorRef, Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav'; 

import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { UpdateVideoService } from '../../../services/update-video.service';
import { ProductsService } from './products.service';
import { PriceService } from './price/price.service'; 
import { ProductDialog } from './product-dialog/product-dialog.component';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss',
        '../../../../layout/footer.component.scss',
        '../../../../layout/footer-pixel.compenent.scss',
        '../../../../layout/data-grid.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit, OnDestroy  {
    
    @ViewChild('drawer') drawer: MatDrawer;
    @ViewChild('drawerPixel') drawerPixel: MatDrawer;

    readonly dialog = inject(MatDialog);

    typeDrawerOpen = '';
    iconSelectProvedor = 'mat_solid:aspect_ratio';
    positionDrawer = 'end';
    positionDrawerPixel = 'start';

    safeURL: SafeResourceUrl | null = null;
    formGroup: FormGroup;
    user: any; 
    
    currentSection = 'Projects';
    menu = [
        { 'name': 'Projects' },
        { 'name': 'Sobre' },
        { 'name': 'Seguidores' },
        { 'name': 'Blog' } 
    ]; 

    card: any;
    project: any;
    projects: any;

    thumbTemplate = {
        id: 0,
        true: true,
        isVideo: false,
        icon: 'tangerine',
        thumbnail: 'assets/images/produtos/no-thumbnail.jpg',
        link_video: 'assets/images/produtos/no-thumbnail.jpg',
        title: 'Thumbnail ',
        subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmo'
    };

    provedoresAnuncios = [
        {
            id: '291b3c7d-9031-4ee1-a284-ccf508c2e7be',
            name: 'Google ADS',
            icon: 'google-ads',
            pixel_id: 'AW-1064344632',
            pixel_label: 'FtcDCK7x9bcZELi4wvsD'
        },
        {
            id: '291b3c7d-9031-4ee1-a284-ccf508c2e7b1',
            name: 'Facebook ADS',
            icon: 'facebook-f-ads',
            pixel_id: 'AW-1064344632',
            pixel_label: 'FtcDCK7x9bcZELi4wvsD'
        },
        {
            id: '291b3c7d-9031-4ee1-a284-ccf508c2e7b2',
            name: 'Tiktok ADS',
            icon: 'tiktok-ads',
            pixel_id: 'AW-1064344632',
            pixel_label: 'FtcDCK7x9bcZELi4wvsD'
        },
        {
            id: '291b3c7d-9031-4ee1-a284-ccf508c2e7b2',
            name: 'Instagram ADS',
            icon: 'instagram-ads',
            pixel_id: 'AW-1064344632',
            pixel_label: 'FtcDCK7x9bcZELi4wvsD'
        },
        {
            id: '291b3c7d-9031-4ee1-a284-ccf508c2e7b3',
            name: 'Twitter ADS',
            icon: 'twitter-ads',
            pixel_id: 'AW-1064344632',
            pixel_label: 'FtcDCK7x9bcZELi4wvsD'
        }
    ];

    constructor(private formBuilder: FormBuilder,
                private updateVideo: UpdateVideoService,
                private _service: ProductsService,
                private _priceService: PriceService,
                private cdr: ChangeDetectorRef,
                private sanitizer: DomSanitizer
    ) {
        const currentUserString = localStorage.getItem('currentUser');
        if (currentUserString !== null) {
            this.user = JSON.parse(currentUserString);
        }
    }

    ngOnInit(): void {

        this.formGroup = this.formBuilder.group({
            select_provedor_anuncios: ['']
        }); 

        this.projects = this._service.getProjects();
    }
    ngAfterViewInit() {
        document.addEventListener('contextmenu', this.preventImageContextMenu);
    }
    ngOnDestroy() {
        document.removeEventListener('contextmenu', this.preventImageContextMenu);
    }
    preventImageContextMenu(event: MouseEvent) {
        if ((event.target as HTMLElement).tagName === 'IMG') {
            event.preventDefault();
        }
    } 

    addNewProject() {   

        let project       = this._service.newProject();  
            project.id    = this.projects.length > 0 ? this.projects[this.projects.length - 1].id + 1 : 1; 
            project.title = project.title + ' ' + project.id;

        this.projects.push(project); 
        this.cdr.detectChanges();

    } 
    removeProject(id: number) {  
        this.projects = this.projects.filter(prj => prj.id !== id);  
        this.cdr.detectChanges(); 
    }   
    addNewThumb(type: string) {   

        let thumb = this._service.createNewThumb();  

        switch (type) { 

            case 'thumbs':

                thumb.id    = this.project.card.thumbs.length > 0 ? this.project.card.thumbs[this.project.card.thumbs.length - 1].id + 1 : 1; 
                thumb.title = thumb.title + ' ' + thumb.id; 
                this.project.card.thumbs.push(thumb);
                this.cdr.detectChanges();

                break;

            case 'thumbs_video':

                thumb.id         = this.project.card.thumbs_video.length > 0 ? this.project.card.thumbs_video[this.project.card.thumbs_video.length - 1].id + 1 : 1; 
                thumb.title      = 'Video ' + thumb.id; 
                thumb.isVideo    = true;
                thumb.thumbnail  = 'assets/images/produtos/no-thumbnail-video.jpg';
                thumb.link_video = 'assets/images/produtos/no-thumbnail-video.jpg';
                this.project.card.thumbs_video.push(thumb);
                this.cdr.detectChanges();

                break;

            case 'thumbs_drawer_footer':

                thumb.id    = this.project.card.thumbs_drawer_footer.length > 0 ? this.project.card.thumbs_drawer_footer[this.project.card.thumbs_drawer_footer.length - 1].id + 1 : 1; 
                thumb.title = thumb.title + ' ' + thumb.id; 
                this.project.card.thumbs_drawer_footer.push(thumb);
                this.cdr.detectChanges();

                break;
        } 

        this.card = this.project.card;
        
    }   
    removeThumb(type: string, thumbId: number) {

        switch (type) { 
          case 'thumbs':
            this.project.card.thumbs = this.project.card.thumbs.filter(thumb => thumb.id !== thumbId);
            break;
    
          case 'thumbs_video':
            this.project.card.thumbs_video = this.project.card.thumbs_video.filter(thumb => thumb.id !== thumbId);
            break; 
    
          case 'thumbs_drawer_top':
            this.project.card.thumbs_drawer_top = this.project.card.thumbs_drawer_top.filter(thumb => thumb.id !== thumbId);
            break;
    
          case 'thumbs_drawer_footer':
            this.project.card.thumbs_drawer_footer = this.project.card.thumbs_drawer_footer.filter(thumb => thumb.id !== thumbId);
            break; 
        }

        this.card = this.project.card;
        this.cdr.detectChanges(); 
    }
 
    /* Price & Parcelas */ 
    Prices(): void {  

        let principalPrice: number = parseFloat(this.card.price.replace('R$', '').trim()); 
        let price = {

            principalPrice:         principalPrice, 
            card_price_num:         this.card.card_price_num,
            card_max_installments:  this.card.card_max_installments
        }
        
        let installments                    = this._priceService.generateInstallments(price);  
        this.card.priceInstalment           = installments.slice().reverse().find(inst => inst.interestFree !== ''); 
        this.card.priceInstalment.selected  = true;

        this.card.price_installment         = 'ou até ' + this.card.priceInstalment.description + ' ' + this.card.priceInstalment.interestFree;  
        this.card.price_installment_mode    = installments;
    } 

    openDrawer(item: number) {

        this.closeDrawer();

        if (item === 1) {
            this.drawer.open();
            this.positionDrawer = 'end';
            this.positionDrawerPixel = 'start';
        }
        if (item === 2) {

            this.typeDrawerOpen = 'Pixel';
            this.drawerPixel.open();
            this.positionDrawer = 'start';
            this.positionDrawerPixel = 'end';
        }
        if (item === 3) {

            this.typeDrawerOpen = 'PaymentMode';
            this.drawerPixel.open();
            this.positionDrawer = 'start';
            this.positionDrawerPixel = 'end';
        }
    }

    addNewProductDetail() {

        const newDetail = {
            id: this.card.product_detail.length > 0 ? this.card.product_detail[this.card.product_detail.length - 1].id + 1 : 1,
            icon: 'thumb-edit',  
            title: `Novo Detalhe ${this.card.product_detail.length + 1}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        };
        
        this.card.product_detail.push(newDetail);
        this.cdr.detectChanges(); // Atualiza a visualização se necessário
    }
    addNewProductContents() {

        let content = this._service.createNewContent(); 
        content.id = this.card.contents.length > 0 ? this.card.contents[this.card.contents.length - 1].id + 1 : 1;
 
        this.card.contents.push(content);
        this.cdr.detectChanges();
    }
    addNewProductContentsDrawer() {

        let content = this._service.createNewContent(); 
        content.id = this.card.contents_footer_top.length > 0 ? this.card.contents_footer_top[this.card.contents_footer_top.length - 1].id + 1 : 1;
 
        this.card.contents_footer_top.push(content);
        this.cdr.detectChanges();
    }

    closeDrawer() {
        this.drawerPixel.close();
        this.drawer.close();
    }

    onSelectionProvedor(event: any) {
        this.iconSelectProvedor = event.value.icon;
    }

    navigateToLink(url: string): void {
        window.open(url, '_blank');
    }

    /* popup dialog */
    configurateCard(type: string, item: any) {   

        if (type === 'project') {
            this.card = item
        }

        let originalCard = JSON.parse(JSON.stringify(this.card));

        const dialogRef = this.dialog.open(ProductDialog, {
            width: '700px',
            disableClose: true,
            data: {
                card: this.card,
                item: item,
                type: type,
            }
        });

        // Detecta quando o usuário fecha clicando fora do diálogo
        dialogRef.backdropClick().subscribe(() => { 
            this.card = JSON.parse(JSON.stringify(originalCard));
            this.cdr.detectChanges(); 
            dialogRef.close(null); 
        });

        dialogRef.afterClosed().subscribe(result => {  

            if (result === null) {
                this.card = JSON.parse(JSON.stringify(originalCard));

            }else if (type === 'project') {
                
                let projIndex = this.projects.findIndex(proj => proj.id === item.id);
                if (projIndex !== -1) { 
                    
                    this.projects[projIndex] = JSON.parse(JSON.stringify(result));  
                    this.reloadSafeUrl(type);  
                }
            } else {
                
                this.card = JSON.parse(JSON.stringify(result));
                this.reloadSafeUrl(type);  
            }
        });

    }

    openDialogLabels(type: string, item: any) {   

        if (type === 'project') {
            this.card = item
        }

        let originalCard = JSON.parse(JSON.stringify(this.card));

        const dialogRef = this.dialog.open(ProductDialog, {
            width: '700px',
            disableClose: true,
            data: {
                card: this.card,
                item: item,
                type: type,
            }
        });

        // Detecta quando o usuário fecha clicando fora do diálogo
        dialogRef.backdropClick().subscribe(() => { 
            this.card = JSON.parse(JSON.stringify(originalCard));
            this.cdr.detectChanges(); 
            dialogRef.close(null); 
        });

        dialogRef.afterClosed().subscribe(result => {  

            if (result === null) {
                this.card = JSON.parse(JSON.stringify(originalCard));

            }else if (type === 'project') {
                
                let projIndex = this.projects.findIndex(proj => proj.id === item.id);
                if (projIndex !== -1) {  
                    this.projects[projIndex] = JSON.parse(JSON.stringify(result));  
                }
            } else {
                
                this.card = JSON.parse(JSON.stringify(result)); 
            }
        });

    }

    /* project */  
    openProject(section: string, project: any ) {   

        this.currentSection = section;
        this.project = project;

        if (section === 'Card' ) {  
            
            this.card = project.card; 
            this.isVideo(this.card.isVideo, section);
            this.Prices();

        }
    }
    isVideo(isVideo: boolean, type: string) {  

        if (isVideo === true) {  

            if (this.card.link_video !== 'assets/images/produtos/no-thumbnail-video.jpg' ) {

                this.card.isVideo = true;
                this.reloadSafeUrl(type); 
            }

        }else {
            this.card.isVideo = false;
            this.safeURL = null; // Limpar URL segura quando não for vídeo
        }

    }
    reloadSafeUrl(type: string) {  
        
        switch (type) {

            case 'card':
            case 'Card':
                 
                this.safeURL = this.updateVideo.getSafeVideoUrl(this.card.link_video);  
                this.cdr.detectChanges(); 
                break; 

            case 'thumbs':
            case 'thumbs_video':
            case 'thumbs_drawer_top':
            case 'thumbs_drawer_footer':
            case 'project':

                    this.card.thumbs_video.forEach(thumb => {

                        if (thumb.link_video !== 'assets/images/produtos/no-thumbnail-video.jpg') { 
            
                            if (thumb.safeUrl === null) {
                                thumb.safeUrl = this.updateVideo.getSafeVideoUrl(thumb.link_video); 
                            } 
            
                        } else {
                            thumb.link_video !== 'assets/images/produtos/no-thumbnail-video.jpg'
                            thumb.safeUrl = null;  
                        }
            
                    });

                    break;
            
        }


    }
     
}
