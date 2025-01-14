import fs from 'node:fs/promises';

export const createDirIfNotExists = async (url) => {
    try {
        await fs.access(url);
    } catch (err) {
        if (err.code === 'ENONT') {
            await fs.mkdir(url);
        }
    }
};