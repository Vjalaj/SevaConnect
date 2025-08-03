// URL configuration - reads from localStorage (managed by admin)
export const getUrlConfig = (): { [key: string]: string } => {
  if (typeof window === 'undefined') return {};
  
  const saved = localStorage.getItem("urlConfig");
  console.log('localStorage urlConfig:', saved);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      console.log('Parsed urlConfig:', parsed);
      return parsed;
    } catch {
      return {};
    }
  }
  return {};
};

export const getImageUrl = (categoryId: string): string => {
  const urlConfig = getUrlConfig();
  const mapping: { [key: string]: string } = {
    'orphanage': 'ORPHANAGE_IMAGE_URL',
    'gowshala': 'GOWSHALA_IMAGE_URL', 
    'vridha_ashram': 'VRIDHA_ASHRAM_IMAGE_URL',
    'health_general': 'HEALTH_GENERAL_IMAGE_URL',
    'health_samuhik_vivah': 'HEALTH_SAMUHIK_VIVAH_IMAGE_URL',
    'pooja_path': 'POOJA_PATH_IMAGE_URL',
    'eye_camp': 'EYE_CAMP_IMAGE_URL',
    'environmental': 'ENVIRONMENTAL_IMAGE_URL'
  };
  
  const urlKey = mapping[categoryId];
  if (!urlKey) return '';
  
  const imageUrl = urlConfig[urlKey] || '';
  console.log(`getImageUrl(${categoryId}): key=${urlKey}, url=${imageUrl}`);
  
  return imageUrl;
};

export const getLocationUrl = (): string => {
  const urlConfig = getUrlConfig();
  return urlConfig['ORGANIZATION_LOCATION_URL'] || '';
};