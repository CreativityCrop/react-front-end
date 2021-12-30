

export default function Register() {
    return (
        <div>
            <h1>Register</h1>
            <form className="justify justify-center">
                <label>
                    <p>First name</p>
                    <input type="text" />
                </label>
                <label>
                    <p>Last name</p>
                    <input type="text" />
                </label>
                <label>
                    <p>Email address</p>
                    <input type="email" />
                </label>
                <label>
                    <p>Username</p>
                    <input type="text" />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" />
                </label>
                <div>
                    <button type="button">Submit</button>
                </div>
            </form>
        </div>
    );
}