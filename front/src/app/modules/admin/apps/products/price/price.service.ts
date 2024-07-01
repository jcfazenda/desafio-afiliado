import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  installments: { selected: boolean, description: string, interestFree: string, amount: string }[] = [];
  maxInstallments = 12; // Máximo de parcelas
  maxInstallmentsWithoutInterest = 3; // Máximo de parcelas sem Juros
  interestRate = 5.0; // Taxa de juros (5% neste exemplo)

  constructor() {}

  generateInstallments(price: any): any { 

        this.maxInstallmentsWithoutInterest = price.card_price_num;
        this.maxInstallments                = price.card_max_installments; 
        this.installments                   = [];

        for (let i = 1; i <= this.maxInstallments; i++) {

                const installmentAmount = this.calculateInstallmentAmount(price.principalPrice, i);
                if (isNaN(installmentAmount)) {
                    break; // Sai do loop se o cálculo retornar NaN
                }

                const totalAmount = (installmentAmount * i).toFixed(2);
                let description = `${i}x de R$ ${installmentAmount.toFixed(2)}`;
                let interestFree = '';

                if (i <= this.maxInstallmentsWithoutInterest) {
                    interestFree = ' sem Juros';
                } 
                
                this.installments.push({ 
                    selected: false,
                    description: description,
                    interestFree: interestFree,
                    amount: `R$ ${totalAmount}`
                });

        }

        return this.installments;
  }

  calculateInstallmentAmount(principal: number, installments: number): number {
    if (installments <= this.maxInstallmentsWithoutInterest) {
      return principal / installments; // Parcelas sem juros
    } else {
      const rate = this.interestRate / 100;
      return (principal * (rate + 1)) / installments; // Parcelas com juros
    }
  }
}
