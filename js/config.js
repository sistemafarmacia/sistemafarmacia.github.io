// js/config.js

export const ADMIN_CONFIG = {
    USERNAME: 'admin',
    PASSWORD: '5206',
    DEFAULT_BACKUP_PATH: 'C:\\Users\\SERVIDOR\\Desktop\\Auxiliar de Fechamento\\backup'
};

export const STORAGE_KEYS = {
    POST_CLOSING: 'postClosingSales',
    LOOSE_PRODUCTS: 'looseProducts',
    OPERATORS: 'operators',
    SESSIONS: 'cashRegisterSessions',
    USER: 'loggedInUser',
    // Configurações de Backup
    AUTO_BACKUP_ENABLED: 'autoBackupEnabled',
    AUTO_BACKUP_TIME: 'autoBackupTime',
    // Maquininhas
    MAQUININHA_TYPES: 'maquininhaTypes',
    MAQUININHA_VALUES: 'currentMaquininhaValues'
};

export const SYSTEM_DEFAULTS = {
    BACKUP_TIME: '03:00'
};