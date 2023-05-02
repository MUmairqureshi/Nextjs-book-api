
import { NextRequest, NextResponse } from "next/server"
import {verify} from './app/api/tokenVerification'

export async function middleware(request:NextRequest){
    
   
    const Authorization = request.headers.get('Authorization')
    console.log(Authorization)
    if(!Authorization){
        return   NextResponse.json({  "Error":"Unauthorized Access!" },
        {
            status:401,
            statusText:"Unauthorized Access"
        })
    }
    try {
        await verify(Authorization, process.env.JWT_SECRET!);
        return NextResponse.next();
      } catch (error) {
         return   NextResponse.json({  "Error":"Unauthorized Access!" },
         
        {
            status:401,
            statusText:"Unauthorized Access"
        })
      }
     
    return NextResponse.next();
}

export const config = {
    matcher:'/api/orders/:path*'
}

