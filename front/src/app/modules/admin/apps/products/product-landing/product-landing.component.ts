import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';
 
@Component({
    selector: 'app-product-landing',
    templateUrl: './product-landing.component.html',
    styleUrls: ['./../products.component.scss', '../../../../../layout/footer.component.scss']
})
export class ProductLandingComponent implements OnInit {

    formGroup: FormGroup;
    productID: string;
    principalPrice: any;

    card: any;
    productContent: any;
    productVantages: any;
    productLabels: any;
    productDetail: any;

    certificateHolders: any;
    lastCertificateHolder: any;

    contents = [
        {
            id: '',
            title: '01 - Introdução e Apresentação',
            description: 'Introdução e Apresentação',
            details: [
                'Aula 1 - Introdução ao Curso',
                'Aula 2 - Como funciona a Plataforma e o Certificado',
                'Aula 3 - Material de Apoio (E-book)'
            ]
        },
        {
            id: '',
            title: '02 - Download e Metodologia',
            description: 'Download e Metodologia',
            details: [
                'Aula 4 - Download e Instalação do Power BI',
                'Aula 5 - Utilização do Power BI'
            ]
        },
        {
            id: '',
            title: '03 - Primeiros Passos e Importação de Dados',
            description: 'Download e Metodologia',
            details: [
                'Aula 6 - Apresentação geral do layout',
                'Aula 7 - Importando Dados e Tratando no Power Query',
                'Aula 8 - Transformando dados e Fonte do arquivo'
            ]
        },
        {
            id: '',
            title: '04 - Trabalhando com Datas',
            description: 'Trabalhando com datas',
            details: [
                'Aula 9 - Colunas de Datas',
                'Aula 10 - Tabela Calendário'
            ]
        },
        {
            id: '',
            title: '05 - Relacionamentos no Power BI',
            description: 'Relacionamentos no Power BI',
            details: [
                'Aula 11 - Tabela Fato x Tabela Dimensão',
                'Aula 12 - Criando Relacionamentos'
            ]
        },
        {
            id: '',
            title: '06 - Primeiro Dashboard, Medidas e Temas',
            description: 'Primeiro Dashboard, Medidas e Temas',
            details: [
                'Aula 13 - Novas colunas e Medidas',
                'Aula 14 - Dashboard Simples',
                'Aula 15 - Temas e Paleta de Cores'
            ]
        },
        {
            id: '',
            title: '07 - Conta, Dashboard Online e no Celular',
            description: 'Conta, Dashboard Online e no Celular',
            details: [
                'Aula 16 - Criando Conta Corporativa',
                'Aula 17 - Publicando o seu Dashboard Online',
                'Aula 18 - Exibição e Layout Móvel'
            ]
        },
        {
            id: '',
            title: '08 - Fórmulas DAX',
            description: 'Fórmulas DAX',
            details: [
                'Aula 19 - Multiplicação, Soma e IF (SE)',
                'Aula 21 - Dashboard RH/Funcionários (Parte 1)',
                'Aula 22 - Dashboard RH/Funcionários (Parte 2)'
            ]
        },
        {
            id: '',
            title: '09 - Dashboard de Vendas e Devoluções',
            description: 'Dashboard de Vendas e Devoluções',
            details: [
                'Aula 23 - Importando e Tratando dados',
                'Aula 24 - Gráficos com Drill Through e Drill Down',
                'Aula 25 - Gráfico de Funil e Ícones'
            ]
        },
        {
            id: '',
            title: '10 - Dashboard de Metas e Resultados',
            description: 'Dashboard de Metas e Resultados',
            details: [
                'Aula 26 - Importando e Tratando dados',
                'Aula 27 - Gráficos (Colunas, Dispersão, Matriz, Cartão)',
                'Aula 28 - KPI e Indicador',
                'Aula 29 - Formato e Design do Dashboard',
                'Aula 30 - Interação com Botões (Claro e Escuro)'
            ]
        },
        {
            id: '',
            title: '11 - Base de Dados e Template',
            description: 'Base de Dados e Template',
            details: [
                'Aula 31 - Planilha Geradora de Base de Dados',
                'Aula 32 - Dicas para criar uma base de dados manual',
                'Aula 33 - Chat GPT (Inteligência Artificial)',
                'Aula 34 - Site de Templates e Plano de Fundo no Power Point',
            ]
        },
        {
            id: '',
            title: '12 - Certificado de Conclusão',
            description: 'Certificado de Conclusão',
            details: [
                'Considerações Finais e Certificado',
            ]
        },
        {
            id: '',
            title: '13 - Acesso vitalício a todos os Cursos e Produtos da Expert Cursos',
            description: 'Material',
            details: [
                'Passos para liberação de todos os produtos',
            ]
        } 
    ];

    constructor(
        private formBuilder: FormBuilder,
        private activate: ActivatedRoute,
        private router: Router,
        private _service: ProductsService
    ) {
    }

    ngOnInit(): void {

        this.formGroup = this.formBuilder.group({
            searchText: [''],
            select_enum_country: ['']
        });

        /* Get Path by id Configuration */
        this.activate.paramMap.subscribe(params => {

            const id = params.get('id');

            if (id) {
                this.card = this._service.getCardById(id);
                this.principalPrice = this.card.prices.find(price => price.principal);
                console.log(this.principalPrice);
            } else {
                console.error('No product ID found in route');
            }

        });

        /* list conteudo */
        this.productContent = this._service.getProductConteudo();
        this.productVantages = this._service.getProductVantage();
        this.productLabels = this._service.getProductLabels();
        this.productDetail = this._service.getProductDetail();

        this.certificateHolders = this._service.getCertificateHolders();
        this.lastCertificateHolder = this.certificateHolders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
    }

    goToProduct(afiliateID: string): void {
        this.router.navigate(['/apps/products']);
    } 

    navigateToLink(url: string): void {
        window.open(url, '_blank');
    }

}
