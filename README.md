# Ghana VAT Portal

A modern web application for managing VAT collection and compliance in Ghana.

## Features

- Modern, responsive dashboard with key metrics
- Real-time transaction monitoring
- Business compliance tracking
- E-invoice management
- Revenue analytics and reporting
- Dark/light mode support

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Chakra UI
- Recharts for data visualization
- React Hot Toast for notifications

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/your-org/ghana-vat-portal.git
cd ghana-vat-portal
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file and add your environment variables:
```env
NEXT_PUBLIC_API_URL=your_api_url
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── dashboard/         # Dashboard page
│   ├── transactions/      # Transactions page
│   ├── businesses/        # Businesses page
│   ├── invoicing/         # Invoicing page
│   ├── accounting/        # Accounting page
│   └── settings/          # Settings page
├── components/            # Reusable components
│   ├── layout/           # Layout components
│   ├── charts/           # Chart components
│   └── ui/               # UI components
├── lib/                  # Utility functions and hooks
└── types/                # TypeScript type definitions
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 