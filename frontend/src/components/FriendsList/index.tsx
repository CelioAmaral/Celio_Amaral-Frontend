import { useEffect, useState } from "react";
import api from "../../services/api";
import { getAuthHeader, getProfile } from "../../services/auth";
import { UserCircle } from "@phosphor-icons/react";
import Heading from "../Heading";
import Text from "../Text";
import Button from "../Button";

interface Profile {
    _id: string;
    name: string;
    following: string[];
    followers: string[];
}

function FriendsList() {
    const authHeader = getAuthHeader();
    const myProfileId = getProfile();
    const [profiles, setProfiles] = useState<Profile[]>([]);

    useEffect(() => {
        async function getProfiles() {
            try {
                const { data } = await api.get("/profiles", authHeader);
                setProfiles(data);
            } catch (err) {
                alert("Erro ao tentar obter os dados de perfis.")
            }
        }

        getProfiles();
    }, []);
    //    const user = localStorage.getItem("user");

    async function handleFollow(profileId: string) {
        try {
            await api.post(`/profiles/${profileId}/follow`, null, authHeader);
            setProfiles((profiles) => {
                const newProfiles = profiles.map(profile => {
                    if (profile._id == profileId) {
                        !profile.followers.includes(myProfileId) && profile.followers.push(myProfileId);
                    }
                    return profile;
                });
                console.log(newProfiles);
                return [...newProfiles];
            });
        } catch (err) {
            alert("Erro ao tentar seguir perfil.")
        }
    }

    return (
        <div className="basic-5/6 overflow-y-auto scroll-smooth">
            <Heading className="border-b border-slate-400 my-4 pl-5">
                <Text size="lg" className="font-extrabold ml-5">Amigos</Text>
            </Heading>
            <ul>
                {profiles && profiles.map((profile) => (
                    <li className="flex flex-col ml-5 my-5 w-full max-w-sm pl-5" key={profile._id}>
                        <div className="flex items-center">
                            <UserCircle size={32} weight="thin" className="text-slate-50" />
                            <Text className="font-extrabold ml-2">{profile.name}</Text>
                        </div>
                        <div className="flex items-center ml-2">
                            <Text>{profile.followers.length > 0 && `${profile.followers.length} seguidores`}</Text>
                        </div>
                        <div className="flex items-center ml-2">
                            <Text>{profile.following.length > 0 && `Seguindo ${profile.following.length} perfis`}</Text>
                        </div>
                        <Button className="my-2" onClick={() => handleFollow(profile._id)} disabled={profile.followers.includes(myProfileId)}>Seguir</Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FriendsList;