import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";

import Logo from "../../public/logo-white.png";

const Navbar = () => {
	const router = useRouter();
	return (
		<nav className="h-12 bg-main-blue">
			<div className="w-36 py-2 cursor-pointer">
				<Image
					src={Logo}
					alt="Logo"
					layout="responsive"
					onClick={() => router.push("/")}
				/>
			</div>
		</nav>
	);
};

export default Navbar;
