import React, { useContext } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { ChatContext } from "../context/chatContext";
import { AuthContext } from "../context/authContext";

const Room = () => {
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  const myMeeting = async (element) => {
    const appID = 1587589474;
    const serverSecret = "20a698a2efbbb0932f4edefbc2fdfdd1";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      data.chatID,
      currentUser.uid,
      "room"
    );

    const zc = ZegoUIKitPrebuilt.create(kitToken);

    zc.joinRoom({
      sharedLinks: [
        {
          name: "Copy Link",
          url: `${window.location.href}/${data.chatID}`,
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
