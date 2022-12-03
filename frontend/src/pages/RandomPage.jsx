import react, { useState, useEffect } from "react"

// React Router Dom
import { Navigate, useNavigate } from "react-router";

// Context Provider
import { AuthContext } from "../context/Auth";

// Mantine-UI Components
import {
    TextInput,
    Checkbox,
    Paper,
    Text,
    Textarea,
    Container,
    Button,
    Modal,
    Avatar,
    SegmentedControl,
    MantineProvider,
    Card,
    Image,
    Badge,
    Group,
    Autocomplete,
    NativeSelect,
    Alert
} from '@mantine/core';

// Icons
import { IconSearch, IconAlertCircle, IconArrowsShuffle2 } from '@tabler/icons';

// Axios
import axios from "axios";
import MyLoader from "../components/MyLoader";

const RandomInfoCard = (props) => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)

    const RandomInfoModal = (props) => {
        return (
            <div>
                <Modal
                    opened={isOpen}
                    onClose={() => setIsOpen(false)}
                    title="รายละเอียดเมนูอาหาร"
                    fullScreen
                >
                    <div>
                        <div >
                            <Image
                                radius="md"
                                src={props.data.random_menu_image_url}
                                alt="Image_Picture_Url"
                            />
                        </div>

                        <div className="p-4">
                            <p className="mt-4 font-bold text-2xl">
                                {props.data.random_menu_name}
                            </p>
                            <p className="mt-4 font-bold text-xl">
                                ราคา : <span className="text-[#FED634]">{props.data.random_menu_price}</span> บาท
                            </p>
                            <p className="mt-4">
                                ร้าน : {props.data.random_restaurant_name}
                            </p>
                            <p className="mt-4">
                                สถานที่ : โรงอาหาร - คณะเทคโนโลยีสารสนเทศ
                            </p>
                        </div>

                        <div className="mt-4">
                            <Card shadow="sm" p="lg" radius="md" id={props.key} withBorder>

                                <p className="text-lg">
                                    ต้องการดูเมนูของร้านนี้เพิ่มเติม ?
                                </p>
                                <p className="font-bold mt-2" onClick={() => navigate(`/restaurant/menu?restaurantId=${props.data.random_restaurant_id}`)}>
                                    ดูเมนูอาหารทั้งหมดของร้าน <span className="text-[#FED634] underline">{props.data.random_restaurant_name}</span>
                                </p>
                            </Card>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }

    return (
        <div>
            <RandomInfoModal data={props.data} />
            <div className="mt-4" onClick={() => setIsOpen(true)}>
                <Card shadow="sm" className="p-0" radius="md" id={props.key} withBorder>
                    <div className="flex items-center">
                        <Image
                            src={props.data.random_menu_image_url}
                            height={150}
                            width={125}
                            alt="menu_image_url"
                        />

                        <div className="p-3">
                            <p className="font-bold">เมนู : {props.data.random_menu_name}</p>
                            <p className="mt-1">
                                {props.data.random_restaurant_name}
                            </p>
                            <p className="mt-1">
                                ราคา : <span className="font-bold">{props.data.random_menu_price}</span> บาท
                            </p>
                        </div>
                    </div>

                    <div className="p-3 bg-yellow-200">
                        <p className="text-sm">
                            {props.data.random_category_name}
                        </p>
                        <p className="mt-1 text-sm">
                            สถานที่ : โรงอาหาร - คณะเทคโนโลยีสารสนเทศ
                        </p>
                    </div>

                </Card>
            </div>
        </div>
    )
}

