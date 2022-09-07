import React from "react";

const CustomFileInput = ({ handleChangeValue, index }) => {
	return (
		<div className="w-full">
			<div className="bg-main-blue text-white w-36 h-36 flex flex-col justify-center items-center">
				<div>
					<input
						name="img"
						type={"file"}
						accept="application/pdf,application/vnd.ms-excel, video/mp4, application/mp4"
						onChange={(e) => handleChangeValue(e, index)}
					/>
				</div>
			</div>
		</div>
	);
};

export default CustomFileInput;
