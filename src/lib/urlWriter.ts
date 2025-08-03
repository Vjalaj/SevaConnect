// URL Writer - Updates URL.env file (Node.js only)
import { promises as fs } from 'fs';
import path from 'path';

export const updateURLEnv = async (urls: { [key: string]: string }) => {
  try {
    const envPath = path.join(process.cwd(), 'URL.env');
    
    let content = '# Category Image URLs - Admin can modify these\n';
    content += `ORPHANAGE_IMAGE_URL=${urls.ORPHANAGE_IMAGE_URL || ''}\n`;
    content += `GOWSHALA_IMAGE_URL=${urls.GOWSHALA_IMAGE_URL || ''}\n`;
    content += `VRIDHA_ASHRAM_IMAGE_URL=${urls.VRIDHA_ASHRAM_IMAGE_URL || ''}\n`;
    content += `HEALTH_GENERAL_IMAGE_URL=${urls.HEALTH_GENERAL_IMAGE_URL || ''}\n`;
    content += `HEALTH_SAMUHIK_VIVAH_IMAGE_URL=${urls.HEALTH_SAMUHIK_VIVAH_IMAGE_URL || ''}\n`;
    content += `POOJA_PATH_IMAGE_URL=${urls.POOJA_PATH_IMAGE_URL || ''}\n`;
    content += `EYE_CAMP_IMAGE_URL=${urls.EYE_CAMP_IMAGE_URL || ''}\n`;
    content += `ENVIRONMENTAL_IMAGE_URL=${urls.ENVIRONMENTAL_IMAGE_URL || ''}\n\n`;
    content += '# Organization Info URLs\n';
    content += `ORGANIZATION_LOCATION_URL=${urls.ORGANIZATION_LOCATION_URL || ''}\n`;
    content += `ORGANIZATION_WEBSITE_URL=${urls.ORGANIZATION_WEBSITE_URL || ''}\n`;
    
    await fs.writeFile(envPath, content, 'utf8');
    return { success: true };
  } catch (error) {
    console.error('Error updating URL.env:', error);
    return { success: false, error: error.message };
  }
};