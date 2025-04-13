import React, { useState, useEffect } from 'react';
import { XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { QRCodeSVG } from 'qrcode.react';

interface CreateInvoiceProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Customer {
  name: string;
  email: string;
  initial: string;
}

const customers: Customer[] = [
  { name: 'MTN Ghana', email: 'info@mtn.com.gh', initial: 'M' },
  { name: 'Vodafone Ghana', email: 'contact@vodafone.com.gh', initial: 'V' },
  { name: 'Ghana Commercial Bank', email: 'info@gcb.com.gh', initial: 'G' },
  { name: 'Ecobank Ghana', email: 'customerservice@ecobank.com.gh', initial: 'E' },
  { name: 'Ghana Ports and Harbours Authority', email: 'info@ghanaports.com', initial: 'G' },
  { name: 'Ghana National Petroleum Corporation', email: 'info@gnpc.com.gh', initial: 'G' },
  { name: 'Ghana Cocoa Board', email: 'info@cocobod.gh', initial: 'G' },
  { name: 'Ghana Revenue Authority', email: 'info@gra.gov.gh', initial: 'G' },
  { name: 'Ghana Water Company Limited', email: 'info@ghanawater.com.gh', initial: 'G' },
];

export default function CreateInvoice({ isOpen, onClose }: CreateInvoiceProps) {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState('INV-1024');
  const [poNumber, setPoNumber] = useState('');
  const [vatNumber, setVatNumber] = useState('');
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [grossSales, setGrossSales] = useState('');
  const [taxAmount, setTaxAmount] = useState('');
  const [previousBalance, setPreviousBalance] = useState('');
  const [penalties, setPenalties] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [showToast, setShowToast] = useState(false);

  const calculateTotal = () => {
    const gross = parseFloat(grossSales) || 0;
    const tax = parseFloat(taxAmount) || 0;
    const prev = parseFloat(previousBalance) || 0;
    const pen = parseFloat(penalties) || 0;
    setTotalAmount((gross + tax + prev + pen).toFixed(2));
  };

  useEffect(() => {
    calculateTotal();
  }, [grossSales, taxAmount, previousBalance, penalties]);

  const handleSubmit = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-hidden">
      <div className="h-full flex">
        {/* Left Side - Invoice Details */}
        <div className="w-[600px] border-r border-gray-200 dark:border-gray-700 flex flex-col">
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Invoice details</h1>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Customer Selection */}
            <div className="mb-8">
              <h2 className="text-base font-medium text-gray-600 dark:text-gray-300 mb-4">Creating invoice for</h2>
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex items-center justify-between rounded-md border border-gray-300 dark:border-gray-600 px-4 py-2 text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {selectedCustomer ? (
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                        {selectedCustomer.initial}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">{selectedCustomer.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{selectedCustomer.email}</div>
                      </div>
                    </div>
                  ) : (
                    <span className="text-gray-500">Select a customer...</span>
                  )}
                  <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 max-h-60 overflow-auto">
                    {customers.map((customer) => (
                      <button
                        key={customer.email}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center"
                        onClick={() => {
                          setSelectedCustomer(customer);
                          setIsDropdownOpen(false);
                        }}
                      >
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                          {customer.initial}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{customer.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{customer.email}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {selectedCustomer && (
              <>
                {!showPaymentDetails ? (
                  <>
                    <div className="mb-8">
                      <h2 className="text-base font-medium text-gray-900 dark:text-white mb-4">Invoice details</h2>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                            Invoice number
                          </label>
                          <input
                            type="text"
                            value={invoiceNumber}
                            onChange={(e) => setInvoiceNumber(e.target.value)}
                            className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-800 px-4 py-2"
                            placeholder="Enter invoice number"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1 flex items-center">
                            TIN number
                            <span className="ml-1 text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={poNumber}
                            onChange={(e) => setPoNumber(e.target.value)}
                            className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-800 px-4 py-2"
                            placeholder="Enter TIN number"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                            VAT Registration Number
                          </label>
                          <input
                            type="text"
                            value={vatNumber}
                            onChange={(e) => setVatNumber(e.target.value)}
                            className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-800 px-4 py-2"
                            placeholder="Enter VAT Registration Number"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-8">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-base text-gray-900 dark:text-white">Item</h2>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Quantity</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">Price</div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <input
                            type="text"
                            placeholder="Line Item"
                            className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-800 px-4 py-2"
                          />
                          <input
                            type="number"
                            defaultValue={1}
                            min={1}
                            className="w-20 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-800 px-4 py-2"
                          />
                          <div className="flex items-center">
                            <span className="text-gray-500 mr-2">₵</span>
                            <input
                              type="number"
                              placeholder="0.00"
                              className="w-24 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-800 px-4 py-2"
                            />
                          </div>
                          <button className="text-gray-400 hover:text-gray-500">
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-4 space-x-4">
                        <button className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                          + Add Line Item
                        </button>
                        <button className="text-sm text-gray-600 dark:text-gray-400">
                          Add Sales Tax
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mb-8">
                      <div className="text-base font-medium text-gray-900 dark:text-white">Total</div>
                      <div className="text-xl font-medium text-gray-900 dark:text-white">$0.00</div>
                    </div>

                    <div className="flex justify-between">
                      <button 
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                        onClick={() => setShowPaymentDetails(false)}
                      >
                        ← Back
                      </button>
                      <button 
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        onClick={() => setShowPaymentDetails(true)}
                      >
                        Payment Details →
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="mt-8">
                    <h2 className="text-base font-medium text-gray-900 dark:text-white mb-4">Payment Breakdown</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                          Gross Sales/Income
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={grossSales}
                            onChange={(e) => setGrossSales(e.target.value)}
                            className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-800 px-4 py-2 pr-20"
                            placeholder="Enter taxable amount"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <select className="h-[calc(100%-8px)] my-1 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent py-0 pl-2 pr-6 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm">
                              <option>GHS</option>
                              <option>USD</option>
                              <option>EUR</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                          Tax Amount
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={taxAmount}
                            onChange={(e) => setTaxAmount(e.target.value)}
                            className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-800 px-4 py-2 pr-20"
                            placeholder="Enter tax amount"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <select className="h-[calc(100%-8px)] my-1 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent py-0 pl-2 pr-6 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm">
                              <option>GHS</option>
                              <option>USD</option>
                              <option>EUR</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                          Previous Balance
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={previousBalance}
                            onChange={(e) => setPreviousBalance(e.target.value)}
                            className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-800 px-4 py-2 pr-20"
                            placeholder="Enter previous balance"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <select className="h-[calc(100%-8px)] my-1 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent py-0 pl-2 pr-6 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm">
                              <option>GHS</option>
                              <option>USD</option>
                              <option>EUR</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                          Penalties/Interest
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            value={penalties}
                            onChange={(e) => setPenalties(e.target.value)}
                            className="block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-800 px-4 py-2 pr-20"
                            placeholder="Enter penalties/interest"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <select className="h-[calc(100%-8px)] my-1 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent py-0 pl-2 pr-6 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm">
                              <option>GHS</option>
                              <option>USD</option>
                              <option>EUR</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">Total Amount Due</span>
                          <span className="text-lg font-semibold text-gray-900 dark:text-white">₵{totalAmount}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between mt-8">
                      <button 
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                        onClick={() => setShowPaymentDetails(false)}
                      >
                        ← Back to Invoice
                      </button>
                      <button 
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                        onClick={handleSubmit}
                      >
                        Submit Invoice →
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Right Side - Invoice Preview */}
        <div className="flex-1 bg-gray-50 dark:bg-gray-800 overflow-y-auto">
          <div className="max-w-3xl mx-auto p-8">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm p-8">
              <div className="flex justify-between">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">Invoice</h2>
                <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-lg">
                  SM
                </div>
              </div>

              <div className="grid grid-cols-3 gap-8">
                <div>
                  <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-2">From</h3>
                  <div className="text-sm text-gray-900 dark:text-white">
                    <p>Sage Microsystems Information</p>
                    <p>info@sagemicrosystems.com</p>
                    <p>123 Tech Park Avenue</p>
                    <p>Suite 500</p>
                    <p>Accra, GA 00233</p>
                    <p>Ghana</p>
                    <p className="mt-2">Tax ID: GH-123456789</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-2">To</h3>
                  {selectedCustomer ? (
                    <div className="text-sm text-gray-900 dark:text-white">
                      <p>{selectedCustomer.name}</p>
                      <p>{selectedCustomer.email}</p>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-400 dark:text-gray-500">
                      Select a customer to populate details
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-2">Details</h3>
                  <div className="text-sm">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-500 dark:text-gray-400">Invoice no.</span>
                      <span className="text-gray-900 dark:text-white">{invoiceNumber}</span>
                    </div>
                    {poNumber && (
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-500 dark:text-gray-400">TIN no.</span>
                        <span className="text-gray-900 dark:text-white">{poNumber}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">VAT Reg. No.</span>
                      <span className="text-gray-900 dark:text-white">{vatNumber || '-'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase pb-4">Item</th>
                      <th className="text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase pb-4">Quantity</th>
                      <th className="text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase pb-4">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                      </td>
                      <td className="py-4 text-center">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12 mx-auto"></div>
                      </td>
                      <td className="py-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 ml-auto"></div>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="border-t border-gray-200 dark:border-gray-700">
                      <td colSpan={2} className="pt-4 text-right text-sm font-medium text-gray-500 dark:text-gray-400">Total</td>
                      <td className="pt-4 text-right text-sm font-medium text-gray-900 dark:text-white">₵0.00</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-4">Terms</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Invoice date</span>
                      <span className="text-gray-900 dark:text-white">04/11/2025</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Due date</span>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">Pay via</span>
                      <span className="text-gray-900 dark:text-white">Mobile Money / Bank Transfer</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center float-right">
                    <QRCodeSVG 
                      value={`https://pay.ghana-vat.gov.gh/invoice/${invoiceNumber}`}
                      size={128}
                      level="H"
                      includeMargin={true}
                      bgColor="#ffffff"
                      fgColor="#000000"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      Pay with PAYTRUX
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showToast && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Invoice submitted successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
} 