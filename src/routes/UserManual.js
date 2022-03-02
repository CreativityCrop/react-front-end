import AuthProvider from '../AuthAPI';

export default function UserManual() {
    return (
        <div id="user-manual" className='flex flex-col gap-4 p-3 mt-3 pr-4 mb-20 text-justify select-none'>
            <AuthProvider/>
            <h1 className="text-4xl font-bold text-center mb-5">User Manual</h1>
            <div id="introduction">
                <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                    <p>
                    This User Manual will help you better understand how our platform 
                    CreativityCrop works and how to properly use it to its fullest extent.
                    We want you to have a pleasant scroll through our site, but also to be 
                    able to post anything, anytime you want. By the time you'd finished with 
                    this document, you'd know everything that one needs to know.</p>
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-4">Homepage</h2>
                    <p className="mb-5">
                    The homepage is the first thing you will come across after loading up our platform. On it, you can get 
                    a glimpse of the different options out marketplace provides, note some of the most liked ideas at the 
                    moment as well as get insight on whats on our about page.
                    </p>
                <h2 className="text-2xl font-bold mb-4">Creating an account</h2>
                    <div className="grid grid-cols-2 gap-20 mb-3">
                        <p className="mb-3">
                        But before you can use the marketplace, every user has to register, or if done that already, log into 
                        their account. On the Register page every proud future holder of an account must first input all their 
                        information before navigating down to the “Register” button. Once registering, the user will have to 
                        confirm their e-mail address. Of course, every user is expected to read our PrivacyPolicy document as well 
                        as our TermsAndConditions document, which can be found on the bottom of the page, beside out copyright mark.
                        </p>
                        <img src="./assets/User-manual/Creatinganaccount.png" alt="oh no" className="w-96 object-cover"/>
                    </div>
                    <div className="grid grid-cols-2 gap-20">
                        <img src="./assets/User-manual/login.png" alt="oh no" className="w-96 mt-10 object-cover"/>
                        <p className="mb-5">
                        Once that's done the new registered user will have to log into their new account by going to the “Log in” page. 
                        All you have to do is input your information in the specified fields before navigating down to the “log in” button. 
                        If a problem occurs, please check the spelling, if caps lock is on, or if the password is incorrect. If you happen 
                        to forget your password, you can take advantage of the “forgotten password?” function we provide. All you need to 
                        do is input your e-mail and within a few seconds, the user will be provided with a link on their e-mail address 
                        to a page to restart their password
                        </p>
                    </div>
                <h2 className="text-2xl font-bold mb-4">Marketplace</h2>
                    <div className="grid grid-cols-2 gap-20">
                        <p className="mb-5">
                        After successfully registering/logging in each user can use our marketplace fully. By navigating to the “Buy” 
                        tab, you can browse the newest updated ideas, as well as see the most liked ones on the bar on the right side 
                        of the screen. Under the “Sell” tab the user will be able to upload an idea to our marketplace
                        </p>
                        <img src="./assets/User-manual/buytab.png" alt="oh no" className="w-96 ml-8 -mt-2 object-cover"/>
                    </div>
                <h2 className="text-2xl font-bold mb-4">Idea construction</h2>
                    <div className="grid grid-cols-2">
                        <img src="./assets/User-manual/idea.png" alt="oh no" className="mt-11 object-cover"/>
                        <p className="mb-5">
                        Each idea consists of couple of things: header image, title, short description as well as a long description, 
                        categories, file list and a price. Depending on where you are in the site, each idea will also have a button 
                        at the bottom right of the box with varying text: “See more”; “Buy now”. Every idea you can see under the “Buy” 
                        tab of the marketplace will only show those attributes: header image, title, short description, categories, 
                        and a price. The long description and file lift will become available only after purchasing the idea. This is 
                        to ensure that no theft will happen
                        </p>
                    </div>
                <h2 className="text-2xl font-bold mb-4">Buying an idea</h2>
                    <div className="grid grid-cols-2">
                        <p className="mb-5 pr-3">
                        Navigating to the “Buy” tab you will be taken to a page that shows all ideas in the marketplace sorted by 
                        the newest uploaded ideas, as well as see the most liked ones on the bar on the right side of the screen. 
                        After clicking on the “See more” button, you will be able to read the full short description. By clicking 
                        on the “Buy now” button, a form will appear. The user will have to input their data before submitting and 
                        paying for it. If something occurs, that will cause you to close midway through inputting your data, you 
                        will have to navigate to the account page where a new box will have popped up. Using it, you can return 
                        to your idea and finish the payment. During this, your idea in ensured that won't be stolen, or someone 
                        to pay for it before you. After purchasing, the idea will appear in your account library under the 
                        “Bought Ideas” subtitle
                        </p>
                        <img src="./assets/User-manual/buying.png" alt="oh no" className="ml-2 mt-1 object-cover"/>
                    </div>
                <h2 className="text-2xl font-bold mb-4">Uploading an idea</h2>
                    <div className="grid grid-cols-2 gap-9">
                        <img src="./assets/User-manual/Sellidea.png" alt="oh no" className="scale-110 mt-3 object-cover"/>
                        <p className="mb-5">
                        Navigating to the “Sell” tab you will be taken to a page where you will have to fill out a form. You can 
                        select an image to upload as the heading image of the idea. Make sure it is accurate to the selling idea. 
                        The tittle has to be input as well, authentic to the idea. The short description has a limit of words - 
                        it has to be telling about the idea, without actually saying how to put it into action; how the buyer 
                        will benefit from it and why they should choose it. The long description will appear only to those who 
                        have bought your idea - it has to describe how to put the idea into action, how to use it and the essence 
                        of the idea. In the category field the user will have to input tags, relevant to the idea so more people 
                        can find it. In the file uploader, you can drag and drop or select a number of files that can benefit the 
                        buyer into using the idea. They have to be true to the idea's essence. The price is set by each user in 
                        American dollars. By clicking “Submit” the idea gets uploaded to the marketplace.
                        </p>
                    </div>
            </div>
        </div>
    );
}