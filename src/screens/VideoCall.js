import styled from "styled-components";
import { BaseBox } from "../components/shared";


const localVideo = document.getElementById("localVideo")
const remoteVideo = document.getElementById("remoteVideo")
let localStream;

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
}).then(gotStream)
    .catch((error) => console.log(error))

const gotStream = (stream) => {
    console.log("Adding local stream")
    localStream = stream;
    localVideo.srcObject = stream;


}

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
export const VideoCall = () => {


    return (
        <Container>
            <video id="localVideo" autoplay playsInline>

            </video>
            <video id="remoteVidoe" autoplay></video>
        </Container>
    )
}