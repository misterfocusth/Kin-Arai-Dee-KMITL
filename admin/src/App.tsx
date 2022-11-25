import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

// Mantine Components
import { FileInput, Input, Button, Loader } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons";

// Azure SDK
import uploadFileToBlob, { isStorageConfigured } from "./azure-storage-blob";

function App() {
  // Azure Blob
  const [isLoading, setIsLoading] = useState(false);
  const [isAddMenu, setIsAddMenu] = useState(false);

  const [selectedPicture, setSelectedPicture] = useState<File | null>(null);

  // Restaurant Adding
  const [restaurantData, setRestaurantData] = useState({
    name: "",
    location: "โรงอาหาร - คณะเทคโนโลยีสารสนเทศ",
    phoneNumber: "",
    category: "ร้านอาหาร",
    category_id: 1,
    image_url: "",
  });

  // Azure Blobs
  const [blobList, setBlobList] = useState<string[]>([]);

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setRestaurantData({
      ...restaurantData,
      [event.currentTarget.id]: event.currentTarget.value,
    });
    console.log(restaurantData);
  };

  const handleAddRestaurant = async () => {
    setIsLoading(true);

    const blobsInContainer: string[] = await uploadFileToBlob(selectedPicture);
    setBlobList(blobsInContainer);

    setSelectedPicture(null);
    setRestaurantData({
      name: "",
      location: "โรงอาหาร - คณะเทคโนโลยีสารสนเทศ",
      phoneNumber: "",
      category: "ร้านอาหาร",
      category_id: 1,
      image_url: "",
    });
    setIsLoading(false);
    alert("เพิ่มร้านอาหารใหม่สำเร็จ");
  };

  document.title = "Admin Panel | Kin Arai Dee (@KMITL)";

  return (
    <div className="App">
      <div className="max-w-screen max-h-screen p-4">
        {isAddMenu ? (
          <div>menu</div>
        ) : (
          <div>
            <div>
              <FileInput
                placeholder="เลือกรูปภาพ"
                label="รูปภาพร้านอาหาร"
                description="เลือกรูปภาพที่ต้องการใช้เป็นภาพประกอบของร้านอาหาร"
                accept="image/png,image/jpeg"
                onChange={setSelectedPicture}
                withAsterisk
              />
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
                className="bg-black w-full"
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
