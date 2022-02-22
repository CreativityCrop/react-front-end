

export default function SecSec(){
    return(
        <div className="mt-28 sm:pb-10 flex flex-wrap justify-center items-center py-14 gap-16 md:gap-9 bg-yankeesblue text-slate-300"> 
            <img alt="" className="order-1 sm:order-2  bg-slate-300 w-44 h-64 "/>
            <div className="sm:grow sm:w-full order-2 sm:order-1 text-center w-80 sm:mt-10">
                <h1 className="text-3xl mb-4">Our Team</h1>
                <h3 className="mb-6">Here at CreativityCrop we have two very hard-working employees who also happen to be the owners of the company.</h3>
                <div className="flex justify-between space-x-14 mb-6">
                    <h3>Georgi is the back-end developer for our site, as well as a front-end helper.</h3>
                    <h3>Zori is responsible for the front-end development of the site, as well as a designer.</h3>
                </div>
                <h3 className="">The two started the company as good friends at the end of
                    their high-school career, before earning thousands of supporters all around the world.</h3>
                
            </div>
            <img alt="" className="order-3 sm:order-3 bg-slate-300 w-44 h-64 "/>
        </div>
    );
}