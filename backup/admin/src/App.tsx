

// Axios
import axios from "axios";
import { integer } from "aws-sdk/clients/frauddetector";


function App() {

  const [isAddMenu, setIsAddMenu] = useState(false);

  // Restaurant Adding
  const [restaurantData, setRestaurantData] = useState({
    name: "",
    location: "โรงอาหาร - คณะเทคโนโลยีสารสนเทศ",
    phoneNumber: "",
    category: "ร้านอาหาร",
    category_id: 1,
    image_url: "",
  });

  const [restaurants, setRestaurants] = useState([
    {
      id: 0,
      name: "",
      price: 0,
      category: "",
      category_id: 0,
      restaurant_name: "",
      restaurant_id: 0,
      restaurant_location: "",
      image_url: "",
      is_deleted: false,
    },
  ]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function getAllRestaurant() {
      axios
        .get(`${import.meta.env.VITE_BACKEND_API_ENDPOINT}/apis/restaurant/`)
        .then((response) => {
          setRestaurants(response.data);
          console.log(response.data);
          setIsReady(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    getAllRestaurant();
  }, []);

  const [menuData, setMenuData] = useState({
    name: "",
    price: 0,
    category: "หมวดหมู่อาหาร",
    category_id: 0,
    restaurant_name: "",
    restaurant_id: 0,
    restaurant_location: "โรงอาหาร - คณะเทคโนโลยีสารสนเทศ",
    image_url: "",
  });
  const [selectedRestaurantId, setSelectedRestaurantId] = useState("1");



  const handleMenuDataChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMenuData({
      ...menuData,
      [event.currentTarget.id]: event.currentTarget.value,
    });
  };

  const handleAddMenu = async () => {
    console.log(menuData);
  };

  const test = (selectedId: string) => {
    return restaurants.filter({ id } => id )
  }



  document.title = "Admin Panel | Kin Arai Dee (@KMITL)";

  return (
    <div className="App">
      <div className="max-w-screen max-h-screen p-4">
        {isAddMenu ? (
          <div>
            <div className="my-4">
              <Button
                className="bg-yellow-500 active:bg-yellow-700 w-full"
                onClick={() => setIsAddMenu(false)}
              >
                {"<<<"} ไปหน้าเพิ่มร้านอาหาร
              </Button>
            </div>

            <div>
              <Input.Wrapper
                id="image_url"
                withAsterisk
                label="ลิงค์รูปภาพของเมนูอาหารจาก Microsoft Azure (Blob Storage)"
                description="วางลิงค์รูปภาพ (URL) ของร้านอาหารที่ได้จาก Azure เช่น https://9lnre8vrd1yfo5ze.blob.core.windows.net/<IMAGE_URL>"
              >
                <Textarea
                  id="image_url"
                  placeholder="ลิงค์รูปภาพของเมนูอาหาร"
                  value={restaurantData.image_url}
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
                  onChange={handleChange}
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
                    console.log(event);
                    setSelectedRestaurantId(event.currentTarget.value);
                    const selectedRestaurantMenuId = Number(
                      event.currentTarget.value
                    );
                    console.log(event.currentTarget.value);

                    setMenuData({
                      ...menuData,
                      restaurant_id: Number(event.currentTarget.value),
                      // @ts-ignore
                      restaurant_name: "",
                    });
                  }}
                >
                  {
                    // @ts-ignore
                    restaurants.map((restaurant: Restaurant, id: string) => (
                      <option value={String(restaurant.id)} id={id}>
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
                  value={restaurantData.location}
                  onChange={(event) => {
                    setMenuData({
                      ...menuData,
                      restaurant_location: event.currentTarget.value,
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
                    setRestaurantData({
                      ...restaurantData,
                      category: categoryName[selectedCategoryId - 1],
                      category_id: selectedCategoryId,
                    });
                    console.log(restaurantData);
                  }}
                >
                  <option value="1">1. หมวดหมู่อาหาร</option>
                  <option value="2">2. หมวดหมู่เครื่องดื่ม</option>
                  <option value="3">3. หมวดหมู่ขนม & ของหวาน</option>
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
        ) : (
          <div>
            <div className="my-4">
              <Button
                className="bg-yellow-500 active:bg-yellow-700 w-full"
                onClick={() => setIsAddMenu(true)}
              >
                ไปหน้าเพิ่มเมนูอาหาร {">>>"}
              </Button>
            </div>

            <div>
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
                id="phoneNumber"
                withAsterisk
                label="เบอร์โทรติดต่อร้านอาหาร"
                description="ใส่เบอร์โทรติดต่อของร้านอาหาร ถ้าไม่มีให้ใส่เป็น -"
              >
                <Input
                  id="phoneNumber"
                  placeholder="เบอร์โทรศัพท์"
                  value={restaurantData.phoneNumber}
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
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
