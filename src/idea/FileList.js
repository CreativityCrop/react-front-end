import { MAIN_API_URL, getToken } from '../AuthAPI';

export default function FileList(props) {
    function getFiles() {
        if(props.files === undefined) {
            return;
        }
        const filesArr = props.files.map( file => {
            return <File key={file.id} file={file}/>;
        });
        return filesArr;
    };
    return(
        <div>
            {getFiles()}
        </div>
    );
}


const downloadLink = (file_id) => MAIN_API_URL + "/files/download?file_id=" + file_id + "&token=" + getToken();


function File(props) {
    const getIcon = (contentType) => {
        switch(contentType) {
            case "image/svg+xml":
            case "image/jpeg":
            case "image/png":
                return "image.svg";
            case "audio/mpeg":
                return "audio.svg";
            case "video/mp4":
            case "video/mpeg":
                return "video.svg";
            case "text/plain":
            case "text/csv":
            case "application/json":
            case "application/xml":
                return "text.svg";
            case "application/pdf":
                return "pdf.svg";
            case "application/msword":
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                return "word.svg";
            case "application/vnd.ms-powerpoint":
            case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                return "powerpoint.svg";
            case "application/vnd.ms-excel":
            case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                return "excel.svg";
            case "application/vnd.rar":
            case "application/zip":
                return "archive.svg"
            default: return "text.svg"
        }
    }
    return(
        <div className="flex">
            <img 
                className="mr-4 flex-none w-10 h-10" 
                src={"/assets/icons/" + getIcon(props.file.content_type)} 
                alt={props.file.content_type}
            />
            <p className="mr-4 flex-auto w-64 self-center">
                {props.file.name.substring(0, 25) + (props.file.name.length<=25 ? "" : " ...")}
            </p>
            <a className="flex-initial self-center" href={downloadLink(props.file.id)} download>Download</a>
        </div>
    );
}