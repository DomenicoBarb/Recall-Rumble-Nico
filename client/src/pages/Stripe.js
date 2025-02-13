import React, { useState } from 'react';
import { Typography, Row, Col, Button, Input } from 'antd';
import { loadStripe } from '@stripe/stripe-js';
require('dotenv').config();

const stripePromise = loadStripe('pk_live_51NFTHQEEhVSI7lczgsjZsD7IQcaxLsUB6tbag2VCxErTeLbr3QjzmsxoL0G4tj6TL10zhv3Xywj8tsd41ZjZIRKh00Epb3mwIX');

const { Title } = Typography;

const Stripe = () => {
    const [donationAmount, setDonationAmount] = useState(0);

    const handleClick = async event => {
        event.preventDefault();
        const stripe = await stripePromise;

        const response = await fetch('/api/stripe/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                donationAmount,
            })
        });

        const session = await response.json();

        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });

        if (result.error) {
            console.error(result.error.message);
        }
    };


    return (
        <>
            <Row justify="center" align="middle" style={{ height: '100px', background: '#001529', color: '#fff' }}>
                <Col>
                    <Title level={1} className='pageheader' style={{ color: '#fff', textAlign: 'center' }}>Donation Page</Title>
                </Col>
            </Row>
            <Row justify="center" style={{ marginTop: '20px' }}>
                <Col>
                    <Title level={2} className='donation' style={{ textAlign: 'center' }}>Want to support the team? Donate below 😀</Title>
                    <Input type="number" className='donation' style={{ textAlign: 'center' }} placeholder="Enter your donation amount (USD)" onChange={(e) => setDonationAmount(e.target.value)} />
                    <Button className='donation' size="large" onClick={handleClick} style={{ display: 'block', margin: '0 auto', marginTop: '10px', marginBottom: '40px' }}>
                        Donate with Stripe
                    </Button>
                </Col>
            </Row>
        </>
    );
};

export default Stripe;
