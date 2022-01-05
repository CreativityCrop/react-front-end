import AuthProvider from '../AuthProvider';
import SubmitIdea from './sellview/SubmitIdea'
import SubmitTutorial from './sellview/SubmitTutorial'


export default function SellView() {

    return (
        <div className="flex flex-row">
            <AuthProvider/>
            <div className="basis-3/4">
                <SubmitIdea/>
            </div>
            <div className="basis-1/4">
                <SubmitTutorial/>
            </div>
        </div>
    );
}