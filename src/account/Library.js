import BoughtIdeasList from './Library/BoughtIdeasList';
import SoldIdeasList from './Library/SoldIdeasList';

export default function Library() {
    return (
        <div id="Library" className="w-fit sm:w-[23.5rem] sm:ml-2">
            <div className="pt-2 h-14  text-center bg-red-200">
                <h1 className="text-3xl">Library Overview</h1>
            </div>
            <BoughtIdeasList/>
            <SoldIdeasList/>
        </div>
    );
}