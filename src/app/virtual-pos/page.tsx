'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface TaxBreakdown {
  subtotal: number;
  vat: number;
  nhil: number;
  getFund: number;
  covidLevy: number;
  total: number;
}

interface Store {
  id: string;
  name: string;
  location: string;
}

const calculateTaxes = (amount: number): TaxBreakdown => {
  const subtotal = amount;
  const vat = subtotal * 0.125; // 12.5% VAT
  const nhil = subtotal * 0.025; // 2.5% NHIL
  const getFund = subtotal * 0.025; // 2.5% GETFund
  const covidLevy = subtotal * 0.01; // 1% COVID-19 Levy
  const total = subtotal + vat + nhil + getFund + covidLevy;
  
  return {
    subtotal,
    vat,
    nhil,
    getFund,
    covidLevy,
    total
  };
};

const stores: Store[] = [
  { id: '1', name: 'Main Branch - Accra', location: 'Accra Central' },
  { id: '2', name: 'Kumasi Branch', location: 'Kumasi Central' },
  { id: '3', name: 'Takoradi Branch', location: 'Takoradi' },
];

type FlowStep = 'amount' | 'payment-method' | 'confirm' | 'success';

export default function VirtualPOS() {
  const [currentStep, setCurrentStep] = useState<FlowStep>('amount');
  const [amount, setAmount] = useState('');
  const [isCardPresent, setIsCardPresent] = useState(true);
  const [showTaxBreakdown, setShowTaxBreakdown] = useState(false);
  const [taxBreakdown, setTaxBreakdown] = useState<TaxBreakdown | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cashierName, setCashierName] = useState('');
  const [tin, setTin] = useState('');
  const [selectedStore, setSelectedStore] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'momo' | ''>('');

  const handleNumPadPress = (value: string | number) => {
    if (amount.length >= 10) return;
    
    if (typeof value === 'number') {
      setAmount(prev => {
        const newAmount = prev + value.toString();
        return parseFloat(newAmount) > 0 ? newAmount : '0';
      });
    } else if (value === '←') {
      setAmount(prev => prev.slice(0, -1) || '');
    }
  };

  const handleEnter = () => {
    if (!amount) return;
    const numericAmount = parseFloat(amount);
    const taxes = calculateTaxes(numericAmount);
    setTaxBreakdown(taxes);
    setShowTaxBreakdown(true);
    setCurrentStep('payment-method');
  };

  const handleClearSale = () => {
    setAmount('');
    setShowTaxBreakdown(false);
    setTaxBreakdown(null);
    setCurrentStep('amount');
  };

  const handleBack = () => {
    if (currentStep === 'confirm') {
      setCurrentStep('amount');
    }
  };

  const handlePay = () => {
    setCurrentStep('success');
  };

  const handleNewSale = () => {
    handleClearSale();
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (cashierName && tin && selectedStore) {
      setIsAuthenticated(true);
    }
  };

  const handlePaymentMethodSelect = (method: 'cash' | 'card' | 'momo') => {
    setPaymentMethod(method);
    setCurrentStep('confirm');
  };

  const renderAmountScreen = () => (
    <div className="h-full bg-[#6366F1] flex flex-col">
      {/* Header */}
      <div className="p-6 text-white text-center">
        <h1 className="text-2xl font-semibold mb-4">Sage POS</h1>
        <div className="text-xl mb-4">Sale</div>
        <div className="text-5xl font-bold">₵{amount || '0.00'}</div>
      </div>

      {/* Numpad */}
      <div className="mt-auto bg-gray-50 rounded-t-3xl p-6">
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumPadPress(num)}
              className="h-16 text-2xl font-medium text-gray-700 bg-white rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors shadow-sm"
            >
              {num}
            </button>
          ))}
          <button
            onClick={handleClearSale}
            className="h-16 text-xl font-medium text-gray-700 bg-white rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors shadow-sm"
          >
            Clear
          </button>
          <button
            onClick={() => handleNumPadPress(0)}
            className="h-16 text-2xl font-medium text-gray-700 bg-white rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors shadow-sm"
          >
            0
          </button>
          <button
            onClick={() => handleNumPadPress('.')}
            className="h-16 text-2xl font-medium text-gray-700 bg-white rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors shadow-sm"
          >
            .
          </button>

          {/* Continue Button */}
          <div className="col-span-3 mt-4 mb-6">
            <button
              onClick={handleEnter}
              disabled={!amount}
              className={`w-full h-14 text-xl font-medium text-white rounded-xl transition-colors ${
                amount ? 'bg-green-500 hover:bg-green-600 active:bg-green-700' : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPaymentMethodScreen = () => (
    <div className="h-full bg-[#6366F1] flex flex-col">
      {/* Header */}
      <div className="p-6 text-white text-center">
        <h1 className="text-2xl font-semibold mb-4">Select Payment Method</h1>
        <div className="text-5xl font-bold mb-4">₵{amount}</div>
      </div>

      {/* Payment Methods */}
      <div className="mt-auto bg-gray-50 rounded-t-3xl p-6">
        <div className="space-y-4">
          <button
            onClick={() => handlePaymentMethodSelect('cash')}
            className="w-full h-16 bg-white rounded-xl flex items-center justify-center text-xl font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors shadow-sm"
          >
            💵 Cash
          </button>
          <button
            onClick={() => handlePaymentMethodSelect('card')}
            className="w-full h-16 bg-white rounded-xl flex items-center justify-center text-xl font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors shadow-sm"
          >
            💳 Card
          </button>
          <button
            onClick={() => handlePaymentMethodSelect('momo')}
            className="w-full h-16 bg-white rounded-xl flex items-center justify-center text-xl font-medium text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition-colors shadow-sm"
          >
            📱 Mobile Money
          </button>

          {/* Back Button */}
          <button
            onClick={() => setCurrentStep('amount')}
            className="w-full h-14 text-xl font-medium text-gray-600 rounded-xl transition-colors mt-4"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );

  const renderConfirmScreen = () => (
    <div className="h-full bg-[#6366F1] flex flex-col">
      <div className="p-6 text-white">
        <button
          onClick={handleBack}
          className="text-white hover:text-gray-200 font-medium mb-4"
        >
          ← Back
        </button>
        <div className="text-2xl font-bold text-center mb-4">Confirm Payment</div>
        <div className="text-center mb-4">
          {paymentMethod === 'cash' && '💵 Cash Payment'}
          {paymentMethod === 'card' && '💳 Card Payment'}
          {paymentMethod === 'momo' && '📱 Mobile Money Payment'}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="bg-white rounded-t-3xl p-6 flex-1">
          <div className="space-y-3">
            <div className="flex justify-between text-lg">
              <span>Subtotal:</span>
              <span>₵{taxBreakdown?.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>VAT (12.5%):</span>
              <span>₵{taxBreakdown?.vat.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>NHIL (2.5%):</span>
              <span>₵{taxBreakdown?.nhil.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>GETFund (2.5%):</span>
              <span>₵{taxBreakdown?.getFund.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>COVID-19 (1%):</span>
              <span>₵{taxBreakdown?.covidLevy.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold pt-3 border-t">
              <span>Total:</span>
              <span>₵{taxBreakdown?.total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handlePay}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-4 rounded-xl text-lg transition-colors mt-8 mb-6"
          >
            PAY NOW
          </button>
        </div>
      </div>
    </div>
  );

  const renderSuccessScreen = () => (
    <div className="h-full bg-white p-6 flex flex-col items-center justify-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
      <p className="text-gray-600 mb-8">Transaction amount: ₵{taxBreakdown?.total.toFixed(2)}</p>
      <button
        onClick={handleNewSale}
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
      >
        New Sale
      </button>
    </div>
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#6366F1] flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-md">
            {/* Title */}
            <h1 className="text-4xl font-bold text-white text-center mb-16">
              Virtual POS
            </h1>

            {/* Login Form */}
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <form onSubmit={handleLogin} className="space-y-6">
                {/* Cashier Name Input */}
                <div>
                  <input
                    type="text"
                    placeholder="Cashier name"
                    value={cashierName}
                    onChange={(e) => setCashierName(e.target.value)}
                    className="w-full px-4 py-3 text-lg border-b border-gray-200 focus:border-[#6366F1] focus:outline-none transition-colors placeholder-gray-500"
                    required
                  />
                </div>

                {/* TIN Number Input */}
                <div>
                  <input
                    type="text"
                    placeholder="TIN Number"
                    value={tin}
                    onChange={(e) => setTin(e.target.value)}
                    className="w-full px-4 py-3 text-lg border-b border-gray-200 focus:border-[#6366F1] focus:outline-none transition-colors placeholder-gray-500"
                    required
                  />
                </div>

                {/* Store Selection */}
                <div className="relative">
                  <select
                    value={selectedStore}
                    onChange={(e) => setSelectedStore(e.target.value)}
                    className="w-full px-4 py-3 text-lg border-b border-gray-200 focus:border-[#6366F1] focus:outline-none transition-colors appearance-none bg-transparent"
                    required
                  >
                    <option value="">Choose store</option>
                    {stores.map((store) => (
                      <option key={store.id} value={store.id}>
                        {store.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Continue Button */}
                <button
                  type="submit"
                  className="w-full bg-[#312E81] text-white text-xl font-medium py-4 rounded-2xl hover:bg-[#4338CA] transition-colors mt-8"
                >
                  Continue
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#4338CA] flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-[400px] h-[700px] bg-[#6366F1] rounded-3xl shadow-2xl overflow-hidden">
          {/* Status Bar */}
          <div className="h-10 bg-gray-800 flex items-center justify-between px-6">
            <Link 
              href="/dashboard" 
              className="text-white text-sm hover:text-gray-200 transition-colors flex items-center gap-1"
            >
              ← Dashboard
            </Link>
            <div className="flex items-center space-x-2">
              <div className="text-white text-xs">9:41</div>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-4 text-white">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 20l-4-4h8l-4 4z" />
                  </svg>
                </div>
                <div className="w-4 h-4 text-white">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
                  </svg>
                </div>
                <div className="w-4 h-4 text-white">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4zM11 20v-5.5H9L13 7v5.5h2L11 20z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Content based on current step */}
          {currentStep === 'amount' && renderAmountScreen()}
          {currentStep === 'payment-method' && renderPaymentMethodScreen()}
          {currentStep === 'confirm' && renderConfirmScreen()}
          {currentStep === 'success' && renderSuccessScreen()}
        </div>
      </div>
    </div>
  );
} 