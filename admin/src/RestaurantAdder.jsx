import React, { useState, useEffect } from "react";
import "./App.css";

// Mantine Components
import { Input, Button, Textarea, Autocomplete } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons";

// Axios
import axios from "axios"

export default function RestaurantAdder() {
    const [isLoading, setIsLoading] = useState(false);
    // const [isReady, setIsReady] = useState(false)
    const [restaurantData, setRestaurantData] = useState({
        name: "",
        location: "โรงอาหาร - คณะเทคโนโลยีสารสนเทศ",
        phone_number: "",
        category: "ร้านอาหาร",
        image_url: "",
        category_id: 1,
    })
    const [restaurants, setRestaurants] = useState([{}])

    // useEffect(() => {
    //     async function getAllRestaurants() {
    //         const API_ENDPOINT = `${import.meta.env.VITE_BACKEND_API_ENDPOINT
    //             }/apis/restaurant/`;
    //         axios.get(API_ENDPOINT).then((response) => {
    //             console.log(response.data)
    //             setRestaurants(response.data)
    //             setIsReady(true)
    //         })
    //             .catch((error) => console.log(error))
    //     }

    //     getAllRestaurants()
    // }, [])

    const handleChange = (event) => {
        setRestaurantData({
            ...restaurantData,
            [event.currentTarget.id]: event.currentTarget.value,
        });
    };
    const handleAddRestaurant = async () => {
        let isEmpty = false;
        console.log(restaurantData)
        for (let data in restaurantData) {
            if (!restaurantData[data])
                isEmpty = true
        }
        if (isEmpty) {
            alert("ข้อมูลร้านอาหารไม่ครบ !")
        } else {
            setIsLoading(true);

            console.log(restaurantData);
            var config = {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            };


            const API_ENDPOINT = `${import.meta.env.VITE_BACKEND_API_ENDPOINT
                }/apis/restaurant/`;
            axios
                .post(API_ENDPOINT, {
                    "name": restaurantData.name,
                    "location": restaurantData.location,
                    "phone_number": restaurantData.phone_number,
                    "category": restaurantData.category,
                    "image_url": restaurantData.image_url,
                    "category_id": Number(restaurantData.category_id),
                }, config)
                .then((response) => {
                    console.log(response);
                    setRestaurantData({
                        name: "",
                        location: "โรงอาหาร - คณะเทคโนโลยีสารสนเทศ",
                        phone_number: "",
                        category: "ร้านอาหาร",
                        category_id: 1,
                        image_url: "",
                    });
                    setIsLoading(false);
                    alert("เพิ่มร้านอาหารใหม่สำเร็จ");
                })
                .catch((error) => {
                    console.log(error.response);
                    setIsLoading(false);
                    alert("Error");
                });
        }
    };
    return (
        <div className="mb-16">
            <div>
                <h1 className="text-center font-bold text-xl">
                    --- เพิ่มร้านอาหาร ---
                </h1>
            </div>
            <div className="mt-4">
                <Input.Wrapper
                    id="image_url"
                    withAsterisk
                    label="ลิงค์รูปภาพของร้านอาหารจาก Microsoft Azure (Blob Storage)"
                    description="วางลิงค์รูปภาพ (URL) ของร้านอาหารที่ได้จาก Azure เช่น https://9lnre8vrd1yfo5ze.blob.core.windows.net/<IMAGE_URL>"
                >
                    <Textarea
                        id="image_url"
                        placeholder="ลิงค์รูปภาพของร้านอาหาร"
                        value={restaurantData.image_url}
                        onChange={(event) =>
                            setRestaurantData({
                                ...restaurantData,
                                image_url: event.currentTarget.value,
                            })
                        }
                        minRows={4}
                    />
                </Input.Wrapper>
            </div>

            <div className="mt-4">
                <Input.Wrapper
                    id="name"
                    withAsterisk
                    label="ชื่อร้านอาหาร"
                    description="ใส่ชื่อร้านอาหารที่ต้องการเพิ่มเข้าระบบ เช่น : ร้านพี่ศิลา / ร้านพี่บอลลูน"
                >
                    <Input
                        id="name"
                        placeholder="ชื่อร้านอาหาร"
                        value={restaurantData.name}
                        onChange={handleChange}
                    />
                </Input.Wrapper>
            </div>

            <div className="mt-4">
                <Input.Wrapper
                    id="phone_number"
                    withAsterisk
                    label="เบอร์โทรติดต่อร้านอาหาร"
                    description="ใส่เบอร์โทรติดต่อของร้านอาหาร ถ้าไม่มีให้ใส่เป็น -"
                >
                    <Input
                        id="phone_number"
                        placeholder="เบอร์โทรศัพท์"
                        value={restaurantData.phone_number}
                        onChange={handleChange}
                    />
                </Input.Wrapper>
            </div>

            <div className="mt-4">
                <Input.Wrapper
                    id="location"
                    withAsterisk
                    label="สถานที่ของร้านอาหาร"
                    description="สถานที่ตั้งของร้านอาหาร เช่น : โรงอาหาร - คณะเทคโนโลยีสารสนเทศ หรือ โรงอาหาร - คณะวิทยาศาสตร์"
                >
                    <Input
                        id="location"
                        component="select"
                        rightSection={<IconChevronDown size={14} stroke={1.5} />}
                        value={restaurantData.location}
                        onChange={(event) => {
                            setRestaurantData({
                                ...restaurantData,
                                location: event.currentTarget.value,
                            });
                        }}
                    >
                        <option value="1">โรงอาหาร - คณะเทคโนโลยีสารสนเทศ</option>
                    </Input>
                </Input.Wrapper>
            </div>

            <div className="mt-4">
                <Input.Wrapper
                    id="category"
                    withAsterisk
                    label="หมวดหมู่ร้านอาหาร"
                    description="เลือกหมวดหมู่ / ประเภทของร้านอาหาร เช่น : ร้านอาหาร หรือ ร้านเครื่องดื่ม หรือ ร้านขนม & ของหวาน"
                >
                    <Input
                        id="category"
                        component="select"
                        rightSection={<IconChevronDown size={14} stroke={1.5} />}
                        value={restaurantData.category_id}
                        onChange={(event) => {
                            const categoryName = [
                                "ร้านอาหาร",
                                "ร้านเครื่องดื่ม",
                                "ร้านขนม & ของหวาน",
                            ];
                            const selectedCategoryId = Number(
                                event.currentTarget.value
                            );
                            setRestaurantData({
                                ...restaurantData,
                                category: categoryName[selectedCategoryId - 1],
                                category_id: selectedCategoryId,
                            });
                            console.log(restaurantData);
                        }}
                    >
                        <option value="1">1. ร้านอาหาร</option>
                        <option value="2">2. ร้านเครื่องดื่ม</option>
                        <option value="3">3. ร้านขนม & ของหวาน</option>
                    </Input>
                </Input.Wrapper>
            </div>

            <div className="mt-4">
                <Button
                    className="bg-yellow-500 active:bg-yellow-700 w-full"
                    onClick={handleAddRestaurant}
                    loading={isLoading}
                >
                    เพิ่มร้านอาหาร
                </Button>
            </div>
        </div>)
}