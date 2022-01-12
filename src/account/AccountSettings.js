

export default function AccountSettings() {
    return (
        <div id="holder-of-the-acc" className="flex flex-row mb-4">
            <div id="left" className="w-48 h-48 mr-4 bg-slate-300">
                <p>img</p>
            </div>
            <div id="middle" className="mr-4 mt-3">
                <div className="flex flex-row mb-3">
                    <div className="border-4 w-56 h-10 mr-36">
                        <p>Username</p>
                    </div>
                    {/* <div className="ml-3 w-28 h-10 bg-green-200 hover:bg-purple-200">
                        <p>log out</p>
                    </div> */}
                    <div className="ml-3 w-10 h-10 bg-green-200 hover:bg-purple-200">
                        <p>S</p>
                    </div>
                </div>
                <div className="border-4 w-auto h-32">
                    <p>short bio</p>
                </div>
            </div>
            <div id="right" className="w-56 mt-7 text-center">
                <h3 className="text-2xl mb-4">Don't know where to start?</h3>
                <div className="w-44 h-9 ml-7 bg-green-200 hover:bg-purple-200">
                    <p className="pt-1 text-lg text-center">Read the manual!</p>
                </div>
            </div>
        </div>
    );
}