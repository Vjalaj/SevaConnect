import { NextRequest, NextResponse } from 'next/server';
import { InstamojoService } from '@/lib/instamojo';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, name, email, purpose, phone } = body;

    if (!amount || !name || !email || !purpose) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const instamojo = new InstamojoService();
    const redirectUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:9002'}/payment/success`;

    const paymentRequest = await instamojo.createPaymentRequest({
      purpose,
      amount: amount.toString(),
      buyer_name: name,
      email,
      phone,
      redirect_url: redirectUrl,
    });

    if (paymentRequest.success && paymentRequest.payment_request) {
      return NextResponse.json({
        success: true,
        payment_url: paymentRequest.payment_request.longurl,
        payment_id: paymentRequest.payment_request.id,
      });
    } else {
      return NextResponse.json(
        { success: false, message: paymentRequest.message || 'Payment creation failed' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Payment API error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}