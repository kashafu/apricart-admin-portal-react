import React from "react";

const CustomImageInput = ({ handleChangeValue, index }) => {
	return (
		<div className="w-full">
			<div className="bg-main-blue text-white w-36 h-36 flex flex-col justify-center items-center">
				<div>
					<input
						name="img"
						type={"file"}
						accept="image/png, image/gif, image/jpeg, image/jpg"
						onChange={(e) => handleChangeValue(e, index)}
					/>
				</div>
			</div>
		</div>
	);
};

export default CustomImageInput;
