import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { useContext } from 'react';

import { FileContext } from '../context/file.context';

const ExportCSV = () => {
    const { file } = useContext(FileContext);

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (file, fileName) => {
        if (!file) return
        const ws = XLSX.utils.json_to_sheet(file);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <button variant="warning" type="submit" className='uppercase w-1/3
        bg-neutral-600 text-neutral-100 rounded-md my-8 p-1'
            onClick={(e) => exportToCSV(file, 'gender-generator')}>Export</button>
    )
}

export default ExportCSV;