
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TrainerContext } from "../../context/TrainerContext";
import axios from "axios";
import toast from "react-hot-toast";
import ChatLoader from "../../components/ChatLoader";

import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const TrainerCallPage = () => {
  const { id: callId } = useParams();
  const navigate = useNavigate();

  const { profileData, dToken, backendUrl, getProfileData } = useContext(TrainerContext);

  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profileData && getProfileData) {
      console.log("Fetching trainer profile...");
      getProfileData();
    }
  }, [profileData, getProfileData]);

  useEffect(() => {
    console.log("TrainerCallPage mounted");

    if (!profileData || !dToken || !callId || !backendUrl) {
      console.warn("Missing required data:", {
        profileData,
        dToken,
        callId,
        backendUrl,
      });
      return;
    }

    const initTrainerCall = async () => {
      try {
        console.log("Initializing video call for trainer...");

        console.log("Requesting video token from backend...");
        const { data } = await axios.get(`${backendUrl}/api/chat/tokenVideoTrainer`, {
          headers: { dtoken: dToken },
        });

        if (!data.token) {
          throw new Error("No video token received from server for trainer");
        }

        console.log("Received video token:", data.token);
        
        const user = {
          id: profileData._id,
          name: profileData.name,
          image: profileData.image,
        };

        console.log("Initializing StreamVideoClient for trainer:", user);
        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token: data.token,
        });

        const callInstance = videoClient.call("default", callId);
        console.log("Joining call with callId:", callId);

        await callInstance.join({ create: true });
        console.log("Successfully joined the call");

        setClient(videoClient);
        setCall(callInstance);
      } catch (error) {
        console.error("Error during call initialization:", error);
        toast.error("Could not join the call. Please try again.");
      } finally {
        console.log("Finished call initialization");
        setLoading(false);
      }
    };

    initTrainerCall();

    return () => {
      console.log("Cleaning up: Leaving call and disconnecting client...");
      if (call) {
        call.leave().then(() => console.log("Left the call"));
      }
      if (client) {
        client.disconnectUser().then(() => console.log("Disconnected Stream client"));
      }
    };
  }, [profileData, dToken, callId, backendUrl]);

  if (loading || !profileData) 
  {
    console.log("Loading or waiting for profile data...");
    return <ChatLoader />;
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="relative w-full h-full">
        {client && call ? (
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <CallContent />
            </StreamCall>
          </StreamVideo>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-red-500 font-semibold">
              Could not initialize call. Please refresh or try again later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Call state changed:", callingState);
    if (callingState === CallingState.LEFT) {
      console.log("Call ended. Redirecting to dashboard...");
      navigate("/");
    }
  }, [callingState, navigate]);

  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls onLeave={() => {
        console.log("Leave button clicked. Redirecting to dashboard...");
        navigate('/');
      }} />
    </StreamTheme>
  ); 
};

export default TrainerCallPage;
