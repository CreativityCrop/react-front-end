import AuthProvider from "./AuthAPI";

export default function NotFound() {
    
    document.title = "Not found - CreativityCrop";

    return (
        <div className="flex flex-col gap-10 mt-20 text-center ">
            <AuthProvider/>
            <h1 className="text-4xl md:text-6xl xl:text-8xl font-bold">404 Not Found</h1>
            <p className="text-2xl md:text-4xl xl:md-text-6xl">You have the wrong link, buddy!</p>
        </div>
    );
}