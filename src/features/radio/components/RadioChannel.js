import { useDispatch, useSelector } from "react-redux"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPauseCircle, faPlayCircle } from "@fortawesome/free-solid-svg-icons"
import liveLabel from "../assets/live-label.svg"
import "../Radio.scss"
import {
  setInfoSongPlayer,
  setIsRadioPlay,
  setPlaylistId,
  setPlaylistRandom,
  setPlaylistSong,
  setSrcRadio,
  setIsRadioCurrent
} from "../audioSlice"

import { setIsPlay } from "../../shared/musicSlice"

function RadioChannel({ data }) {
  const dispatch = useDispatch()
  const songInfo = useSelector((state) => state.audio.infoSongPlayer)
  const isRadioPlay = useSelector((state) => state.audio.isRadioPlay)
  const isPlayMusic = useSelector((state) => state.musicData.isPlay)
  const handlePlayRadio = (data) => {
    // console.log("data", data)
    dispatch(setSrcRadio(data?.streaming))
    dispatch(setInfoSongPlayer(data))
    dispatch(setIsRadioPlay(true))
    dispatch(setIsPlay({ isPlay: false }))
    dispatch(setIsRadioCurrent(true))
    // dispatch(setPlaylistSong([]))
    // dispatch(setPlaylistRandom([]))
    // dispatch(setPlaylistId(""))
  }

  const classThumb = () => {
    if (isPlayMusic) return "thumb"
    if (isRadioPlay && songInfo.encodeId === data?.encodeId)
      return "thumb playing"
    else return "thumb"
  }

  return (
    <div className="container">
      <img
        src={data?.thumbnailH}
        className="channel-bg"
        alt={data?.program.title}
      />
      <div className="content">
        <div className="avatar">
          <div className={classThumb()}>
            <img
              src={data?.thumbnailM}
              alt={data?.description}
              className="w-[100%] h-[100%]"
            />
          </div>
          {songInfo.encodeId !== data?.encodeId && (
            <div
              className="action"
              onClick={() => {
                handlePlayRadio(data)
                dispatch(setIsRadioCurrent(true))
              }}
            >
              <FontAwesomeIcon icon={faPlayCircle} />
            </div>
          )}
          {songInfo.encodeId === data?.encodeId && isRadioPlay && (
            <div
              className="action"
              onClick={() => {
                dispatch(setIsPlay({ isPlay: false }))
                dispatch(setIsRadioPlay(!isRadioPlay))
                dispatch(setIsRadioCurrent(true))
              }}
            >
              <FontAwesomeIcon icon={faPauseCircle} />
            </div>
          )}
          {songInfo.encodeId === data?.encodeId && !isRadioPlay && (
            <div
              className="action"
              onClick={() => {
                dispatch(setIsRadioPlay(!isRadioPlay))
                dispatch(setIsPlay({ isPlay: false }))
                dispatch(setIsRadioCurrent(true))
              }}
            >
              <FontAwesomeIcon icon={faPlayCircle} />
            </div>
          )}
        </div>
        <div className={"info"}>
          <img src={liveLabel} className={"label mb-[4px]"} alt="label" />
          <h2 className="bg-[rgba(255,255,255,0.8)] px-[4px]">{data?.title}</h2>
          <p className={"listening"}>{data?.activeUsers} Người đang nghe</p>
        </div>
      </div>
    </div>
  )
}

export default RadioChannel
