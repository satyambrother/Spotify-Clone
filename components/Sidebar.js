import {HomeIcon,SearchIcon ,LibraryIcon,PlusCircleIcon, RssIcon,} from "@heroicons/react/outline";
import {HeartIcon,} from  "@heroicons/react/solid";
import { signIn, signOut ,useSession} from "next-auth/react";
import useSpotify from "@/hooks/useSpotify";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {playlistIdState} from "../atoms/playlistAtom";


const Sidebar = () => {
    const spotifyApi=useSpotify();
    const {data:session,status}=useSession();
    const [playlists ,setPlaylists]=useState([]);
    const [playlistId,setPlaylistsId]=useRecoilState(playlistIdState);


    console.log("You Picked playlist >>>",playlistId)
    
    useEffect(()=>{
        if(spotifyApi.getAccessToken()){
            spotifyApi.getUserPlaylists().then((data)=>{
                setPlaylists(data.body.items);
            });
        }
    },[session,spotifyApi]);
    
    console.log(session);
    console.log(playlists);
    return (
        <div className="text-gray-500 p-5 text-xs lg:text-5m border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen
                         sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex pb-36">
            <div className="space-y-4">
                
                <button className="flex item-center space-x-2 hover:text-white
                ">
                <HomeIcon className="h-5 w-5"/>
                <p>Home</p>
                </button>
                <button className="flex item-center space-x-2 hover:text-white
                ">
                <SearchIcon className="h-5 w-5"/>
                <p>Search</p>
                </button>
                <button className="flex item-center space-x-2 hover:text-white
                ">
                <LibraryIcon className="h-5 w-5"/>
                <p>Your Library</p>
                </button> 
                <hr className="border-t-[0.1px border-gray-900"/>
                <button className="flex item-center space-x-2 hover:text-white
                ">
                <PlusCircleIcon className="h-5 w-5"/>
                <p>Create Playlist</p>
                </button>
                <button className="flex item-center space-x-2 text-blue-500 hover:text-white
                ">
                <HeartIcon className="h-5 w-5"/>
                <p>Liked Songs</p>
                </button>
                <button className="flex item-center space-x-2 hover:text-white
                ">
                <RssIcon className="h-5 w-5"/>
                <p>Your Episode</p>
                </button> 
                <hr className="border-t-[0.1px border-gray-900"/>
                 
                {/* Playlist*/}
                {playlists.map((playlist) =>(
                    <p key={playlist.id} 
                       className="cursor-pinter hover:text-white" 
                       onClick={() => setPlaylistsId(playlist.id)}>
                        {playlist.name}
                    </p>

                ))}
                
            </div>
        </div>
    );
};

export default Sidebar;