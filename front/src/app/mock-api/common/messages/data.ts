/* eslint-disable */
import { DateTime } from 'luxon';

/* Get the current instant */
const now = DateTime.now();

export const messages = [
 

    {
        id         : '608b4479-a3ac-4e26-8675-3609c52aca58',
        image      : 'assets/images/avatars/julio.jpeg',
        title      : 'Configuração de Headers',
        description: 'teste de criaçao e configuracao de headers..',
        time       : now.minus({minutes: 50}).toISO(), // 50 minutes ago
        read       : false
    },
    
];
