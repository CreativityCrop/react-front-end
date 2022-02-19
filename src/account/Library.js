import BoughtIdeasList from './Library/BoughtIdeasList';
import SoldIdeasList from './Library/SoldIdeasList';

export default function Library() {
    return (
        <div id="library" className="flex flex-col justify-center gap-6">
            <h1 className=" pt-2 h-14 text-center bg-red-200 text-3xl">Library Overview</h1>
            <BoughtIdeasList/>
            <SoldIdeasList/>
        </div>
    );
}