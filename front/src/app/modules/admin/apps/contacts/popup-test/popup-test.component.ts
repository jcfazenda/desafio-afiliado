import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'; 
import { MacrosService } from '../../../../auth/api-authenticate/macros/macros.service';

@Component({
    selector       : 'app-popup-test',
    templateUrl    : './popup-test.component.html',
    styleUrls      : ['./popup-test.component.css'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopUpTestComponent  implements OnInit, OnDestroy
{
    inputJson = true;

    formGroup: FormGroup; 
    selectedTabIndex = 0;

    configuration:      any; 
    payload: any[];
    message_iso:      any; 
    message_data: any[];

    json_request = 
    {  
        transaction: {
          amount: 1000,
          currency: 'USD',
          transaction_channel_type: 'POS',
          installment: { type: 'no_interest', number: 1, scheme: 'single_payment' },
          
          card: {
            entry_mode: 'CHIP',
            expiration_month: '12',
            expiration_year: '25',
            security_code: '123',
            card_number: '4111111111111111'
          }
        }
    };
      
    transaction_header = [
        { item: 'Tipo de mensagem',             value: 'Autorização' },
        { item: 'Código de retorno',            value: '00 - Transação autorizada' },
        { item: 'Código de transação',         value: '01 - Compra' },
        { item: 'Número do lote',               value: '123456' },
        { item: 'Número de sequência',          value: '7890' },
        { item: 'Horário de transmissão',       value: '15:30:00' },
        { item: 'Data de transmissão',          value: '2023-09-20' },
        { item: 'Horário de processamento',     value: '2023-09-20' }
    ];
 
    
 
    /**
     * Constructor
     */
    constructor(private _macrosService: MacrosService,
                @Inject(MAT_DIALOG_DATA) private data: any,
                private dialogRef: MatDialogRef<PopUpTestComponent>,
                private cdRef: ChangeDetectorRef,
                private formBuilder: FormBuilder)
    {
        this.configuration = data.configuration; 
    }

    /**
     * On init
    */
    ngOnInit(): void {

        // Open the drawer
        this.formGroup = this.formBuilder.group({
            id          : [''],
            avatar      : [null],
            json_request: [''], 
            json_response: [''] 
        }); 

        const json =  JSON.stringify(this.json_request, null, 2)
        this.formGroup.patchValue({
            json_request:json,
        });
        this.cdRef.detectChanges(); 

    }

    /**
     * On destroy
    */
    ngOnDestroy(): void
    {
        
    }

    close(){
        this.dialogRef.close();
    }
 
    /**
     * Goto test
    */
    execute(): void
    {
        this.inputJson = false;

        const send = JSON.parse(this.formGroup.get('json_request')?.value ?? '{}');

        const novoObjeto = {
          id_configuration: this.configuration.id,
          ...send
        };

        this._macrosService.transaction(novoObjeto).subscribe((data) => { 
            
            this.payload = data.transaction; 

            const response =  JSON.stringify( {message: data.message} , null, 2)
            this.formGroup.patchValue({
                json_response:response
            });

            this.selectedTabIndex = 2;
            this.cdRef.detectChanges();

            console.log(data.message);

        }); 

       
    }

    inputRequestJason(): void
    {
        this.inputJson = true;
    }

}
