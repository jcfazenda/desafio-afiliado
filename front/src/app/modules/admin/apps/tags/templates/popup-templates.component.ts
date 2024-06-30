
import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';  
import { PathService } from '../../../../auth/api-authenticate/path/paths.service';

@Component({
    selector       : 'app-popup-templates',
    templateUrl    : './popup-templates.component.html',
    styleUrls      : ['./popup-templates.component.css'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopUpTemplatesComponent  implements OnInit, OnDestroy
{
    messageEmitter = new EventEmitter<string>();
    
    @Output()
    onSelect = new EventEmitter<any>();
    
    formGroup: FormGroup;  
    
    template: any;

    // Crie o formulário dinamicamente com base nas chaves do switchConditionPath
    conditional: any;

    dataElementSelected: any;
    nameConditional: any;

    dataElements: any[];
    dataSignals = [
        {
            id: 1,
            name: '=='
        },
        {
            id: 2,
            name: '>='
        },
        {
            id: 3,
            name: '<='
        },
        {
            id: 4,
            name: 'CONTAINS'
        },
    ];
    dataCompare = [
        {
            id: 1,
            name: 'MAGNETIC_STRIPE_FULL'
        },
        {
            id: 3,
            name: 'MAGNETIC_STRIPE_FALLBACK'
        },
        {
            id: 3,
            name: 'CHIP'
        },
        {
            id: 4,
            name: 'CHIP_CONTACTLESS'
        },
        {
            id: 5,
            name: 'MANUAL'
        },
        {
            id: 6,
            name: 'TEST'
        }
    ];

    /**
     * Constructor
     */
    constructor(private _pathService: PathService, 
                @Inject(MAT_DIALOG_DATA) private data: any,
                private dialogRef: MatDialogRef<PopUpTemplatesComponent>, 
                private formBuilder: FormBuilder)
    {  
        this.messageEmitter = new EventEmitter<string>();
        this.template = data.item;

        this.conditional = {
 
            value: '', 

            switchsimple: [
                {
                    name: 'Swith Case POS 7',
                    type: 'switchsimple',
                    value_path: '...',
                    active: true
                },
                {
                    switch0: { 
                        case: "CARD.ENTRY_MODE",
                        critery: "==",
                        compare: "TEST",
                        position: "0",
                        value: "0"
                    }
                }
            ]
        }

        this.conditional.switchsimple   = this.conditional.switchsimple.slice(1); 

    }

    /**
     * On init
    */
    ngOnInit(): void { 

        /* carrega path's */
        this._pathService.getPathByConfiguration('64ee52df55fa2a4da11307fd' ).subscribe((data) => { 

            this.dataElements = data;
            this.addControl();       

        });  
        
    }
 
    /**
     * On destroy
    */
    ngOnDestroy(): void
    {
        
    }

    /**
     * On destroy
    */
    addControl(): void
    { 
        const controlSufixes = ['element', 'signals', 'compare', 'position', 'value'];  

        this.formGroup = this.formBuilder.group({

            id:         [''],
            position:   [''],
            value:      [''],
            name:       [this.nameConditional],
            select_data_element: [this.dataElementSelected],  

            // Construction Dynamic controls
            ...Object.fromEntries(
                this.conditional.switchsimple.flatMap((item, index) =>
                
                    controlSufixes.map((suffix) => [
                        `select_data_${suffix}_switch${index}`,
                        ''
                    ])
                )
            )
        });

        this.setCase();
    }

    /**
     * Set values swithcase
    */
    setCase() {

        for (const item of this.conditional.switchsimple) {

            if (item) {

              for (const switchKey in item) {
 
                if (switchKey.startsWith('switch')) {
                            
                    const formControlDataElement = `select_data_element_${switchKey}`;
                    const value_path = item[switchKey]?.case; 
                               
                    const selectDataElement = this.dataElements.find(
                            (option) => option.path_in === value_path 
                    );   

                    const formControlSignals = `select_data_signals_${switchKey}`;
                    const critery = item[switchKey]?.critery;
                    const selectSignal= this.dataSignals.find(
                            (option) => option.name === critery 
                    ); 

                    const formControlCompare = `select_data_compare_${switchKey}`;
                    const compare = item[switchKey]?.compare;
                    const selectDataCompare= this.dataCompare.find(
                            (option) => option.name === compare 
                    ); 

                    const formControlPosition = `select_data_position_${switchKey}`;
                    const position = item[switchKey]?.position;

                    const formControlResult = `select_data_value_${switchKey}`;
                    const value = item[switchKey]?.value;
 
                    this.formGroup.patchValue({
                        [formControlDataElement]:   selectDataElement,
                        [formControlSignals]:       selectSignal,
                        [formControlCompare]:       selectDataCompare,
                        [formControlPosition]:      position,
                        [formControlResult]:        value
                    });
                    

                }
              }

            }

          }
    }
 
    /**
     * Update swithcase
    */
    updateCase(index: number): void
    { 
        const switchName = `switch${index}`;  
        const updatedValues     = this.formGroup.value;  

        const update = {
            [switchName]: {
                case:       updatedValues[`select_data_element_switch${index}`].path_in.toUpperCase(),
                critery:    updatedValues[`select_data_signals_switch${index}`].name,
                compare:    updatedValues[`select_data_compare_switch${index}`].name,
                position:   updatedValues[`select_data_position_switch${index}`],
                value:      updatedValues[`select_data_value_switch${index}`]
            }
        }; 

        
        this.conditional.switchsimple[index] = update;

    }

    /**
     * insert and remove swithcase
    */
    removeCase(index: number): void {

        this.conditional.switchsimple.splice(index, 1);
        this.addControl(); 
    }

    insertCase(): void
    { 
        const index = this.conditional.switchsimple.lentgh + 1;
        const switchName = `switch${index}`; 

        const insert = {
            [switchName]: {
                case: "CARD.ENTRY_MODE",
                critery: "==",
                compare: "TEST",
                position: "0",
                value: "0"
            }
        }; 
        this.conditional.switchsimple.push(insert);  

        this.addControl(); 
    }

    /**
     * save swithcase
    */
    save(): void
    { 
        const switchsimple = [
            {
                name:       this.formGroup.get('name')?.value,
                type:       'switchsimple',
                value_path: this.formGroup.get('select_data_element')?.value.path_in,
                active:     true 
            }
        ];

        for (const item of this.conditional.switchsimple) {
            switchsimple.push(item);
        }

        this._pathService.updateConditionals({id: this.formGroup.get('select_data_element')?.value.id , switchsimple: switchsimple} ).subscribe((data) => { 
            
        }); 

    }

    /**
     * Get Conditionals by id_path
    */
    getConditionalByPath(): void { 
 
        this.dataElementSelected = this.formGroup.get('select_data_element')?.value; 
        this.nameConditional     = '';
        
        /* carrega path's */
        const params = {
            id:           this.dataElementSelected.id,
            conditionals: 'switchsimple'
        }
 
        this._pathService.getConditionalByPath(params).subscribe((data) => {   

            if (data[0].conditionals !== null) {

                this.nameConditional          = data[0].conditionals[0].name;
                this.conditional.switchsimple = data[0].conditionals.slice(1);

            }else {

                this.conditional = {
 
                    value: '', 
        
                    switchsimple: [
                        {
                            name: 'Swith Case POS 7',
                            type: 'switchsimple',
                            value_path: 'CARD.ENTRY_MODE',
                            active: true
                        },
                        {
                            switch0: { 
                                case: "CARD.ENTRY_MODE",
                                critery: "==",
                                compare: "TEST",
                                position: "0",
                                value: "0"
                            }
                        }
                    ]
                }

                this.conditional.switchsimple   = this.conditional.switchsimple.slice(1);
                
            }
             
            this.addControl();       

        });  
        
    }

}
