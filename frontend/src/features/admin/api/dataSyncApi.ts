import axios from 'axios';

const API_URL = 'http://localhost:3001/api/admin/sync';

export interface SyncStatus {
    lastSyncTime: string;
    collections: {
        [key: string]: {
            count: number;
            type: string;
        };
    };
}

/**
 * Get all data from the database
 */
export const getAllData = async () => {
    const response = await axios.get(`${API_URL}/data`);
    return response.data;
};

/**
 * Export database as JSON
 */
export const exportData = async () => {
    const response = await axios.post(`${API_URL}/export`);
    return response.data;
};

/**
 * Import/sync data from external source
 */
export const importData = async (data: any) => {
    const response = await axios.post(`${API_URL}/import`, data);
    return response.data;
};

/**
 * Backup the current database
 */
export const backupDatabase = async () => {
    const response = await axios.post(`${API_URL}/backup`);
    return response.data;
};

/**
 * Get sync status and statistics
 */
export const getSyncStatus = async (): Promise<SyncStatus> => {
    const response = await axios.get<SyncStatus>(`${API_URL}/status`);
    return response.data;
};
