import { useDispatch, useSelector } from "react-redux"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPauseCircle, faPlayCircle } from "@fortawesome/free-solid-svg-icons"
import liveLabel from "../assets/live-label.svg"
import "../Radio.scss"
import {
  setInfoSongPlayer,
  setIsPlay,
  setIsRadioPlay,
  setPlaylistId,
  setPlaylistRandom,
  setPlaylistSong,
  setSrcRadio
} from "../audioSlice"

function RadioChannel({ data }) {
  const dispatch = useDispatch()
  const songInfo = useSelector((state) => state.audio.infoSongPlayer)
  const isRadioPlay = useSelector((state) => state.audio.isRadioPlay)
  const handlePlayRadio = (data) => {
    // dispatch(setSrcRadio(data?.streaming))
    // dispatch(setInfoSongPlayer(data))
    dispatch(setIsRadioPlay(true))
    // dispatch(setIsPlay(false))
    // dispatch(setPlaylistSong([]))
    // dispatch(setPlaylistRandom([]))
    // dispatch(setPlaylistId(""))
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
          <div
            className={
              "thumb" + isRadioPlay &&
              songInfo.encodeId === data?.encodeId &&
              "playing"
            }
          >
            <img src={data?.thumbnailM} alt={data?.description} />
            <img src={liveLabel} className={"label"} alt="label" />
          </div>
          {songInfo.encodeId !== data?.encodeId && (
            <div className={"action"} onClick={() => handlePlayRadio(data)}>
              <FontAwesomeIcon icon={faPlayCircle} />
            </div>
          )}
          {songInfo.encodeId === data?.encodeId && isRadioPlay && (
            <div
              className={"action"}
              onClick={() => dispatch(setIsRadioPlay(!isRadioPlay))}
            >
              <FontAwesomeIcon icon={faPauseCircle} />
            </div>
          )}
          {songInfo.encodeId === data?.encodeId && !isRadioPlay && (
            <div
              className={"action"}
              onClick={() => dispatch(setIsRadioPlay(!isRadioPlay))}
            >
              <FontAwesomeIcon icon={faPlayCircle} />
            </div>
          )}
        </div>
        <div className={"info"}>
          <h2 className={"name"}>{data?.title}</h2>
          <p className={"listening"}>{data?.activeUsers} Người đang nghe</p>
        </div>
      </div>
    </div>
  )
}

export default RadioChannel
