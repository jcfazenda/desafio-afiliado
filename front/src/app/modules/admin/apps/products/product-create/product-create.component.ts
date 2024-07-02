import { ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { ProductDialog } from '../product-dialog/product-dialog.component';
import { SafeResourceUrl } from '@angular/platform-browser';
import { UpdateVideoService } from '../../../../services/update-video.service'; 
 
@Component({
    selector: 'app-product-create',
    templateUrl: './product-create.component.html',
    styleUrls: ['./../products.component.scss',
        '../../../../../layout/footer.component.scss',
        '../../../../../layout/footer-pixel.compenent.scss',
        '../../../../../layout/data-grid.component.scss']
})
export class ProductCreateComponent implements OnInit {
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

 
    card =
        {
            id: '291b3c7d-9031-4ee1-a284-ccf508c2e7be',
            id_projeto: '291b3c7d-9031-4ee1-a284-ccf508c2e7be',
            title: 'Title',
            subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmo',
            thumbnail: 'assets/images/produtos/no-thumbnail.jpg',
            link_page: 'https://go.hotmart.com/K93642514D?dp=1',
            link_video: 'https://youtu.be/-nKoHRvtsk4?si=OidpN5V1CQOhE8DV',
            isVideo: true,
            godfather: 'assets/images/logo/kwifi.png',
            dataCreate: '24012024',

            price: '97,00',
            price_installment: 'a vista',
            price_link_payment: '',
            price_installment_mode: [],
            prices: [
                {
                    date_validate: '',
                    price_link: 'https://go.hotmart.com/K93642514D?ap=6979',
                    price: ' 97,00',
                    price_installment: 'em 8x no cartão sem juros',
                    payment_type: 2,
                    principal: true
                },
                {
                    date_validate: '',
                    price_link: 'https://go.hotmart.com/K93642514D?ap=6979',
                    price: ' 67,00',
                    price_installment: 'a vista',
                    payment_type: 1,
                    principal: false
                },
                {
                    date_validate: '',
                    price_link: 'https://go.hotmart.com/K93642514D?ap=6979',
                    price: ' 67,00',
                    price_installment: 'a vista',
                    payment_type: 3,
                    principal: false
                }
            ],

            pixels: [
                {
                    id: '291b3c7d-9031-4ee1-a284-ccf508c2e7be',
                    name: 'Google ADS',
                    icon: 'google-ads',
                    pixel_id: 'AW-1064344632',
                    pixel_label: 'FtcDCK7x9bcZELi4wvsD'
                },
                {
                    id: '291b3c7d-9031-4ee1-a284-ccf508c2e7be',
                    name: 'Twitter ADS',
                    icon: 'twitter-ads',
                    pixel_id: 'AW-1064344632',
                    pixel_label: 'FtcDCK7x9bcZELi4wvsD'
                }
            ],
            title_drawer: {
                title: 'Title Drawer Top',
                subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmo'
            },
            title_drawer_footer: {
                title: 'Title Drawer Thumb Footer',
                subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmo'
            },
            contents: [
                {
                    id: '',
                    icon: 'check',
                    title: 'Lorem ipsum dolor sit amet',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    details: [
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
                    ]
                },
                {
                    id: '',
                    icon: 'check',
                    title: 'Lorem ipsum dolor sit amet',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                    details: [
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
                    ]
                }
            ],
            thumbs: [
                {
                    id: '1',
                    true: true,
                    isVideo: false,
                    icon: 'tangerine-svgrepo-com',
                    thumbnail: 'assets/images/produtos/no-thumbnail.jpg',
                    link_video: 'assets/images/produtos/no-thumbnail.jpg',
                    title: 'Title 01',
                    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmo'
                },
                {
                    id: '2',
                    true: true,
                    isVideo: false,
                    icon: 'tangerine-svgrepo-com',
                    thumbnail: 'assets/images/produtos/no-thumbnail.jpg',
                    link_video: 'assets/images/produtos/no-thumbnail.jpg',
                    title: 'Title 02',
                    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmo'
                },
                {
                    id: '3',
                    true: true,
                    isVideo: false,
                    icon: 'tangerine-svgrepo-com',
                    thumbnail: 'assets/images/produtos/no-thumbnail.jpg',
                    link_video: 'assets/images/produtos/no-thumbnail.jpg',
                    title: 'Title 03',
                    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmo'
                },
                {
                    id: '4',
                    true: true,
                    isVideo: false,
                    icon: 'tangerine-svgrepo-com',
                    thumbnail: 'assets/images/produtos/no-thumbnail.jpg',
                    link_video: 'assets/images/produtos/no-thumbnail.jpg',
                    title: 'Title 04',
                    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmo'
                },
                {
                    id: '5',
                    true: true,
                    isVideo: false,
                    icon: 'tangerine-svgrepo-com',
                    thumbnail: 'assets/images/produtos/no-thumbnail.jpg',
                    title: 'Title 05',
                    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmo'
                }
            ],
            thumbs_video: [
                {
                    id: '1',
                    isVideo: true,
                    icon: 'tangerine-svgrepo-com',
                    thumbnail: 'assets/images/produtos/no-thumbnail-video.jpg',
                    link_video: 'assets/images/produtos/no-thumbnail-video.jpg',
                    title: 'Title 01',
                    subtitle: 'Lorem ipsum dolor sit amet, consectetur a'
                },
                {
                    id: '2',
                    isVideo: true,
                    icon: 'tangerine-svgrepo-com',
                    thumbnail: 'assets/images/produtos/no-thumbnail-video.jpg',
                    link_video:'assets/images/produtos/no-thumbnail-video.jpg',
                    safeUrl: null,
                    title: 'Title 02',
                    subtitle: 'Lorem ipsum dolor sit amet, consectetur a'
                },
                {
                    id: '3',
                    isVideo: true,
                    icon: 'tangerine-svgrepo-com',
                    thumbnail: 'assets/images/produtos/no-thumbnail-video.jpg',
                    link_video: 'assets/images/produtos/no-thumbnail-video.jpg',
                    safeUrl: null,
                    title: 'Title',
                    subtitle: 'Lorem ipsum dolor sit amet, consectetur a'
                },
                {
                    id: '4',
                    isVideo: true,
                    icon: 'tangerine-svgrepo-com',
                    thumbnail: 'assets/images/produtos/no-thumbnail-video.jpg',
                    link_video: 'assets/images/produtos/no-thumbnail-video.jpg',
                    safeUrl: null,
                    title: 'Title',
                    subtitle: 'Lorem ipsum dolor sit amet, consectetur a'
                },
                {
                    id: '5',
                    isVideo: true,
                    icon: 'tangerine-svgrepo-com',
                    thumbnail: 'assets/images/produtos/no-thumbnail-video.jpg',
                    link_video: 'assets/images/produtos/no-thumbnail-video.jpg',
                    safeUrl: null,
                    title: '0000-05',
                    subtitle: 'Lorem ipsum dolor sit amet, consectetur a'
                }
            ],
            thumbs_drawer_top: [
                {
                    id: '5',
                    isVideo: false,
                    icon: 'tangerine-svgrepo-com',
                    thumbnail: 'assets/images/produtos/no-thumbnail.jpg',
                    link_video: 'assets/images/produtos/no-thumbnail-video.jpg',
                    safeUrl: null,
                    title: '0000-05',
                    subtitle: 'Lorem ipsum dolor sit amet, consectetur a'
                }
            ],
            thumbs_drawer_footer: [
                {
                    id: '1',
                    true: true,
                    isVideo: false,
                    thumbnail: 'assets/images/produtos/no-thumbnail.jpg',
                    link_video: 'assets/images/produtos/no-thumbnail-video.jpg',
                    title: 'Title Drawer Footer 03',
                    subtitle: 'Lorem estarter bertore denoire abdictium'
                },
                {
                    id: '2',
                    true: true,
                    isVideo: false,
                    thumbnail: 'assets/images/produtos/no-thumbnail.jpg',
                    link_video: 'assets/images/produtos/no-thumbnail-video.jpg',
                    title: 'Title Drawer Footer 03',
                    subtitle: 'Lorem estarter bertore denoire abdictium'
                },
                {
                    id: '3',
                    true: true,
                    isVideo: false,
                    thumbnail: 'assets/images/produtos/no-thumbnail.jpg',
                    link_video: 'assets/images/produtos/no-thumbnail-video.jpg',
                    title: 'Title Drawer Footer 03',
                    subtitle: 'Lorem estarter bertore denoire abdictium'
                },
                {
                    id: '4',
                    true: true,
                    isVideo: false,
                    thumbnail: 'assets/images/produtos/no-thumbnail.jpg',
                    link_video: 'assets/images/produtos/no-thumbnail-video.jpg',
                    title: 'Title Drawer Footer 03',
                    subtitle: 'Lorem estarter bertore denoire abdictium'
                }
            ],
            descriptions: [
                {
                    id: '291b3c7d-9031-4ee1-a284-ccf508c2e7bb',
                    id_product: '291b3c7d-9031-4ee1-a284-ccf508c2e7bb',
                    title: '',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                },
                {
                    id: '291b3c7d-9031-4ee1-a284-ccf508c2e7bb',
                    id_product: '291b3c7d-9031-4ee1-a284-ccf508c2e7bb',
                    text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
                },
                {
                    id: '291b3c7d-9031-4ee1-a284-ccf508c2e7bb',
                    id_product: '291b3c7d-9031-4ee1-a284-ccf508c2e7bb',
                    text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
                },
                {
                    id: '291b3c7d-9031-4ee1-a284-ccf508c2e7bb',
                    id_product: '291b3c7d-9031-4ee1-a284-ccf508c2e7bb',
                    text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                }
            ],
            descriptions_two: [
                {
                    id: '291b3c7d-9031-4ee1-a284-ccf508c2e7bb',
                    id_product: '291b3c7d-9031-4ee1-a284-ccf508c2e7bb',
                    title: '',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                },
                {
                    id: '291b3c7d-9031-4ee1-a284-ccf508c2e7bb',
                    id_product: '291b3c7d-9031-4ee1-a284-ccf508c2e7bb',
                    text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
                }
            ],
            product_detail: [
                {
                    id: '291b3c7d-9031-4ee1-a284-ccf508c2e7bb',
                    id_product: '291b3c7d-9031-4ee1-a284-ccf508c2e7bb',
                    icon: 'check',
                    title: 'Lorem ipsum dolor sit amet',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                },
                {
                    id: '291b3c7d-9031-4ee1-a284-ccf508c2e7bb',
                    id_product: '291b3c7d-9031-4ee1-a284-ccf508c2e7bb',
                    icon: 'check',
                    title: 'Ut enim ad minim veniam',
                    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
                },
                {
                    id: '291b3c7d-9031-4ee1-a284-ccf508c2e7bb',
                    id_product: '291b3c7d-9031-4ee1-a284-ccf508c2e7bb',
                    icon: 'check',
                    title: 'Duis aute irure dolor',
                    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
                },
                {
                    id: '291b3c7d-9031-4ee1-a284-ccf508c2e7bb',
                    id_product: '291b3c7d-9031-4ee1-a284-ccf508c2e7bb',
                    icon: 'check',
                    title: 'Excepteur sint occaecat cupidatat',
                    description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                },
                {
                    id: '291b3c7d-9031-4ee1-a284-ccf508c2e7bb',
                    id_product: '291b3c7d-9031-4ee1-a284-ccf508c2e7bb',
                    icon: 'check',
                    title: 'Sed ut perspiciatis unde omnis',
                    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.'
                },
                {
                    id: '291b3c7d-9031-4ee1-a284-ccf508c2e7bb',
                    id_product: '291b3c7d-9031-4ee1-a284-ccf508c2e7bb',
                    icon: 'check',
                    title: 'Nemo enim ipsam voluptatem',
                    description: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos.'
                }
            ],
            descriptions_drawer: [ /* drawer */
                {
                    id: '291b3c7d-9031-4ee1-a284-ccf508c2e7bb',
                    id_product: '291b3c7d-9031-4ee1-a284-ccf508c2e7bb',
                    title: '',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                },
                {
                    id: '291b3c7d-9031-4ee1-a284-ccf508c2e7bc',
                    id_product: '291b3c7d-9031-4ee1-a284-ccf508c2e7bb',
                    title: '',
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                }
            ]
        };

    projeto = [
        {
            id: '291b3c7d-9031-4ee1-a284-ccf508c2e7be',
            name: '',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmo',
            card: []
        }
    ];

    constructor(private formBuilder: FormBuilder,
                private updateVideo: UpdateVideoService,
                private cdr: ChangeDetectorRef
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

        this.reloadSafeUrl();

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

            this.card = JSON.parse(JSON.stringify(originalCard));
            if (result) {
                this.card = result;
                this.reloadSafeUrl(); 
            }
            
        });
    }
 
    reloadSafeUrl() {

        this.safeURL = this.updateVideo.updateVideo(this.card.link_video);  
    
        this.card.thumbs_video.forEach(thumb => {

            if (thumb.link_video !== 'assets/images/produtos/no-thumbnail-video.jpg') { 

                if (thumb.safeUrl === null) {
                    thumb.safeUrl = this.updateVideo.updateVideo(thumb.link_video);

                    console.log(thumb.safeUrl);
                }
                

            } else {
                thumb.link_video !== 'assets/images/produtos/no-thumbnail-video.jpg'
                thumb.safeUrl = null;  
            }

        });

    }
     

}
