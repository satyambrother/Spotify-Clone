import { ChevronDownIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";
import {playlistIdState,playlistState} from "../atoms/playlistAtom";
import { useRecoilValue ,useRecoilState} from "recoil";
import useSpotify from "@/hooks/useSpotify";
import Songs from "./Songs";

const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
]

function Center(props) {
    const {data:session}=useSession();
    const [color,setColor]=useState(null);
    const spotifyApi=useSpotify();
    const playlistId=useRecoilValue(playlistIdState);
    const [playlist,setPlaylists]=useRecoilState(playlistState);


    useEffect(()=>{
     setColor(shuffle(colors).pop());
     },[playlistId]);

    useEffect(()=>{
        spotifyApi
        .getPlaylist(playlistId)
        .then((data)=>{
         setPlaylists(data.body);
        })
        .catch((err) => console.log("Something went wrong",err));
    },[spotifyApi,playlistId]);

    console.log("playlist song",playlist);
    return (
        <div className='flex-grow h-screen overflow-y-scroll scrollbar-hide'>
            <header className="absolute top-5 right-8">
                <div className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 
                cursor-pointer rounded-full p-1 pr-2 text-white" onClick={signOut}>
                    <img className="rounded-full w-190 h-10"
                         src={session?.user.image} alt="" />
                    <h2>{session?.user.name}</h2>
                    <ChevronDownIcon className="h-5 w-5"/>     
                    
                </div>
            </header>
            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8 w-full`}>
            <img className="h-44 w-44 shadow-2xl"
                 src={playlist?.images[0]?.url} alt="" />
                 <div>
                    <p>Playlist</p>
                    <h1 className="test-2xl md:text-3xl xl:text-5xl font-bold">
                        {playlist?.name}
                    </h1>
                 </div>
            </section>
            <div>
                <Songs/>
            </div>
        </div>
    );
}

export default Center;