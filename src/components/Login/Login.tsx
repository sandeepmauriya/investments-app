import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../Service/AuthService';

const Login = () => {
    const [email, setEmail] = useState<string>('');

    const navigate = useNavigate();  // Use useNavigate instead of useHistory

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            // Call the service function to fetch the customer ID
            const response = await authService.getCustomerIdByEmail(email);
          //  alert(response);

           
            const customerID = response;
            navigate('/investment-details', { state: { customerID } });

          } catch (err) {
            setError('Failed to retrieve customer ID');
          }

        // Navigate to investment-details page, passing the email state
        
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email Address</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Login;
function setError(arg0: string) {
    throw new Error('Function not implemented.');
}

