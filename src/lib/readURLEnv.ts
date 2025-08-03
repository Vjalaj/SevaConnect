// Read URLs from URL.env file
import { promises as fs } from 'fs';
import path from 'path';

export const readURLEnv = async (): Promise<{ [key: string]: string }> => {
  try {
    const envPath = path.join(process.cwd(), 'URL.env');
    const content = await fs.readFile(envPath, 'utf8');
    
    const urls: { [key: string]: string } = {};
    const lines = content.split('\n');
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [key, ...valueParts] = trimmed.split('=');
        const value = valueParts.join('=');
        urls[key.trim()] = value.trim();
      }
    }
    
    return urls;
  } catch (error) {
    console.error('Error reading URL.env:', error);
    // Return empty object if file doesn't exist
    return {};
  }
};