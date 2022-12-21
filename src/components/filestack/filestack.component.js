import { PickerOverlay } from 'filestack-react'

const FileStack = ({ isPicker, setIsPicker, setFile, setNameDetails }) => {
    return (
        <div className="mt-4 relative">
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
        </div>
    )
}

export default FileStack;