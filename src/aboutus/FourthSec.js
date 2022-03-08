export default function FourthSec(){
    return(
            <div className="flex flex-col justify-center gap-10 p-8 bg-maxbluepurple xl:px-32">
                <div className="flex flex-wrap justify-center items-center gap-10">
                    <p className="text-center basis-1/2 break-words sm:order-1">
                        You may be wondering how this cool app came to life? Well, we were in search of a good project idea
                    </p>
                    <div className="h-36 w-56 overflow-hidden sm:order-2">
                        <img alt="" src="./assets/Illustrations/1.png" className="scale-150 object-cover"/>
                    </div>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-10">
                    <div className="h-36 w-56 overflow-hidden sm:order-4">
                        <img alt="" src="./assets/Illustrations/3.png" className="scale-150 object-cover"/>
                    </div>
                    <p className="text-center basis-1/2 break-words sm-order-3">
                        for an IT competition and came up with CreativityCrop. 
                        After many sleepless nights and many hours of hard work, our invention came to life.
                    </p>
                </div>
            </div>
    );
}