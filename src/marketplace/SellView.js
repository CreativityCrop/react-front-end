import AuthProvider from '../AuthAPI';
import SubmitIdea from './sellview/SubmitIdea'

export default function SellView() {

    return (
        <div id="sellview" className="flex flex-row select-none">
            <AuthProvider/>
            <SubmitIdea/>
        </div>
    );
}