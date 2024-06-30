import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'; 
import { MatDialog} from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';   
import { ProductDialog } from '../product-dialog/product-dialog.component';
import { SafeResourceUrl } from '@angular/platform-browser';
import { UpdateVideoService } from '../../../../services/update-video.service';

@Component({
    selector: 'app-product-create',
    templateUrl: './product-create.component.html',
    styleUrls  : ['./../products.component.scss', 
                  '../../../../../layout/footer.component.scss',
                  '../../../../../layout/footer-pixel.compenent.scss',
                  '../../../../../layout/data-grid.component.scss' ] 
})
export class ProductCreateComponent  implements OnInit 
{  
    @ViewChild('drawer') drawer: MatDrawer;
    @ViewChild('drawerPixel') drawerPixel: MatDrawer;

    readonly dialog = inject(MatDialog);
    
    iconSelectProvedor = 'mat_solid:aspect_ratio';
    positionDrawer      = 'end';
    positionDrawerPixel = 'start';

    safeURL: SafeResourceUrl | null = null;
    formGroup: FormGroup;
    user: any;
 
    provedoresAnuncios = [
        {
            id:  '291b3c7d-9031-4ee1-a284-ccf508c2e7be',
            name: 'Google ADS',
            icon: 'google-ads',
            pixel_id: 'AW-1064344632',
            pixel_label: 'FtcDCK7x9bcZELi4wvsD'
        },
        {
            id:  '291b3c7d-9031-4ee1-a284-ccf508c2e7b1',
            name: 'Facebook ADS',
            icon: 'facebook-f-ads',
            pixel_id: 'AW-1064344632',
            pixel_label: 'FtcDCK7x9bcZELi4wvsD'
        },
        {
            id:  '291b3c7d-9031-4ee1-a284-ccf508c2e7b2',
            name: 'Tiktok ADS',
            icon: 'tiktok-ads',
            pixel_id: 'AW-1064344632',
            pixel_label: 'FtcDCK7x9bcZELi4wvsD'
        },
        {
            id:  '291b3c7d-9031-4ee1-a284-ccf508c2e7b2',
            name: 'Instagram ADS',
            icon: 'instagram-ads',
            pixel_id: 'AW-1064344632',
            pixel_label: 'FtcDCK7x9bcZELi4wvsD'
        },
        {
            id:  '291b3c7d-9031-4ee1-a284-ccf508c2e7b3',
            name: 'Twitter ADS',
            icon: 'twitter-ads',
            pixel_id: 'AW-1064344632',
            pixel_label: 'FtcDCK7x9bcZELi4wvsD'
        }
    ];

