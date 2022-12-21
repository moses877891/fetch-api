import { useContext, useEffect } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import DragElement from './drag-element.compoment';

import { read, utils } from 'xlsx';

import { FileContext } from '../context/file.context';


const DragFile = () => {
    const { setFile, fileName, setFileName, setLoading, loading } = useContext(FileContext);

    const fetchApi = async (form_name, newWorkSheet, index) => {
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
            .then(res => setFile(res));
    }

    const handleChange = async (file) => {
        setLoading(true);
        setFileName(file.name);
        const data = await file.arrayBuffer();
        const workbook = read(data);
        const workSheet = workbook.Sheets[workbook.SheetNames[0]];
        const newWorkSheet = utils.sheet_add_aoa(workSheet, [['gender']], { origin: "B1" });
        const jsonData = utils.sheet_to_json(newWorkSheet);
        jsonData.forEach(async (name) => {
            const index = name.__rowNum__ + 1;
            await fetchApi(name.Name, newWorkSheet, index);
            if (name.__rowNum__ === jsonData.length) {
                setLoading(false);
            }
        })
    };

    return (
        <div>
            <FileUploader
                handleChange={handleChange}
                name="file"
                label="upload your excel sheet Drag and Drop file"
                dropMessageStyle={{ backgroundColor: 'green' }}
                children=<DragElement name={fileName} />
            />

        </div>
    );
}

export default DragFile;