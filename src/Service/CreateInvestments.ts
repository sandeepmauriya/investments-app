import axios from 'axios';


const API_URL = 'https://localhost:7166/api/Investments';

interface InvestmentData {
  customerID: number;
  fundID: number;
  investmentAmount: number;
}

const InvestmentService = {
  createInvestment: async (investmentData: InvestmentData) => {
    try {
      const response = await axios.post(API_URL, investmentData, {
        headers: {
          'Content-Type': 'application/json',
          accept: '*/*',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating investment:', error);
      throw error;
    }
  },
};

export default InvestmentService;
