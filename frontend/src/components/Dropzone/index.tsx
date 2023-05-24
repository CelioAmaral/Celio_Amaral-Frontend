import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Text from "../Text";

interface DropzoneProps {
    onFileUploaded: (file: File) => void;
}

function Dropzone({ onFileUploaded }: DropzoneProps) {
    const [selectedFileUrl, setSelectedFileUrl] = useState("")

    const onDrop = useCallback((acceptedFile: any[]) => {
        const file = acceptedFile[0];

        const fileURL = URL.createObjectURL(file);

        setSelectedFileUrl(fileURL);
        onFileUploaded(file);
    },
        [onFileUploaded]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div className="flex mt-4" {...getRootProps()}>
            <input {...getInputProps()} />

            {selectedFileUrl ? (
                <img src={selectedFileUrl} className="max-h-96 rounded-lg" />
            ) : <Text size="sm">Arraste a imagem para esse local</Text>}
        </div>
    );
}

export default Dropzone;