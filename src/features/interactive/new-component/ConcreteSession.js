import React, { useState, useEffect } from "react"
import ReactApexChart from "react-apexcharts"
import { AiOutlineBell } from "react-icons/ai"
import Draggable from "react-draggable" // The default
import { BsFillPlayCircleFill, BsFillPauseCircleFill } from "react-icons/bs"

function formatHour(date) {
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()

  if (hour < 10) hour = "0" + hour
  if (minute < 10) minute = "0" + minute
  if (second < 10) second = "0" + second

  return [hour, minute, second].join(":")
}

export default function ConcreteSession(props) {
  const value = props.lastTimeDuration
    ? Math.round(
        ((props.hours * 3600 + props.minutes * 60 + props.seconds) * 100) /
          props.lastTimeDuration,
        1
      )
    : 0
  // console.log(props.hours * 3600 + props.minutes * 60 + props.seconds)
  return (
    <Draggable>
      <div className="px-[20px] bg-[#070707] w-[280px] ml-[20px] rounded-[24px] mt-[100px] text-[#fff] py-[12px] absolute">
        <p className="text-[16px] px-[20px] mb-[-10px]">{props.name}</p>
        <ReactApexChart
          options={{
            chart: {
              height: 250,
              type: "radialBar"
            },
            plotOptions: {
              radialBar: {
                hollow: {
                  size: "70%"
                },
                dataLabels: {
                  name: {
                    // show: false,
                    fontSize: "28px",
                    color: "#fff"
                  },
                  value: {
                    show: false,
                    fontSize: "16px",
                    color: "#fff"
                  },
                  total: {
                    // show: true,
                    color: "#fff"
                  }
                }
              }
            },
            labels: [""]
          }}
          series={[value]}
          type="radialBar"
          height={300}
        />
        <div className="flex absolute top-[131px] left-[64px] text-[white] !text-[36px]">
          <p className="p-[4px]">
            {props.hours < 10 ? "0" + props.hours : props.hours}
          </p>
          <p className="mt-[4px]">:</p>
          <p className="p-[4px]">
            {props.minutes < 10 ? "0" + props.minutes : props.minutes}
          </p>
          <p className="mt-[4px]">:</p>
          <p className="p-[4px]">
            {props.seconds < 10 ? "0" + props.seconds : props.seconds}
          </p>
        </div>
        {!props.isPause && (
          <div className="flex justify-center absolute top-[200px] left-[103px]">
            <AiOutlineBell size={18} />
            <p className="text-[16px] ml-[2px] mt-[-3px]">
              {formatHour(props.estimateEndTime)}
            </p>
          </div>
        )}

        <div className="flex justify-center mt-[-20px]">
          {!props.isPause ? (
            <BsFillPauseCircleFill
              size={32}
              onClick={() => {
                props.handlePause()
              }}
            />
          ) : (
            <BsFillPlayCircleFill
              size={32}
              onClick={() => {
                props.handlePlay()
              }}
            />
          )}
        </div>
      </div>
    </Draggable>
  )
}
