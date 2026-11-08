# Payment Gateway SDK

A simple payment gateway proof of concept built with NestJS, TypeScript, Prisma, SQLite, and JavaScript SDK.

## Features

- Create payment requests
- Generate unique payment authorities
- Store payment records in SQLite
- Simulate successful and failed payments
- Gateway and callback pages
- Verify payment status through API
- API Key authentication
- JavaScript SDK for merchants

## Tech Stack

- Backend: NestJS
- Language: TypeScript
- Database: SQLite
- ORM: Prisma
- SDK: JavaScript / TypeScript
- Frontend: HTML, Tailwind CSS, Vanilla JavaScript

## Project Structure

```text
payment-getway-sdk/
├── apps/
│   ├── api/
│   │   ├── prisma/
│   │   └── src/
│   └── demo/
│       ├── gateway.html
│       ├── callback.html
│       └── index.html
├── packages/
│   └── payment-sdk/
│       ├── src/
│       └── dist/
└── package.json
```

## Installation

```bash
npm install
```

Configure `apps/api/.env`:

```env
DATABASE_URL="file:./dev.db"
API_KEY="test_merchant_key_123456"
```

## Run Backend

```bash
npm run dev:api
```

Backend URL:

```text
http://localhost:3000
```

## Build SDK

```bash
npm run build --workspace=@payment-gateway/sdk
```

## SDK Usage

```javascript
import { PaymentGateway } from "../../packages/payment-sdk/dist/index.js";

const sdk = new PaymentGateway({
  apiUrl: "http://localhost:3000",
  apiKey: "YOUR_TEST_API_KEY",
});

const payment = await sdk.createPayment({
  amount: 500000,
  orderId: "ORDER-1001",
  callbackUrl: "https://example.com/callback",
});

window.location.href = payment.paymentUrl;
```

## API Endpoints

| Method | Endpoint                        | Description             |
| ------ | ------------------------------- | ----------------------- |
| GET    | `/payments/status`              | API and database status |
| POST   | `/payments`                     | Create payment          |
| GET    | `/payments/:authority`          | Get payment details     |
| GET    | `/payments/:authority/verify`   | Verify payment          |
| POST   | `/payments/:authority/simulate` | Simulate payment result |
| GET    | `/gateway/:authority`           | Payment gateway page    |
| GET    | `/callback`                     | Payment result page     |

Protected endpoints require:

```http
x-api-key: YOUR_TEST_API_KEY
```

## Payment Flow

1. Merchant requests a payment using the SDK.
2. Backend validates the request.
3. A unique authority is generated.
4. Payment is saved with `PENDING` status.
5. Merchant redirects the customer to the payment gateway.
6. Customer completes the simulated payment.
7. Backend updates the payment status.
8. Customer is redirected to the callback page.
9. Merchant verifies the payment using the authority.

## Payment Statuses

- `PENDING`
- `SUCCESS`
- `FAILED`

## Important Notes

This project is a Proof of Concept (POC).

Payments are simulated and are not connected to a real banking network.

The test API Key must not be treated as a production secret. A production implementation requires secure merchant authentication, server-side SDK usage, real bank integration, and additional security controls.
