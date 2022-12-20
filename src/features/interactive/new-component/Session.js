import { Button, Input, Typography } from "antd"
import React, { useState } from "react"
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"
import { BsFillPlayCircleFill, BsFillPauseCircleFill } from "react-icons/bs"
import { BiEditAlt, BiSave } from "react-icons/bi"
export default function Session() {
  const [isPause, setIsPause] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  return (
    <div className="px-[40px] bg-[#070707] w-[320px] ml-[20px] rounded-[24px]">
      <Typography.Title className="!text-[#fff] !text-[20px] pt-[14px]">
        Session
      </Typography.Title>
      {/* Session item */}
      <div className="mt-[16px] mb-[12px]">
        <div className="border-[1px] border-[#fff] w-[100%] h-[50px] rounded-[10px] p-[6px] flex">
          <div className="mr-[12px]">
            {isPause ? (
              <BsFillPauseCircleFill
                color="#fff"
                size={32}
                onClick={() => {
                  setIsPause(false)
                }}
              />
            ) : (
              <BsFillPlayCircleFill
                color="#fff"
                size={32}
                onClick={() => {
                  setIsPause(true)
                }}
              />
            )}
          </div>
          <div className="flex">
            <Input
              className="!w-[32px] !h-[32px] !mr-[6px] !p-[6px] !text-[16px]"
              value={"00"}
            ></Input>

            <p className="text-[#fff] text-[20px]">:</p>
            <Input
              className="!w-[32px] !h-[32px] !mr-[6px] !ml-[6px] !p-[6px] !text-[16px]"
              value={"00"}
            ></Input>
            <p className="text-[#fff] text-[20px]">:</p>
            <Input
              className="!w-[32px] !h-[32px] !mr-[6px] !ml-[6px] !p-[6px] !text-[16px]"
              value={0}
            ></Input>
          </div>
          <div className="mt-[4px] ml-[12px]">
            {isEdit ? (
              <BiEditAlt
                color="#fff"
                size={28}
                onClick={() => {
                  setIsEdit(false)
                }}
              />
            ) : (
              <BiSave
                color="#fff"
                size={28}
                onClick={() => {
                  setIsEdit(true)
                }}
              />
            )}
          </div>
        </div>
      </div>
      <Button className="!w-[100%] !bg-[#070707] !text-[#FFF] !rounded-[12px]">
        Thêm session
      </Button>
      <div className="h-[100px]"></div>
    </div>
  )
}
