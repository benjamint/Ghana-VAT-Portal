interface Business {
  id: string;
  name: string;
  type: string;
  location: string;
  tin: string;
  registrationDate: string;
  sizeClassification: string;
  address: string;
  contact: string;
  keyPersonnel: Array<{
    name: string;
    role: string;
  }>;
  complianceScore: {
    overall: number;
    filing: number;
    payment: number;
    invoice: number;
  };
  transactionMetrics: {
    monthlyVolume: number;
    averageInvoiceValue: number;
    dailyVatCollection: number;
    unusualFlags: number;
  };
  creditAssessment: {
    paymentReliability: number;
    sustainability: number;
    financialHealth: number;
    trustScore: number;
  };
}

// Mock data - replace with actual API call in production
export async function getBusinessById(id: string): Promise<Business | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));

  // Mock data
  const mockBusiness: Business = {
    id,
    name: 'Accra Retail Solutions',
    type: 'Retail',
    location: 'Accra',
    tin: 'GHA123456789',
    registrationDate: 'January 15, 2023',
    sizeClassification: 'Medium Enterprise',
    address: '123 Independence Ave, Accra',
    contact: '+233 20 123 4567',
    keyPersonnel: [
      { name: 'John Doe', role: 'CEO' },
      { name: 'Jane Smith', role: 'CFO' },
    ],
    complianceScore: {
      overall: 85,
      filing: 90,
      payment: 82,
      invoice: 88,
    },
    transactionMetrics: {
      monthlyVolume: 1250,
      averageInvoiceValue: 850,
      dailyVatCollection: 2500,
      unusualFlags: 2,
    },
    creditAssessment: {
      paymentReliability: 88,
      sustainability: 85,
      financialHealth: 82,
      trustScore: 86,
    },
  };

  return mockBusiness;
} 