export default function RandomPage() {
    const [selectedCategory, setSelectedCategory] = useState("หมวดหมู่ทั้งหมด")
    const [randomHistories, setRandomHistories] = useState([{}])
    const [menus, setMenus] = useState([{}])
    const [isLoading, setIsLoading] = useState(false)
    const [isReady, setIsReady] = useState(false)
    const [openSuccessCard, setIsOpenSuccessCard] = useState(false)
    const [randomResult, setRandomResult] = useState([{}])

    useEffect(() => {
        async function getAllRandomHistories() {
            axios
                .get(`${import.meta.env.VITE_BACKEND_API_ENDPOINT}/apis/random/user/1`)
                .then((response) => {
                    setRandomHistories(response.data);
                    console.log(response.data);
                    setIsReady(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        async function getAllMenus() {
            axios
                .get(
                    `${import.meta.env.VITE_BACKEND_API_ENDPOINT}/apis/menu/`
                )
                .then((response) => {
                    console.log(response.data)
                    setMenus(response.data)
                    getAllRandomHistories()

                })
                .catch((error) => {
                    console.log(error)
                    setIsReady(false)
                })
        }

        getAllMenus()
    }, [])

    const RandomSuccessModal = (props) => {
        return (
            <div>
                <Modal
                    opened={openSuccessCard}
                    onClose={() => setIsOpenSuccessCard(false)}
                    title="รายละเอียดการสุ่มเมนูอาหาร"
                    fullScreen
                >
                    <div>
                        <div>
                            <Alert icon={<IconAlertCircle size={16} />} title="สุ่มเมนูอาหารสำเร็จ !" color="teal">
                                ทำการสุ่มเมนูอาหารสำเร็จ ลองสั่ง <span className="font-bold">{props.data.random_menu_name}</span> ที่ร้าน <span className="font-bold">{props.data.random_restaurant_name}</span> เลยยยย !
                            </Alert>
                        </div>
                        <div className="mt-4">
                            <Image
                                radius="md"
                                src={props.data.random_menu_image_url}
                                alt="Image_Picture_Url"
                            />
                        </div>

                        <div className="p-4">
                            <p className="mt-4 font-bold text-2xl">
                                {props.data.random_menu_name}
                            </p>
                            <p className="mt-4 font-bold text-xl">
                                ราคา : <span className="text-[#FED634]">{props.data.random_menu_price}</span> บาท
                            </p>
                            <p className="mt-4">
                                ร้าน : {props.data.random_restaurant_name}
                            </p>
                            <p className="mt-4">
                                สถานที่ : โรงอาหาร - คณะเทคโนโลยีสารสนเทศ
                            </p>
                        </div>

                        <div className="mt-4">
                            <Card shadow="sm" p="lg" radius="md" id={props.key} withBorder>

                                <p className="text-lg">
                                    ต้องการดูเมนูของร้านนี้เพิ่มเติม ?
                                </p>
                                <p className="font-bold mt-2" onClick={() => navigate(`/restaurant/menu?restaurantId=${props.data.random_restaurant_id}`)}>
                                    ดูเมนูอาหารทั้งหมดของร้าน <span className="text-[#FED634] underline">{props.data.random_restaurant_name}</span>
                                </p>
                            </Card>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }

    const handleRandom = async () => {
        setIsLoading(true)

        const selectedCategoryId = {
            "หมวดหมู่ทั้งหมด": 0,
            "หมวดหมู่อาหาร": 1,
            "หมวดหมู่เครื่องดื่ม": 2,
            "หมวดหมู่ขนม & ของหวาน": 3,
        }
        const randomCategoryId = selectedCategoryId[selectedCategory]

        axios
            .post(
                `${import.meta.env.VITE_BACKEND_API_ENDPOINT}/apis/random/`,
                { "random_by": 1, "random_category_id": randomCategoryId }
            )
            .then((response) => {
                console.log(response.data)
                setRandomHistories([response.data, ...randomHistories])
                setRandomResult(response.data)
                setIsLoading(false)
                setIsOpenSuccessCard(true)
            })
            .catch((error) => {
                console.log(error)
                setIsLoading(false)
            })
    }

    return (
        <div>
            {
                !isReady ?
                    <div>
                        <MyLoader />
                    </div>
                    :
                    <div className="p-5 mb-16">
                        <RandomSuccessModal data={randomResult} />
                        <div className="text-center font-bold text-lg">
                            <div className="flex justify-center">
                                <IconArrowsShuffle2 size={35} color="#FED634" />
                            </div>

                            <p className="text-[#FED634]">
                                สุ่มเมนูอาหาร
                            </p>
                        </div>

                        <div className="mt-4">
                            <Card shadow="sm" p="lg" radius="md" withBorder>
                                <NativeSelect
                                    value={selectedCategory}
                                    onChange={(event) => setSelectedCategory(event.currentTarget.value)}
                                    data={['หมวดหมู่ทั้งหมด', 'หมวดหมู่อาหาร', 'หมวดหมู่เครื่องดื่ม', 'หมวดหมู่ขนม & ของหวาน']}
                                    label="หมวดหมู่อาหารที่ต้องการสุ่ม"
                                    description="เลือกหมวดหมู่อาหารที่ต้องการสุ่ม เช่น หมวดหมู่ทั้งหมด / อาหาร / เครื่องดื่ม หรือ ขนม & ของหวาน"

                                />

                                <NativeSelect
                                    className="mt-4"
                                    data={["โรงอาหาร - คณะเทคโนโลยีสารสนเทศ"]}
                                    label="สถานที่ของโรงอาหารที่ต้องการสุ่ม"
                                    description="เลือกสถานที่ของโรงอาหารที่ต้องการสุ่ม เช่น โรงอาหาร - คณะเทคโนโลยีสารสนเทศ"
                                    disabled
                                />

                                <Button
                                    className="bg-yellow-500 active:bg-yellow-600 hover:bg-yellow-600 w-full mt-6"
                                    onClick={handleRandom}
                                    loading={isLoading}
                                >
                                    กดเพิ่มสุ่มเมนุอาหาร / ร้านอาหาร
                                </Button>
                            </Card>
                        </div>

                        <div>
                            <div className="mt-6 mb-4">
                                <p className="font-bold">ประวัติการสุ่มเมนูอาหาร / ร้านอาหาร</p>
                            </div>
                        </div>

                        <div>
                            {
                                randomHistories.map((random) => (
                                    <div key={random.id}>
                                        <RandomInfoCard data={random} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
            }
        </div>
    )
}