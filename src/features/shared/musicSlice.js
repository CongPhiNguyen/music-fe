import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  songsData: localStorage.getItem("songdata") ? JSON.parse(localStorage.getItem("songdata")) : [],
  heardRecently: localStorage.getItem("songdata") ? JSON.parse(localStorage.getItem("songdata")) : [],
  indexSong: null,
  isPlay: false,
  selected: "HEARD_RECENTLY",
  playlists: [],
  selectedPlaylist: null
};

export const musicDataSlice = createSlice({
  name: "musicData",
  initialState,
  reducers: {
    setCurrentSong: (state, action) => {
      if (action.payload.index > -1 && action.payload.index < state.songsData.length)
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
        state.songsData.push(action.payload.song)
        state.heardRecently = state.songsData
        localStorage.setItem("songdata", JSON.stringify(state.songsData))
      } else {
        if (state.selectedPlaylist) {
          axios.post("http://localhost:5050/api/v1/playlist/add-song", {
            song: action.payload.song,
            username: action.payload.username,
            playlistName: state.selectedPlaylist.playlistName
          })
          state.songsData.push(action.payload.song)
          state.heardRecently.push(action.payload.song)
          localStorage.setItem("songdata", JSON.stringify(state.heardRecently))
          state.playlists = state.playlists.map((value) => {
            if (value._id === state.selectedPlaylist) {
              value.songs.push(action.payload.song)
            }
            return value
          })
          state.selectedPlaylist.songs.push(action.payload.song)
        } else {
          state.selected = "HEARD_RECENTLY"
          state.heardRecently.push(action.payload.song)
          state.songsData = state.heardRecently
          localStorage.setItem("songdata", JSON.stringify(state.songsData))
        }
      }
    },
    addSongAndPlay: (state, action) => {
      if (state.selected === "HEARD_RECENTLY") {
        state.songsData.push(action.payload.song)
        state.heardRecently = state.songsData
        localStorage.setItem("songdata", JSON.stringify(state.songsData))
      } else {
        if (state.selectedPlaylist) {
          axios.post("http://localhost:5050/api/v1/playlist/add-song", {
            song: action.payload.song,
            username: action.payload.username,
            playlistName: state.selectedPlaylist.playlistName
          })
          state.songsData.push(action.payload.song)
          state.heardRecently.push(action.payload.song)
          localStorage.setItem("songdata", JSON.stringify(state.heardRecently))
          state.playlists = state.playlists.map((value) => {
            if (value._id === state.selectedPlaylist) {
              value.songs.push(action.payload.song)
            }
            return value
          })
          state.selectedPlaylist.songs.push(action.payload.song)
        } else {
          state.selected = "HEARD_RECENTLY"
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
      if (action.payload.type === 'HEARD_RECENTLY') {
        state.songsData = state.heardRecently
      } else {
        state.songsData = state?.selectedPlaylist?.songs ? state?.selectedPlaylist?.songs : []
      }
    },
    selectedPlaylistFunct: (state, action) => {
      state.indexSong = null
      state.isPlay = false
      state.selected = "PLAYLIST"
      state.selectedPlaylist = state.playlists.find((value) => value._id === action.payload._id)
      state.songsData = state.selectedPlaylist.songs
    }
  },
});

export const { setCurrentSong, changeIsPlay, setIsPlay, addSongAndPlay, addSong, setPlaylists, changeSelected, selectedPlaylistFunct } = musicDataSlice.actions;

export default musicDataSlice.reducer;
