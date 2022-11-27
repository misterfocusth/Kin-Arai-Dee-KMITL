import { useState } from 'react'
import reactLogo from './assets/react.svg'
import MenuAdder from './MenuAdder'
import { Input, Button, Textarea, Autocomplete } from "@mantine/core";
import './App.css'
import RestaurantAdder from './RestaurantAdder';

function App() {
  const [count, setCount] = useState(0)
  const [isAddMenu, setIsAddMenu] = useState(false)

  // if (isAddMenu) {
  //   return <MenuAdder />
  // } else if (!isAddMenu) {
  //   return (
  //     <div className="my-4">
  //       <Button
  //         className="bg-yellow-500 active:bg-yellow-700 w-full"
  //         onClick={() => setIsAddMenu(true)}
  //       >
  //         ไปหน้าเพิ่มเมนูอาหาร {">>>"}
  //       </Button>
  //     </div>
  //   )
  // }

  return (
    <div className='p-4'>
      <div className="my-4">
        {!isAddMenu ?
          <Button
            className="bg-yellow-500 active:bg-yellow-700 w-full"
            onClick={() => setIsAddMenu(true)}
          >
            ไปหน้าเพิ่มเมนูอาหาร {">>>"}
          </Button>
          :
          <Button
            className="bg-yellow-500 active:bg-yellow-700 w-full"
            onClick={() => setIsAddMenu(false)}
          >
            {"<<<"} ไปหน้าเพิ่มร้านอาหาร
          </Button>
        }

      </div>

      {!isAddMenu ? <RestaurantAdder /> : <MenuAdder />}
    </div>
  )
}

export default App
