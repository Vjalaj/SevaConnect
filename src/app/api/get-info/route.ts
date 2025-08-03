import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const infoPath = path.join(process.cwd(), 'INFO.env');
    const content = await fs.readFile(infoPath, 'utf8');
    
    const info: { [key: string]: string } = {};
    const lines = content.split('\n');
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [key, ...valueParts] = trimmed.split('=');
        const value = valueParts.join('=');
        info[key.trim()] = value.trim();
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      info: {
        title: info.ORGANIZATION_TITLE || '',
        location: info.ORGANIZATION_LOCATION || '',
        content: info.ORGANIZATION_CONTENT || ''
      }
    });
  } catch (error) {
    console.error('Error reading INFO.env:', error);
    return NextResponse.json({ success: false, error: 'Failed to read info' }, { status: 500 });
  }
}