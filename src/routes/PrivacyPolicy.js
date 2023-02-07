import AuthProvider from '../AuthAPI';

export default function PrivacyPolicy() {
    return (
        <div id="privacy-policy" className="flex flex-col gap-4 p-3 mt-3 pr-4 mb-20 text-justify">
            <AuthProvider/>
            <h1 className="text-4xl font-bold text-center mb-3">Privacy policy</h1>
            <div id="introduction">
                <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                <p>
                    This privacy policy describes our policies and procedures on the
                    collection, use and disclosure of your information when you use the service
                    and tells you about your privacy rights and how the law protects you.
                </p>
                <p>
                    We use your personal data to provide and improve the service. By using the
                    service, you agree to the collection and use of information in accordance
                    with this privacy policy.
                </p>
            </div>
            <div id="definitions">
                <h2 className="text-2xl font-bold mb-4">Definitions</h2>
                <p>For the purposes of this privacy policy:</p>
                <ul className="list-disc list-inside">
                    <li className="mt-3">
                        <strong>Company</strong> (also referred to as "we", "us" or "our") refers to CreativityCrop LLC.
                    </li>
                    <li className="mt-2">
                        <strong>You </strong> (also referred to as “user”) refers to the individual accessing or using the <strong>service</strong>, or the company, or other legal entity on behalf of which such individual is accessing or using the <strong>service</strong>, as applicable.
                    </li>
                    <li className="mt-2">
                        <strong>Service</strong> (also referred as “application”, “website” or “product”) refers to the web software program, named CreativityCrop and accessible at <a href={process.env.REACT_APP_URL}>https://creativitycrop.tech</a>, provided by the <strong>company </strong>and used by <strong>you</strong> on any device
                    </li>
                    <li className="mt-2">
                        <strong>Service provider</strong> means any natural or legal person who processes data on behalf of the <strong>company</strong>. It refers to third-party companies or individuals employed by the <strong>company</strong> to facilitate the <strong>service</strong>, to provide the <strong>service</strong> on behalf of the <strong>company</strong>, to perform services related to the <strong>service</strong> or to assist the <strong>company</strong> in analysing how the <strong>service</strong> is used.
                    </li>
                    <li className="mt-2">
                        <strong>Personal data</strong> is any information that relates to an identified or identifiable individual.
                    </li>
                    <li className="mt-2">
                        <strong>Usage data</strong> refers to data collected automatically, either generated using the <strong>service</strong> or from the <strong>service</strong> infrastructure itself (for example, the duration of a page visit).
                    </li>
                    <li className="mt-2">
                        <strong>Account</strong> means a unique account created for <strong>you</strong> to access our <strong>service</strong>.
                    </li>
                </ul>
            </div>
            <div id="collecting">
                <h2 className="text-2xl font-bold mb-4">Collecting and using your personal data</h2>
                <h3 className="text-xl font-bold mb-4">Types of data collected</h3>
                <h4 className="text-lg font-bold mb-4">Personal data</h4>
                <p>
                    While using our <strong>service</strong>, <strong>we</strong> may ask <strong>you</strong> to provide <strong>us</strong> with certain personally identifiable information that can be used to contact or identify <strong>you</strong>. Personally identifiable information may include, but is not limited to:
                </p>
                <ul className="list-disc list-inside">
                    <li className="mt-2">
                        Email address
                    </li>
                    <li className="mt-2">
                        First name and last name
                    </li>
                </ul>
                <p>Usage data is collected automatically when using the service.</p>
                <h4 className="text-lg font-bold mb-4">Usage data</h4>
                <p>
                    Usage data may include information such as <strong>your</strong> device's internet protocol address (e.g., IP address), browser type, browser version, the pages of our <strong>service</strong> that <strong>you</strong> visit, the time and date of <strong>your</strong> visit, the time spent on those pages, unique device identifiers and other diagnostic data.
                </p>
                <p>
                    When <strong>you</strong> access the <strong>service</strong> by or through a mobile device, <strong>we</strong> may collect certain information automatically, including, but not limited to, the type of mobile device you use, your mobile device unique id, the IP address of <strong>your</strong> mobile device, <strong>your</strong> mobile operating system, the type of mobile internet browser <strong>you</strong> use, unique device identifiers and other diagnostic data.
                </p>
                <p>
                    <strong>We</strong> may also collect information that <strong>your</strong> browser sends whenever <strong>you</strong> visit our <strong>service</strong> or when <strong>you</strong> access the service by or through a mobile device.
                </p>
                <h4 className="text-lg font-bold mb-4">Use of your personal data</h4>
                <p>The <strong>company</strong> may use <strong>personal data</strong> for the following purposes:</p>
                <ul className="list-disc list-inside">
                    <li className="mt-2">
                        To provide and maintain our <strong>service</strong>, including to monitor the usage of our <strong>service</strong>.
                    </li>
                    <li className="mt-2">
                        To manage <strong>your account</strong>: the<strong>personal data you</strong> provide can give<strong>you</strong> access to different functionalities of the <strong>service</strong> that are available to <strong>you</strong> as a registered user.
                    </li>
                    <li className="mt-2">
                        For the performance of a contract: the development, compliance and undertaking of the purchase contract for the products, items, or services you have purchased or of any other contract with <strong>us</strong> through the <strong>service</strong>.
                    </li>
                    <li className="mt-2">
                        To contact <strong>you</strong>: to contact <strong>you</strong> by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products, or contracted services, including the security updates, when necessary or reasonable for their implementation.
                    </li>
                    <li className="mt-2">
                        To manage <strong>your</strong> requests: to attend and manage <strong>your</strong> requests to <strong>us</strong>.
                    </li>
                    <li className="mt-2">
                        For other purposes: <strong>we</strong> may use your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our <strong>service</strong>, products, services, marketing, and your experience.
                    </li>
                </ul>
                <p><strong>We</strong> may share <strong>your</strong> personal information in the following situations:</p>
                <ul className="list-disc list-inside">
                    <li className="mt-2">
                        With <strong>service providers</strong>: <strong>we</strong> may share <strong>your</strong> personal information with <strong>service providers</strong> to allow certain functions to work on our <strong>service</strong> and analyse the use of our <strong>service</strong>.
                    </li>
                    <li className="mt-2">
                        With <strong>your</strong> consent: <strong>we</strong> may disclose<strong>your</strong> personal information for any other purpose with <strong>your</strong> consent.
                    </li>
                </ul>
            </div>
            <h2 className="text-2xl font-bold mb-4">Retention of your personal data</h2>
            <p>
                <strong>The company</strong> will retain <strong>your personal data</strong> only for as long as is necessary for the purposes set out in this <strong>privacy policy</strong>. <strong>We</strong> will retain and use <strong>your</strong>    <strong>personal data</strong> to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.
            </p>
            <p>
                <strong>The company</strong> will also retain <strong>usage data</strong> for internal analysis purposes. <strong>Usage data</strong> is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of <strong>our service</strong>, or <strong>we</strong> are legally obligated to retain this data for longer time periods.
            </p>
            <h2 className="text-2xl font-bold mb-4">Transfer of your personal data</h2>
            <p>
                <strong>Your</strong> information may be transferred to — and maintained on — computers located outside of <strong>your</strong> state, province, country, or other governmental jurisdiction where the data protection laws may differ than those from <strong>your</strong> jurisdiction.
            </p>
            <p>
                <strong>Your</strong> consent to this <strong>privacy policy</strong> followed by <strong>your</strong> submission of such information represents <strong>your</strong> agreement to that transfer.
            </p>
            <p>
                <strong>The company</strong> will take all steps reasonably necessary to ensure that <strong>your</strong> data is treated securely and in accordance with this <strong>privacy policy</strong> and no transfer of <strong>your personal data</strong> will take place to an organization or a country unless there are adequate controls in place including the security of <strong>your</strong> data and other personal information.
            </p>
            <h2 className="text-2xl font-bold mb-4">Disclosure of your personal data</h2>
            <h4 className="text-lg font-bold mb-4">Business transactions</h4>
            <p>
                If the <strong>company</strong> is involved in a merger, acquisition or asset sale, <strong>your personal data</strong> may be transferred. We will provide notice before    <strong>your personal data</strong> is transferred and becomes subject to a different <strong>privacy policy</strong>.
            </p>
            <h4 className="text-lg font-bold mb-4">Law enforcement</h4>
            <p>
                Under certain circumstances, the <strong>company</strong> may be required to disclose <strong>your personal</strong>    <strong>data</strong> if required to do so by law or in response to valid requests by public authorities (e.g., A court or a government agency).
            </p>
            <h4 className="text-lg font-bold mb-4">Other legal requirements</h4>
            <p>
                <strong>The company</strong> may disclose <strong>your personal data</strong> in the good faith belief that such action is necessary to:
            </p>
            <ul className="list-disc list-inside">
                <li className="mt-2">
                    Comply with a legal obligation
                </li>
                <li className="mt-2">
                    Protect and defend the rights or property of the company
                </li>
                <li className="mt-2">
                    Prevent or investigate possible wrongdoing in connection with the service
                </li>
                <li className="mt-2">
                    Protect the personal safety of users of the service or the public
                </li>
                <li className="mt-2">
                    Protect against legal liability
                </li>
            </ul>
            <h2 className="text-2xl font-bold mb-4">Security of your personal data</h2>
            <p>
                The security of <strong>your personal data</strong> is important to <strong>us</strong> but remember that no method of transmission over the internet, or method of electronic storage is 100% secure. While <strong>we</strong> strive to use commercially acceptable means to protect <strong>your</strong>    <strong>personal data</strong>, <strong>we</strong> cannot guarantee its absolute security.
            </p>
            <h2 className="text-2xl font-bold mb-4">Children's privacy</h2>
            <p>
                Our <strong>service</strong> does not have age requirements for its usage, but our <strong>service providers</strong> do. If <strong>your</strong> jurisdiction requires from <strong>us</strong> strict rules for children’s privacy, <strong>we</strong> state that <strong>we</strong> do not knowingly collect personally identifiable information from minors. If you are a parent or guardian and you are aware that your child has provided us with <strong>personal data</strong>, please contact us. If<strong>we</strong> become aware that <strong>we</strong> have collected    <strong>personal data</strong> without verification of parental consent, <strong>we</strong> take steps to remove that information from our servers.
            </p>
            <p>
                If <strong>we</strong> need to rely on consent as a legal basis for processing your information and your country requires consent from a parent, we may require your parent's consent before we collect and use that information.
            </p>
            <h4 className="text-lg font-bold mb-4">Links to other websites</h4>
            <p>
                <strong>Our service</strong> may contain links to other websites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the <strong>privacy policy</strong> of every site you visit.
            </p>
            <p>
                <strong>We</strong> have no control over and assume no responsibility for the content, <strong>privacy policies</strong> or practices of any third-party sites or services.
            </p>
            <h2 className="text-2xl font-bold mb-4">Changes to this privacy policy</h2>
            <p>
                <strong>We</strong> may update our <strong>privacy policy</strong> from time to time. We will notify you of any changes by posting the new <strong>privacy policy</strong> on this page.
            </p>
            <p>
                <strong>We</strong> will let you know via email and/or a prominent notice on    <strong>our service</strong>, prior to the change becoming effective.
            </p>
            <p>
                <strong>You</strong> are advised to review this <strong>privacy policy</strong> periodically for any changes. Changes to this <strong>privacy</strong>    <strong>policy</strong> are effective when they are posted on this page.
            </p>
        </div>
    );
}