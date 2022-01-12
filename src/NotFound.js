import AuthProvider from "./AuthAPI";

export default function NotFound() {
    return (
        <div>
            <AuthProvider/>
            <h1>You have the wrong link, buddy!</h1>
            <h2>Go back to where you came from!!!</h2>
        </div>
    );
}