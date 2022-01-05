import { verifyToken } from '../AuthAPI';
import { useEffect } from 'react'

import SubmitIdea from './sellview/SubmitIdea'
import SubmitTutorial from './sellview/SubmitTutorial'


export default function SellView() {

    useEffect(() => {
        verifyToken();
    }, []);

    return (
        <div className="flex flex-row">
            <div className="basis-3/4">
                <SubmitIdea/>
            </div>
            <div className="basis-1/4">
                <SubmitTutorial/>
            </div>
        </div>
    );
}