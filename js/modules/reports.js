// js/modules/reports.js
import { formatCurrency, getTodayDateString } from '../utils.js';

export const ReportsModule = {
    /**
     * Gera o texto de relatório para o WhatsApp
     * Baseado na lógica que você já tinha no script.js
     */
    generateWhatsAppReport(data) {
        const { operador, vendas, total, dataRelatorio } = data;
        
        let texto = `*FECHAMENTO DE CAIXA*\n`;
        texto += `Data: ${dataRelatorio || getTodayDateString()}\n`;
        texto += `Operador: ${operador}\n`;
        texto += `------------------------------\n`;
        
        vendas.forEach(venda => {
            texto += `${venda.produto}: ${formatCurrency(venda.valor)}\n`;
        });
        
        texto += `------------------------------\n`;
        texto += `*TOTAL: ${formatCurrency(total)}*`;
        
        return texto;
    },

    /**
     * Copia o texto para a área de transferência
     */
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            return true;
        } catch (err) {
            console.error('Erro ao copiar:', err);
            return false;
        }
    },

    /**
     * Gera o HTML para o cupom de impressão (Relatório Térmico)
     */
    generateThermalPrintHTML(vendas, total) {
        let itemsHTML = vendas.map(v => `
            <div style="display: flex; justify-content: space-between;">
                <span>${v.produto}</span>
                <span>${formatCurrency(v.valor)}</span>
            </div>
        `).join('');

        return `
            <div style="font-family: monospace; width: 300px; padding: 10px; border: 1px solid #000;">
                <h3 style="text-align: center;">RELATÓRIO DE VENDAS</h3>
                <hr>
                ${itemsHTML}
                <hr>
                <div style="font-weight: bold; text-align: right;">
                    TOTAL: ${formatCurrency(total)}
                </div>
            </div>
        `;
    }
};