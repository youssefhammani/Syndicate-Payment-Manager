import React, { useEffect, useState } from 'react'
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import axios from 'axios';
import Swal from 'sweetalert2';
import { set } from 'mongoose';

const TableApar = ({ apartments, addApartment, deleteApartment, updateApartment }) => {
    const [editingApartment, setEditingApartment] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [apartment, setApartment] = useState({
        name: '',
        description: '',
        price: '',
        city: '',
        address: '',
        rooms: '',
        floor: '',
        // reserved: '',
    });

    const handleChange = (e) => {
        setApartment({ ...apartment, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/apartments/create-apartment', apartment);
            console.log("response", response.data)
            addApartment(response.data);
            setApartment({
                name: '',
                description: '',
                price: '',
                city: '',
                address: '',
                rooms: '',
                floor: '',
                // reserved: '',
            });
        } catch (error) {
            console.log('There was an error!', error);
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
                deleteApartment(id);
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }

    const handleEdit = (apartment) => {
        setEditingApartment(apartment);
        setIsModalOpen(true);
    }

    useEffect(() => {
        if (isModalOpen) {
            document.getElementById('my_modal_2').showModal();
        }
    }, [isModalOpen]);

    const handleChangeEdit = (e) => {
        setEditingApartment({ ...editingApartment, [e.target.name]: e.target.value })
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        updateApartment(editingApartment._id, editingApartment)
        setEditingApartment(null);
        setIsModalOpen(false);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }


    return (
        <>
            <div className='flex justify-end'>
                <button className="btn bg-blue-600 text-white mb-4" onClick={() => document.getElementById('my_modal_1').showModal()}>
                    Add Apartment <FaPlus />
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
                                    <label htmlFor="name" className="form-label block text-neutral font-bold text-start">
                                        Name:
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-input w-full p-2 border rounded-md"
                                        value={apartment.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="description" className="form-label block font-bold text-start">
                                        description
                                    </label>
                                    <input
                                        type="text"
                                        id="description"
                                        name="description"
                                        className="form-input w-full p-2 border rounded-md"
                                        value={apartment.description}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="price" className="form-label block font-bold text-start">
                                        price
                                    </label>
                                    <input
                                        type="text"
                                        id="price"
                                        name="price"
                                        className="form-input w-full p-2 border rounded-md"
                                        value={apartment.price}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="city" className="form-label block font-bold text-start">
                                        city
                                    </label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        className="form-input w-full p-2 border rounded-md"
                                        value={apartment.city}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="price" className="form-label block font-bold text-start">
                                        address
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        className="form-input w-full p-2 border rounded-md"
                                        value={apartment.address}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="price" className="form-label block font-bold text-start">
                                        rooms
                                    </label>
                                    <input
                                        type="number"
                                        id="rooms"
                                        name="rooms"
                                        className="form-input w-full p-2 border rounded-md"
                                        value={apartment.rooms}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="price" className="form-label block font-bold text-start">
                                        floor
                                    </label>
                                    <input
                                        type="number"
                                        id="floor"
                                        name="floor"
                                        className="form-input w-full p-2 border rounded-md"
                                        value={apartment.floor}
                                        onChange={handleChange}
                                    />
                                </div>
                                {/* <div className="mb-4">
                                    <label htmlFor="price" className="form-label block font-bold text-start">
                                        reserved
                                    </label>
                                    <input
                                        type="text"
                                        id="reserved"
                                        name="reserved"
                                        className="form-input w-full p-2 border rounded-md"
                                        value={apartment.reserved}
                                        onChange={handleChange}
                                    />
                                </div> */}
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
                                            value={editingApartment ? editingApartment.name : ''}
                                            onChange={handleChangeEdit}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="description" className="form-label block font-bold text-start">
                                            description
                                        </label>
                                        <input
                                            type="text"
                                            id="description"
                                            name="description"
                                            className="form-input w-full p-2 border rounded-md"
                                            value={editingApartment ? editingApartment.description : ''}
                                            onChange={handleChangeEdit}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="price" className="form-label block font-bold text-start">
                                            price
                                        </label>
                                        <input
                                            type="text"
                                            id="price"
                                            name="price"
                                            className="form-input w-full p-2 border rounded-md"
                                            value={editingApartment ? editingApartment.price : ''}
                                            onChange={handleChangeEdit}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="city" className="form-label block font-bold text-start">
                                            city
                                        </label>
                                        <input
                                            type="text"
                                            id="city"
                                            name="city"
                                            className="form-input w-full p-2 border rounded-md"
                                            value={editingApartment ? editingApartment.city : ''}
                                            onChange={handleChangeEdit}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="price" className="form-label block font-bold text-start">
                                            address
                                        </label>
                                        <input
                                            type="text"
                                            id="address"
                                            name="address"
                                            className="form-input w-full p-2 border rounded-md"
                                            value={editingApartment ? editingApartment.address : ''}
                                            onChange={handleChangeEdit}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="price" className="form-label block font-bold text-start">
                                            rooms
                                        </label>
                                        <input
                                            type="number"
                                            id="rooms"
                                            name="rooms"
                                            className="form-input w-full p-2 border rounded-md"
                                            value={editingApartment ? editingApartment.rooms : ''}
                                            onChange={handleChangeEdit}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="price" className="form-label block font-bold text-start">
                                            floor
                                        </label>
                                        <input
                                            type="number"
                                            id="floor"
                                            name="floor"
                                            className="form-input w-full p-2 border rounded-md"
                                            value={editingApartment ? editingApartment.floor : ''}
                                            onChange={handleChangeEdit}
                                        />
                                    </div>
                                    {/* <div className="mb-4">
                                    <label htmlFor="price" className="form-label block font-bold text-start">
                                        reserved
                                    </label>
                                    <input
                                        type="text"
                                        id="reserved"
                                        name="reserved"
                                        className="form-input w-full p-2 border rounded-md"
                                        value={apartment.reserved}
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
                    {/* head */}
                    <thead>
                        <tr className='bg-neutral text-white'>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>APARTMENT</th>
                            {/* <th>DESCRIPTION</th> */}
                            <th>PRICE</th>
                            <th>CITY</th>
                            {/* <th>ADDRESS</th> */}
                            <th>ROOMS</th>
                            <th>FLOOR</th>
                            <th>RESERVED</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {apartments.map((apartment, index) => (
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
                                            <div className="font-bold">{apartment.name}</div>
                                        </div>
                                    </div>
                                </td>
                                {/* <td>{apartment.description}</td> */}
                                <td>{apartment.price}</td>
                                <td>{apartment.city}</td>
                                {/* <td>{apartment.address}</td> */}
                                <td>{apartment.rooms}</td>
                                <td>{apartment.floor}</td>
                                <td>
                                    <span className={`badge ${apartment.reserved ? 'badge-primary' : 'badge-secondary'} text-center text-white min-w-max`}>
                                        {apartment.reserved ? 'Reserved' : 'Not Reserved'}
                                    </span>
                                </td>
                                <th>
                                    <button className="btn btn-ghost btn-xs" onClick={() => handleEdit(apartment)}>
                                        <FaEdit style={{ color: 'blue' }} size={13} />
                                    </button>
                                    <button className="btn btn-ghost btn-xs" onClick={() => handleDelete(apartment._id)}>
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

export default TableApar