    card = 
    {
        id:         '291b3c7d-9031-4ee1-a284-ccf508c2e7be',
        id_projeto: '291b3c7d-9031-4ee1-a284-ccf508c2e7be',
        title:      'Title', 
        subtitle:   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmo',
        thumbnail: 'assets/images/produtos/no-thumbnail.jpg',  
        link_page:  'https://go.hotmart.com/K93642514D?dp=1',
        link_video: 'https://youtu.be/-nKoHRvtsk4?si=OidpN5V1CQOhE8DV', 
        isVideo: true, 
        godfather:  'assets/images/logo/kwifi.png',
        dataCreate: '24012024',
        price: '97,00',

        pixels: [
            {
                id:  '291b3c7d-9031-4ee1-a284-ccf508c2e7be',
                name: 'Google ADS',
                icon: 'google-ads',
                pixel_id: 'AW-1064344632',
                pixel_label: 'FtcDCK7x9bcZELi4wvsD'
            },
            {
                id:  '291b3c7d-9031-4ee1-a284-ccf508c2e7be',
                name: 'Twitter ADS',
                icon: 'twitter-ads',
                pixel_id: 'AW-1064344632',
                pixel_label: 'FtcDCK7x9bcZELi4wvsD'
            }
        ],
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
        title_drawer: {
            title_top: 'Title', 
            subtitle_top: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmo',
            title_footer: 'Title', 
            subtitle_footer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmo'
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
        thumbs:[
            {
                id: '', 
                true: true,
                thumbnail: 'assets/images/produtos/no-thumbnail.jpg', 
                title: 'Title',
                description: ''
            },
            {
                id: '',
                true: true,
                thumbnail: 'assets/images/produtos/no-thumbnail.jpg', 
                title: 'Title',
                description: ''
            },
            {
                id: '',
                true: true,
                thumbnail: 'assets/images/produtos/no-thumbnail.jpg', 
                title: 'Title',
                description: ''
            },
            
            {
                id: '',
                true: true,
                thumbnail: 'assets/images/produtos/no-thumbnail.jpg', 
                title: 'Title',
                description: ''
            },
            {
                id: '',
                true: true,
                thumbnail: 'assets/images/produtos/no-thumbnail.jpg', 
                title: 'Title',
                description: ''
            }
        ],
        thumbs_video:[
            {
                id: '', 
                true: true,
                icon: 'tangerine-svgrepo-com',
                thumbnail: 'assets/images/produtos/no-thumbnail-video.jpg', 
                title: 'Title',
                description: 'Lorem ipsum dolor sit amet, consectetur a'
            },
            {
                id: '',
                true: true,
                icon: 'tangerine-svgrepo-com',
                thumbnail: 'assets/images/produtos/no-thumbnail-video.jpg', 
                title: 'Title',
                description: 'Lorem ipsum dolor sit amet, consectetur a'
            },
            {
                id: '',
                true: true,
                icon: 'tangerine-svgrepo-com',
                thumbnail: 'assets/images/produtos/no-thumbnail-video.jpg', 
                title: 'Title',
                description: 'Lorem ipsum dolor sit amet, consectetur a'
            },
            {
                id: '',
                true: true,
                icon: 'tangerine-svgrepo-com',
                thumbnail: 'assets/images/produtos/no-thumbnail-video.jpg', 
                title: 'Title',
                description: 'Lorem ipsum dolor sit amet, consectetur a'
            },
            {
                id: '',
                true: true,
                icon: 'tangerine-svgrepo-com',
                thumbnail: 'assets/images/produtos/no-thumbnail-video.jpg', 
                title: 'Title',
                description: 'Lorem ipsum dolor sit amet, consectetur a'
            }
        ], 
        thumbs_drawer_top: [
            {
                id: '', 
                true: true,
                thumbnail: 'assets/images/produtos/no-thumbnail.jpg', 
                title: 'Title',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmo'
            } 
        ],
        thumbs_drawer_footer: [
            {
                id: '', 
                true: true,
                thumbnail: 'assets/images/produtos/no-thumbnail.jpg', 
                title: 'Title',
                description: 'Lorem estarter bertore denoire abdictium'
            },
            {
                id: '', 
                true: true,
                thumbnail: 'assets/images/produtos/no-thumbnail.jpg', 
                title: 'Title',
                description: 'Lorem estarter bertore denoire abdictium'
            },
            {
                id: '', 
                true: true,
                thumbnail: 'assets/images/produtos/no-thumbnail.jpg', 
                title: 'Title',
                description: 'Lorem estarter bertore denoire abdictium'
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
                id: '291b3c7d-9031-4ee1-a284-ccf508c2e7bb',
                id_product: '291b3c7d-9031-4ee1-a284-ccf508c2e7bb',
                text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
            } 
        ]
    };

    projeto = [
        {
            id:          '291b3c7d-9031-4ee1-a284-ccf508c2e7be',
            name:        '',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmo',
            card: 
            {
                id:         '291b3c7d-9031-4ee1-a284-ccf508c2e7be',
                id_projeto: '291b3c7d-9031-4ee1-a284-ccf508c2e7be',
                title:      'Title', 
                subtitle:   'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmo',
                thumbnail: 'assets/images/produtos/no-thumbnail.jpg', 
                godfather:  'assets/images/logo/hotmart.png',
                dataCreate: '24012024',
                link_video: 'assets/images/produtos/no-thumbnail-video.jpg',
                link_page:  'https://go.hotmart.com/K93642514D?dp=1',
        
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
                title_drawer: {
                    title_top: 'Title', 
                    subtitle_top: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmo',
                    title_footer: 'Title', 
                    subtitle_footer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmo'
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
        
                thumbs:[
                    {
                        id: '', 
                        true: true,
                        thumbnail: 'assets/images/produtos/no-thumbnail.jpg', 
                        title: 'Title',
                        description: ''
                    },
                    {
                        id: '',
                        true: true,
                        thumbnail: 'assets/images/produtos/no-thumbnail.jpg', 
                        title: 'Title',
                        description: ''
                    },
                    {
                        id: '',
                        true: true,
                        thumbnail: 'assets/images/produtos/no-thumbnail.jpg', 
                        title: 'Title',
                        description: ''
                    },
                    
                    {
                        id: '',
                        true: true,
                        thumbnail: 'assets/images/produtos/no-thumbnail.jpg', 
                        title: 'Title',
                        description: ''
                    }
                ],
                thumbs_two:[
                    {
                        id: '', 
                        true: true,
                        thumbnail: 'assets/images/produtos/no-thumbnail-video.jpg', 
                        title: 'Title',
                        description: 'Lorem ipsum dolor sit amet, consectetur a'
                    },
                    {
                        id: '',
                        true: true,
                        thumbnail: 'assets/images/produtos/no-thumbnail-video.jpg', 
                        title: 'Title',
                        description: 'Lorem ipsum dolor sit amet, consectetur a'
                    },
                    {
                        id: '',
                        true: true,
                        thumbnail: 'assets/images/produtos/no-thumbnail-video.jpg', 
                        title: 'Title',
                        description: 'Lorem ipsum dolor sit amet, consectetur a'
                    }
                ], 
                thumbs_drawer_top: [
                    {
                        id: '', 
                        true: true,
                        thumbnail: 'assets/images/produtos/no-thumbnail.jpg', 
                        title: 'Title',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmo'
                    } 
                ],
                thumbs_drawer_footer: [
                    {
                        id: '', 
                        true: true,
                        thumbnail: 'assets/images/produtos/no-thumbnail.jpg', 
                        title: 'Title',
                        description: 'Lorem estarter bertore denoire abdictium'
                    },
                    {
                        id: '', 
                        true: true,
                        thumbnail: 'assets/images/produtos/no-thumbnail.jpg', 
                        title: 'Title',
                        description: 'Lorem estarter bertore denoire abdictium'
                    },
                    {
                        id: '', 
                        true: true,
                        thumbnail: 'assets/images/produtos/no-thumbnail.jpg', 
                        title: 'Title',
                        description: 'Lorem estarter bertore denoire abdictium'
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
                        id: '291b3c7d-9031-4ee1-a284-ccf508c2e7bb',
                        id_product: '291b3c7d-9031-4ee1-a284-ccf508c2e7bb',
                        text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
                    } 
                ]
            }
        }
    ];

    constructor(private formBuilder: FormBuilder,
                private updateVideo: UpdateVideoService,
    )
    {
        const currentUserString = localStorage.getItem('currentUser'); 
        if (currentUserString !== null) { 
            this.user = JSON.parse(currentUserString);  
        }   
    }

    ngOnInit(): void { 

        this.formGroup = this.formBuilder.group({
            select_provedor_anuncios: ['']
        }); 

        this.safeURL = this.updateVideo.updateVideo(this.card.link_video); 
        
    }

    openDrawer(item: number) {

        this.closeDrawer();

        if (item === 1) {  
            this.drawer.open();  
            this.positionDrawer      =  'end';
            this.positionDrawerPixel =  'start';
        }
        if (item === 2) {  
            this.drawerPixel.open();  
            this.positionDrawer      =  'start';
            this.positionDrawerPixel =  'end';
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
    configurateCard(type: string,item: any) {
 
        const dialogRef = this.dialog.open(ProductDialog, {
          width: '700px', 
          data: { card: item , type: type}
        });
    
        dialogRef.afterClosed().subscribe(result => {

          if (result) {   
            this.card = result; 
            this.safeURL = this.updateVideo.updateVideo(this.card.link_video); 
          }

        });
    }
 
}
