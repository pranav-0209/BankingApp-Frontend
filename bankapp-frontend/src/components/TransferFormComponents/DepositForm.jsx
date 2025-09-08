import { useCallback,useState, useMemo, memo } from 'react';
import api from '../../api';
import { Button } from '@mui/material';
import SuccessModal from '../SuccessModal';
import * as yup from 'yup';


const depositSchema = yup.object({
  selectedAccount: yup.string().required('Account is required'),
  amount: yup.number().positive().min(1, 'Minimum amount is ₹1').required('Amount is required'),
});

const DepositForm = memo(({ accounts, onTransactionSuccess }) => {
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]?.accountNumber || '');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const accountOptions = useMemo(() => 
    accounts.map(acc => ({
      value: acc.accountNumber,
      label: `${acc.accountType} - ${acc.accountNumber} (Balance: ₹${acc.balance.toLocaleString()})`
    })),
    [accounts]
  );

  const handleAccountChange = useCallback((e) => {
    setSelectedAccount(e.target.value);
    if (message) setMessage(null);
  }, [message]);

  const handleAmountChange = useCallback((e) => {
    setAmount(e.target.value);
    if (message) setMessage(null);
  }, [message]);

  const validateForm = useCallback(async () => {
    try {
      await depositSchema.validate({ selectedAccount, amount: parseFloat(amount) });
      return true;
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
      return false;
    }
  }, [selectedAccount, amount]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (loading) return;

    const isValid = await validateForm();
    if (!isValid) return;

    setLoading(true);
    setMessage(null);

    try {
      await api.post('/transaction/deposit', {
        account: selectedAccount,
        transactionType: 'DEPOSIT',
        amount: parseFloat(amount)
      });

      onTransactionSuccess(selectedAccount);
      setShowSuccessModal(true);
      setAmount('');
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Deposit failed.' 
      });
    } finally {
      setLoading(false);
    }
  }, [loading, validateForm, selectedAccount, amount, onTransactionSuccess]);

  const handleCloseModal = useCallback(() => {
    setShowSuccessModal(false);
  }, []);

  return (
    <div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block font-semibold mb-1">Deposit To:</label>
          <select
            className="w-full font-medium border rounded p-2"
            value={selectedAccount}
            onChange={handleAccountChange}
          >
            <option value="" disabled>Select your account</option>
            {accountOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
                <div>
                    <label className="block font-semibold mb-1">Amount:</label>
                    <input
                        type="number"
                        className="w-full border rounded p-2"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                {/* Single, consistent message display area */}
                {message && (
                    <div className={`p-3 rounded text-center ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {message.text}
                    </div>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth // Make button take full width for better UI
                    disabled={loading}
                    style={{ marginTop: '1rem' }} // Add some margin
                >
                    {loading ? 'Processing...' : 'Confirm Deposit'}
                </Button>
            </form>

            {showSuccessModal && (
        <SuccessModal
          message="Deposit was completed successfully!"
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
});

export default DepositForm;