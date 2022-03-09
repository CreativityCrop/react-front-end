export default function Team() {
    return(
        <div className="flex flex-wrap justify-center items-center mt-28 sm:pb-10 py-14 px-4 md:px-0 gap-16 md:gap-6 bg-yankeesblue text-slate-300"> 
            <img src="./assets/illustrations/lilbuddy3.png" alt="friendly triangle person" className="w-48 object-contain"/>
            <div className="sm:grow sm:w-full text-center w-80 sm:mt-10">
                <h1 className="text-3xl mb-4">Our Team</h1>
                <h3 className="mb-6">Here at CreativityCrop we have two very hard-working employees who also happen to be the owners of the company.</h3>
                <div className="flex justify-between space-x-14 mb-6">
                    <h3>Georgi is the back-end developer for our site, as well as a front-end helper.</h3>
                    <h3>Zori is responsible for the front-end development of the site, as well as a designer.</h3>
                </div>
                <h3 className="">The two started the company as good friends at the end of
                    their high-school career, before earning thousands of supporters all around the world.</h3>
                
            </div>
            <img src="./assets/illustrations/lilbuddy1.png" alt="friendly square person" className="w-48 object-contain"/>
        </div>
    );
}