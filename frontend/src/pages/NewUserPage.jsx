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

import react, { useState, useEffect, useContext } from "react"

// React Router Dom
import { Navigate } from "react-router";

// Axios
import axios from 'axios';

// Context Provider
import { AuthContext } from "../context/Auth";
import MyLoader from '../components/MyLoader';

export default function NewUserPage() {
    const [userData, setUserData] = useState({
        userId: "U16844612535a2bcc9801c6cfa13a24fa",
        displayName: "IT KMITL",
        pictureUrl: "https://9lnre8vrd1yfo5ze.blob.core.windows.net/user-profile-pictures/U16844612535a2bcc9801c6cfa13a24fa/avatar.png"
    })
    const [checkboxs, setCheckboxs] = useState({
        isAcceptTerms: false,
        isAcceptPDPA: false,
        isAcceptAll: false
    })
    const [isLoading, setIsLoading] = useState(false)

    const authContext = useContext(AuthContext);

    // useEffect(() => {
    //     async function getLIFFUserData() {
    //         const profile = liff.getProfile().then((data) => {
    //             setUserData({
    //                 userId: data.userId,
    //                 displayName: data.displayName,
    //                 pictureUrl: data.pictureUrl
    //             })
    //             setIsReady(true)
    //         })
    //     }

    //     getLIFFUserData()
    // }, [])

    const handleChange = (event) => {
        setUserData({ ...userData, [event.currentTarget.id]: event.currentTarget.value })
    }

    const handleCheckboxChange = (event) => {
        setCheckboxs({ ...checkboxs, [event.currentTarget.id]: event.currentTarget.checked })
    }

    const handleRegister = () => {
        setIsLoading(true)

        if (!userData.displayName) {
            return alert("กรุณาใส่ชื่อที่ต้องการให้เป็นชื่อที่แสดงในระบบ")
        }

        const newUserData = {
            "user_id": userData.userId,
            "profile_picture_url": userData.pictureUrl,
            "display_name": userData.displayName,
            "is_accepted_terms": checkboxs.isAcceptTerms,
            "is_accepted_pdpa": checkboxs.isAcceptPDPA
        }
        const API_ENDPOINT = `${import.meta.env.VITE_BACKEND_API_ENDPOINT}/apis/user/`

        axios.post(API_ENDPOINT, newUserData)
            .then((response) => {
                console.log(response.data)
                setIsLoading(false)
                alert("สมัครสมาชิกสำเร็จ !")
                location.reload()
            })
            .catch((error) => {
                console.log(error)
                setIsLoading(false)
                alert(error)
            })
    }

    if (authContext.userData) {
        return <Navigate to={"/"} />;
    }

    return (
        <div className='p-2 mb-32'>
            <Container size={420} my={20}>
                <Text size="xl" align="center" className="font-bold">
                    สมัครสมาชิกใหม่
                </Text>
                <Text color="dimmed" size="sm" align="center" mt={8}>
                    ดูเหมือนว่าคุณยังไม่เคยเข้าใช้งาน <span className='text-[#FED634] font-bold'>Kin Arai Dee (@KMITL)</span> มาก่อน มาสมัครสมาชิกใหม่เพื่อเข้าใช้งานกันเลย !
                </Text>

                <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                    <div className='flex w-full justify-center items-center'>
                        <Avatar
                            className=''
                            src={userData.pictureUrl}
                            alt="line_profile_picture"
                            size={"full"}
                            radius={"lg"}
                        />
                    </div>
                    <TextInput
                        className='mt-6'
                        label="ชื่อที่จะแสดงในระบบ"
                        placeholder="โปรดใส่ชื่อที่จะให้แสดงในระบบ..."
                        id="displayName"
                        value={userData.displayName}
                        onChange={handleChange}
                        required
                    />
                    <Textarea
                        label="LINE UserID"
                        placeholder="LINE UserID"
                        required
                        mt="md"
                        disabled
                        value={userData.userId}
                        minRows={2}
                    />

                    <MantineProvider theme={{
                        colors: {
                            brand: ['#FED634', '#FED634', '#FED634', '#FED634', '#FED634', '#FED634', '#FED634', '#FED634', '#FED634', '#FED634'],
                        },
                        primaryColor: 'brand',
                    }}
                    >
                        <div className='flex items-center gap-3 mt-4'>
                            <Checkbox checked={checkboxs.isAcceptTerms} onChange={(event) => handleCheckboxChange(event)} id="isAcceptTerms" />
                            <div>อ่านและยอมรับ <span className='text-[#FED634] underline'><a href='https://google.com' target="_blank" rel="noopener noreferrer">เงื่อนไขและข้อตกลงในการใข้งานแอปพลิเคชั่น</a></span></div>

                        </div>

                        <div className='flex items-center gap-3 mt-4'>
                            <Checkbox checked={checkboxs.isAcceptPDPA} onChange={(event) => handleCheckboxChange(event)} id="isAcceptPDPA" />
                            <div>
                                อ่านและยอมรับ <span className='text-[#FED634] underline'><a href='https://google.com' target="_blank" rel="noopener noreferrer">นโยบายการจัดเก็บรวบรวมใช้ข้อมูลส่วนบุคคล (PDPA)</a></span>
                            </div>
                        </div>
                    </MantineProvider>

                    <Button fullWidth mt="xl" className='bg-[#FED634] active:bg-[#FED634] text-black' onClick={handleRegister} disabled={!(checkboxs.isAcceptPDPA && checkboxs.isAcceptTerms)} loading={isLoading}>
                        สมัครสมาชิกใหม่
                    </Button>
                </Paper>
            </Container>
        </div>
    )
}