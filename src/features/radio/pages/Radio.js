import React, { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
import RadioChannel from "../components/RadioChannel"
import { message, Spin } from "antd"
import "../Radio.scss"
import "../../shared/components/MainHome.css"
import URL from "../../../api/config"
export default function Radio() {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    axios
      .get(URL.BASE_API_ENDPOINT + "/zing/get-radio")
      .then((res) => {
        setData(res.data.data.items[0])
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
        message.err(err)
      })
  }, [])

  if (isLoading)
    return (
      <div className="main-home text-center mt-[15%]">
        <Spin size="large" />
        <p className="mt-[12px] text-[16px] text-[#fff]">
          Đợi xíu nhé, thông tin radio đang được load...
        </p>
      </div>
    )

  return (
    <div className="main-home">
      <div className="px-[40px]">
        <p className="p-0 m-[0 0 20px 0] text-[24px] text-[white] mt-[40px] font-[600]">
          Radio
        </p>
        <div className="overflow-y-auto mt-[-40px]">
          {data.items &&
            data.items.map((item) => (
              <RadioChannel key={item.encodeId} data={item} />
            ))}
        </div>
      </div>

      {/* <div className="text-[red]">Công Phi</div> */}
    </div>
  )
}
