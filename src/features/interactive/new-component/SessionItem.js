import React, { createRef, useState } from "react"
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"
import { BsFillPlayCircleFill, BsFillPauseCircleFill } from "react-icons/bs"
import { BiEditAlt, BiSave, BiDelete } from "react-icons/bi"
import { AiOutlineDelete } from "react-icons/ai"
import {
  Button,
  Input,
  Typography,
  InputNumber,
  notification,
  message,
  Popconfirm
} from "antd"
import { useTimer } from "react-timer-hook"
import { useDispatch } from "react-redux"
import { changeSong, setPlaying } from "../interactiveSlice"

export default function SessionItem(props) {
  const dispatch = useDispatch()
  const [isPause, setIsPause] = useState(true)
  const [isEdit, setIsEdit] = useState(false)
  // const [] =
  let expiryTimestamp = new Date()
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart
  } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      console.log("onExpire called")

      if (!fixFirstTime) {
        setIsPause(true)
        openNotification()
      }

      setFixFirstTime(false)
    }
  })

  const [currentHour, setCurrentHour] = useState(0)
  const [currentMinute, setCurrentMinute] = useState(0)
  const [currentSecond, setCurrentSecond] = useState(0)
  const [fixFirstTime, setFixFirstTime] = useState(true)
  const [api, contextHolder] = notification.useNotification()

  const openNotification = () => {
    api.open({
      message: "Thời gian đã kết thúc",
      description: "Thời gian đã kết thúc",
      className: "custom-class",
      style: {
        width: 600
      }
    })
    // Mở một bài nhạc khác lên
    dispatch(
      changeSong({
        name: "Alert time out",
        src: "./assets/audio/song/alerts/alert-1.mp3"
      })
    )
    dispatch(setPlaying(true))
  }

  // console.log(isRunning)
  return (
    <div className="mb-[12px]">
      {contextHolder}
      <div className="border-[1px] border-[#fff] w-[100%] h-[50px] rounded-[10px] p-[6px] flex">
        <div className="mr-[12px]">
          {!isEdit ? null : !isPause ? (
            <BsFillPauseCircleFill
              color="#fff"
              size={32}
              onClick={() => {
                setIsPause(true)
                pause()
              }}
            />
          ) : (
            <BsFillPlayCircleFill
              color="#fff"
              size={32}
              onClick={() => {
                setIsPause(false)
                resume()
              }}
            />
          )}
        </div>
        <div className="flex">
          {!isEdit ? (
            <Input
              className="!w-[32px] !h-[32px] !mr-[6px] !p-[6px] !text-[16px]"
              value={currentHour}
              onChange={(e) => {
                if (e.target.value.length <= 2) setCurrentHour(e.target.value)
              }}
            ></Input>
          ) : (
            <p className="text-[white] !text-[18px] p-[4px]">
              {hours < 10 ? "0" + hours : hours}
            </p>
          )}

          <p className="text-[#fff] text-[20px]">:</p>
          {!isEdit ? (
            <Input
              className="!w-[32px] !h-[32px] !mr-[6px] !ml-[6px] !p-[6px] !text-[16px]"
              value={currentMinute}
              onChange={(e) => {
                if (e.target.value.length <= 2) setCurrentMinute(e.target.value)
              }}
            ></Input>
          ) : (
            <p className="text-[white] !text-[18px] p-[4px]">
              {minutes < 10 ? "0" + minutes : minutes}
            </p>
          )}
          <p className="text-[#fff] text-[20px]">:</p>
          {!isEdit ? (
            <Input
              className="!w-[32px] !h-[32px] !mr-[6px] !ml-[6px] !p-[6px] !text-[16px]"
              value={currentSecond}
              onChange={(e) => {
                if (e.target.value.length <= 2) setCurrentSecond(e.target.value)
              }}
            ></Input>
          ) : (
            <p className="text-[white] !text-[18px] p-[4px]">
              {seconds < 10 ? "0" + seconds : seconds}
            </p>
          )}
        </div>
        <div className="mt-[4px] ml-[12px]">
          {!isPause ? null : isEdit ? (
            <BiEditAlt
              color="#fff"
              size={28}
              onClick={() => {
                setIsEdit(false)
                setIsPause(true)
              }}
            />
          ) : (
            <BiSave
              color="#fff"
              size={28}
              onClick={() => {
                setIsEdit(true)
                // setIsPause(false)
                // Gọi hàm save lại để lưu timer chạy ở đây\
                const time = new Date()
                time.setSeconds(
                  time.getSeconds() +
                    Number(currentHour) * 3600 +
                    Number(currentMinute) * 60 +
                    Number(currentSecond)
                )
                // setExpiryTimestamp(
                //   time +
                //     Number(currentHour) * 3600 +
                //     Number(currentMinute) * 60 +
                //     Number(currentSecond)
                // )
                restart(time)
                pause()
              }}
            />
          )}
        </div>
        <Popconfirm
          placement="topLeft"
          title={"Xóa session"}
          description={"Bạn có muốn xóa session này?"}
          onConfirm={() => {
            props.removeSession()
          }}
          okText="Yes"
          cancelText="No"
        >
          <AiOutlineDelete
            color="#fff"
            size={24}
            className="!mt-[4px] !ml-[4px]"
          />
        </Popconfirm>
      </div>
    </div>
  )
}
