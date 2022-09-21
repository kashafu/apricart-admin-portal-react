import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/router";

import Logo from "../../public/logo-white.png";
import CustomButton from "./CustomButton";
import ProfileViewComponent from "../ProfileViewComponent";
import Heading from "../Misc/Heading";

const Navbar = () => {
	const router = useRouter();
	const [profileDisplay, setProfileDisplay] = useState(false);
	const handleDisplay = () => {
		setProfileDisplay(!profileDisplay);
	};

	return (
		<nav className="h-12 bg-main-blue flex justify-between">
			<div className="w-36 py-2 cursor-pointer">
				<Image
					src={Logo}
					alt="Logo"
					layout="responsive"
					onClick={() => router.push("/")}
				/>
			</div>
			<div>
				<Heading color={"txt-light"}>CBE Admin Portal</Heading>
			</div>
			<div className="px-2 flex justify-center items-center">
				<CustomButton onClick={handleDisplay}>My Account</CustomButton>
				<ProfileViewComponent
					profileDisplay={profileDisplay}
					setProfileDisplay={setProfileDisplay}
				/>
			</div>
		</nav>
	);
};

export default Navbar;
