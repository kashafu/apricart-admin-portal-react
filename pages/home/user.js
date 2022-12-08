import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import Cookies from "universal-cookie";
import CustomButton from "../../components/Misc/CustomButton";
import CustomInput from "../../components/Misc/CustomInput";
import FloatingLabelInput from "../../components/Misc/CustomFloatingInput";
import FloatingLabelInputNew from "../../components/Misc/CustomFloatingInputNew";

const UserAPIPage = () => {
	const cookies = new Cookies();

	let name = cookies.get("cookies-name");
	let email = cookies.get("cookies-email");
	let phoneNumber = cookies.get("cookies-phoneNumber");

	const [newName, setNewName] = useState(name);
	const [newEmail, setNewEmail] = useState(email);
	const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber);

	return (
		<div className="w-full h-full bg-slate-100 flex items-center justify-center font-nunito">
			<div className="w-5/6 h-5/6 flex flex-col space-y-10">
				<p className="text-3xl font-bold">Account</p>
				<div className="flex flex-col lg:flex-row w-full space-y-10 lg:space-y-0 lg:space-x-10">
					{/* PROFILE PIC and NAME */}
					<div className="w-full lg:w-1/3 h-fit p-4 bg-white rounded-xl flex flex-col items-center space-y-4">
						<Avatar
							title={name}
							name={name}
							round
							size="100"
							textSizeRatio={3}
						/>
						<p className="text-2xl font-semibold">{name}</p>
					</div>
					{/* PERSONAL INFORMATION UPDATE */}
					<div className="w-full lg:w-2/3 h-fit p-4 bg-white rounded-xl flex flex-col space-y-4">
						<div>
							<p className="text-xl font-medium">Profile</p>
						</div>
						<div className="grid grid-cols-2 border-y py-6">
							<CustomInput
								disabled={true}
								type="text"
								label="Full Name"
								onChange={setNewName}
								value={newName}
								heading={"Name"}
							/>
							<CustomInput
								disabled={true}
								type="text"
								label="Email"
								onChange={setNewEmail}
								value={newEmail}
								heading={"Email"}
							/>
							<CustomInput
								disabled={true}
								type="text"
								label="Phone Number"
								onChange={setNewPhoneNumber}
								value={newPhoneNumber}
								heading={"Phone Number"}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserAPIPage;
