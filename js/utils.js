// js/utils.js

/**
 * Formata um número para o padrão de moeda brasileiro (R$ 1.234,56)
 */
export function formatCurrency(value) {
    if (value === null || value === undefined || isNaN(value)) {
        return 'R$ 0,00';
    }
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

/**
 * Converte uma string de moeda (ex: "R$ 1.200,50") para float (1200.50)
 * Útil para ler valores de inputs formatados.
 */
export function parseCurrencyInput(valueString) {
    if (!valueString) return 0;
    // Remove tudo que não é dígito ou vírgula
    let cleanString = valueString.replace(/[^\d,]/g, '').replace(',', '.');
    return parseFloat(cleanString) || 0;
}

/**
 * Retorna a data de hoje no formato YYYY-MM-DD (para inputs type="date")
 */
export function getTodayDateString() {
    return new Date().toISOString().split('T')[0];
}

/**
 * Retorna o horário atual no formato HH:MM
 */
export function getCurrentTime() {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
}

/**
 * Formata bytes para KB ou MB (usado no aviso de armazenamento)
 */
export function formatBytes(bytes) {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + " KB";
    else return (bytes / 1048576).toFixed(2) + " MB";
}