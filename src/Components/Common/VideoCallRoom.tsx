import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useNavigate, useParams } from "react-router-dom";

function randomID(len: number): string {
  let result = "";
  if (result) return result;
  var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

export default function VideoCallRoom() {
  let { roomId } = useParams();
  const roomID = roomId as string;

  const navigate = useNavigate();

  let myMeeting = async (element: HTMLDivElement) => {
    // generate Kit Token
    const appID = 623140942;
    const serverSecret = "030e2db910df9d21f8f55122caae2619";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      randomID(5),
      randomID(5)
    );

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);

    // Start the call
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
        mode: ZegoUIKitPrebuilt.OneONoneCall, // 1-on-1 calls
      },
      onLeaveRoom: () => {
        // Navigate back to the course view page
        navigate("/tutor/chatList");
      },
    });
  };

  return (
    <div
      className="myCallContainer"
      ref={(element) => element && myMeeting(element)}
      style={{ width: "100%", height: "100vh", maxWidth: "100vw" }}
    ></div>
  );
}
