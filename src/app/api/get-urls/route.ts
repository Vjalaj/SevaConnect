import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
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
    
    console.log('URLs loaded from URL.env:', urls);
    return NextResponse.json({ success: true, urls });
  } catch (error) {
    console.error('Error reading URL.env:', error);
    return NextResponse.json({ success: false, error: 'Failed to read URLs' }, { status: 500 });
  }
}