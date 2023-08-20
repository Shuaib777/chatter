import React, { useContext } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { ChatContext } from "../context/chatContext";
import { AuthContext } from "../context/authContext";

const Room = () => {
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  const myMeeting = async (element) => {
    const appID = 1975456548;
    const serverSecret = "e4ad6fa4ac175e57508351212d347a53";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      data.chatID,
      currentUser.uid,
      "Shaikh"
    );

    const zc = ZegoUIKitPrebuilt.create(kitToken);

    zc.joinRoom({
      sharedLinks: [
        {
          name: "Copy Link",
          url: `http://localhost:3000/room/${data.chatID}`,
        },
      ],
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showScreenSharingButton: false,
    });
  };
  return (
    <div>
      <div ref={myMeeting} />
    </div>
  );
};

export default Room;
