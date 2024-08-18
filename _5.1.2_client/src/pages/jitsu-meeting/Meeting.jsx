// <!DOCTYPE html>
// <html>
//   <head>
//     <script src='https://8x8.vc/vpaas-magic-cookie-f27f51f5a61248fd8b18bd0b779ccfb4/external_api.js' async></script>
//     <style>html, body, #jaas-container { height: 100%; }</style>
//     <script type="text/javascript">
//       window.onload = () => {
//         const api = new JitsiMeetExternalAPI("8x8.vc", {
//           roomName: "vpaas-magic-cookie-f27f51f5a61248fd8b18bd0b779ccfb4/SampleAppRecentAnchorsOvercomeExtra",
//           parentNode: document.querySelector('#jaas-container'),
//                         // Make sure to include a JWT if you intend to record,
//                         // make outbound calls or use any other premium features!
//                         // jwt: "eyJraWQiOiJ2cGFhcy1tYWdpYy1jb29raWUtZjI3ZjUxZjVhNjEyNDhmZDhiMThiZDBiNzc5Y2NmYjQvYjAyMDdjLVNBTVBMRV9BUFAiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJqaXRzaSIsImlzcyI6ImNoYXQiLCJpYXQiOjE3MjI5MTA2MTAsImV4cCI6MTcyMjkxNzgxMCwibmJmIjoxNzIyOTEwNjA1LCJzdWIiOiJ2cGFhcy1tYWdpYy1jb29raWUtZjI3ZjUxZjVhNjEyNDhmZDhiMThiZDBiNzc5Y2NmYjQiLCJjb250ZXh0Ijp7ImZlYXR1cmVzIjp7ImxpdmVzdHJlYW1pbmciOmZhbHNlLCJvdXRib3VuZC1jYWxsIjpmYWxzZSwic2lwLW91dGJvdW5kLWNhbGwiOmZhbHNlLCJ0cmFuc2NyaXB0aW9uIjpmYWxzZSwicmVjb3JkaW5nIjpmYWxzZX0sInVzZXIiOnsiaGlkZGVuLWZyb20tcmVjb3JkZXIiOmZhbHNlLCJtb2RlcmF0b3IiOnRydWUsIm5hbWUiOiJUZXN0IFVzZXIiLCJpZCI6Imdvb2dsZS1vYXV0aDJ8MTA3NjI0MTYzMTAyNDAyMDA3NjMwIiwiYXZhdGFyIjoiIiwiZW1haWwiOiJ0ZXN0LnVzZXJAY29tcGFueS5jb20ifX0sInJvb20iOiIqIn0.L7OSudTSYtMqMDx2vh_GWpw73Kwt3K7H29BdJhPeQ7h2hczol438CwrCR0ycEalDSoCsrQP8cGs3irIYUrpIInDCzeE9jdssyZJVb-s2lIhOJCOCbWvYHa9a5KZ1UX-jOHn3_3jRTWkAOCKgibFA2GmdacZjKRVu8077BmIaPpfW4fisFk9g7FAy9up41Sr_5VdxrOKV5V-QPR326kaTyUf5YbfqT_Ib1ZbW7tny4rqnSh984lpDL0SK4Js4ocSHjKN0TZXGL-_lsvT6CaIKtzWkyxcyWjnV7vrk0-whw_yKnBX4fwv-VS0ppz95VNY0oCn0opuaeU8xDnuNdLKZ7Q"
//         });
//       }
//     </script>
//   </head>
//   <body><div id="jaas-container" /></body>
// </html>

import React, { useEffect, useRef } from "react";

const JitsiMeetComponent = () => {
  const jitsiContainerRef = useRef(null);

  const loadJitsiScript = () => {
    const script = document.createElement("script");
    script.src =
      "https://8x8.vc/vpaas-magic-cookie-f27f51f5a61248fd8b18bd0b779ccfb4/external_api.js";
    script.async = true;
    script.onload = () => initJitsi(); // Initialize Jitsi after the script is loaded
    document.body.appendChild(script);
  };

  const initJitsi = () => {
    const { current: jitsiContainer } = jitsiContainerRef;
    if (jitsiContainer) {
      const api = new window.JitsiMeetExternalAPI("8x8.vc", {
        roomName:
          "vpaas-magic-cookie-f27f51f5a61248fd8b18bd0b779ccfb4/SampleAppRecentAnchorsOvercomeExtra",
        parentNode: jitsiContainer,
        // Include other options as needed
      });
    }
  };

  useEffect(() => {
    loadJitsiScript();

    // Cleanup function to potentially remove the Jitsi iframe
    return () => {
      jitsiContainerRef.current.innerHTML = ""; // Clear the container
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div
      ref={jitsiContainerRef}
      style={{ height: "100vh", width: "100vw" }} // Adjust size as needed
    />
  );
};

export default JitsiMeetComponent;
