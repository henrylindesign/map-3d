import React, { useEffect } from 'react'
import { WebMercatorViewport, FlyToInterpolator } from '@deck.gl/core'

import dataDistrict from '@data/taipei-district.js'
import dataMarkerBases from '@data/marker-bases.js'

import geoDataTaipeiDistrict from '@data/taipei-district.json'
import useStore from '@helpers/store'
import * as turf from '@turf/turf'

const SelectPanel = props => {
  const viewState = useStore(state => state.viewState)

  useEffect(() => {
    geoDataTaipeiDistrict.features.map(f => {
      const [minLng, minLat, maxLng, maxLat] = turf.bbox(turf.lineString(f.geometry.coordinates[0]))
      f.properties.minLng = minLng
      f.properties.minLat = minLat
      f.properties.maxLng = maxLng
      f.properties.maxLat = maxLat
    })
  }, [])

  const handleSelect = e => {
    const index = e.target.value
    const feature = geoDataTaipeiDistrict.features[index]

    if (feature) {
      const {minLng, minLat, maxLng, maxLat} = feature.properties
      const vp = new WebMercatorViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      })
      const { longitude, latitude, zoom } = vp.fitBounds(
        [[minLng, minLat], [maxLng, maxLat]],
        { padding: 10 }
      )

      useStore.setState({ viewState: {
        ...viewState,
        longitude,
        latitude,
        zoom,
        transitionInterpolator: new FlyToInterpolator({ speed: 1.2 }),
        transitionDuration: 'auto'
      }})
    }
  }

  return (
    <div className="fixed bottom-4 left-4 bg-white">
      <select onChange={handleSelect}>
        {Object.keys(dataDistrict).map((d, i) => 
          <option key={`option-${d}`} value={i}>{dataDistrict[d].name}</option>  
        )}
      </select>
      <select >
        {dataMarkerBases.map((d, i) => 
          <option key={`option-${i}`}>{d.name}</option>  
        )}
      </select>
    </div>
  )
}

export default SelectPanel