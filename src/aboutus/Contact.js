

export default function Contact() {
    return(
        <div>
            <div className="flex flex-col gap-6 justify-center bg-maxbluepurple items-center p-6 ">
                <h1 className="text-3xl text-center">Contact</h1>
                <h3 className="px-52 sm:px-20 text-center">
                    If you want to contact us, click the button below. We will get back to you in the shortest time possible!
                </h3>
                <a rel="noopener noreferrer" href="mailto:contact@creativitycrop.tech" target="_blank" className="px-10 py-2 bg-jasmine hover:bg-amber-500
                hover:scale-105 hover:origin-bottom hover:-rotate-3 hover:drop-shadow-xl transition duration-150">Get in touch</a>
            </div>
        </div>
    );
}