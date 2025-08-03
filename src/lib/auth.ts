export const verifyAdmin = (email: string): boolean => {
  return email === process.env.ADMIN_EMAIL;
};

export const generateToken = (): string => {
  return btoa(Date.now() + Math.random().toString()).slice(0, 32);
};

export const isValidSession = (): boolean => {
  if (typeof window === 'undefined') return false;
  const token = localStorage.getItem("adminToken");
  const timestamp = localStorage.getItem("adminTimestamp");
  
  if (!token || !timestamp) return false;
  
  const sessionAge = Date.now() - parseInt(timestamp);
  return sessionAge < 24 * 60 * 60 * 1000; // 24 hours
};