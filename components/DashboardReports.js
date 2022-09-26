import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import React from "react";

const DashboardReports = () => {
	return (
		<div>
			<PowerBIEmbed
				embedConfig={{
					type: "dashboard", // Supported types: report, dashboard, tile, visual and qna
					id: "2396e9a5-62ab-4635-b659-febf3d7600f2",
					embedUrl:
						"https://app.powerbi.com/dashboardEmbed?dashboardId=2396e9a5-62ab-4635-b659-febf3d7600f2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVNPVVRILUFGUklDQS1OT1JUSC1BLVBSSU1BUlktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7Im1vZGVybkVtYmVkIjpmYWxzZX19",
					accessToken:
						"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNzEyYjVkYmQtM2E5Mi00MTQ2LWEyMTItMjYwZmYwZTdjODc1LyIsImlhdCI6MTY2NDE3MzQwMywibmJmIjoxNjY0MTczNDAzLCJleHAiOjE2NjQxNzg0MjMsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVFFBeS84VEFBQUFWUGtCM2lOZkowMjdvcmllOUk0WU1YQ2hoOTIyb2FqK21xMW1GK0xEaGk0d2F0WTRQaWJqeHF1N08rUWlnckNXIiwiYW1yIjpbInB3ZCIsInJzYSJdLCJhcHBpZCI6Ijg3MWMwMTBmLTVlNjEtNGZiMS04M2FjLTk4NjEwYTdlOTExMCIsImFwcGlkYWNyIjoiMiIsImRldmljZWlkIjoiZTcxNmUyODItZThhYi00YTQ3LWE5ODUtOTIzZDg0MGNmZjMyIiwiZmFtaWx5X25hbWUiOiItIEFwcmljYXJ0IiwiZ2l2ZW5fbmFtZSI6IlJlcG9ydHMiLCJpcGFkZHIiOiI1OC4yNy4xODQuMTAwIiwibmFtZSI6IlJlcG9ydHMgLSBBcHJpY2FydCIsIm9pZCI6IjdjM2UxMzQ1LTFkMWEtNDBjMS1hMWU4LWJkNWQ3NzIxZjM4MCIsInB1aWQiOiIxMDAzMjAwMUZBRUFCNjJBIiwicmgiOiIwLkFYa0F2VjByY1pJNlJrR2lFaVlQOE9mSWRRa0FBQUFBQUFBQXdBQUFBQUFBQUFCNUFDYy4iLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiJyc1dXWjBhZWRVUjh5MGpvOThxTlhwU0o0SVFtc0QwQlRXeFR1RHpiR2tjIiwidGlkIjoiNzEyYjVkYmQtM2E5Mi00MTQ2LWEyMTItMjYwZmYwZTdjODc1IiwidW5pcXVlX25hbWUiOiJyZXBvcnRzQGFwcmljYXJ0LnBrIiwidXBuIjoicmVwb3J0c0BhcHJpY2FydC5wayIsInV0aSI6IjlSQmFGdEVYa2txUHd5b1JOYWtIQUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbImI3OWZiZjRkLTNlZjktNDY4OS04MTQzLTc2YjE5NGU4NTUwOSJdfQ.dq1U0q3Pbxf-e-RJ_4hBFYGZNEnK53zMAji0LOj9H7I5-JgWpsYqa6LC37wibk3fJZeUeajHgjpjisK4fL5hn4yls26fuo5UCyF-CsPXaUOjXxBuF1Q5_q_ATEte8vF4AaCS94VhARh9CkbGUK-9g6Y0IfEH2PiRlEz10wiIRMz0XJcQRvyRTQT5sOLBPM4uljLmiyn_zYJCCa5BsGfvEmr4FiYVpRg6EjjbzONLDSXWmVShXRgug6Pr0TXIKa_ipbbD6DLDuXNg6PyGiSwdh8tV_QMocASao5ANsOq-enmbxc4nyQGXstuc3xRhwxRY5rXSf4BneWWDdtP_kR3WwQ",
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
						[
							"loaded",
							function () {
								console.log("Report loaded");
							},
						],
						[
							"rendered",
							function () {
								console.log("Report rendered");
							},
						],
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
