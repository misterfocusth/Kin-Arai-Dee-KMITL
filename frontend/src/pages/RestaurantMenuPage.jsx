import { useEffect, useState } from "react";

// React Router
import { useSearchParams } from "react-router-dom";

// Axios
import axios from "axios";

// Mantine-UI Components
import {
    Autocomplete, Card,
    Image, Modal
} from '@mantine/core';

// Tabler Icons
import { IconSearch } from '@tabler/icons';

// My Components
import MyLoader from "../components/MyLoader";

const MenuCard = (props) => {
    const [isOpen, setIsOpen] = useState(false)

    const MenuInfoCard = (props) => {
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
                    </div>
                </Modal>
            </div>
        )
    }

    return (
        <div className="mt-4" onClick={() => setIsOpen(true)}>
            <MenuInfoCard data={props.data} />
            <Card shadow="sm" className="p-0" radius="md" id={props.key} withBorder>
                <div className="flex items-center gap-4">
                    <Image
                        src={props.data.image_url}
                        height={150}
                        width={125}
                        alt="menu_image_url"
                        className="bg-center"
                    />

                    <div className="">
                        <p >{props.data.name}</p>
                        <p >
                            ราคา : {props.data.price} บาท
                        </p>
                        <p >
                            เมนู{props.data.category}
                        </p>
                    </div>
                </div>

            </Card>
        </div>
    )
}

export default function RestaurantMenuPage() {
    const [menus, setMenus] = useState([{}])
    const [restaurantData, setRestaurantData] = useState([{}])
    const [filteredMenus, setFilteredMenus] = useState([{}])
    const [isLoading, setIsLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchKeyword, setSearchKeyword] = useState([{}])
    const restaurantId = searchParams.get("restaurantId")

    useEffect(() => {
        async function getRestaurantData() {
            axios
                .get(
                    `${import.meta.env.VITE_BACKEND_API_ENDPOINT}/apis/restaurant/${restaurantId}`
                )
                .then((res) => {
                    setRestaurantData(res.data)
                    getAllMenus()
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
                    const filteredByRestaurantId = res.data.filter((menu) => menu.restaurant_id == restaurantId)
                    setMenus(filteredByRestaurantId)

                    const searchKeywords = []
                    const response = filteredByRestaurantId
                    response.forEach((menu) => {
                        searchKeywords.push(menu.name)
                    })
                    setSearchKeyword(searchKeywords)
                    setFilteredMenus(filteredByRestaurantId)

                    setIsLoading(false)
                })
                .catch((error) => {
                    console.log(error)
                    setIsLoading(false)
                })
        }


        getRestaurantData()
        getAllMenus()
        window.scrollTo(0, 0)
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

    return (
        <div className="p-5 mb-16">
            {isLoading ? <MyLoader /> :
                <div>
                    <div>
                        <div>
                            <div className="mt-4">
                                <Image
                                    radius="md"
                                    src={restaurantData.image_url}
                                    alt="Image_Picture_Url"
                                />


                                <div className="items-center mt-4 p-2">
                                    <p className="text-lg font-bold">
                                        {restaurantData.name}
                                    </p>
                                    <p className="mt-2">
                                        สถานที่ : {restaurantData.location}
                                    </p>
                                    <p className="mt-2">
                                        หมวดหมู่ร้านอาหาร : {restaurantData.category}
                                    </p>
                                    <p className="mt-2">
                                        เบอร์โทรติดต่อ : {restaurantData.phone_number}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div>
                        <Autocomplete
                            className="mt-2"
                            placeholder={`ค้นหาเมนูอาหาร ${restaurantData.name}`}
                            radius="md"
                            size="md"
                            icon={<IconSearch />}
                            onChange={handleSearchKeywordChange}
                            data={searchKeyword} />
                    </div>

                    <div className="mt-4">
                        {
                            filteredMenus.map((menu) => (
                                <div key={menu.id}>
                                    <MenuCard data={menu} />
                                </div>

                            ))
                        }
                    </div>

                </div>
            }
        </div>
    )
}