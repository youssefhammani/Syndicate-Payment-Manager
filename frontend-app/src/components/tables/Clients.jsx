import React, { useEffect, useState } from 'react'
import Table from '../Table'
import axios from 'axios'

const Clients = () => {
    const [clients, setClients] = useState([])

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/clients/get-all-clinets');
                setClients(response.data);
            } catch (error) {
                console.error('There was an error!', error);
            }
        };

        fetchClients();
    }, []);

    const addClient = async (newClient) => {
        setClients(preClients => [...preClients, newClient]);
    }

    const deleteClient = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/clients/delete-client/${id}`);
            setClients(clients.filter(client => client._id !== id));
        } catch (error) {
            console.error('There was an error!', error);
        }
    }

    const updateClient = async (id, updatedClient) => {
        try {
            await axios.put(`http://localhost:3000/api/clients/update-client/${id}`, updatedClient);
            const updatedClients = clients.map(client =>
                client._id === id ? updatedClient : client
            );
            setClients(updatedClients);
        } catch (error) {
            console.error('There was an error!', error);
        }
    }


    return (
        <div className='container my-20 p-20 bg-base-300 rounded-badge'>
            <Table clients={clients} addClient={addClient} deleteClient={deleteClient} updateClient={updateClient} />
        </div>
    )
}

export default Clients