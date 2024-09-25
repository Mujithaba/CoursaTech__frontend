import React, { useState, useEffect } from 'react';
import { CreditCard } from 'lucide-react';
import { IWallet, IWalletHistory } from '../../services/types';
import { getWalletData } from '../../api/user';

interface WalletProps {
  userId: string;
}

const Wallet: React.FC<WalletProps> = ({ userId }) => {
  const [walletData, setWalletData] = useState<IWallet | null>(null);

  useEffect(() => {
    fetchWalletData();
  }, [userId]);

  const fetchWalletData = async () => {
    const response = await getWalletData(userId);
    if (response) {
      setWalletData(response.data.getWallet);
    }
  };

  const formatDate = (date: Date | string) => {
    const d = date instanceof Date ? date : new Date(date);
    if (isNaN(d.getTime())) {
      return 'Invalid Date';
    }
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="h-[calc(100vh-64px-64px)] overflow-auto bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Your E-Learning Wallet</div>
              <span className="text-2xl font-bold text-gray-900">${walletData?.balance.toFixed(2)}</span>
            </div>
            <CreditCard className="h-8 w-8 text-gray-500" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction History</h3>
            <ul className="divide-y divide-gray-200">
              {walletData?.history.map((transaction: IWalletHistory) => (
                <li key={transaction._id} className="py-4 flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500">{formatDate(transaction.date)} (<span className={`text-xs font-semibold ${transaction.type === 'Credit' ? 'text-green-700' : 'text-red-600'}`}>{transaction.type}</span>)
                    </span>
                    <span className="text-sm font-medium text-gray-900">{transaction.reason || 'No description'}</span>
                  </div>
                  <span className={`text-sm font-semibold mt-4  ${
                    transaction.type === 'Credit' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'Credit' ? '+' : '-'}${transaction.amount?.toFixed(2) || '0.00'}
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