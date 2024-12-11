import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { setUser } from '../utils/auth'

const MainWrapper = ({children}) => {
    const [loading, seLoading] = useState()

    useEffect(async () => {
        const handler = async () => {
            seLoading(true)
            await setUser()

            seLoading(false)
        }
        handler()
    }, [])

    return <>{loading ? null : children}</>
    
}

export default MainWrapper
