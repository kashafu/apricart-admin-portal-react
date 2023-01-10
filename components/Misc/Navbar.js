import Image from "next/image"
import { useState } from "react"
import Link from "next/link"
import Avatar from "react-avatar"

import ProfileViewNewComponent from "../ProfileViewNewComponent"

import Logo from "../../public/logo.png"

const Navbar = ({ name }) => {
	const [profileDisplay, setProfileDisplay] = useState(false)

	const handleDisplay = () => {
		setProfileDisplay(!profileDisplay)
	}

	return (
		<nav className="bg-white fixed w-screen z-50 border-b-[1px] border-gray-300">
			<div className="cursor-pointer h-12 flex justify-between items-center overflow-hidden">
				<Link
					href={"/"}
					passHref
					className="flex min-w-min items-center"
				>
					<a className="ml-6 w-28 mx-2">
						<Image src={Logo} alt="Logo" layout="responsive" />
					</a>
				</Link>

				<div className="px-2 flex justify-center items-center">
					<div className="text-txt-light font-nunito text-xs lg:text-base p-4 rounded-xl transition-all duration-300 hover:cursor-pointer">
						<button onClick={handleDisplay}>
							<Avatar
								title={name}
								name={name}
								size="40"
								className="hover:brightness-90"
								round
							/>
						</button>
					</div>
					{/* <ProfileViewComponent
						profileDisplay={profileDisplay}
						setProfileDisplay={setProfileDisplay}
					/> */}
					<ProfileViewNewComponent
						profileDisplay={profileDisplay}
						setProfileDisplay={setProfileDisplay}
					/>
				</div>
			</div>
		</nav>
	)
}

export default Navbar
