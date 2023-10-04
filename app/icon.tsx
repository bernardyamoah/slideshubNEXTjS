import {ImageResponse} from 'next/server'
export const runtime='edge'


export default function Icon(){
    return new ImageResponse(
    (
        <img src={'/favicon.ico'} alt="" />
    )
    )
}