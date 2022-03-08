

export default function ThirdSec(){
    return(
            <div className="p-6 bg-jasmine">
                <h1 className="mb-7 text-3xl text-center">Built using the magic provided by</h1>
                <div className="flex flex-wrap justify-center gap-8">
                    <div
                        onClick={ () => window.open('https://github.com/', '_blank')}
                        className="flex items-center h-32 w-32 first-letter:hover:scale-105 transition opacity-60 hover:opacity-100 duration-200 hover:cursor-pointer"
                    >
                        <img src="./assets/Sponsors/github.png" alt="github"/>
                    </div>
                    <div
                        onClick={ () => window.open('https://reactjs.org/', '_blank')}
                        className="flex items-center h-32 w-32 first-letter:hover:scale-105 transition opacity-60 hover:opacity-100 duration-200 hover:cursor-pointer">
                        <img src="./assets/Sponsors/react.png" alt="react"/>
                    </div>
                    <div
                        onClick={ () => window.open('https://tailwindcss.com/', '_blank')}
                        className="flex items-center h-32 w-32 first-letter:hover:scale-105 transition opacity-60 hover:opacity-100 duration-200 hover:cursor-pointer">
                        <img src="./assets/Sponsors/tailwind.png" alt="tailwind"/>
                    </div>
                    <div
                        onClick={ () => window.open('https://stripe.com/', '_blank')}
                        className="flex items-center h-32 w-32 first-letter:hover:scale-105 transition opacity-60 hover:opacity-100 duration-200 hover:cursor-pointer">
                        <img src="./assets/Sponsors/stripe.png" alt="stripe"/>
                    </div>
                    <div
                        onClick={ () => window.open('https://www.mailgun.com/', '_blank')}
                        className="flex items-center h-32 w-32 first-letter:hover:scale-105 transition opacity-60 hover:opacity-100 duration-200 hover:cursor-pointer">
                        <img src="./assets/Sponsors/mailgun.png" alt="mailgun"/>
                    </div>
                    {/* <div
                        onClick={ () => window.open('https://www.mailgun.com/', '_blank')}
                        className="flex items-center h-32 w-32 first-letter:hover:scale-105 transition opacity-60 hover:opacity-100 duration-200 hover:cursor-pointer">

                    </div> */}
                </div>
            </div>
    );
}