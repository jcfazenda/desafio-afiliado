import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'; 
import { TagSharedService } from '../../tags/tag-shared.service';
import { MacrosService } from '../../../../auth/api-authenticate/macros/macros.service';

@Component({
    selector       : 'app-conditionals',
    templateUrl    : './conditionals.component.html',
    styleUrls: ['./conditionals.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConditionalsComponent  implements OnInit, OnDestroy
{
    messageEmitter = new EventEmitter<string>();
    changeDetection: ChangeDetectionStrategy.Default;

    @Input()
    item: any; 
    formGroup: FormGroup;  
    macro: any;
    path:  any;
    menuList:   any;
    testMacro = false;

    macros:any[] = [];

    code = '{ "tag": 6, "value": "   " }'; 
    subscription: any;

    /**
     * Constructor
     */
    constructor(private formBuilder: FormBuilder,
               private _macroService: MacrosService, 
               private cdRef: ChangeDetectorRef,
               private sharedService: TagSharedService)
    {   
        this.testMacro = false;  
        this.path = {};
                    
    }

    /**
     * On init
    */
    ngOnInit(): void { 
 
        this.formGroup = this.formBuilder.group({
            id:             [''],
            name:           [''],  
            description:    [''],  
            postman_input:  [''],  
            pontman_result: [''] 
        }); 
 
        this.menuList = [ 
            { action: 'editMacro',    label: 'Edit',      icon: 'edit' },
            { action: 'setJsonTest',  label: 'Json Test', icon: 'code' },
            { action: 'detach',       label: 'Detach',    icon: 'block' }, 
        ];

        this.formGroup.patchValue({
            pontman_result:  this.code
        }); 

        /* Macros by Path*/
        this.subscription = this.sharedService.json$.subscribe((json) => {
            this.path = json;
            this.retrieveMacros();  
        });
       
    }

    retrieveMacros(): void {

        if (this.path.id !== 0) { 

            this._macroService.getByPath(this.path.id).subscribe((data) => {

                this.macros = data;

                console.log( this.macros );

                this.cdRef.detectChanges();
            });

        }

    } 

    ActionMenu(action: string, item: any): void {  

        switch (action) {

            case 'editMacro':
                break;
                    
            case 'settings':

                this.settings(item);
                break;

            case 'setJsonTest':

                this.setJsonTest(item);
                break;

            default:
                break;
        }

    }

    /**
     * On destroy
    */
    ngOnDestroy(): void
    {
        
    }

    /**
     *  Copy json test
    */
    setJsonTest(item): void
    {  
       this.formGroup.patchValue({
            postman_input: JSON.stringify(item.macro_path.macro.postman_input, null, 2)
        }); 

        this.cdRef.detectChanges();
            
    }

    /**
     *  test
    */
    settings(item): void
    {
        this.testMacro = true;
        this.macro = item;

        this.cdRef.detectChanges();
        
    }

    test(): void
    {
 
        const formValues = this.formGroup.value;  
        const postmanInputString = formValues.postman_input;
        const script = JSON.parse(postmanInputString);

        const param = {
            id_configuration: this.path.id_configuration,
            position_iso:     this.path.position_iso,
            script
        };

        this._macroService.execute(param).subscribe((data) => { 

            const formattedResult = JSON.stringify(data, null, 2); 

            this.formGroup.patchValue({
              pontman_result: formattedResult
            });
          
            this.cdRef.detectChanges();
          });

    }

}
