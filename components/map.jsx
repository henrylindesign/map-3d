import ReactMapGL from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import Marker from '@components/marker'
// import getAllMarkers from '@apis/getAllMarkers'
import { useEffect, useState, useRef } from 'react'

import DeckGL from '@deck.gl/react'

import { registerLoaders } from "@loaders.gl/core"
import { ScenegraphLayer } from '@deck.gl/mesh-layers'
import { GLTFScenegraphLoader } from "@luma.gl/addons"
import { EditableGeoJsonLayer } from '@nebula.gl/layers'
import { AmbientLight, PointLight, LightingEffect, _SunLight as SunLight, DirectionalLight } from '@deck.gl/core'
import { SolidPolygonLayer } from '@deck.gl/layers'

import dataBases from '@data/marker-bases'
import dataEvents from '@data/marker-events'

registerLoaders([GLTFScenegraphLoader])

const defaultZoom = 13.4
const zoomMarker = 17

const Map = props => {
  const [markers, setMarkers] = useState(null)
  const [zoom, setZoom] = useState(defaultZoom)

  const [glContext, setGLContext] = useState()
  const deckRef = useRef(null);
  const mapRef = useRef(null);

  const scenegraphLayer1 = new ScenegraphLayer({
    id: "scene",
    scenegraph: '/model/I.gltf',
    data: [dataBases[0]],
    pickable: true,
    // getScene: d => console.log(d),
    getPosition: d => d.coordinates,
    sizeScale: 80,
    getColor: [223, 141, 96, zoom<zoomMarker?255:200],
    getOrientation: [0, 50, 90],
    // getTranslation: [0, 0, 100],
    getScale: [1, 1, 1]
  });

  const region1 = new SolidPolygonLayer({
    data: [dataBases[0]],
    getPolygon: d => d.region,
    getFillColor: [236, 222, 185],
    extruded: false
  })

  const scenegraphLayer2 = new ScenegraphLayer({
    id: "scene",
    scenegraph: '/model/L.gltf',
    data: [dataBases[1]],
    pickable: true,
    // onHover: (info, event) => console.log('Hovered:', info, event),
    // getScene: d => console.log(d),
    getPosition: d => d.coordinates,
    sizeScale: 80,
    getColor: [114, 181, 111, zoom<zoomMarker?255:200],
    getOrientation: [0, 50, 90],
    // getTranslation: [0, 0, 100],
    getScale: [1, 1, 1]
  })

  const region2 = new SolidPolygonLayer({
    data: [dataBases[1]],
    getPolygon: d => d.region,
    getFillColor: [206, 225, 198],
    // getLineColor: [222, 188, 255],
    // extruded: false
    // extruded: true,
  })

  // const ambientLight = new SunLight({
  //   timestamp: new Date().getTime(), 
  //   color: [255, 0, 0],
  //   intensity: 1
  // });
  
  const directionalLight= new DirectionalLight({
    color: [255, 255, 255],
    intensity: .1,
    direction: [-1, -1, -1],
    // _shadow: true
  });
  

  // const pointLight1 = new PointLight({
  //   color: [255, 255, 0],
  //   intensity: 0.8,
  //   position: [-0.144528, 49.739968, 80000]
  // });
  
  // const pointLight2 = new PointLight({
  //   color: [255, 255, 0],
  //   intensity: 0.8,
  //   position: [-3.807751, 54.104682, 8000]
  // });
  
  const lightingEffect = new LightingEffect({directionalLight})

  // const layer = new EditableGeoJsonLayer({
  //   id: 'geojson',
  //   data: {
  //     type: "FeatureCollection",
  //     features: [
  //     ]
  //   },
  //   // mode: 'drawPoint',
  //   // selectedFeatureIndexes: this.state.selectedFeatureIndexes,

  //   onEdit: ({ updatedData }) => {
  //     console.log(updatedData)
  //     // this.setState({
  //     //   data: updatedData,
  //     // });
  //   }
  // });

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0">
      <DeckGL
        ref={deckRef}
        initialViewState={{
          latitude: 25.032,
          longitude: 121.536,
          zoom: defaultZoom,
          pitch: 45,
        }}
        controller={true}
        // controller: {touchRotate: true, doubleClickZoom: false}
        layers={[region1, scenegraphLayer1, region2, scenegraphLayer2]}
        effects={[lightingEffect]}
        getTooltip={({object}) => object && `${object.name}`}
        // onZoom={e=>setZoom(e.viewState.zoom)}
        onInteractionStateChange={state => {
          if(state.isZooming) {
            setZoom(mapRef.current.getZoom())
          }
          // console.log(state)
        }}
        // doubleClickZoom={false}
        // getCursor={() => "cell"}
      >
        <ReactMapGL
          ref={mapRef}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
          mapStyle='mapbox://styles/baseddesign/cl09pliwq001814rv91e4x06q'
        >
          
        </ReactMapGL>
        {/* {dataEvents && dataEvents.map((m, i) => 
          <Marker 
            key={`marker-${i}`} 
            data={m}
            zoom={zoom}
          />)} */}
      </DeckGL>
      {/* <ReactMapGL
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        initialViewState={{
          longitude: 121.523222,
          latitude: 25.091364,
          zoom: 14.3
        }}
        style={{
          width: '100%', height: '100%'
        }}
        doubleClickZoom={false}
        mapStyle='mapbox://styles/baseddesign/cl09pliwq001814rv91e4x06q'
        onZoom={e=>setZoom(e.viewState.zoom)}
      >
        {markers && markers.map((m, i) => 
          <Marker 
            key={`marker-${i}`} 
            name={m.name} 
            location={m.location}
            text={m.excerpt}
            color={m.category.color}
            size={m.category.size}
            zoom={zoom}
          />)}
      </ReactMapGL> */}
    </div>
  )
}

export default Map