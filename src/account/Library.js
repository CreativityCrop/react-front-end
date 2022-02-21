import BoughtIdeasList from './Library/BoughtIdeasList';
import SoldIdeasList from './Library/SoldIdeasList';

export default function Library() {
    return (
        <div id="library" className="flex flex-col justify-center gap-6">
            <h1 className=" pt-[0.75rem] h-16 text-center bg-jasmine text-3xl">Library Overview</h1>
            <BoughtIdeasList/>
            <SoldIdeasList/>
        </div>
    );
}