// js/modules/ui.js
import { AuthService } from '../services/auth.js';
import { StorageService } from '../services/storage.js';
import { CalculatorModule } from './calculator.js';
import { formatBytes, formatCurrency } from '../utils.js';

export const UIService = {
    // Alternar entre abas/módulos
    switchModule(moduleId) {
        const modules = ['loginModule', 'mainModule', 'adminModule', 'calculatorModule'];
        modules.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.add('hidden');
        });

        const target = document.getElementById(moduleId);
        if (target) target.classList.remove('hidden');
        
        // Se mudar para o módulo principal, garante que as abas internas apareçam
        if(moduleId === 'mainModule') {
            this.updateUserHeader();
            this.refreshPermissions();
        }
    },

    updateUserHeader() {
        const user = AuthService.getCurrentUser();
        const display = document.getElementById('loggedInUserDisplay');
        const logoutBtn = document.getElementById('logoutBtn');

        if (user && display) {
            display.textContent = `Olá, ${user.username}`;
            display.classList.remove('hidden');
            if (logoutBtn) logoutBtn.classList.remove('hidden');
        }
    },

    refreshPermissions() {
        const isAdmin = AuthService.isAdmin();
        const adminTab = document.getElementById('tabAdmin');
        if (adminTab) {
            isAdmin ? adminTab.classList.remove('hidden') : adminTab.classList.add('hidden');
        }
    },

    updateStorageDisplay() {
        const display = document.getElementById('storageUsageDisplay');
        if (display) {
            const bytes = StorageService.getStorageUsage();
            display.textContent = `Uso total: ${formatBytes(bytes)}`;
        }
    },

    // Renderiza os resultados da calculadora na tela
    displayCalculatorResults(res) {
        const output = document.getElementById('calculatorResult'); // ID baseado no seu HTML
        if (!output) return;

        output.innerHTML = `
            <div class="p-4 bg-blue-50 rounded-lg space-y-2">
                <p>Total Cartões: <strong>${formatCurrency(res.cartaoTotal)}</strong></p>
                <p>Pix Loja: <strong>${formatCurrency(res.pixLoja)}</strong></p>
                <p>Dinheiro em Espécie: <strong>${formatCurrency(res.dinheiroLoja)}</strong></p>
                <hr>
                <p>Total Sangrias: <strong class="text-red-600">-${formatCurrency(res.sangriasTotal)}</strong></p>
                <p>Dinheiro Líquido (Gaveta): <strong class="text-green-600">${formatCurrency(res.dinheiroLiquido)}</strong></p>
                <p class="text-lg font-bold">Faturamento Total: ${formatCurrency(res.faturamentoTotal)}</p>
            </div>
        `;
    }
};

// --- Configuração de Cliques (Event Listeners) ---
export function setupEventListeners() {
    // 1. Botão de Login
    document.getElementById('loginBtn')?.addEventListener('click', () => {
        const user = document.getElementById('usernameInput').value;
        const pass = document.getElementById('passwordInput').value;
        if (AuthService.login(user, pass)) {
            UIService.switchModule('mainModule');
        } else {
            alert('Usuário ou senha inválidos');
        }
    });

    // 2. Botão de Logout
    document.getElementById('logoutBtn')?.addEventListener('click', () => {
        AuthService.logout();
    });

    // 3. Calculadora: Adicionar Sangria
    document.getElementById('btnAddSangria')?.addEventListener('click', () => {
        CalculatorModule.addSangriaField();
    });

    // 4. Calculadora: Calcular Tudo
    document.getElementById('btnCalcularFechamento')?.addEventListener('click', () => {
        const resultados = CalculatorModule.processFullClosure();
        UIService.displayCalculatorResults(resultados);
    });

    // 5. Navegação de Abas (usando os IDs do seu HTML)
    document.querySelectorAll('[id^="tab"]').forEach(tab => {
        tab.addEventListener('click', (e) => {
            const id = e.target.id;
            if (id === 'tabAdmin') UIService.switchModule('adminModule');
            if (id === 'tabCalculator') UIService.switchModule('calculatorModule');
            // ... adicionar as outras conforme necessário
        });

// SEÇÃO ADMIN BOTOES

// Botão de Exportar Backup
document.getElementById('exportBackupBtn')?.addEventListener('click', () => {
    AdminModule.exportBackup();
});

// Botão de Adicionar Operador
document.getElementById('addOperatorBtn')?.addEventListener('click', () => {
    const input = document.getElementById('newOperatorName');
    if (input.value.trim()) {
        AdminModule.addOperator(input.value.trim());
        input.value = '';
    }
});

// Botão de Limpar Tudo
document.getElementById('clearAllDataBtn')?.addEventListener('click', () => {
    AdminModule.clearSystem();
});
    });
}