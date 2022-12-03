import react, { useState, useEffect, useContext } from "react";

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
    Autocomplete
} from '@mantine/core';

// Tabler Icons
import { IconSearch } from '@tabler/icons';

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
                    <p></p>
                </div>
            </div>
        </div >
    )
}

const MenuCard = (props) => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false)
    const [test, setTest] = useState(false)

    const MenuInfo = (props) => {
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
                                src={props.data.image_url}
                                alt="Image_Picture_Url"
                            />
                        </div>

                        <div className="p-4">
                            <p className="mt-4 font-bold text-2xl">
                                {props.data.name}
                            </p>
                            <p className="mt-4 font-bold text-xl">
                                ราคา : <span className="text-[#FED634]">{props.data.price}</span> บาท
                            </p>
                            <p className="mt-4">
                                ร้าน : {props.data.restaurant_name}
                            </p>
                            <p className="mt-4">
                                สถานที่ : {props.data.restaurant_location}
                            </p>
                        </div>

                        <div className="mt-4">
                            <Card shadow="sm" p="lg" radius="md" id={props.key} withBorder>

                                <p className="text-lg">
                                    ต้องการดูเมนูของร้านนี้เพิ่มเติม ?
                                </p>
                                <p className="font-bold mt-2" onClick={() => navigate(`restaurant/menu?restaurantId=${props.data.restaurant_id}`)}>
                                    ดูเมนูอาหารทั้งหมดของร้าน <span className="text-[#FED634] underline">{props.data.restaurant_name}</span>
                                </p>
                            </Card>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }

    return (
        <div
            onClick={() => {
                setIsOpen(true)
            }}
            id={props.uniqueKey}
        >
            <MenuInfo data={props.data} />
            <Card shadow="sm" p="lg" radius="md" className="h-80" id={props.key} withBorder>
                <Card.Section>
                    <Image
                        src={props.data.image_url}
                        height={160}
                        alt="menu_image_url"
                    />
                </Card.Section>

                <Group position="apart" mt="md" mb="xs">
                    <Text weight={500}>{props.data.name}</Text>
                </Group>

                <Text size="xs" color="dimmed">
                    {props.data.restaurant_name}
                </Text>
                <Text size="xs" color="dimmed">
                    {props.data.restaurant_location}
                </Text>
            </Card>
        </div>

    );
}

export default function NewHomePage() {
    const authContext = useContext(AuthContext);
    const [userData, setUserData] = useState([{}])
    const [isLoading, setIsLoading] = useState(false)
    const [menus, setMenus] = useState([{}])
    const [filteredMenus, setFilteredMenus] = useState([{}])
    const [searchKeyword, setSearchKeyword] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("all")

    useEffect(() => {
        async function getUserData() {
            axios
                .get(
                    `${import.meta.env.VITE_BACKEND_API_ENDPOINT}/apis/user/liff/U16844612535a2bcc9801c6cfa13a24fa`
                )
                .then((res) => {
                    setUserData(res.data)
                })
                .catch((error) => {
                    console.log(error)
                    setIsLoading(false)
                })

        }

        async function getAllMenus() {
            axios
                .get(
                    `${import.meta.env.VITE_BACKEND_API_ENDPOINT}/apis/menu/`
                )
                .then((res) => {
                    setFilteredMenus(res.data)

                    const searchKeywords = []
                    const response = res.data
                    response.forEach((menu) => {
                        searchKeywords.push(menu.name)
                    })
                    setSearchKeyword(searchKeywords)
                    setMenus(res.data)
                    setIsLoading(false)
                })
                .catch((error) => {
                    console.log(error)
                    setIsLoading(false)
                })
        }

        getUserData()
        getAllMenus()
    }, [])

    const handleSearchKeywordChange = (keyword) => {
        if (!keyword) {
            setFilteredMenus(menus)
        } else {
            var x = menus.filter((element) => {
                return element.name.toLowerCase().trim().match((keyword).toLowerCase().trim())
            });
            setFilteredMenus(x)
        }
    }

    if (!authContext.userData) {
        return <Navigate to={"/new-user"} />;
    }

    if (isLoading) {
        return <MyLoader />
    } else {
        return (
            <div className="p-5">
                <div>
                    <Header data={userData} />
                    <Autocomplete
                        className="mt-4"
                        placeholder="ค้นหาเมนูอาหาร..."
                        radius="md"
                        size="md"
                        icon={<IconSearch />}
                        onChange={handleSearchKeywordChange}
                        data={searchKeyword} />

                    <p className="mt-4 font-bold">
                        เลือกดูตามหมวดหมู่อาหาร
                    </p>
                    <SegmentedControl
                        className="w-full mt-2"
                        value={selectedCategory}
                        onChange={(event) => {
                            setSelectedCategory(event)
                            if (event !== "all") {
                                var x = menus.filter((element) => {
                                    return element.category_id == Number(event)
                                });
                                setFilteredMenus(x)
                            } else {
                                setFilteredMenus(menus)
                            }

                        }}
                        data={[
                            { label: 'ทั้งหมด', value: "all" },
                            { label: 'อาหาร', value: "1" },
                            { label: 'เครื่องดื่ม', value: "2" },
                            { label: 'ขนม & ของหวาน', value: "3" },
                        ]}
                    />


                    <div className="flex flex-wrap">
                        {
                            filteredMenus.map((menu, id) => (
                                <div className="w-6/12 mt-4">
                                    <MenuCard data={menu} uniqueKey={menu.id} />
                                </div>

                            ))
                        }
                    </div>


                </div>
            </div>
        )
    }
}
