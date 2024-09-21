import React, { useState, useEffect } from 'react';
import { CreditCard } from 'lucide-react';

interface Transaction {
  id: number;
  type: 'incoming' | 'outgoing';
  amount: number;
  description: string;
  date: string;
}

interface WalletProps {
  userId: string;
}

const Wallet: React.FC<WalletProps> = ({ userId }) => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // Simulating data fetching
    const fetchWalletData = () => {
      setBalance(500);
      setTransactions([
        { id: 1, type: 'incoming', amount: 500, description: 'Initial deposit', date: '2023-09-20' },
        { id: 2, type: 'incoming', amount: 79.99, description: 'Refund: Course deleted by admin', date: '2023-09-21' },
        { id: 3, type: 'outgoing', amount: 99.99, description: 'Payment for Introduction to React', date: '2023-09-22' },
        { id: 4, type: 'incoming', amount: 50, description: 'Wallet top-up', date: '2023-09-23' },
        { id: 5, type: 'outgoing', amount: 149.99, description: 'Payment for Advanced JavaScript', date: '2023-09-24' },
      ]);
    };

    fetchWalletData();
  }, [userId]);

  return (
    <div className="h-[calc(100vh-64px-64px)] overflow-auto bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Your E-Learning Wallet</div>
              <span className="text-2xl font-bold text-gray-900">${balance.toFixed(2)}</span>
            </div>
            <CreditCard className="h-8 w-8 text-gray-500" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction History</h3>
            <ul className="divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <li key={transaction.id} className="py-4 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">{transaction.description}</span>
                    <span className="text-xs text-gray-500">{transaction.date}</span>
                  </div>
                  <span className={`text-sm font-semibold ${
                    transaction.type === 'incoming' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'incoming' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;