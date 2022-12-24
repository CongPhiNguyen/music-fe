import { Button, Input, Typography } from "antd"
import React, { useState } from "react"
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"
import { BsFillPlayCircleFill, BsFillPauseCircleFill } from "react-icons/bs"
import { BiEditAlt, BiSave } from "react-icons/bi"
import SessionItem from "./SessionItem"
import Draggable from "react-draggable"

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

  const changeName = (nameChange, indexChangeName) => {
    setTimerList((prev) => {
      return prev.map((val, index) => {
        if (index == indexChangeName) {
          return {
            ...val,
            name: nameChange
          }
        }
        return val
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
        {timerList.map((val, index) => {
          console.log(val)
          return (
            <SessionItem
              removeSession={() => {
                // console.log("index", index)
                removeSession(index)
              }}
              id={val.id}
              name={val.name}
              changeName={(nameChange) => changeName(nameChange, index)}
            />
          )
        })}
      </div>
      <Button
        className="!w-[100%] !bg-[#070707] !text-[#FFF] !rounded-[12px]"
        onClick={() => {
          setTimerList((prev) => {
            return [...prev, { id: prev.length, name: String("New Session") }]
          })
        }}
      >
        Thêm session
      </Button>
      <div className="h-[100px]"></div>
    </div>
  )
}
