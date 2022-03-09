

export default function Tools() {
    return(
            <div className="p-6 bg-jasmine">
                <h1 className="mb-7 text-3xl text-center">Built using the magic provided by</h1>
                <div className="flex flex-wrap justify-center gap-8">
                    <div
                        onClick={ () => window.open('https://github.com/', '_blank')}
                        className="flex items-center h-32 w-32 first-letter:hover:scale-105 transition opacity-60 hover:opacity-100 duration-200 hover:cursor-pointer"
                    >
                        <img src="./assets/tech/github.png" alt="github"/>
                    </div>
                    <div
                        onClick={ () => window.open('https://reactjs.org/', '_blank')}
                        className="flex items-center h-32 w-32 scale-75 first-letter:hover:scale-105 transition opacity-60 hover:opacity-100 duration-200 hover:cursor-pointer">
                        <img src="./assets/tech/react.png" alt="react"/>
                    </div>
                    <div
                        onClick={ () => window.open('https://tailwindcss.com/', '_blank')}
                        className="flex items-center h-32 w-32 first-letter:hover:scale-105 transition opacity-60 hover:opacity-100 duration-200 hover:cursor-pointer">
                        <img src="./assets/tech/tailwind.png" alt="tailwind"/>
                    </div>
                    <div
                        onClick={ () => window.open('https://stripe.com/', '_blank')}
                        className="flex items-center h-32 w-32 first-letter:hover:scale-105 transition opacity-60 hover:opacity-100 duration-200 hover:cursor-pointer">
                        <img src="./assets/tech/stripe.png" alt="stripe"/>
                    </div>
                    <div
                        onClick={ () => window.open('https://www.mailgun.com/', '_blank')}
                        className="flex items-center h-32 w-32 first-letter:hover:scale-105 transition opacity-60 hover:opacity-100 duration-200 hover:cursor-pointer">
                        <img src="./assets/tech/mailgun.png" alt="mailgun"/>
                    </div>
                    {/* <div
                        onClick={ () => window.open('https://www.mailgun.com/', '_blank')}
                        className="flex items-center h-32 w-32 first-letter:hover:scale-105 transition opacity-60 hover:opacity-100 duration-200 hover:cursor-pointer">

                    </div> */}
                </div>
            </div>
    );
}