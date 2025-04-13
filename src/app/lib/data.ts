import { Business } from '@/app/components/businesses/BusinessList';

// Mock data - replace with actual API call in production
export async function getBusinessById(id: string): Promise<Business | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));

  // Mock data
  const mockBusiness: Business = {
    id,
    name: 'Accra Retail Solutions',
    tin: 'GHA123456789',
    sector: 'Retail',
    complianceScore: {
      overall: 85,
      filing: 90,
      payment: 82,
      invoice: 88,
    },
    vatStatus: 'Filed',
    riskLevel: 'Low',
    lastTransactionDate: '2024-03-15',
    vatCollectedYTD: 2500000,
    location: 'Accra',
    registrationDate: '2023-01-15',
    address: '123 Independence Ave, Accra',
    contact: '+233 20 123 4567',
    businessType: 'Limited Liability',
    sizeClassification: 'Medium Enterprise',
    keyPersonnel: [
      { name: 'John Doe', role: 'CEO' },
      { name: 'Jane Smith', role: 'CFO' },
    ],
    complianceMetrics: {
      filingScore: 90,
      paymentScore: 82,
      invoiceScore: 88
    },
    monthlyMetrics: {
      transactionVolume: 1250,
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
    enforcementHistory: [
      {
        type: 'Audit',
        date: '2023-12-15',
        status: 'Completed',
        details: 'Routine compliance audit'
      }
    ]
  };

  return mockBusiness;
}

export async function getBusinesses(searchParams?: { [key: string]: string | string[] | undefined }): Promise<Business[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));

  let businesses: Business[] = [
    {
      id: '1',
      name: 'Acme Corporation',
      tin: 'TIN123456789',
      sector: 'Manufacturing',
      complianceScore: {
        overall: 85,
        filing: 90,
        payment: 80,
        invoice: 85
      },
      vatStatus: 'Filed',
      riskLevel: 'Low',
      lastTransactionDate: '2024-03-15',
      vatCollectedYTD: 1500000,
      location: 'Accra',
      registrationDate: '2020-01-15',
      address: '123 Industrial Area, Accra',
      contact: '+233 24 123 4567',
      businessType: 'Limited Liability',
      sizeClassification: 'Large',
      keyPersonnel: [
        { name: 'John Doe', role: 'CEO' },
        { name: 'Jane Smith', role: 'Finance Director' }
      ],
      complianceMetrics: {
        filingScore: 90,
        paymentScore: 80,
        invoiceScore: 85
      },
      monthlyMetrics: {
        transactionVolume: 500,
        averageInvoiceValue: 3000,
        dailyVatCollection: 50000,
        unusualFlags: 2
      },
      creditAssessment: {
        paymentReliability: 90,
        sustainability: 85,
        financialHealth: 88,
        trustScore: 87
      },
      enforcementHistory: [
        {
          type: 'Audit',
          date: '2023-06-15',
          status: 'Completed',
          details: 'Routine compliance audit'
        }
      ]
    },
    {
      id: '2',
      name: 'Tech Solutions Ltd',
      tin: 'TIN987654321',
      sector: 'Technology',
      complianceScore: {
        overall: 70,
        filing: 75,
        payment: 65,
        invoice: 70
      },
      vatStatus: 'Pending',
      riskLevel: 'Medium',
      lastTransactionDate: '2024-03-10',
      vatCollectedYTD: 800000,
      location: 'Kumasi',
      registrationDate: '2021-05-20',
      address: '456 Tech Park, Kumasi',
      contact: '+233 24 765 4321',
      businessType: 'Limited Liability',
      sizeClassification: 'Medium',
      keyPersonnel: [
        { name: 'Michael Brown', role: 'Managing Director' },
        { name: 'Sarah Johnson', role: 'Operations Manager' }
      ],
      complianceMetrics: {
        filingScore: 75,
        paymentScore: 65,
        invoiceScore: 70
      },
      monthlyMetrics: {
        transactionVolume: 300,
        averageInvoiceValue: 2500,
        dailyVatCollection: 30000,
        unusualFlags: 5
      },
      creditAssessment: {
        paymentReliability: 75,
        sustainability: 70,
        financialHealth: 72,
        trustScore: 70
      },
      enforcementHistory: [
        {
          type: 'Notice',
          date: '2023-12-01',
          status: 'Resolved',
          details: 'Late filing warning'
        }
      ]
    },
    {
      id: '3',
      name: 'Global Trading Co',
      tin: 'TIN456789123',
      sector: 'Retail',
      complianceScore: {
        overall: 60,
        filing: 55,
        payment: 65,
        invoice: 60
      },
      vatStatus: 'Overdue',
      riskLevel: 'High',
      lastTransactionDate: '2024-02-28',
      vatCollectedYTD: 500000,
      location: 'Tema',
      registrationDate: '2019-11-10',
      address: '789 Market Square, Tema',
      contact: '+233 24 456 7890',
      businessType: 'Limited Liability',
      sizeClassification: 'Medium',
      keyPersonnel: [
        { name: 'David Wilson', role: 'General Manager' },
        { name: 'Emily Davis', role: 'Finance Controller' }
      ],
      complianceMetrics: {
        filingScore: 55,
        paymentScore: 65,
        invoiceScore: 60
      },
      monthlyMetrics: {
        transactionVolume: 200,
        averageInvoiceValue: 2000,
        dailyVatCollection: 20000,
        unusualFlags: 8
      },
      creditAssessment: {
        paymentReliability: 60,
        sustainability: 55,
        financialHealth: 58,
        trustScore: 55
      },
      enforcementHistory: [
        {
          type: 'Penalty',
          date: '2024-01-15',
          status: 'Pending',
          details: 'Late payment penalty'
        }
      ]
    }
  ];

  // Apply filters if searchParams exist
  if (searchParams) {
    if (searchParams.sector) {
      businesses = businesses.filter(b => b.sector === searchParams.sector);
    }
    if (searchParams.location) {
      businesses = businesses.filter(b => b.location === searchParams.location);
    }
    if (searchParams.riskLevel) {
      businesses = businesses.filter(b => b.riskLevel === searchParams.riskLevel);
    }
    if (searchParams.vatStatus) {
      businesses = businesses.filter(b => b.vatStatus === searchParams.vatStatus);
    }
  }

  return businesses;
} 