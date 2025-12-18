// js/modules/admin.js
import { StorageService } from '../services/storage.js';
import { AuthService } from '../services/auth.js';
import { UIService } from './ui.js';

export const AdminModule = {
    // --- Gestão de Operadores ---
    addOperator(name) {
        if (!AuthService.isAdmin()) return;
        const operators = StorageService.getOperators();
        
        if (operators.some(op => op.name.toLowerCase() === name.toLowerCase())) {
            alert('Este operador já existe!');
            return;
        }

        operators.push({ id: Date.now(), name: name });
        StorageService.saveOperators(operators);
        this.renderOperatorsList();
    },

    removeOperator(id) {
        if (!confirm('Tem certeza que deseja remover este operador?')) return;
        let operators = StorageService.getOperators();
        operators = operators.filter(op => op.id !== id);
        StorageService.saveOperators(operators);
        this.renderOperatorsList();
    },

    renderOperatorsList() {
        const listElement = document.getElementById('operatorsList'); // ID do seu HTML
        if (!listElement) return;

        const operators = StorageService.getOperators();
        listElement.innerHTML = operators.map(op => `
            <div class="flex justify-between items-center p-2 border-b">
                <span>${op.name}</span>
                <button class="text-red-500" onclick="AdminModule.removeOperator(${op.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    },

    // --- Backup e Dados ---
    exportBackup() {
        const data = {
            sales: StorageService.getSales(),
            operators: StorageService.getOperators(),
            sessions: StorageService.getSessions(),
            backupDate: new Date().toISOString()
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `backup_sistema_${new Date().toLocaleDateString('pt-BR')}.json`;
        a.click();
    },

    clearSystem() {
        if (confirm('AVISO CRÍTICO: Isto apagará todos os dados permanentemente. Deseja continuar?')) {
            this.exportBackup(); // Força um backup antes de apagar
            StorageService.clearAllData();
            alert('Sistema resetado com sucesso.');
            window.location.reload();
        }
    }
};