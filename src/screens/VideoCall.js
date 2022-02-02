import styled from "styled-components";
import { BaseBox } from "../components/shared";
import io from 'socket.io-client';
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const pc_config = {
    iceServers: [
        // {
        //   urls: 'stun:[STUN_IP]:[PORT]',
        //   'credentials': '[YOR CREDENTIALS]',
        //   'username': '[USERNAME]'
        // },
        {
            urls: "stun:stun.l.google.com:19302",
        },
    ],
};

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

// const socket = io.connect('http://localhost:4000');

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
    const socketRef = useRef();
    const pcRef = useRef()
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);

    const setVideoTracks = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false,
            });
            if (localVideoRef.current) localVideoRef.current.srcObject = stream;

            if (!(pcRef.current && socketRef.current)) return;
            stream.getTracks().forEach((track) => {
                if (!pcRef.current) return;
                pcRef.current.addTrack(track, stream);
            })
            pcRef.current.onicecandidate = (e) => { // 상대방에게 본인의 icecandidate 정보를 signaling server 를 통해 보냄.
                if (e.candidate) {
                    if (!socketRef.current) return;
                    console.log("onicecandidate");
                    socketRef.current.emit("candidate", e.candidate)
                }
            };

            pcRef.current.oniceconnectionstatechange = (e) => { //ice connection 상태가 변경됐을 때 log
                console.log(e);
            }
            pcRef.current.ontrack = (event) => { //상대방의 RTCSessionDescription을 본인의 RTCPeerConnection에서의 remoteSessionDescription으로 지정하면 상대방의 track 데이터에 대한 이벤트 발생. 
                console.log("add remotetrack success");
                if (remoteVideoRef.current) {
                    remoteVideoRef.current.srcObject = event.streams[0];
                }
            };
            socketRef.current.emit("join_room", {
                room: nickname
            })
        } catch (e) {
            console.error(e)
        }
    }

    const createOffer = async () => { //상대방에게 offer signal 전달
        console.log("create offer");
        if (!(pcRef.current && socketRef.current)) return;
        try {
            const sdp = await pcRef.current.createOffer({
                offerToReceiveAudio: true,
                offerToReceiveVideo: true,
            });
            pcRef.current.setLocalDescription(new RTCSessionDescription(sdp));
            socketRef.current.emit("offer", sdp);
        } catch (e) {
            console.error(e)
        }
    }

    const createAnswer = async (sdp) => { //상대방에게 answer signal 전달
        if (!(pcRef.current && socketRef.current)) return;
        try {
            await pcRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
            console.log("answer set remote descripton success");
            const mySdp = await pcRef.current.createAnswer({
                offerToReceiveVideo: true,
                offerToReceiveAudio: true,
            })
            console.log("create answer");
            pcRef.current.setLocalDescription(new RTCSessionDescription(mySdp));
            socketRef.current.emit("answer", mySdp)
        } catch (e) {
            console.error(e)
        }
    }

    // socket.emit("join", nickname, getWebcam);
    useEffect(() => {
        socketRef.current = io.connect('http://localhost:4000');
        pcRef.current = new RTCPeerConnection(pc_config)

        socketRef.current.on("all_users", (allUsers) => {
            console.log({ allUsers })
            if (allUsers.length > 0) {
                createOffer();
            }
        })

        socketRef.current.on("getOffer", (sdp) => {
            console.log("get offer");
            createAnswer(sdp);
        })

        socketRef.current.on("getAnswer", (sdp) => {
            console.log("get answer");
            if (!pcRef.current) return;
            pcRef.current.setRemoteDescription(new RTCSessionDescription(sdp));
            //console.log(sdp);
        });

        socketRef.current.on("getCandidate", async (candidate) => {
            if (!pcRef.current) return;
            await pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
            console.log("candidate add success")
        })

        setVideoTracks();


        socketRef.current.on('room_full', (message) => { // 동작 안됨. 
            console.log(message)
        })

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
            if (pcRef.current) {
                pcRef.current.close();
            }
        }




        // getWebcam((stream => {
        //     setPlaying(true);
        //     localVideoRef.current.srcObject = stream
        // }))
    }, []);


    return (
        <Container id="myStream">
            <video style={{ width: 400, height: 400, margin: 5, backgroundColor: 'black' }} id="otherFace" ref={remoteVideoRef} autoPlay />
            <video style={{ width: 100, height: 100, margin: 5, backgroundColor: 'black' }} ref={localVideoRef} autoPlay />
            <Link to="/">
                <button style={{ marginTop: "10px" }}>종료하기</button>
            </Link>
        </Container>
    )
}