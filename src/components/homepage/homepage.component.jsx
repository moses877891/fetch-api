import { useContext } from "react";
import DragFile from "../drag-and-drop/drag-and-drop.component";
// import Dropzone from "../drag-and-drop/drag-drop-file.component";
// import { PickerOverlay } from 'filestack-react'

import { FileContext } from "../../context/file.context";

import ExportCSV from "../export-to-csv/export-to-csv.component";
import Spinner from "../spinner/spinner.component";

const Homepage = () => {
    const { file, loading, fileName } = useContext(FileContext);

    // const [isPicker, setIsPicker] = useState(false);


    // const fetchApi = async (form_name) => {
    //     setLoading(!loading);
    //     const example_fetch = await axios.get(`https://api.genderize.io/?name=${form_name}`)
    //         .then(response => response.data)
    //         .catch(() => alert('404 error'))
    //         .finally(() => setLoading(false));
    //     // setNameDetails(example_fetch);
    //     console.log(example_fetch);
    // }

    // const handleChange = async (event) => {
    //     const files = event.target.files[0];
    //     setNameDetails(files.name);
    //     const data = await files.arrayBuffer();
    //     const workbook = read(data);
    //     const workSheet = workbook.Sheets[workbook.SheetNames[0]];
    //     const newWorkSheet = utils.sheet_add_aoa(workSheet, [['gender']], { origin: "B1" });
    //     const jsonData = utils.sheet_to_json(newWorkSheet);
    //     jsonData.forEach(async (name) => {
    //         const index = name.__rowNum__ + 1;
    //         await fetchApi(name.Name, newWorkSheet, index);
    //         if (jsonData.length === index) {
    //             setLoading(false);
    //         }
    //     })

    // setLoading(!loading);

    // await fetch('https://reqres.in/api/posts', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ jsonData })
    // })
    //     .then(response => response.json())
    //     .then(data => setFile(data));
    // setIsPicker(!isPicker);
    // }

    const handleSubmit = async (event) => {
        event.preventDefault();
    }

    return (
        <>
            {
                loading ? <Spinner /> : (
                    <div className="mt-4">
                        <p className=' mt-2 text-center font-medium text-2xl text-neutral-900 uppercase'>
                            Predict Gender
                        </p>
                        <form onSubmit={handleSubmit} className="mx-4 mt-20 flex flex-col items-center">
                            <DragFile />
                            {
                                fileName && <ExportCSV csvData={file} fileName="gender-generator" />
                            }
                        </form>
                    </div>
                )
            }
        </>
    )
}

export default Homepage;