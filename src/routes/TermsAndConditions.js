import AuthProvider from '../AuthAPI';

export default function TermsAndConditions() {
    return (
        <div id="terms-conditions" className="flex flex-col gap-4 p-3 mt-3 pr-4 mb-20 text-justify">
            <AuthProvider/>
            <h1 className="text-4xl font-bold text-center mb-3">Terms of Service</h1>
            <div id="introduction">
                <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                <p>
                    Please read these terms of service carefully before using CrativityCrop
                    website operated by CreativityCrop LLC.
                </p>
            </div>
            <div id="definitions">
                <h2 className="text-2xl font-bold mb-4">Definitions</h2>
                <p>For the purposes of this Terms of Service:</p>
                <ul className="list-disc list-inside">
                    <li className="mt-3">
                        <strong>Company</strong> (also referred to as "We", "Us" or "Our") refers to CreativityCrop LLC.
                    </li>
                    <li className="mt-3">
                        <strong>You </strong> (also referred to as “User”) refers to the individual accessing or using the <strong>service</strong>, or the company, or other legal entity on behalf of which such individual is accessing or using the <strong>service</strong>, as applicable.
                    </li>
                    <li className="mt-3">
                        <strong>Service</strong> (also referred as “Application”, “Website” or “Product”) refers to the web software program, named CreativityCrop and accessible at <a href={process.env.REACT_APP_URL}>https://creativitycrop.tech</a>, provided by the <strong>company </strong>and used by <strong>you</strong> on any device
                    </li>
                    <li className="mt-3">
                        <strong>Account</strong> means a unique account created for <strong>you</strong> to access our <strong>service</strong>.
                    </li>
                    <li className="mt-3">
                        <strong>Cookies</strong> are small files that are placed on <strong>your</strong> device by a website, containing the details of <strong>your</strong> browsing history on that website among its many uses.
                    </li>
                    <li className="mt-3">
                        <strong>Personal Data</strong> is any information that relates to an identified or identifiable individual.
                    </li>
                    <li className="mt-3">
                        <strong>Usage Data</strong> refers to data collected automatically, either generated using the <strong>service</strong> or from the <strong>service</strong> infrastructure itself (for example, the duration of a page visit).
                    </li>
                    <li className="mt-3">
                        <strong>Privacy Policy </strong> refers to the document published at <a href={process.env.REACT_APP_URL + "/privacy-policy"}>https://creativitycrop.tech/privacy-policy</a>
                    </li>
                    <li className="mt-3">
                        <strong>Service Provider</strong> means any natural or legal person who processes data on behalf of the	<strong>company</strong>. It refers to third-party companies or individuals employed by the <strong>company</strong> to facilitate the <strong>service</strong>, to provide the <strong>service</strong> on behalf of the <strong>company</strong>, to perform services related to the <strong>service</strong> or to assist the <strong>company</strong> in analyzing how the <strong>service</strong> is used.
                    </li>
                    <li className="mt-3">
                        <strong>Idea </strong> refers to the representation of thought in written form. On our platform it consists of Title, Image, Short description, Long description, Categories, Uploaded Files and Price.
                    </li>
                </ul>
            </div>
            <div id="description">
                <h2 className="text-2xl font-bold mb-4">Description</h2>
                <p>
                    Our <strong>service</strong> provides platform for publishing and monetizing intellectual property in the form of an <strong>idea</strong>. The <strong>user</strong>, referred to as the Seller, submits an <strong>idea</strong> and waits for another <strong>user</strong>, referred to as the Buyer, to purchase the <strong>idea</strong>. All the <strong>ideas</strong> for sale are listed in a marketplace, where only Title, Image, Short description, Categories and Price are available to access publicly. Payment is processed by the	<strong>service provider</strong> “Stripe Payments Europe, Ltd.”. When the transaction is successful the <strong>idea</strong> is then transferred to the <strong>buyer</strong>’s <strong>account</strong>. The <strong>buyer</strong> can access the full <strong>idea</strong> and is able to use the intellectual property as they will. The <strong>seller</strong> must request a payout through their account to receive the funds. Some amounts from the received amount may be deducted to allow complying wiht local or other tax laws. <strong>CreativityCrop</strong> takes a 3 percent stake from the traded price.
                </p>
            </div>
            <div id="conditions-of-use">
                <h2 className="text-2xl font-bold mb-4">Conditions of use</h2>
                <p>
                    By using our app, you certify that you have read and reviewed this Agreement and our <strong>service providers</strong>’ terms of use and that you agree to comply with the terms of both. If you do not want to be bound by the terms, you are advised to leave the	<strong>website</strong> accordingly. The <strong>company</strong> only grants use and access of this <strong>website</strong>, its products, and its services to those who have accepted its terms and those of its <strong>service providers</strong>.
                </p>
            </div>
            <div id="privacy-policy">
                <h2 className="text-2xl font-bold mb-4">Privacy policy</h2>
                <p>
                    Before you continue using our <strong>website</strong>, we advise you to read our <strong>Privacy Policy</strong> regarding our user data collection. It will help you better understand our practices. By agreeing to this document, you agree to our <strong>Privacy Policy </strong>as well.
                </p>
            </div>
            <div id="age-restriction">
                <h2 className="text-2xl font-bold mb-4">Age restriction</h2>
                <p>
                    Our <strong>service</strong> does not have age requirements for its usage, but our <strong>service providers</strong> do. By using this	<strong>service</strong>, you warrant that you are satisfying the Age restrictions of our <strong>service providers</strong>. The <strong>company</strong> assumes no responsibility for liabilities related to age misrepresentation.
                </p>
            </div>
            <div id="intellectual-property">
                <h2 className="text-2xl font-bold mb-4">Intellectual property</h2>
                <p>
                    By publishing an <strong>idea</strong>, <strong>you</strong> agree that you lose all intellectual property over the content you have uploaded and published, in exchange for financial gain. The <strong>company</strong> assumes no responsibility for liabilities and misuse of the <strong>service</strong> either by	<strong>you</strong> or on behalf of <strong>you</strong>, regarding intellectual property claims<strong>.</strong>
                </p>
                <p>
                    You agree that all the content except the published	<strong>ideas</strong> on the <strong>website</strong> is the property of <strong>company</strong>, its affiliates, directors, officers, employees, agents, suppliers, or licensors including all copyrights, trade secrets, trademarks, patents, and other intellectual property. You also agree that you will not reproduce or redistribute the [name]’s intellectual property in any way, including electronic, digital, or new trademark registrations.
                </p>
            </div>
            <div id="user-accounts">
                <h2 className="text-2xl font-bold mb-4">User accounts</h2>
                <p>
                    As a <strong>user</strong> of this website, you may be asked to register with us and provide private information. You are responsible for ensuring the accuracy of this information, and you are responsible for maintaining the safety and security of your identifying information. You are also responsible for all activities that occur under your account or password.
                </p>
                <p>
                    If you think there are any possible issues regarding the security of your account on the website, inform us immediately so we may address it accordingly.
                </p>
                <p>
                    We reserve all rights to terminate accounts, edit or remove content and cancel orders in their sole discretion.
                </p>
            </div>
            <div id="applicable-laws">
                <h2 className="text-2xl font-bold mb-4">Applicable law</h2>
                <p>
                    By visiting this website, you agree that the laws of the <strong>Republic of Bulgaria</strong>, without regard to principles of conflict laws, will govern these terms and conditions, or any dispute of any sort that might come between the <strong>company</strong> and <strong>you</strong>, or its business partners and associates.
                </p>
            </div>
            <div id="disputes">
                <h2 className="text-2xl font-bold mb-4">Disputes</h2>
                <p>
                    Any dispute related in any way to your visit to this website or to products
                    you purchase from us shall be arbitrated by state or federal court of the	<strong>Republic of Bulgaria</strong> and you consent to exclusive
                    jurisdiction and venue of such courts.
                </p>
            </div>
            <div id="indemnification">
                <h2 className="text-2xl font-bold mb-4">Indemnification</h2>
                <p>
                    You agree to indemnify the <strong>company</strong> and its
                    affiliates and hold the <strong>company</strong> harmless against
                    legal claims and demands that may arise from <strong>your</strong>
                    use or misuse of our <strong>service</strong>. We reserve the
                    right to select our own legal counsel.
                </p>
            </div>
            <div id="limitation-on-liability">
                <h2 className="text-2xl font-bold mb-4">Limitation on liability</h2>
                <p>
                    The <strong>company</strong> is not liable for any damages that
                    may occur to you as a result of your misuse of our	<strong>website</strong>.
                </p>
                <p>
                    The <strong>company</strong> reserves the right to edit, modify,
                    and change this Agreement any time. We shall let our	<strong>users</strong> know of these changes through electronic
                    mail. This Agreement is an understanding between the	<strong>company</strong> and the <strong>user</strong>,
                    and this supersedes and replaces all prior agreements regarding the use of
                    this <strong>website</strong>.
                </p>
            </div>
        </div>
    );
}