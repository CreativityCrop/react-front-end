import { useContext } from 'react';

import { AuthContext } from '../Context';

import Link from './Link';

export function LinkMenu() {
  const [authContext, ] = useContext(AuthContext);
	
	return (
		<ul className="flex">
					<Link addr="/marketplace" text="Marketplace"/>
					<Link addr="/about-us" text="About us"/>
					{
						authContext === "authenticated" ?
						<>
							<Link addr="/account" text="Account"/>
      				<Link addr="/logout" text="Sign out"></Link>
						</> :
						<>
							<Link addr="/login" text="Login"/>
							<Link addr="/register" text="Register"/>
						</>
					}
			</ul>
	);
}