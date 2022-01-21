

export default function Footer() {
    return (
        <div id="footer" className="flex justify-center items-center mt-10 p-10 bg-indigo-100">
            <h1 className="text-center">© { (new Date()).getFullYear()} CreativityCrop</h1>
        </div>
    );
}