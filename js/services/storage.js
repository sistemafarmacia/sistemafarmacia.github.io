// js/services/storage.js
import { STORAGE_KEYS } from '../config.js';

export const StorageService = {
    // --- Funções Auxiliares (Internas) ---
    _getData(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (error) {
            console.error(`Erro ao ler dados de ${key}:`, error);
            return defaultValue;
        }
    },

    _saveData(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.error(`Erro ao salvar dados em ${key}:`, error);
            alert('Erro: O armazenamento local pode estar cheio.');
        }
    },

    // --- Vendas Pós-Fechamento ---
    getSales() {
        return this._getData(STORAGE_KEYS.POST_CLOSING, []);
    },
    saveSales(sales) {
        this._saveData(STORAGE_KEYS.POST_CLOSING, sales);
    },

    // --- Produtos Avulsos ---
    getLooseProducts() {
        return this._getData(STORAGE_KEYS.LOOSE_PRODUCTS, []);
    },
    saveLooseProducts(products) {
        this._saveData(STORAGE_KEYS.LOOSE_PRODUCTS, products);
    },

    // --- Operadores ---
    getOperators() {
        return this._getData(STORAGE_KEYS.OPERATORS, []);
    },
    saveOperators(operators) {
        this._saveData(STORAGE_KEYS.OPERATORS, operators);
    },

    // --- Sessões de Caixa (Histórico) ---
    getSessions() {
        return this._getData(STORAGE_KEYS.SESSIONS, []);
    },
    saveSessions(sessions) {
        this._saveData(STORAGE_KEYS.SESSIONS, sessions);
    },

    // --- Usuário Logado ---
    getLoggedInUser() {
        return this._getData(STORAGE_KEYS.USER, null);
    },
    setLoggedInUser(user) {
        this._saveData(STORAGE_KEYS.USER, user);
    },
    logout() {
        localStorage.removeItem(STORAGE_KEYS.USER);
    },

    // --- Configurações de Backup ---
    getBackupConfig() {
        return {
            enabled: this._getData(STORAGE_KEYS.AUTO_BACKUP_ENABLED, false),
            time: this._getData(STORAGE_KEYS.AUTO_BACKUP_TIME, '03:00')
        };
    },
    saveBackupConfig(enabled, time) {
        this._saveData(STORAGE_KEYS.AUTO_BACKUP_ENABLED, enabled);
        this._saveData(STORAGE_KEYS.AUTO_BACKUP_TIME, time);
    },

    // --- Maquininhas (Calculadora) ---
    getMaquininhaTypes() {
        return this._getData(STORAGE_KEYS.MAQUININHA_TYPES, []);
    },
    saveMaquininhaTypes(types) {
        this._saveData(STORAGE_KEYS.MAQUININHA_TYPES, types);
    },
    getMaquininhaValues() {
        return this._getData(STORAGE_KEYS.MAQUININHA_VALUES, {});
    },
    saveMaquininhaValues(values) {
        this._saveData(STORAGE_KEYS.MAQUININHA_VALUES, values);
    },

    // --- Gerenciamento Global ---
    clearAllData() {
        localStorage.clear();
    },
    
    // Calcula o espaço usado (funcionalidade que já existia no seu sistema)
    getStorageUsage() {
        let totalBytes = 0;
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                // Cálculo aproximado do tamanho em bytes
                totalBytes += (localStorage[key].length + key.length) * 2; 
            }
        }
        return totalBytes;
    }
};