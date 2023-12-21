import React, { useEffect, useState } from 'react'
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa'
import axios from 'axios'
import Swal from 'sweetalert2'


const TablePaym = ({ payments, addPayment, deletePayment, updatePayment }) => {
    const [editingPayment, setEditingPayment] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [apartments, setApartments] = useState([]); // New state variable for apartments
    const [clients, setClients] = useState([]); // New state variable for apartments
    const [payment, setPayment] = useState({
        apartment: '',
        amount: '',
    });

    useEffect(() => {
        const fetchApartments = async () => {
            try {
                const responseApartments = await axios.get('http://localhost:3000/api/apartments/get-all-apartments');
                setApartments(responseApartments.data);

                const responseClients = await axios.get('http://localhost:3000/api/clients/get-all-clinets');
                console.log("responseClients.data", responseClients.data)
                setClients(responseClients.data);
            } catch (error) {
                console.error('There was an error!', error);
            }
        };

        fetchApartments();
    }, []);

    const handleChange = (e) => {
        setPayment({ ...payment, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/payments/create-payment', payment);
            console.log("response.data", response.data);
            addPayment(response.data);
            setPayment({
                apartment: '',
                user: '',
                amount: '',
            });
        } catch (error) {
            console.error('There was an error!', error);
        }
    }

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deletePayment(id);
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }

    const handleEdit = (payment) => {
        setEditingPayment(payment);
        setIsModalOpen(true);
    }

    useEffect(() => {
        if (isModalOpen) {
            document.getElementById('my_modal_2').showModal()
        }
    }, [isModalOpen]);

    const handleChangeEdit = (e) => {
        setEditingPayment({ ...editingPayment, [e.target.name]: e.target.value });
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        updatePayment(editingPayment._id, editingPayment);
        setEditingPayment(null);
        setIsModalOpen(false);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }


    return (
        <>
            <div className='flex justify-end'>
                <button className="btn bg-blue-600 text-white mb-4" onClick={() => document.getElementById('my_modal_1').showModal()}>
                    Add Payment <FaPlus />
                </button>
            </div>
            <div className="overflow-x-auto bg-base-100 shadow-lg rounded-box border border-base-300 ">
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Hello!</h3>
                        <p className="py-4">Press ESC key or click the button below to close</p>
                        <div className="">
                            <form method="dialog" onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="client" className='form-lbel block font-bold text-start'>Client</label>
                                    <select
                                        id="client"
                                        name="user"
                                        className='form-group w-full p-2 border rounded-md'
                                        value={payment.user}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select a client</option>
                                        {clients.map((client) => (
                                            <option key={client._id} value={client._id}>
                                                {client.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="apartment" className='form-label block text-neutral font-bold text-start'>Apartment</label>
                                    <select
                                        id="apartment"
                                        name="apartment"
                                        className='form-group w-full p-2 border rounded-md'
                                        value={payment.apartment}
                                        onChange={handleChange}
                                    >
                                        <option value="" >Select an apartment</option>
                                        {apartments.map((apartment) => (
                                            <option key={apartment._id} value={apartment._id}>
                                                {apartment.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="amount" className="form-label block font-bold text-start">
                                        Amount
                                    </label>
                                    <input
                                        type="number"
                                        id="amount"
                                        name="amount"
                                        className="form-input w-full p-2 border rounded-md"
                                        value={payment.amount}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='flex justify-end'>
                                    <button type="submit" className="btn mr-4" onClick={() => document.getElementById('my_modal_1').close()}>Submit</button>
                                    <button type="button" className="btn" onClick={() => document.getElementById('my_modal_1').close()}>Close</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </dialog>

                {isModalOpen && (
                    <dialog id="my_modal_2" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Hello!</h3>
                            <p className="py-4">Press ESC key or click the button below to close</p>
                            <div className="">
                                <form method="dialog" onSubmit={handleUpdate}>
                                    <div className="mb-4">
                                        <label htmlFor="client" className='form-lbel block font-bold text-start'>Client</label>
                                        <select
                                            id="client"
                                            name="user"
                                            className='form-group w-full p-2 border rounded-md'
                                            value={editingPayment ? editingPayment.user : ''}
                                            onChange={handleChangeEdit}
                                        >
                                            <option value="">Select a client</option>
                                            {clients.map((client) => (
                                                <option key={client._id} value={client._id}>
                                                    {client.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="apartment" className='form-label block text-neutral font-bold text-start'>Apartment</label>
                                        <select
                                            id="apartment"
                                            name="apartment"
                                            className='form-group w-full p-2 border rounded-md'
                                            value={editingPayment ? editingPayment.apartment : ''}
                                            onChange={handleChangeEdit}
                                        >
                                            <option value="" >Select an apartment</option>
                                            {apartments.map((apartment) => (
                                                <option key={apartment._id} value={apartment._id}>
                                                    {apartment.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="amount" className="form-label block font-bold text-start">
                                            Amount
                                        </label>
                                        <input
                                            type="number"
                                            id="amount"
                                            name="amount"
                                            className="form-input w-full p-2 border rounded-md"
                                            value={editingPayment ? editingPayment.amount : ''}
                                            onChange={handleChangeEdit}
                                        />
                                    </div>
                                    {/* <div className="mb-4">
                                    <label htmlFor="user" className="form-label block font-bold text-start">
                                        Client
                                    </label>
                                    <input
                                        type="tel"
                                        id="user"
                                        name="user"
                                        className="form-input w-full p-2 border rounded-md"
                                        value={payment.user}
                                        onChange={handleChange}
                                    />
                                </div> */}
                                    <div className='flex justify-end'>
                                        <button type="submit" className="btn mr-4">Submit</button>
                                        <button type="button" className="btn" onClick={closeModal}>Close</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </dialog>
                )}

                <table className="table">
                    <thead>
                        <tr className='bg-neutral text-white'>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>CLIENT</th>
                            <th>APARTMENT</th>
                            <th>AMOUNT</th>
                            <th>DATE</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={index}>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src="/tailwind-css-component-profile-2@56w.png" alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            {/* <div className="font-bold">{payment.user}</div> */}
                                            <div className="font-bold">{clients.find(user => user._id === payment.user)?.name || 'N/A'}</div>
                                            {/* <div className="text-sm opacity-50">{client.email}</div> */}
                                        </div>
                                    </div>
                                </td>
                                {/* <td>{payment.apartment}</td> */}
                                <td>{apartments.find(apartment => apartment._id === payment.apartment)?.name || 'N/A'}</td>
                                <td>{payment.amount}</td>
                                {/* <td>{payment.date}</td> */}
                                <td>{new Date(payment.date).toLocaleDateString()}</td>
                                <th>
                                    <button className="btn btn-ghost btn-xs" onClick={() => handleEdit(payment)}>
                                        <FaEdit style={{ color: 'blue' }} size={13} />
                                    </button>
                                    <button className="btn btn-ghost btn-xs" onClick={() => handleDelete(payment._id)}>
                                        <FaTrash style={{ color: 'red' }} size={13} />
                                    </button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TablePaym