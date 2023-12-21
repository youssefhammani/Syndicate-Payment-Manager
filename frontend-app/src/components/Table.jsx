import React, { useEffect, useState } from 'react'
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
import { set } from 'mongoose';
// import PropTypes from 'prop-types';

// Table.propTypes = {
//     clients: PropTypes.array.isRequired,
//     addClient: PropTypes.func.isRequired,
// };


const Table = ({ clients, addClient, deleteClient, updateClient }) => {
    const [editingClient, setEditingClient] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [client, setClient] = useState({
        name: '',
        email: '',
        phoneNumber: '',
    });

    const handleChange = (e) => {
        setClient({ ...client, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("client", client);
            const response = await axios.post('http://localhost:3000/api/clients/create-client', client);
            console.log("response.data", response.data);
            addClient(response.data);
            setClient({
                name: '',
                email: '',
                phoneNumber: '',
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
                deleteClient(id);
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }

    const handleEdit = (client) => {
        setEditingClient(client);
        setIsModalOpen(true);
    }

    useEffect(() => {
        if (isModalOpen) {
            document.getElementById('my_modal_2').showModal()
        }
    }, [isModalOpen]);

    const handleChangeEdit = (e) => {
        setEditingClient({ ...editingClient, [e.target.name]: e.target.value });
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        updateClient(editingClient._id, editingClient);
        setEditingClient(null);
        setIsModalOpen(false);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }


    return (
        <>
            <div className='flex justify-end'>
                <button className="btn bg-blue-600 text-white mb-4" onClick={() => document.getElementById('my_modal_1').showModal()}>
                    Add Client <FaPlus />
                </button>
            </div>
            <div className="overflow-x-auto bg-base-100 shadow-lg rounded-box border border-base-300 ">
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Hello!</h3>
                        <p className="py-4">Press ESC key or click the button below to close</p>
                        <div className="">
                            <form method="dialog" onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="name" className="form-label block text-neutral font-bold text-start">
                                        Name:
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-input w-full p-2 border rounded-md"
                                        value={client.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="email" className="form-label block font-bold text-start">
                                        Email:
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-input w-full p-2 border rounded-md"
                                        value={client.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="phone" className="form-label block font-bold text-start">
                                        Phone Number:
                                    </label>
                                    <input
                                        type="tel"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        className="form-input w-full p-2 border rounded-md"
                                        value={client.phoneNumber}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="image" className="form-label block font-bold text-start">
                                        Image:
                                    </label>
                                    <input
                                        type="file"
                                        id="image"
                                        name="image"
                                        accept="image/*"
                                        className="form-input w-full p-2 border rounded-md"
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
                                        <label htmlFor="name" className="form-label block text-neutral font-bold text-start">
                                            Name:
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="form-input w-full p-2 border rounded-md"
                                            value={editingClient ? editingClient.name : ''}
                                            onChange={handleChangeEdit}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="email" className="form-label block font-bold text-start">
                                            Email:
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="form-input w-full p-2 border rounded-md"
                                            value={editingClient ? editingClient.email : ''}
                                            onChange={handleChangeEdit}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="phone" className="form-label block font-bold text-start">
                                            Phone Number:
                                        </label>
                                        <input
                                            type="tel"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            className="form-input w-full p-2 border rounded-md"
                                            value={editingClient ? editingClient.phoneNumber : ''}
                                            onChange={handleChangeEdit}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="image" className="form-label block font-bold text-start">
                                            Image:
                                        </label>
                                        <input
                                            type="file"
                                            id="image"
                                            name="image"
                                            accept="image/*"
                                            className="form-input w-full p-2 border rounded-md"
                                        />
                                    </div>
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
                            <th>PHONE NUMBER</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client, index) => (
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
                                            <div className="font-bold">{client.name}</div>
                                            <div className="text-sm opacity-50">{client.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>{client.phoneNumber}</td>
                                <th>
                                    <button className="btn btn-ghost btn-xs" onClick={() => handleEdit(client)}>
                                        <FaEdit style={{ color: 'blue' }} size={13} />
                                    </button>
                                    <button className="btn btn-ghost btn-xs" onClick={() => handleDelete(client._id)}>
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

export default Table