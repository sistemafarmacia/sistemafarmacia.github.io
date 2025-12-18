// js/services/auth.js
import { ADMIN_CONFIG } from '../config.js';
import { StorageService } from './storage.js';

export const AuthService = {
    /**
     * Tenta realizar o login
     * @param {string} username 
     * @param {string} password 
     * @returns {Object|null} Retorna o usuário se sucesso, ou null se falhar
     */
    login(username, password) {
        let user = null;

        // Verifica se é admin
        if (username === ADMIN_CONFIG.USERNAME && password === ADMIN_CONFIG.PASSWORD) {
            user = { username: 'Administrador', role: 'admin' };
        } else {
            // Verifica se é um operador cadastrado
            const operators = StorageService.getOperators();
            const operator = operators.find(op => op.name.toLowerCase() === username.toLowerCase());
            
            if (operator) {
                user = { username: operator.name, role: 'operator' };
            }
        }

        if (user) {
            StorageService.setLoggedInUser(user);
            return user;
        }

        return null;
    },

    /**
     * Remove a sessão atual
     */
    logout() {
        StorageService.logout();
        // Recarrega a página para resetar o estado da UI de forma segura
        window.location.reload();
    },

    /**
     * Retorna o usuário logado no momento
     */
    getCurrentUser() {
        return StorageService.getLoggedInUser();
    },

    /**
     * Verifica se o usuário atual tem permissão de administrador
     */
    isAdmin() {
        const user = this.getCurrentUser();
        return user && user.role === 'admin';
    },

    /**
     * Verifica se existe alguém logado
     */
    isAuthenticated() {
        return this.getCurrentUser() !== null;
    }
};