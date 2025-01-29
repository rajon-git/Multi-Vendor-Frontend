import { useEffect, useState } from 'react'

function GetCurrentAddress() {
    const [add,setAdd] = useState('')

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(pos => {
            const {latitude, longitude} = pos.coords

            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            fetch(url)
           .then(response => response.json())
           .then(data => setAdd(data.address))
        })
    },[])

    return add;
}

export default GetCurrentAddress;
