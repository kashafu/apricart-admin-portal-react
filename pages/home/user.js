import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import Cookies from "universal-cookie";
import FloatingLabelInput from "../../components/Misc/CustomFloatingInput";

const UserAPIPage = () => {
	const cookies = new Cookies();

	let name = cookies.get("cookies-name");
	let email = cookies.get("cookies-email");
	let phoneNumber = cookies.get("cookies-phoneNumber");

	const [newName, setNewName] = useState(name)
	const [newEmail, setNewEmail] = useState(email)
	const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber)

	return (
		<div className="w-full h-full bg-slate-100 flex items-center justify-center font-nunito">
			<div className="w-5/6 h-5/6 flex flex-col space-y-10">
				<p className="text-3xl font-bold">
					Account
				</p>
				<div className="flex flex-row w-full space-x-10">
					<div className="w-1/3 h-fit p-4 bg-white rounded-xl flex flex-col items-center space-y-4">
						<Avatar
							title={name}
							name={name}
							round
							size="100"
							textSizeRatio={3}
						/>
						<p className="text-2xl font-semibold">
							{name}
						</p>
					</div>
					<div className="w-2/3 h-fit p-4 bg-white rounded-xl flex flex-col space-y-4">
						<div>
							<p className="text-xl font-medium">
								Profile
							</p>
							<p className="text-sm font-light">
								The information can be edited
							</p>
						</div>
						<div className="flex flex-col border-y py-6">
							<div className="w-1/2 pr-2">
								<FloatingLabelInput
									type="text"
									label="Full Name"
									onChange={setNewName}
									value={newName}
								/>
							</div>
							<div className="flex flex-row space-x-4">
								<FloatingLabelInput
									type="text"
									label="Email"
									onChange={setNewEmail}
									value={newEmail}
								/>
								<FloatingLabelInput
									type="text"
									label="Phone Number"
									onChange={setNewPhoneNumber}
									value={newPhoneNumber}
								/>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	)
}

export default UserAPIPage;
