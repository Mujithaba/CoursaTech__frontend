import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect } from "react";

function randomID(len: number): string {
  let result = "";
  if (result) return result;
  const chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP";
  const maxPos = chars.length;
  len = len || 5;
  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export default function VideoCallRoomUser() {
  const { roomId } = useParams();
  const roomID = roomId as string;
  const navigate = useNavigate();

  useEffect(() => {
    const element = document.querySelector(".myCallContainer") as HTMLDivElement;

    const myMeeting = async () => {
      const appID = 623140942;
      const serverSecret = "030e2db910df9d21f8f55122caae2619";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        randomID(5),
        randomID(5)
      );

      const zp = ZegoUIKitPrebuilt.create(kitToken);

      // Start the call and add the onLeaveRoom callback to handle call end
      zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: "Personal link",
            url:
              window.location.protocol +
              "//" +
              window.location.host +
              window.location.pathname +
              "?roomID=" +
              roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        onLeaveRoom: () => {
          
          navigate("/coursePage");
        },
      });
    };

    myMeeting();
  }, [roomID, navigate]);

  return (
    <>
    <div className="w-full h-20 bg-red-200"></div>
    <div
      className="myCallContainer w-full h-[calc(100vh-50px)] max-w-4xl mx-auto m-3"
      style={{ width: "100%", height: "100%" }}
    ></div>
    </>
  );
}
