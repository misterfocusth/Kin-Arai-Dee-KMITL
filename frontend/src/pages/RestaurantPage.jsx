import react, { useState, useEffect, useContext } from "react"

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
import { IconSearch, IconMapPin } from '@tabler/icons';

// Axios
import axios from "axios";

const RestaurantCard = (props) => {
    return (
        <div id={props.uniqueKey} className="mt-4">
            <Card shadow="sm" p="lg" radius="md" id={props.key} withBorder>
                <Card.Section>
                    <Image
                        src={props.data.image_url}
                        height={160}
                        alt="menu_image_url"
                    />
                </Card.Section>

                <Group position="apart" mt="md" mb="xs">
                    <Text weight={500} size="lg">{props.data.name}</Text>
                </Group>
                <Text size="md" color="dimmed">
                    หมวดหมู่ร้านอาหาร: {props.data.category}
                </Text>
                <Text size="md" color="dimmed">
                    {props.data.location}
                </Text>
                <Text size="md" color="dimmed">
                    เบอร์โทรติดต่อร้าน : {props.data.phone_number}
                </Text>
            </Card>
        </div>
    )
}

export default function RestaurantPage() {
    const authContext = useContext(AuthContext);
    const [userData, setUserData] = useState([{}])
    const [isLoading, setIsLoading] = useState(false)
    const [restaurants, setRestaurants] = useState([{}])
    const [filteredRestaurant, setFilteredRestaurant] = useState([{}])
    const [searchKeyword, setSearchKeyword] = useState([])

    useEffect(() => {

        async function getAllRestaurants() {
            axios
                .get(
                    `${import.meta.env.VITE_BACKEND_API_ENDPOINT}/apis/restaurant/`
                )
                .then((res) => {
                    console.log(res.data)
                    setRestaurants(res.data)

                    const searchKeywords = []
                    const response = res.data
                    response.forEach((menu) => {
                        searchKeywords.push(menu.name)
                    })
                    setSearchKeyword(searchKeywords)
                    setFilteredRestaurant(res.data)
                    setIsLoading(false)
                })
                .catch((error) => {
                    console.log(error)
                    setIsLoading(false)
                })
        }

        getAllRestaurants()
    }, [])

    const handleSearchKeywordChange = (keyword) => {
        if (!keyword) {
            setFilteredRestaurant(restaurants)
        } else {
            var x = restaurants.filter((element) => {
                return element.name.toLowerCase().trim().match((keyword).toLowerCase().trim())
            });
            setFilteredRestaurant(x)
        }


    }

    if (!authContext.userData) {
        return <Navigate to={"/new-user"} />;
    }


    return (
        <div className="p-5 mb-16">
            <div className="text-center font-bold">
                <p>
                    ค้นหาร้านอาหาร
                </p>
                <div className="flex items-center gap-2 mt-2 justify-center">
                    <IconMapPin />
                    <p className="mt-1">
                        โรงอาหาร - คณะเทคโนโลยีสารสนเทศ
                    </p>
                </div>

            </div>
            <div>
                <Autocomplete
                    className="mt-4"
                    placeholder="ค้นหาเมนูอาหาร..."
                    radius="md"
                    size="md"
                    icon={<IconSearch />}
                    onChange={handleSearchKeywordChange}
                    data={searchKeyword} />
            </div>
            <div >
                {
                    filteredRestaurant.map((restaurant) => (
                        <RestaurantCard data={restaurant} uniqueKey={restaurant.id} />
                    ))
                }
            </div>
        </div>
    )
}