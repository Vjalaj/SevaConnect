interface InstamojoPaymentRequest {
  purpose: string;
  amount: string;
  buyer_name: string;
  email: string;
  phone?: string;
  redirect_url: string;
  webhook?: string;
}

interface InstamojoResponse {
  success: boolean;
  payment_request?: {
    id: string;
    longurl: string;
    shorturl: string;
  };
  message?: string;
}

export class InstamojoService {
  private apiKey: string;
  private authToken: string;
  private endpoint: string;

  constructor() {
    this.apiKey = process.env.INSTAMOJO_API_KEY || '';
    this.authToken = process.env.INSTAMOJO_AUTH_TOKEN || '';
    this.endpoint = process.env.INSTAMOJO_ENDPOINT || 'https://test.instamojo.com/api/1.1/';
  }

  async createPaymentRequest(data: InstamojoPaymentRequest): Promise<InstamojoResponse> {
    try {
      const response = await fetch(`${this.endpoint}payment-requests/`, {
        method: 'POST',
        headers: {
          'X-Api-Key': this.apiKey,
          'X-Auth-Token': this.authToken,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          purpose: data.purpose,
          amount: data.amount,
          buyer_name: data.buyer_name,
          email: data.email,
          phone: data.phone || '',
          redirect_url: data.redirect_url,
          webhook: data.webhook || '',
          allow_repeated_payments: 'false',
        }),
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        return {
          success: true,
          payment_request: result.payment_request,
        };
      } else {
        return {
          success: false,
          message: result.message || 'Payment request failed',
        };
      }
    } catch (error) {
      return {
        success: false,
        message: 'Network error occurred',
      };
    }
  }

  async getPaymentStatus(paymentId: string) {
    try {
      const response = await fetch(`${this.endpoint}payments/${paymentId}/`, {
        headers: {
          'X-Api-Key': this.apiKey,
          'X-Auth-Token': this.authToken,
        },
      });

      return await response.json();
    } catch (error) {
      return { success: false, message: 'Failed to get payment status' };
    }
  }
}