import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { title, location, content } = await request.json();
    
    const infoPath = path.join(process.cwd(), 'INFO.env');
    
    let fileContent = '# Organization Information - Admin configurable\n';
    fileContent += `ORGANIZATION_TITLE=${title || ''}\n`;
    fileContent += `ORGANIZATION_LOCATION=${location || ''}\n`;
    fileContent += `ORGANIZATION_CONTENT=${content || ''}`;
    
    await fs.writeFile(infoPath, fileContent, 'utf8');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating INFO.env:', error);
    return NextResponse.json({ success: false, error: 'Failed to update info' }, { status: 500 });
  }
}