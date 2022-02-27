import AuthProvider from '../AuthAPI';
import SubmitIdea from './sellview/SubmitIdea'
import SubmitTutorial from './sellview/SubmitTutorial'


export default function SellView() {

    return (
        <div id="sellview" className="flex flex-row select-none">
            <AuthProvider/>
            <div className="basis-3/4">
                <SubmitIdea/>
            </div>
            <div className='sm:hidden md:hidden -ml-4'>
                <SubmitTutorial/>
            </div>
        </div>
    );
}