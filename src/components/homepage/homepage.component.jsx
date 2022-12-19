import { useState } from "react";
import { read, utils } from "xlsx";
// import { PickerOverlay } from 'filestack-react'

import ExportCSV from "../export-to-csv/export-to-csv.component";
import Spinner from "../spinner/spinner.component";

const Homepage = () => {
    const [list, setList] = useState();
    const [nameDetails, setNameDetails] = useState('');
    // const [isPicker, setIsPicker] = useState(false);
    const [loading, setLoading] = useState(false);


    // const fetchApi = async (form_name) => {
    //     setLoading(!loading);
    //     const example_fetch = await axios.get(`https://api.genderize.io/?name=${form_name}`)
    //         .then(response => response.data)
    //         .catch(() => alert('404 error'))
    //         .finally(() => setLoading(false));
    //     // setNameDetails(example_fetch);
    //     console.log(example_fetch);
    // }

    const fetchApi = async (form_name, newWorkSheet, index) => {
        setLoading(!loading);
        const example_fetch = await fetch(`https://api.genderize.io/?name=${form_name}`)
            .then(response => response.json())
            .then(res =>
                utils.sheet_add_json(newWorkSheet, [{ gender: `${res.gender}` }], {
                    header: ["gender"],
                    origin: `B${index}`,
                    skipHeader: true
                })
            )
            .then((res) => utils.sheet_to_json(res))
            .then(res => setList(res));
    }

    const handleChange = async (event) => {
        const files = event.target.files[0];
        setNameDetails(files.name);
        const data = await files.arrayBuffer();
        const workbook = read(data);
        const workSheet = workbook.Sheets[workbook.SheetNames[0]];
        const newWorkSheet = utils.sheet_add_aoa(workSheet, [['gender']], { origin: "B1" });
        const jsonData = utils.sheet_to_json(newWorkSheet);
        jsonData.forEach(async (name) => {
            const index = name.__rowNum__ + 1;
            await fetchApi(name.Name, newWorkSheet, index);
            if (jsonData.length === index) {
                setLoading(false);
            }
        })

        // setLoading(!loading);

        // await fetch('https://reqres.in/api/posts', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ jsonData })
        // })
        //     .then(response => response.json())
        //     .then(data => setFile(data));
        // setIsPicker(!isPicker);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // writeFile(convertedWorkSheet, "gender-generator", { compression: true })
    }

    return (
        <>
            {
                loading ? <Spinner /> : (
                    <div className="mt-4">
                        <p className=' mt-2 text-center font-medium text-2xl text-neutral-900 uppercase'>Predict Gender</p>
                        <form onSubmit={handleSubmit} className="mx-4 mt-20 flex flex-col items-center">
                            {/*<button type="button" onClick={handleChange}
                                className="p-5 rounded-xl bg-neutral-300 w-1/3">
                                Upload File
                            </button>*/}
                            <input type="file" onChange={handleChange} />
                            {/* fileName */}
                            <div className="px-4 my-2 relative text-slate-700 w-1/3 text-center">
                                {
                                    nameDetails && <p className="bg-stone-100 py-1 rounded-lg ">{nameDetails}</p>
                                }
                            </div>
                            {/*<button type='submit' className=' uppercase w-1/3
                                     bg-neutral-600 text-neutral-100 rounded-md my-2 p-1'>
                            Submit</button>*/}
                            {/* Filestack */}
                            {/*<div className="mt-4 relative">
                                {
                                    isPicker && (
                                        <PickerOverlay apikey="AejE2f2BNSjOmaMgcnJUhz"
                                            onSuccess={(res) => {
                                                setFile(res);
                                                setNameDetails(res.filesUploaded[0].filename);
                                                // setNameDetails(res);
                                                setIsPicker(!isPicker);
                                            }}
                                            pickerOptions={{
                                                onClose: () => setIsPicker(!isPicker)
                                            }}
                                        // onUploadDone={(res) => console.log(res)}
                                        />
                                    )
                                }
                            </div>*/}
                            <ExportCSV csvData={list} fileName="gender-generator" />
                        </form>
                    </div>
                )
            }
        </>
    )
}

export default Homepage;