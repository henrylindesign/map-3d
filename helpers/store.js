import create from 'zustand'

const defaultZoom = 13.4

const useStore = create((set, get) => ({
  defaultZoom,
  viewState: {
    latitude: 25.032,
    longitude: 121.536,
    zoom: defaultZoom,
    bearing: 0,
    pitch: 45,
  }
}))

export default useStore