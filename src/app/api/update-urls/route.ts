import { NextRequest, NextResponse } from 'next/server';
import { updateURLEnv } from '@/lib/urlWriter';

export async function POST(request: NextRequest) {
  try {
    const urls = await request.json();
    
    // Update URL.env file
    const result = await updateURLEnv(urls);
    
    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in update-urls API:', error);
    return NextResponse.json({ success: false, error: 'Failed to update URLs' }, { status: 500 });
  }
}