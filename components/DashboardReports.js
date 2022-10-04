import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import React from "react";

const DashboardReports = () => {
	return (
		<div className="h-screen">
			<PowerBIEmbed
				embedConfig={{
					type: "dashboard", // Supported types: report, dashboard, tile, visual and qna
					id: "2396e9a5-62ab-4635-b659-febf3d7600f2",
					embedUrl:
						"https://app.powerbi.com/dashboardEmbed?dashboardId=b3043049-eb9d-4d8b-a5d3-f09789b434c9&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVNPVVRILUFGUklDQS1OT1JUSC1BLVBSSU1BUlktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjpmYWxzZX19",
					accessToken:
						"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzEyYjVkYmQtM2E5Mi00MTQ2LWEyMTItMjYwZmYwZTdjODc1LyIsImlhdCI6MTY2NDM2MzgyMywibmJmIjoxNjY0MzYzODIzLCJleHAiOjE2NjQzNjkwODEsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VEFBQUE2ekxLdGFGRkN6c1lRcHE2b1B2b1pTSkxMZ0VSUlMzVnErVDhQcHovOVI2aHAzMkk1NGVLY3hISWFrUGs3RnBIIiwiYW1yIjpbInB3ZCJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMiIsImZhbWlseV9uYW1lIjoiU2hhaGlkIiwiZ2l2ZW5fbmFtZSI6IkZlaG1hYW4iLCJpcGFkZHIiOiIxMjQuMjkuMjI4LjExNCIsIm5hbWUiOiJGZWhtYWFuIFNoYWhpZCIsIm9pZCI6Ijg3MzI5ODQ1LWJkZWEtNDVhZC1iYzZjLTk3ZDJmZmU0ZTU5YiIsInB1aWQiOiIxMDAzMjAwMjFCNjE4NzY5IiwicmgiOiIwLkFYa0F2VjByY1pJNlJrR2lFaVlQOE9mSWRRa0FBQUFBQUFBQXdBQUFBQUFBQUFCNUFHMC4iLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiJIUl9hQVRTcHJlUkdRWDBtS1ozWWNmY3gydjhoQnFvTm4xam4xTy0yanlJIiwidGlkIjoiNzEyYjVkYmQtM2E5Mi00MTQ2LWEyMTItMjYwZmYwZTdjODc1IiwidW5pcXVlX25hbWUiOiJmZWhtYWFuLnNoYWhpZEBhcHJpY2FydC5wayIsInVwbiI6ImZlaG1hYW4uc2hhaGlkQGFwcmljYXJ0LnBrIiwidXRpIjoicVl3NEd3cUdsVUstSUxXMURRb1RBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.pXgHx68YaBIfRsoPUxqNdDmRXumZhUuNiFa18T5NGb1tM4N97JoY-rCCoX2TpEtBb8wRambXyJrHxFqHxmpHV9z9T5Sxdown_7vO5ytXxdZE7G2zcsEVS0sIrOXDCmNUVUvAQDzT54eOWm6MIBRZYAtcZW7y3hQaRH8XmfTmvZFEzpir0ZKY7uKHtllMSYQ3GLF0ms4Ve4ZikuG3qPbGAdy6of0K_RLlr-V7xpqdSxVK4DngEIscswTRuG51EImwBKsVa6dtFnXl0Z-f5e-rXvvXYuq4j23WBDZYH1csIAfrFQ0Hz89kfBU__4fOChRCauY0RPXMtYDNdTTQ846OoA",
					tokenType: models.TokenType.Aad,
					settings: {
						panes: {
							filters: {
								expanded: false,
								visible: true,
							},
						},
					},
				}}
				eventHandlers={
					new Map([
						// [
						// 	"loaded",
						// 	function () {
						// 		console.log("Report loaded");
						// 	},
						// ],
						// [
						// 	"rendered",
						// 	function () {
						// 		console.log("Report rendered");
						// 	},
						// ],
						[
							"error",
							function (event) {
								console.log(event.detail);
							},
						],
					])
				}
				cssClassName={"Embed-container"}
				getEmbeddedComponent={(embeddedDashboard) => {
					window.dashboard = embeddedDashboard;
				}}
			/>
		</div>
	);
};

export default DashboardReports;
