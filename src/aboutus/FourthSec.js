export default function FourthSec(){
    return(
        <div className="flex justify-center bg-maxbluepurple">
            <div className="w-fit grid grid-cols-2 gap-x-24 sm:gap-x-5 gap-y-6 items-center p-6 ">
                <h3 className="w-56 sm:w-44 text-center ">You may wonder how this unique idea came to us? wWell, we 
                were a part of a national IT competition</h3>
                <div className="h-36 w-56 overflow-hidden">
                    <img alt="small img" src="./assets/Illustrations/1.png" className="scale-150 object-cover"/>
                </div>
                <div className="h-36 w-56 overflow-hidden">
                    <img alt="small img" src="./assets/Illustrations/3.png" className="scale-150 object-cover"/>
                </div>
                <h3 className="w-64 sm:w-44 text-center">and CreativityCrop happens to be our project just for that competition.
                After many sleepless nights and many hardworking hours, our idea came to life.</h3>
            </div>
        </div>
    );
}