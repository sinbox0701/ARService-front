import styled from "styled-components";
import { BaseBox } from "../components/shared";
import io from 'socket.io-client';
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

// const localVideo = document.getElementById("localVideo")
// const remoteVideo = document.getElementById("remoteVideo")
// let localStream;

// navigator.mediaDevices.getUserMedia({
//     video: true,
//     audio: true,
// }).then(gotStream)
//     .catch((error) => console.log(error))

// const gotStream = (stream) => {
//     console.log("Adding local stream")
//     localStream = stream;
//     localVideo.srcObject = stream;
// }


const Container = styled(BaseBox)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 35px 40px 25px 40px;
    margin-bottom: 10px;
    form {
        margin-top: 35px;
        width: 100%;
        display: flex;
        justify-items: center;
        flex-direction: column;
        align-items: center;
    }
`;

const socket = io.connect('http://localhost:4000');

const getWebcam = (callback) => {
    try {
      const constraints = {
        'video': true,
        'audio': false
      }
      navigator.mediaDevices.getUserMedia(constraints)
        .then(callback);
    } catch (err) {
      console.log(err);
      return undefined;
    }
}
export const VideoCall = () => {
    const { nickname } = useParams();
    const [playing, setPlaying] = useState(undefined);
    const videoRef = useRef(null);
    
    socket.emit("join",nickname,getWebcam);
    useEffect(()=>{
        
        getWebcam((stream => {
            setPlaying(true);
            videoRef.current.srcObject = stream
        }))
    },[]);

    return (
        <Container id="myStream">
            <video id="myFace" ref={videoRef} autoPlay playsInline/>
            <Link to="/"> 
                <button style={{ marginTop: "10px" }}>종료하기</button>
            </Link>
        </Container>
    )
}