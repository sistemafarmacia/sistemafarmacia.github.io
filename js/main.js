// js/main.js
import { AuthService } from './services/auth.js';
import { UIService, setupEventListeners } from './modules/ui.js';
import { getTodayDateString } from './utils.js';

/**
 * Função principal que inicializa a aplicação
 */
function initApp() {
    console.log("Sistema de Auxiliar de Fechamento Inicializado");

    // 1. Configura os ouvintes de eventos (Cliques em botões, submissão de formulários)
    setupEventListeners();

    // 2. Verifica se o utilizador já está logado (Sessão persistente)
    const user = AuthService.getCurrentUser();

    if (user) {
        // Se estiver logado, mostra o ecrã principal e atualiza a interface
        UIService.switchModule('mainModule');
        UIService.updateUserHeader();
        UIService.refreshPermissions();
        UIService.updateStorageDisplay();
    } else {
        // Se não, força a exibição do ecrã de login
        UIService.switchModule('loginModule');
    }

    // 3. Preenche datas padrão nos inputs (como no seu código original)
    const today = getTodayDateString();
    const dateInputs = [
        'reportPostClosingStartDate', 'reportPostClosingEndDate',
        'reportLooseProductStartDate', 'reportLooseProductEndDate',
        'historyStartDate', 'historyEndDate',
        'reportGeneralStartDate', 'reportGeneralEndDate'
    ];

    dateInputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = today;
    });

    // 4. Configura horários padrão
    const startTimeEl = document.getElementById('reportLooseProductStartTime');
    const endTimeEl = document.getElementById('reportLooseProductEndTime');
    if (startTimeEl) startTimeEl.value = '00:00';
    if (endTimeEl) endTimeEl.value = '23:59';
}

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initApp);