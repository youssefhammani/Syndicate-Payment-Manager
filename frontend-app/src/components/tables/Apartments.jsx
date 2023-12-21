import React, { useEffect, useState } from 'react'
import TableApar from '../TableApar'
import axios from 'axios'

const Apartments = () => {
    const [apartments, setApartments] = useState([]);

    useEffect(() => {
        const fetchApartments = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/apartments/get-all-apartments');
                console.log("apartments", response.data);
                setApartments(response.data);
            } catch (error) {
                console.error('There was an error!', error);
            }
        };

        fetchApartments();
    }, []);

    const addApartment = (newApartment) => {
        setApartments(preApartments => [...preApartments, newApartment]);
    }

    const deleteApartment = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/apartments/delete-apartment/${id}`);
            setApartments(apartments.filter(apartment => apartment._id !== id));
        } catch (error) {
            console.error('There was an error!', error);
        }
    }

    const updateApartment = async (id, updatedApartment) => {
        try {
            await axios.put(`http://localhost:3000/api/apartments/update-apartment/${id}`, updatedApartment);
            const updatedApartments = apartments.map(apartment =>
                apartment._id === id ? updatedApartment : apartment
            );
            setApartments(updatedApartments);
        } catch (error) {
            console.error('There was an error!', error);
        }
    }

    return (
        <div className='container my-20 p-20 bg-base-300 rounded-badge'>
            <TableApar apartments={apartments} addApartment={addApartment} deleteApartment={deleteApartment} updateApartment={updateApartment} />
        </div>
    );
};

export default Apartments;