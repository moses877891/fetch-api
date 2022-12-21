

const DragElement = ({ name }) => {
    return (
        <div className=' border border-black border-dashed py-8 px-52'>
            {
                name ? (<span><span className="text-red-600">{name}</span> file uploaded</span>) : (
                    <div className="grid grid-cols-3">
                        <div className="flex flex-col">
                            <p className="text-neutral-500">
                                <span className="text-sm">
                                    Upload your Excel sheet
                                </span>
                            </p>
                            <span className="font-medium text-xl">Drag & Drop File</span>
                        </div>
                        <div className="text-center text-neutral-500">
                            <span>--or--</span>
                        </div>
                        <div>
                            <button className="bg-black text-white p-1 rounded-l-full rounded-r-full">
                                Browse Files
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default DragElement;