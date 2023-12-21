import React, { useEffect, useState } from 'react'
import TablePaym from '../TablePaym'
import axios from 'axios'

const Payments = () => {
    const [payments, setPayments] = useState([])

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/payments/get-all-payments');
                setPayments(response.data);
            } catch (error) {
                console.error('There was an error!', error);
            }
        };

        fetchPayments();
    }, []);

    const addPayment = async (newPayment) => {
        setPayments(prePayments => [...prePayments, newPayment]);
    }

    const deletePayment = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/payments/delete-payment/${id}`);
            setPayments(payments.filter(payment => payment._id !== id));
        } catch (error) {
            console.error('There was an error!', error);
        }
    }

    const updatePayment = async (id, updatedPayment) => {
        try {
            await axios.put(`http://localhost:3000/api/payments/update-payment/${id}`, updatedPayment);
            const updatedPayments = payments.map(payment =>
                payment._id === id ? updatedPayment : payment
            );
            setPayments(updatedPayments);
        } catch (error) {
            console.error('There was an error!', error);
        }
    }


    return (
        <div className='container my-20 p-20 bg-base-300 rounded-badge'>
            <TablePaym payments={payments} addPayment={addPayment} deletePayment={deletePayment} updatePayment={updatePayment} />
        </div>
    )
}

export default Payments