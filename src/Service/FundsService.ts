import axios from 'axios';

// Define the structure of a fund item
export interface Fund {
  fundID: number;
  fundName: string;
  description: string;
  riskLevel: number;
}

// Define the service function to get funds
const getFunds = async (): Promise<Fund[]> => {
  const apiUrl = 'https://localhost:7166/api/Funds';
  try {
    const response = await axios.get<Fund[]>(apiUrl);
    return response.data; // Return the funds array
  } catch (error) {
    console.error('Error fetching funds:', error);
    throw new Error('Failed to fetch funds');
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getFunds };
