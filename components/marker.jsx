// import { useContext, useEffect } from 'react'
import {
  Marker as ReactMapGLMarker, 
} from 'react-map-gl'
import Icons from '@assets/icon'
import { cloneElement, createElement } from 'react'
const Marker = (props) => {
  const { data, zoom } = props

  if(zoom<13) return <></>

  return (
    <ReactMapGLMarker 
      longitude={data.coordinates[0]} 
      latitude={data.coordinates[1]}
      anchor="bottom"
    >
      <div className='flex flex-col items-center'>
        {/* <div className='text-black whitespace-nowrap'>{name}</div> */}
        {createElement(Icons[`EVENT_TYPE_${data.type}`], {
          className: "block h-auto drop-shadow",
          style: {
            width: ((zoom-13)*.3) + 'rem'
          }
        })}
        {/* <IconMarker 
          className={`block h-auto drop-shadow`}
          style={{
            width: ((zoom-13)*.3 + size*.5) + 'rem'
          }}
          // onClick={handleOnClick}
        /> */}
      </div>
    </ReactMapGLMarker>
  )
}

export default Marker