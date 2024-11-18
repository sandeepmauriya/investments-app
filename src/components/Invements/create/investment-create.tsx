import React, { useEffect, useState } from 'react';
import InvestmentService from '../../../Service/CreateInvestments';
import { useLocation, useNavigate } from 'react-router-dom';
import fundsService, { Fund } from '../../../Service/FundsService';

interface LocationState {
    customerID:number;
    response:number;
}

const InvestmentForm: React.FC = () => {
 
  const [fundID, setFundID] = useState<number>(0);
  const [funds, setFunds] = useState<Fund[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState<number>(0);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [selectedFund, setSelectedFund] = useState<number | null>(null);
  const location = useLocation();
  const customerID = (location.state as LocationState)?.customerID;
  const navigate = useNavigate();  // Use useNavigate instead of useHistory
;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const investmentData = {
      customerID,
      fundID,
      investmentAmount,
    };

    try {
      const response = await InvestmentService.createInvestment(investmentData);
      setSuccessMessage(`Investment Created Successfully! ID: ${response.investmentID}`);
      setErrorMessage('');
      setTimeout(() => {
        navigate('/investment-details', { state: { customerID } });
      }, 500);
    } catch (error) {
      setErrorMessage('Error creating investment');
      setSuccessMessage('');
    }
  };

   // Fetch funds on component mount
   useEffect(() => {
    const fetchFunds = async () => {
      try {
        setLoading(true);
        const fundsData = await fundsService.getFunds();
        setFundID(fundsData[0].fundID);
        setFunds(fundsData);
      } catch (err) {
        setError('Failed to fetch funds');
      } finally {
        setLoading(false);
      }
    };

    fetchFunds();
  }, []);

  // Render loading state
  if (loading) return <p>Loading funds...</p>;

  // Render error state
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

    // Handle dropdown selection change
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedFund(Number(event.target.value));
    };

  return (
    <div>
      <h2>Create New Investment</h2>
      <form onSubmit={handleSubmit}>
       
        <div>
          <label htmlFor="fundID">Fund ID</label>
          <select value={selectedFund || ''} onChange={handleChange}>
          <option value="" disabled>
            -- Select a Fund --
          </option>
          {funds.map((fund) => (
            <option key={fund.fundID} value={fund.fundID}>
              {fund.fundName} (Risk Level: {fund.riskLevel})
            </option>
          ))}
        </select>
        </div>
        <div>
          <label htmlFor="investmentAmount">Investment Amount</label>
          <input
            type="number"
            id="investmentAmount"
            value={investmentAmount}
            onChange={(e) => setInvestmentAmount(Number(e.target.value))}
            required
          />
        </div>
        <button type="submit">Submit Investment</button>
      </form>

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default InvestmentForm;
