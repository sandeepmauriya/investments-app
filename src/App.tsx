import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/Login/Login';
import InvestmentDetails from './components/Invements/details/investment-details';
import InvestmentForm from './components/Invements/create/investment-create';

const App = () => {
    return (
        <Router>
            <Routes>  {/* Replacing Switch with Routes */}
                <Route path="/" element={<Login />} />  {/* Use 'element' instead of 'component' */}
                <Route path="/investment-details" element={<InvestmentDetails />} /> {/* Use 'element' */}
                <Route path="/investment-create" element={<InvestmentForm />} /> {/* Use 'element' */}
            </Routes>
        </Router>
    );
};

export default App;
