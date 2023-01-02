import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"
const initialState = {
  songsData: localStorage.getItem("songdata")
    ? JSON.parse(localStorage.getItem("songdata"))
    : [],
  heardRecently: localStorage.getItem("songdata")
    ? JSON.parse(localStorage.getItem("songdata"))
    : [],
  indexSong: null,
  isPlay: false,
  selected: "HEARD_RECENTLY",
  playlists: [],
  selectedPlaylist: null
}

export const musicDataSlice = createSlice({
  name: "musicData",
  initialState,
  reducers: {
    removePlaylist: (state, action) => {
      if (state.selectedPlaylist?.playlistName === action.payload.playlistName) {
        state.selectedPlaylist = null
        state.indexSong = null
        state.isPlay = false
      }
      state.playlists = state.playlists.filter(playlist => playlist.playlistName !== action.payload.playlistName)
    },
    removeSong: (state, action) => {
      if (state.selected === "HEARD_RECENTLY") {
        state.heardRecently = state.heardRecently.filter((song, index) => index !== action.payload.index)
        state.songsData = state.heardRecently
        localStorage.setItem("songdata", JSON.stringify(state.songsData))
        if (state.indexSong === action.payload.index) {
          state.indexSong = null
          state.isPlay = false
        }
      } else {
        state.songsData = state.songsData.filter((song, index) => index !== action.payload.index)
        state.selectedPlaylist.songs = state.songsData
        state.playlists = state.playlists.map(playlist => {
          if (playlist._id === state.selectedPlaylist._id) {
            return state.selectedPlaylist
          }
          return playlist
        })
        if (state.indexSong === action.payload.index) {
          state.indexSong = null
          state.isPlay = false
        }
        axios.post("http://localhost:5050/api/v1/playlist/update-playlist", {
          songs: state.songsData.map(song => {
            return {
              ...song,
              lyric: null
            }
          }),
          username: action.payload.username,
          playlistId: state.selectedPlaylist._id
        })
      }
    },
    setCurrentSongAndUpdate: (state, action) => {
      if (
        action.payload.index > -1 &&
        action.payload.index < state.songsData.length
      ) {
        if (state.selected === "HEARD_RECENTLY") {
          state.songsData = state.songsData.map((song, index) => {
            if (index === action.payload.index) {
              song.pathSong = action.payload.pathSong
              song.lyric = action.payload.lyric
            }
            return song
          })
          state.heardRecently = state.songsData
          localStorage.setItem("songdata", JSON.stringify(state.songsData))
          state.indexSong = action?.payload?.index
        } else {
          state.selectedPlaylist = {
            ...state.selectedPlaylist,
            songs: state.selectedPlaylist.songs.map((song, index) => {
              if (index === action.payload.index) {
                song.pathSong = action.payload.pathSong
                song.lyric = action.payload.lyric
                state.heardRecently.push(song)
                localStorage.setItem("songdata", JSON.stringify(state.heardRecently))
              }
              return song
            })
          }
          state.songsData = state.selectedPlaylist.songs
          state.playlists = state.playlists.map(playlist => {
            if (playlist._id === state.selectedPlaylist._id) {
              return state.selectedPlaylist
            }
            return playlist
          })
          axios.post("http://localhost:5050/api/v1/playlist/update-playlist", {
            songs: state.songsData.map(song => {
              return {
                ...song,
                lyric: null
              }
            }),
            username: action.payload.username,
            playlistId: state.selectedPlaylist._id
          })
          state.indexSong = action?.payload?.index
        }
      }
    },
    setCurrentSong: (state, action) => {
      if (
        action.payload.index > -1 &&
        action.payload.index < state.songsData.length
      )
        state.indexSong = action?.payload?.index
    },
    changeIsPlay: (state) => {
      state.isPlay = !state.isPlay
    },
    setIsPlay: (state, action) => {
      state.isPlay = action.payload.isPlay
    },
    addSong: (state, action) => {
      if (state.selected === "HEARD_RECENTLY") {
        state.songsData = state.songsData.filter(song => song.id !== action.payload.song.id)
        state.songsData.push(action.payload.song)
        state.heardRecently = state.songsData
        localStorage.setItem("songdata", JSON.stringify(state.songsData))
      } else {
        if (state.selectedPlaylist) {
          state.songsData = state.songsData.filter(song => song.id !== action.payload.song.id)
          state.songsData.push(action.payload.song)
          axios.post("http://localhost:5050/api/v1/playlist/add-song", {
            song: state.songsData.map(song => {
              return {
                ...song,
                lyric: null
              }
            }),
            username: action.payload.username,
            playlistName: state.selectedPlaylist.playlistName
          })

          state.heardRecently = state.heardRecently.filter(song => song.id !== action.payload.song.id)
          state.heardRecently.push(action.payload.song)
          localStorage.setItem("songdata", JSON.stringify(state.heardRecently))
          state.playlists = state.playlists.map((value) => {
            if (value._id === state.selectedPlaylist) {
              value.songs = state.songsData
            }
            return value
          })
          state.selectedPlaylist = state.songsData
        } else {
          state.selected = "HEARD_RECENTLY"
          state.heardRecently = state.heardRecently.filter(song => song.id !== action.payload.song.id)
          state.heardRecently.push(action.payload.song)
          state.songsData = state.heardRecently
          localStorage.setItem("songdata", JSON.stringify(state.songsData))
        }
      }
    },
    addSongAndPlay: (state, action) => {
      if (state.selected === "HEARD_RECENTLY") {
        state.songsData = state.songsData.filter(song => song.id !== action.payload.song.id)
        state.songsData.push(action.payload.song)
        state.heardRecently = state.songsData
        localStorage.setItem("songdata", JSON.stringify(state.songsData))
      } else {
        if (state.selectedPlaylist) {
          state.songsData = state.songsData.filter(song => song.id !== action.payload.song.id)
          state.songsData.push(action.payload.song)
          axios.post("http://localhost:5050/api/v1/playlist/add-song", {
            songs: state.songsData.map(song => {
              return {
                ...song,
                lyric: null
              }
            }),
            username: action.payload.username,
            playlistName: state.selectedPlaylist.playlistName
          })
          state.heardRecently = state.heardRecently.filter(song => song.id !== action.payload.song.id)
          state.heardRecently.push(action.payload.song)
          localStorage.setItem("songdata", JSON.stringify(state.heardRecently))
          state.playlists = state.playlists.map((value) => {
            if (value._id === state.selectedPlaylist) {
              value.songs = state.songsData
            }
            return value
          })
          state.selectedPlaylist = state.songsData
        } else {
          state.selected = "HEARD_RECENTLY"
          state.heardRecently = state.heardRecently.filter(song => song.id !== action.payload.song.id)
          state.heardRecently.push(action.payload.song)
          state.songsData = state.heardRecently
          localStorage.setItem("songdata", JSON.stringify(state.songsData))
        }
      }
      state.indexSong = state.songsData.length - 1
      state.isPlay = true
    },
    setPlaylists: (state, action) => {
      state.playlists = action.payload.playlists
    },
    changeSelected: (state, action) => {
      state.indexSong = null
      state.isPlay = false
      state.selected = action.payload.type
      if (action.payload.type === "HEARD_RECENTLY") {
        state.songsData = state.heardRecently
      } else {
        state.songsData = state?.selectedPlaylist?.songs
          ? state?.selectedPlaylist?.songs
          : []
      }
    },
    selectedPlaylistFunct: (state, action) => {
      state.indexSong = null
      state.isPlay = false
      state.selected = "PLAYLIST"
      state.selectedPlaylist = state.playlists.find(
        (value) => value._id === action.payload._id
      )
      state.songsData = state.selectedPlaylist.songs
    }
  }
})

export const {
  setCurrentSong,
  changeIsPlay,
  setIsPlay,
  addSongAndPlay,
  addSong,
  setPlaylists,
  changeSelected,
  selectedPlaylistFunct,
  setCurrentSongAndUpdate,
  removeSong,
  removePlaylist
} = musicDataSlice.actions

export default musicDataSlice.reducer
