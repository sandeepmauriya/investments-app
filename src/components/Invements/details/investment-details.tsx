import React, { useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import InvestmentService, { Investments } from '../../../Service/InvestmentService';
import { useNavigate } from 'react-router-dom';

interface LocationState {
    customerID:number;
}

const InvestmentDetails: React.FC = () => {
    // Use useLocation hook to access the state passed from Login page
    const [investments, setInvestment] = useState<Investments[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const location = useLocation();
    const customerID = (location.state as LocationState)?.customerID;
    const navigate = useNavigate();  // Use useNavigate instead of useHistory

    const handleAddInvestment =()=>{
        navigate('/investment-create', { state: { customerID } });

    }
    useEffect(() => {
        // Fetch the investment details when the component mounts
        const fetchInvestmentDetails = async () => {
          try {
            //alert(customerID);
            const investmentData = await InvestmentService.getInvestmentDetails(customerID);
            setInvestment(investmentData); // Assuming the response is an array and taking the first element
            setLoading(false);
          } catch (error) {
            setError('Failed to fetch investment details.');
            setLoading(false);
          }
        };
    
        fetchInvestmentDetails();
      }, []);
    
      if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>{error}</div>;
      }

    return (
        <div className="investment-details">

          
            <h2>Investment Details</h2>
      <table  cellPadding="10" cellSpacing="0" style={{ width: '100%', marginTop: '20px' }}>
        <thead>
          <tr>
            <th>Investment ID</th>
            <th>Customer ID</th>
            <th>Fund Name</th>
            <th>Investment Amount</th>
            <th>Investment Date</th>
            <th>Fund Description</th>
            <th>Risk Level</th>
          </tr>
        </thead>
        <tbody>
          {/* Use map to iterate over the investments array */}
          {investments?.map((investment) => (
            <tr key={investment.investmentID}>
              <td>{investment.investmentID}</td>
              <td>{investment.customerID}</td>
              <td>{investment.funds.fundName}</td>
              <td>${investment.investmentAmount}</td>
              <td>{new Date(investment.investmentDate).toLocaleString()}</td>
              <td>{investment.funds.description}</td>
              <td>{investment.funds.riskLevel}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
      <button type="button" onClick={handleAddInvestment}>Add new ISA Investment</button>
      </div>
        </div>
    );
};

export default InvestmentDetails;
