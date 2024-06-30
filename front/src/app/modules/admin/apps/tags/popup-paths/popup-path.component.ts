import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { TagSharedService } from '../../tags/tag-shared.service';
import { PathService } from '../../../../auth/api-authenticate/path/paths.service'; 

@Component({
    selector       : 'app-pop-up-path',
    templateUrl    : './popup-path.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopUpPathComponent  implements OnInit, OnDestroy
{
    messageEmitter = new EventEmitter<string>();
    
    @Output()
    onSelect = new EventEmitter<any>();
    
    formGroup: FormGroup; 
    enum_variable_data: any[] = [];
    menuList:           any;  
    tag:                any;

    edit                =  false; 
    editConditionals    =  false; 

    /**
     * Constructor
     */
    constructor(private _pathService: PathService, 
                private sharedService: TagSharedService,
                @Inject(MAT_DIALOG_DATA) private data: any,
                private dialogRef: MatDialogRef<PopUpPathComponent>, 
                private formBuilder: FormBuilder)
    {  
        this.messageEmitter = new EventEmitter<string>();

        /* Get Enum variable data  */
        this._pathService.getVariableData().subscribe((rest) => { 
            this.enum_variable_data = rest;   
        }); 
 
    }

    /**
     * On init
    */
    ngOnInit(): void { 
 
        this.formGroup = this.formBuilder.group({
            id          : [''],
            avatar      : [null],
            name        : [''],  
            position_iso : [''],  
            path_in: [''],  
            path_out: [''],  
            description       : [''], 
            size      : [''],

            select_type:                [''], 
            select_presents_iso :       [''], 
            select_presents_bitmap :    [''], 
            select_type_data:           [''], 
            select_enum_variable_data:       [''],
        }); 
 
        this.menuList = [
            { action: 'openPopupSettings',  label: 'Settings',  icon: 'build' }, 
            { action: 'editPath',               label: 'Edit',          icon: 'edit' },
            { action: 'disableTag',             label: 'Disable',       icon: 'block' }, 
            { action: 'deleteTag',              label: 'Delete',        icon: 'delete' }
        ];
 
        this.edit = false; 

        if (this.data.paths === null ) { 
            this.edit = true;

        }else {
            
            this.tag = this.data.paths.paths ;

            if (this.data.paths.paths.length > 1) { this.tag = this.data.paths.paths ; }
            if (this.data.paths.paths.length === 1) {   
            }
            
        } 

    }

    /**
     * Edit Path
    */
    ActionMenu(action: string, item: any): void {  

        this.tag = item;
 
        switch (action) {

            case 'editPath':
                this.processFormValues(item);
                break;
        
            case 'deleteTag':
                this.deleteTag(item);
                break;

            case 'openPopupSettings':
                this.openPopupSettings(this.tag);
                break;

                    
            default:
                break;
        }

    }
    processFormValues(item: any): void {  

        const selectVariableData = this.enum_variable_data.find(
                (option) => option.id === item.variable_data.id
        ); 

        this.formGroup.patchValue({
            id:                 item.id,
            name:               item.name,
            path_in:            item.path_in,
            path_out:           item.path_out,
            description:        item.description,
            size:               item.size,
            position_iso:       item.position_iso,

            select_enum_variable_data:  selectVariableData
        });

        this.edit = true; 

    }

    back(): void
    {
        this.edit = false;
        this.tag = this.data.paths.paths ; 
    }

    /**
     * update and insert path
    */
    save(): void
    { 

        if (this.data.paths !== null ) { // update

            const dataToSave = {

                id:                this.tag.id,
                id_variable_data:  this.formGroup.get('select_enum_variable_data')?.value.id,
                size:              this.formGroup.get('size')?.value,
                name:              this.formGroup.get('name')?.value,
                description:       this.formGroup.get('description')?.value,
                path_in:           this.formGroup.get('path_in')?.value,
                path_out:          this.formGroup.get('path_out')?.value,
                position_iso:      this.formGroup.get('position_iso')?.value,
   
           };
           this._pathService.update(dataToSave).subscribe((data) => { 
                    this.close('refresh');
            });  

        }else { // insert

                const dataToSave = {

                    id_configuration:  this.data.id_configuration,
                    variable_data:     this.formGroup.get('select_enum_variable_data')?.value.id,
                    size:              this.formGroup.get('size')?.value,
                    name:              this.formGroup.get('name')?.value,
                    description:       this.formGroup.get('description')?.value,
                    path_in:           this.formGroup.get('path_in')?.value,
                    path_out:          this.formGroup.get('path_out')?.value,
                    position_iso:      this.formGroup.get('position_iso')?.value,

                    type_path: '64ecd60435a869a7872806e3',
                    path_order: 2,
                    response: true,
                    active: true,
                    version: '',
                    enabled: true
                };

                /* implementacao de configuracao para o arquivo */ 
                const novoObjeto = {
                    conditionals:[{
                        value_path: this.formGroup.get('path_in')?.value,
                        value: ''
                    }],
                    source:[
                        {
                            _id: '64f78a1a325c6c3508659651',
                            object: '',
                            method: 'generic',
                            variable_in: '',
                            variable_out: ''
                        }
                    ],
                    return: {
                        tag:   { value: this.formGroup.get('position_iso')?.value, use: '', var: '' },
                        value: { value: '', use: true, var: 'value' }
                    },
                    ...dataToSave
                  };

                this._pathService.insert(novoObjeto).subscribe((data) => { 
                    this.close('refresh');
                });  

        } 

    }
 
    /**
     * On destroy
    */
    deleteTag(item: any): void
    {
        const renome = { id: item.id};

        this._pathService.remove(renome).subscribe((data) => { 
            this.close('refresh');
        });  

    }

    close(message: string): void {
        this.dialogRef.close(message);  // Emita a mensagem aqui
    }

    openPopupSettings(item: any): void {

        this.edit = false;
        this.editConditionals = true;
        this.sharedService.setJson(item);

    }


    /**
     * On destroy
    */
    ngOnDestroy(): void
    {
        
    }

}
