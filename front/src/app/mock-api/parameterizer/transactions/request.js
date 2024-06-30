// request.js

const requestPayload = {

    amount:                     1722,                   // Posição ISO: 4
    currency:                   "ARS",                  // Posição ISO: 49
    transaction_channel_type:   "recurring",            // Posição ISO: 18

    installment: {
      type: "no_interest",                              // Posição ISO: 0 (Não comumente associado ao ISO)
      number: 2,                                        // Posição ISO: 0
      scheme: "plan_emisor"                             // Posição ISO: 0
    },
    card: {
      entry_mode: "recurring",                          // Posição ISO: 22
      expiration_month: "12",                           // Posição ISO: 14
      expiration_year: "25",                            // Posição ISO: 24            
      security_code: "840",                             // Posição ISO: 23
      card_number: "4118280000001720"                   // Posição ISO: 2
    },
    recurring: {
      sequence: "first",                                 // Posição ISO: 0
      billing_period: "01223",                           // Posição ISO: 0
      payments_identification: "Teste"                   // Posição ISO: 0
    }
    
  };
 
  export default requestPayload;
  