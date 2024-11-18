import axios from 'axios';

// Define types for the API response structure
export interface Funds {
  fundID: number;
  fundName: string;
  description: string;
  riskLevel: number;
}

export interface Investments {
  investmentID: number;
  customerID: number;
  fundID: number;
  investmentAmount: number;
  investmentDate: string;
  customers: any; // You can define the customer type here if needed
  funds: Funds;
}

// Define the API endpoint
const apiUrl = 'https://localhost:7166/api/Investments/';

const getInvestmentDetails = async (investmentID: number): Promise<Investments[]> => {
  try {
    const response = await axios.get(`${apiUrl}${investmentID}`);
    return response.data; // Return the investment data from the response
  } catch (error) {
    debugger;
    console.error('Error fetching investment details:', error);
    throw error; // Rethrow the error to handle it in the component
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getInvestmentDetails,
};
