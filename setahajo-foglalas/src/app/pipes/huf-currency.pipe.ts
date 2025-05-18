import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'hufCurrency',
    standalone: true
})
export class HufCurrencyPipe implements PipeTransform {
    transform(value: number, fractionDigits: number = 0): string {
        if (typeof value !== 'number') return '';
        return new Intl.NumberFormat('hu-HU', {
            style: 'currency',
            currency: 'HUF',
            minimumFractionDigits: fractionDigits,
            maximumFractionDigits: fractionDigits
        }).format(value);
    }
}
