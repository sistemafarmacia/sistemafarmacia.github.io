// js/modules/calculator.js
import { parseCurrencyInput } from '../utils.js';
import { StorageService } from '../services/storage.js';

export const CalculatorModule = {
    /**
     * Calcula o total acumulado das maquininhas de cartão
     */
    calculateMaquininhas() {
        const inputs = document.querySelectorAll('.maquininha-input');
        let total = 0;
        inputs.forEach(input => {
            total += parseCurrencyInput(input.value);
        });
        return total;
    },

    /**
     * Calcula o total de sangrias informadas
     */
    calculateSangrias() {
        const inputs = document.querySelectorAll('.sangria-input');
        let total = 0;
        inputs.forEach(input => {
            total += parseCurrencyInput(input.value);
        });
        return total;
    },

    /**
     * Executa o cálculo completo do fechamento
     */
    processFullClosure() {
        const cartaoTotal = this.calculateMaquininhas();
        const dinheiroLoja = parseCurrencyInput(document.getElementById('dinheiroLojaInput')?.value);
        const pixLoja = parseCurrencyInput(document.getElementById('pixLojaInput')?.value);
        const sangriasTotal = this.calculateSangrias();

        // O valor real em dinheiro que deve sobrar é: Dinheiro - Sangrias
        const dinheiroLiquido = dinheiroLoja - sangriasTotal;
        const faturamentoTotal = cartaoTotal + pixLoja + dinheiroLoja;

        return {
            cartaoTotal,
            dinheiroLoja,
            pixLoja,
            sangriasTotal,
            dinheiroLiquido,
            faturamentoTotal
        };
    },

    /**
     * Adiciona dinamicamente um novo campo de sangria (migrado do seu script.js)
     */
    addSangriaField() {
        const container = document.getElementById('sangriasContainer');
        const div = document.createElement('div');
        div.className = 'flex items-center space-x-2 mb-2';
        div.innerHTML = `
            <input type="text" class="sangria-input w-full p-2 border rounded" placeholder="Valor R$ 0,00">
            <button class="text-red-500 hover:text-red-700 remove-sangria">
                <i class="fas fa-trash"></i>
            </button>
        `;
        container.appendChild(div);
        
        // Adiciona evento para remover
        div.querySelector('.remove-sangria').addEventListener('click', () => div.remove());
    }
};