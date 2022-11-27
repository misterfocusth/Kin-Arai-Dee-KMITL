import react, { useState, useEffect, useContext } from "react";

// React Router Dom
import { Navigate, useNavigate } from "react-router";

// Context Provider
import { AuthContext } from "../context/Auth";

// LINE LIFF
import LIFF from "@line/liff";

// Mantine-UI Components
import {
    TextInput,
    Checkbox,
    Paper,
    Text,
    Textarea,
    Container,
    Button,
    Avatar,
    MantineProvider
} from '@mantine/core';

// Axios
import axios from "axios";

// Components
import MyLoader from "../components/MyLoader";

const Header = (props) => {
    return (
        <div>
            <div className="flex items-center gap-4">
                <Avatar
                    src={props.data.profile_picture_url}
                    alt="line_profile_picture"
                    size={75}
                    radius={"lg"}
                />
                <div>
                    <p className="text-lg font-bold text-[#838484]">สวัสดี, {props.data.display_name}</p>
                    <p className="text-xl font-bold mt-1">วันนี้<span className="text-[#FED634]">กินอะไรดี ?</span></p>
                </div>

            </div>

        </div >
    )
}

export default function NewHomePage() {
    let navigate = useNavigate;
    const authContext = useContext(AuthContext);
    const [userData, setUserData] = useState([{}])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function getUserData() {
            const profile = await liff.getProfile();
            axios
                .get(
                    `${import.meta.env.VITE_BACKEND_API_ENDPOINT}/apis/user/liff/${profile.userId
                    }`
                )
                .then((res) => {
                    setUserData(res.data)
                    setIsLoading(false)
                })
                .catch((error) => {
                    console.log(error)
                    setIsLoading(false)
                })
        }
        getUserData()
    }, [])

    if (!authContext.userData) {
        return <Navigate to={"/new-user"} />;
    }

    if (isLoading) {
        return <MyLoader />
    } else {
        return (
            <div className="p-4">
                <div>
                    <Header data={userData} />
                </div>
            </div>
        )
    }

    return
}
