import AuthProvider from "./AuthAPI";

export default function NotFound() {
    
    document.title = "Not found - CreativityCrop";

    return (
        <div>
            <AuthProvider/>
            <h1>You have the wrong link, buddy!</h1>
            <h2>Go back to where you came from!!!</h2>
        </div>
    );
}