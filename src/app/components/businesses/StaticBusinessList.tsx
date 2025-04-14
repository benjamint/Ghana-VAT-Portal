import React from 'react';
import Link from 'next/link';

export interface Business {
  id: string;
  name: string;
  tin: string;
  sector: string;
  complianceScore: {
    overall: number;
    filing: number;
    payment: number;
    invoice: number;
  };
  vatStatus: 'Filed' | 'Pending' | 'Overdue';
  riskLevel: 'Low' | 'Medium' | 'High';
  lastTransactionDate: string;
  vatCollectedYTD: number;
  location: string;
}

interface BusinessListProps {
  businesses: Business[];
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
    minimumFractionDigits: 2,
  }).format(amount);
};

export default function StaticBusinessList({ businesses }: BusinessListProps) {
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
      <div style={{ padding: '1.5rem' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ minWidth: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>Business</th>
                <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>Location</th>
                <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>VAT Collected YTD</th>
                <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {businesses.map((business) => (
                <Link 
                  key={business.id}
                  href={`/businesses/${business.id}`}
                  className="block hover:bg-gray-50 transition-colors duration-200"
                  style={{ textDecoration: 'none', cursor: 'pointer' }}
                >
                  <tr style={{ 
                    borderBottom: '1px solid #e5e7eb',
                  }}>
                    <td style={{ padding: '1rem 1.5rem', whiteSpace: 'nowrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ 
                          width: '2.5rem', 
                          height: '2.5rem', 
                          backgroundColor: '#f3f4f6', 
                          borderRadius: '0.375rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          B
                        </div>
                        <div style={{ marginLeft: '1rem' }}>
                          <div style={{ fontSize: '0.875rem', fontWeight: '500', color: '#111827' }}>{business.name}</div>
                          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>TIN: {business.tin}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.875rem', color: '#374151' }}>{business.location}</span>
                      </div>
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <div style={{ fontSize: '0.875rem', color: '#111827' }}>
                        {formatCurrency(business.vatCollectedYTD)}
                      </div>
                    </td>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        backgroundColor: business.vatStatus === 'Filed' ? '#dcfce7' : business.vatStatus === 'Pending' ? '#fef9c3' : '#fee2e2',
                        color: business.vatStatus === 'Filed' ? '#166534' : business.vatStatus === 'Pending' ? '#854d0e' : '#991b1b'
                      }}>
                        {business.vatStatus}
                      </span>
                    </td>
                  </tr>
                </Link>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 