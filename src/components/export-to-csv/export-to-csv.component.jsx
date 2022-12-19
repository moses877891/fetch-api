import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const ExportCSV = ({ csvData, fileName }) => {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (csvData, fileName) => {
        if (!csvData) return
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <button variant="warning" type="submit" className='uppercase w-1/3
        bg-neutral-600 text-neutral-100 rounded-md my-2 p-1'
            onClick={(e) => exportToCSV(csvData, fileName)}>Export</button>
    )
}

export default ExportCSV;