export interface PaymentConfig {
  apiUrl: string;
  apiKey: string;
}

export interface CreatePaymentOptions {
  amount: number;
  orderId: string;
  callbackUrl: string;
}

export interface PaymentResponse {
  message: string;
  authority: string;
  amount: number;
  status: string;
  paymentUrl: string;
}

export interface VerifyPaymentResponse {
  verified: boolean;
  authority: string;
  amount: number;
  orderId: string;
  status: string;
}

export class PaymentGateway {
  private apiUrl: string;
  private apiKey: string;

  constructor(config: PaymentConfig) {
    this.apiUrl = config.apiUrl.replace(/\/$/, "");
    this.apiKey = config.apiKey;
  }

  async createPayment(options: CreatePaymentOptions): Promise<PaymentResponse> {
    const response = await fetch(`${this.apiUrl}/payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
      },
      body: JSON.stringify(options),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to create payment");
    }

    return result as PaymentResponse;
  }

  async verifyPayment(authority: string): Promise<VerifyPaymentResponse> {
    const response = await fetch(
      `${this.apiUrl}/payments/${encodeURIComponent(authority)}/verify`,
      {
        headers: {
          "x-api-key": this.apiKey,
        },
      },
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Payment verification failed");
    }

    return result as VerifyPaymentResponse;
  }
}
