import { Button, Input, Typography } from "antd"
import React, { useState } from "react"
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"
import { BsFillPlayCircleFill, BsFillPauseCircleFill } from "react-icons/bs"
import { BiEditAlt, BiSave } from "react-icons/bi"
import SessionItem from "./SessionItem"
import Draggable from "react-draggable"
import { MdMinimize } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { setHiddenSession } from "../interactiveSlice"
export default function Session() {
  const dispatch = useDispatch()
  const [isPause, setIsPause] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [timerList, setTimerList] = useState([])

  const isHiddenSession = useSelector((state) => {
    return state.interactive.hiddenSession
  })

  const removeSessionParent = (indexSession) => {
    setTimerList((prev) => {
      return prev.filter((val) => {
        return indexSession !== val.id
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

  console.log(isHiddenSession)

  return (
    <div
      className={
        "px-[40px]  w-[320px] ml-[20px] rounded-[24px] " +
        (isHiddenSession ? "" : "bg-[#070707]")
      }
    >
      <div
        className={"flex justify-between " + (isHiddenSession ? "hidden" : "")}
      >
        <Typography.Title className="!text-[#fff] !text-[20px] pt-[14px]">
          Session
        </Typography.Title>
        <div
          className="mt-[12px] cursor-pointer hover:opacity-40"
          onClick={() => {
            dispatch(setHiddenSession(true))
          }}
        >
          <MdMinimize size={20} color="#fff"></MdMinimize>
        </div>
      </div>

      {/* Session item */}
      <div className="mt-[16px] mb-[12px]">
        {timerList.map((val, index) => {
          console.log(val)
          return (
            <SessionItem
              removeSession={() => {
                // console.log("index", index)
                removeSessionParent(val.id)
              }}
              id={val.id}
              name={val.name}
              changeName={(nameChange) => changeName(nameChange, index)}
            />
          )
        })}
      </div>
      <div className={isHiddenSession ? "!hidden" : ""}>
        <Button
          className={
            "!w-[100%] !bg-[#070707] !text-[#FFF] !rounded-[12px] mb-[20px]"
          }
          onClick={() => {
            setTimerList((prev) => {
              let num = prev.length
              while (prev.some((val) => num === val.id)) {
                num++
              }
              return [...prev, { id: num, name: String("New Session" + num) }]
            })
          }}
        >
          Thêm session
        </Button>
      </div>
    </div>
  )
}
