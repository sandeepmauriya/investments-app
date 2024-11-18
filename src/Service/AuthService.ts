import axios from 'axios';

// Define the type for the response (customer ID)
type CustomerIdResponse = number;

const API_URL = 'https://localhost:7166/api/Auth/';//

// Service to get customer ID by email
const getCustomerIdByEmail = async (email: string): Promise<CustomerIdResponse> => {
  try {
    // Make the GET request to the API
    const response = await axios.get<CustomerIdResponse>(`${API_URL}${encodeURIComponent(email)}`, {
      headers: {
        accept: '*/*',  // Accept any content type in the response
      },
    });

    // Return the customer ID (response data)
    return response.data;
  } catch (error) {
    console.error('Error fetching customer ID:', error);
    throw new Error('Error fetching customer ID');
  }
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getCustomerIdByEmail,
};
