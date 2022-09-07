import React from "react";
import { ClimbingBoxLoader } from "react-spinners";

const Loading = ({ loading }) => {
	return (
		<div>
			{loading && (
				<>
					<div className="bg-main-blue bg-opacity-80 w-screen h-screen fixed z-50">
						{/* <ClimbingBoxLoader
							className="absolute top-[45%] m-auto animate-pulse"
							color="#FFD54C"
							size={50}
							speedMultiplier={2}
						/> */}
						<h1 className="z-20 text-white">Sending Request...</h1>
					</div>
				</>
			)}
		</div>
	);
};

export default Loading;
