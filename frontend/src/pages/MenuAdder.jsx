import react, { useState, useEffect } from "react"

// Mantine Components
import { Input, Button, Textarea, Loader } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons";

// Axios
import axios from "axios"

export default function MenuAdder() {
    const [restaurants, setRestaurants] = useState([{}]);
    const [isReady, setIsReady] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [menuData, setMenuData] = useState({
        name: "",
        price: 0,
        category: "หมวดหมู่อาหาร",
        category_id: 1,
        restaurant_name: "",
        restaurant_id: 0,
        restaurant_location: "โรงอาหาร - คณะเทคโนโลยีสารสนเทศ",
        image_url: "",
    });
    const [selectedRestaurantId, setSelectedRestaurantId] = useState("1");

    useEffect(() => {
        console.log(import.meta.env.VITE_BACKEND_API_ENDPOINT)
        console.log(import.meta.env)
        async function getAllRestaurant() {
            axios
                .get(`${import.meta.env.VITE_BACKEND_API_ENDPOINT}/apis/restaurant/`)
                .then((response) => {
                    setRestaurants(response.data);
                    setMenuData({
                        ...menuData,
                        restaurant_id: response.data[0].id,
                        restaurant_name: response.data[0].name
                    })
                    console.log(response.data);
                    setIsReady(true);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        getAllRestaurant();
    }, []);

    const handleMenuDataChange = (event) => {
        setMenuData({
            ...menuData,
            [event.currentTarget.id]: event.currentTarget.value,
        });
    };

    const handleAddMenu = async () => {
        const API_ENDPOINT = `${import.meta.env.VITE_BACKEND_API_ENDPOINT
            }/apis/menu/`;

        console.log(menuData);
        let isEmpty = false
        for (let data in menuData) {
            if (!menuData[data]) {
                isEmpty = true
            }
        }
        if (isEmpty) {
            alert("ข้อมูลเมนูอาหารไม่ครบ")
        } else {
            setIsLoading(true)
            axios.post(API_ENDPOINT, {
                name: menuData.name,
                price: Number(menuData.price),
                category: menuData.category,
                category_id: Number(menuData.category_id),
                restaurant_name: menuData.restaurant_name,
                restaurant_id: Number(menuData.restaurant_id),
                restaurant_location: menuData.restaurant_location,
                image_url: menuData.image_url
            })
                .then((response) => {
                    console.log(response)
                    setMenuData({
                        name: "",
                        price: 0,
                        category: "หมวดหมู่อาหาร",
                        category_id: 0,
                        restaurant_name: "",
                        restaurant_id: 0,
                        restaurant_location: "โรงอาหาร - คณะเทคโนโลยีสารสนเทศ",
                        image_url: "",
                    })
                    setIsLoading(false)
                    alert("เพิ่มเมนูอาหารสำเร็จ")
                })
                .catch((error) => console.log(error))
        }
    };

    if (!isReady) {
        return (
            <div className="flex min-h-screen min-w-screen justify-center items-center">
                <Loader color="yellow" size="xl" variant="dots" />
            </div>
        );
    }

    return (
        <div className="mb-16 p-6">
            <div>
                <h1 className="text-center font-bold text-xl">
                    --- เพิ่มเมนูอาหาร ---
                </h1>
            </div>

            <div className="mt-4">
                <Input.Wrapper
                    id="image_url"
                    withAsterisk
                    label="ลิงค์รูปภาพของเมนูอาหารจาก Microsoft Azure (Blob Storage)"
                    description="วางลิงค์รูปภาพ (URL) ของร้านอาหารที่ได้จาก Azure เช่น https://9lnre8vrd1yfo5ze.blob.core.windows.net/<IMAGE_URL>"
                >
                    <Textarea
                        id="image_url"
                        placeholder="ลิงค์รูปภาพของเมนูอาหาร"
                        value={menuData.image_url}
                        onChange={(event) =>
                            setMenuData({
                                ...menuData,
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
                    label="ชื่อเมนูอาหาร"
                    description="ใส่ชื่อร้านอาหารที่ต้องการเพิ่มเข้าระบบ เช่น : ข้าวผัดกระเพรา / ข้าวผัด"
                >
                    <Input
                        id="name"
                        placeholder="ชื่อเมนูอาหาร"
                        value={menuData.name}
                        onChange={handleMenuDataChange}
                    />
                </Input.Wrapper>
            </div>

            <div className="mt-4">
                <Input.Wrapper
                    id="price"
                    withAsterisk
                    label="ราคาอาหาร"
                    description="ใส่ราคาอาหาร เช่น : 50 (ไม่ต้องใส่บาท)"
                >
                    <Input
                        id="price"
                        placeholder="ราคาอาหาร"
                        value={menuData.price}
                        onChange={handleMenuDataChange}
                    />
                </Input.Wrapper>
            </div>

            <div className="mt-4">
                <Input.Wrapper
                    id="restaurant_name"
                    withAsterisk
                    label="ร้านอาหาร"
                    description="เลือกร้านอาหารที่เป็นเจ้าของเมนูนี้"
                >
                    <Input
                        id="restaurant_name"
                        component="select"
                        rightSection={<IconChevronDown size={14} stroke={1.5} />}
                        value={selectedRestaurantId}
                        onChange={(event) => {
                            setSelectedRestaurantId(event.currentTarget.value);
                            const selectedRestaurantMenuId = Number(
                                event.currentTarget.value
                            );
                            const restaurant = restaurants.filter(restaurant => restaurant.id == selectedRestaurantMenuId)
                            setMenuData({
                                ...menuData,
                                restaurant_id: Number(event.currentTarget.value),
                                restaurant_name: restaurant[0].name,
                            });
                        }}
                    >
                        {
                            restaurants.map((restaurant, id) => (
                                <option value={String(restaurant.id)} key={id}>
                                    {restaurant.name}
                                </option>
                            ))
                        }
                    </Input>
                </Input.Wrapper>
            </div>

            <div className="mt-4">
                <Input.Wrapper
                    id="restaurant_location"
                    withAsterisk
                    label="สถานที่ของร้านอาหาร"
                    description="สถานที่ตั้งของร้านอาหาร เช่น : โรงอาหาร - คณะเทคโนโลยีสารสนเทศ หรือ โรงอาหาร - คณะวิทยาศาสตร์"
                >
                    <Input
                        id="restaurant_location"
                        component="select"
                        rightSection={<IconChevronDown size={14} stroke={1.5} />}
                        value={menuData.restaurant_location}
                        onChange={(event) => {
                            setMenuData({
                                ...menuData,
                                restaurant_location: event.currentTarget.value,
                            });
                        }}
                    >
                        <option value="1" key={1}>โรงอาหาร - คณะเทคโนโลยีสารสนเทศ</option>
                    </Input>
                </Input.Wrapper>
            </div>

            <div className="mt-4">
                <Input.Wrapper
                    id="category"
                    withAsterisk
                    label="หมวดหมู่เมนูอาหาร"
                    description="เลือกหมวดหมู่ / ประเภทของเมนูอาหาร เช่น : อาหาร หรือ เครื่องดื่ม หรือ ขนม & ของหวาน"
                >
                    <Input
                        id="category"
                        component="select"
                        rightSection={<IconChevronDown size={14} stroke={1.5} />}
                        value={menuData.category_id}
                        onChange={(event) => {
                            const categoryName = [
                                "หมวดหมู่อาหาร",
                                "หมวดหมู่เครื่องดื่ม",
                                "หมวดหมู่ขนม & ของหวาน",
                            ];
                            const selectedCategoryId = Number(
                                event.currentTarget.value
                            );
                            setMenuData({
                                ...menuData,
                                category: categoryName[selectedCategoryId - 1],
                                category_id: selectedCategoryId,
                            });
                            console.log(menuData);
                        }}
                    >
                        <option value="1" id={1}>1. หมวดหมู่อาหาร</option>
                        <option value="2" id={2}>2. หมวดหมู่เครื่องดื่ม</option>
                        <option value="3" id={3}>3. หมวดหมู่ขนม & ของหวาน</option>
                    </Input>
                </Input.Wrapper>
            </div>

            <div className="mt-4">
                <Button
                    className="bg-yellow-500 active:bg-yellow-700 w-full"
                    onClick={handleAddMenu}
                    loading={isLoading}
                >
                    เพิ่มเมนูอาหาร
                </Button>
            </div>
        </div>
    )
}