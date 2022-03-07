import BoughtIdeasList from './Library/BoughtIdeasList';
import SoldIdeasList from './Library/SoldIdeasList';

// Component for user library
export default function Library() {
    return (
        <div id="library" className="flex flex-col justify-center gap-3">
            <h1 className=" pt-3 h-16 text-center bg-jasmine text-3xl">Library Overview</h1>
            <BoughtIdeasList/>
            <SoldIdeasList/>
        </div>
    );
}