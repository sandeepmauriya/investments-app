import React, { useState } from 'react';
import InvestmentService from '../../../Service/CreateInvestments';
import { useLocation, useNavigate } from 'react-router-dom';

interface LocationState {
    customerID:number;
    response:number;
}

const InvestmentForm: React.FC = () => {
 
  const [fundID, setFundID] = useState<number>(0);
  const [investmentAmount, setInvestmentAmount] = useState<number>(0);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
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

  return (
    <div>
      <h2>Create New Investment</h2>
      <form onSubmit={handleSubmit}>
       
        <div>
          <label htmlFor="fundID">Fund ID</label>
          <input
            type="number"
            id="fundID"
            value={fundID}
            onChange={(e) => setFundID(Number(e.target.value))}
            required
          />
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
