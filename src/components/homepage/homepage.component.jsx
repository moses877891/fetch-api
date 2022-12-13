import axios from "axios";
import { useState } from "react";
import Spinner from "../spinner/spinner.component";

const defaultForm = {
    name: ''
}

const Homepage = () => {
    const [formField, setFormField] = useState(defaultForm);
    const [nameDetails, setNameDetails] = useState('');
    const [loading, setLoading] = useState(false);
    const { name } = formField;
    const { gender, probability } = nameDetails;

    const fetchApi = async (form_name) => {
        setLoading(!loading);
        const example_fetch = await axios.get(`https://api.genderize.io/?name=${form_name}`)
            .then(response => response.data)
            .finally(() => setLoading(false));
        setNameDetails(example_fetch);
        console.log(example_fetch);
    }

    // const fetchApi = async (form_name) => {
    //     setLoading(!loading);
    //     const example_fetch = await fetch(`https://api.genderize.io/?name=${form_name}`)
    //         .then(response => response)
    //         .then(response => response.json())
    //         .finally(() => setLoading(false));
    //     setNameDetails(example_fetch);
    // }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormField({
            ...formField,
            [name]: value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchApi(name);
    }

    return (
        <>
            {
                loading ? <Spinner /> : (
                    <div className="mt-4">
                        <p className='text-center font-medium text-2xl text-neutral-900'>Predict Gender</p>
                        <div className='grid grid-cols-2 max-md:grid-cols-1'>
                            <div>
                                <form onSubmit={handleSubmit} className="mx-4 mt-4 flex flex-col">
                                    <label>Enter name:</label>
                                    <input className='border border-black w-1/2 
                                    rounded-md text-neutral-500'
                                        type='text' value={name} name='name' onChange={handleChange} required
                                    />
                                    <button type='submit' className=' uppercase w-1/3
                                     bg-neutral-600 text-neutral-100 rounded-md my-3 p-1'>
                                        predict gender</button>
                                </form>
                            </div>
                            <div>
                                <div className='mx-4 mt-4 flex flex-col'>
                                    <span>Gender: {gender}</span>
                                    <span>probability: {probability} </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Homepage;