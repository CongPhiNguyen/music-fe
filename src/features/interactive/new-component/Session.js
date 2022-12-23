import { Button, Input, Typography } from "antd"
import React, { useState } from "react"
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"
import { BsFillPlayCircleFill, BsFillPauseCircleFill } from "react-icons/bs"
import { BiEditAlt, BiSave } from "react-icons/bi"
import SessionItem from "./SessionItem"
export default function Session() {
  const [isPause, setIsPause] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [timerList, setTimerList] = useState([])
  const removeSession = (indexSession) => {
    setTimerList((prev) => {
      return prev.filter((val, index) => {
        if (indexSession === index) {
          console.log(indexSession)
        }
        return indexSession !== index
      })
    })
  }
  return (
    <div className="px-[40px] bg-[#070707] w-[320px] ml-[20px] rounded-[24px]">
      <Typography.Title className="!text-[#fff] !text-[20px] pt-[14px]">
        Session
      </Typography.Title>
      {/* Session item */}
      <div className="mt-[16px] mb-[12px]">
        {timerList.map((val, index) => (
          <SessionItem
            removeSession={() => {
              console.log("index", index)
              removeSession(index)
            }}
          />
        ))}
      </div>
      <Button
        className="!w-[100%] !bg-[#070707] !text-[#FFF] !rounded-[12px]"
        onClick={() => {
          setTimerList((prev) => [...prev, ""])
        }}
      >
        Thêm session
      </Button>
      <div className="h-[100px]"></div>
    </div>
  )
}
