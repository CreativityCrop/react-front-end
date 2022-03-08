

export default function ThirdSec(){
    return(
            <div className="p-6 bg-jasmine">
                <h1 className="mb-7 text-3xl text-center">Our Sponsors</h1>
                <div className="flex flex-row justify-center gap-8 sm:grid grid-cols-2 sm:ml-14">
                    <a href="https://github.com/" target="_blank" rel="noopener noreferrer"
                    className="w-32 h-32 hover:scale-105 transition opacity-60 hover:opacity-100 duration-200 hover:cursor-pointer">
                        <img src="./assets/Sponsors/github.png" alt="github" className="pt-6"/>
                    </a>
                    <a href="https://www.mailgun.com/" target="_blank" rel="noopener noreferrer"
                    className="w-32 h-32 hover:scale-105 transition opacity-60 hover:opacity-100 duration-200 hover:cursor-pointer">
                        <img src="./assets/Sponsors/mailgun.png" alt="mailgun" className="pt-10"/>
                    </a>
                    <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" 
                    className="w-32 h-32 hover:scale-105 transition opacity-60 hover:opacity-100 duration-200 hover:cursor-pointer">
                        <img src="./assets/Sponsors/tailwind.png" alt="tailwind" className="scale-75"/>
                    </a>
                    <a href="https://stripe.com/" target="_blank" rel="noopener noreferrer" 
                    className="w-32 h-32 hover:scale-105 transition opacity-60 hover:opacity-100 duration-200 hover:cursor-pointer">
                        <img src="./assets/Sponsors/stripe.png" alt="stripe" className="pt-6"/>
                    </a>
                </div>
            </div>
    );
}