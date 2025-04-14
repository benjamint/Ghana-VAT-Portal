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
      name: 'Melcom Group',
      tin: 'GHA123456789',
      sector: 'Retail',
      complianceScore: {
        overall: 92,
        filing: 95,
        payment: 90,
        invoice: 91
      },
      vatStatus: 'Filed',
      riskLevel: 'Low',
      lastTransactionDate: '2024-03-15',
      vatCollectedYTD: 2500000,
      location: 'Accra',
      registrationDate: '1989-01-15',
      address: 'North Industrial Area, Accra',
      contact: '+233 30 222 3333',
      businessType: 'Limited Liability',
      sizeClassification: 'Large',
      keyPersonnel: [
        { name: 'Bhagwan Khubchandani', role: 'Group Chairman' },
        { name: 'Godwin Avenorgbo', role: 'Director of Communications' }
      ],
      complianceMetrics: {
        filingScore: 95,
        paymentScore: 90,
        invoiceScore: 91
      },
      monthlyMetrics: {
        transactionVolume: 850,
        averageInvoiceValue: 5000,
        dailyVatCollection: 75000,
        unusualFlags: 1
      },
      creditAssessment: {
        paymentReliability: 95,
        sustainability: 92,
        financialHealth: 94,
        trustScore: 93
      },
      enforcementHistory: [
        {
          type: 'Audit',
          date: '2023-12-15',
          status: 'Completed',
          details: 'Annual compliance audit'
        }
      ]
    },
    {
      id: '2',
      name: 'Despite Group of Companies',
      tin: 'GHA987654321',
      sector: 'Media & Entertainment',
      complianceScore: {
        overall: 88,
        filing: 90,
        payment: 85,
        invoice: 89
      },
      vatStatus: 'Filed',
      riskLevel: 'Low',
      lastTransactionDate: '2024-03-14',
      vatCollectedYTD: 1800000,
      location: 'Accra',
      registrationDate: '1999-05-20',
      address: 'Abeka Junction, Accra',
      contact: '+233 30 224 4444',
      businessType: 'Limited Liability',
      sizeClassification: 'Large',
      keyPersonnel: [
        { name: 'Osei Kwame Despite', role: 'CEO' },
        { name: 'Ernest Ofori Sarpong', role: 'Business Development Director' }
      ],
      complianceMetrics: {
        filingScore: 90,
        paymentScore: 85,
        invoiceScore: 89
      },
      monthlyMetrics: {
        transactionVolume: 600,
        averageInvoiceValue: 4500,
        dailyVatCollection: 60000,
        unusualFlags: 2
      },
      creditAssessment: {
        paymentReliability: 88,
        sustainability: 90,
        financialHealth: 89,
        trustScore: 89
      },
      enforcementHistory: [
        {
          type: 'Review',
          date: '2024-01-15',
          status: 'Completed',
          details: 'Quarterly compliance review'
        }
      ]
    },
    {
      id: '3',
      name: 'Kantanka Group',
      tin: 'GHA456789123',
      sector: 'Manufacturing',
      complianceScore: {
        overall: 75,
        filing: 80,
        payment: 70,
        invoice: 75
      },
      vatStatus: 'Pending',
      riskLevel: 'Medium',
      lastTransactionDate: '2024-03-10',
      vatCollectedYTD: 900000,
      location: 'Gomoa Mpota',
      registrationDate: '1994-11-10',
      address: 'Gomoa Mpota, Central Region',
      contact: '+233 30 225 5555',
      businessType: 'Limited Liability',
      sizeClassification: 'Large',
      keyPersonnel: [
        { name: 'Kwadwo Safo Kantanka', role: 'CEO' },
        { name: 'Kwadwo Safo Kantanka Jr', role: 'COO' }
      ],
      complianceMetrics: {
        filingScore: 80,
        paymentScore: 70,
        invoiceScore: 75
      },
      monthlyMetrics: {
        transactionVolume: 400,
        averageInvoiceValue: 3500,
        dailyVatCollection: 45000,
        unusualFlags: 4
      },
      creditAssessment: {
        paymentReliability: 75,
        sustainability: 78,
        financialHealth: 76,
        trustScore: 76
      },
      enforcementHistory: [
        {
          type: 'Notice',
          date: '2024-02-15',
          status: 'Pending',
          details: 'Filing deadline reminder'
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