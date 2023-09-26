import React, { useEffect, useState } from 'react'
import "./backtop.css"
import { UpOutlined } from "@ant-design/icons"

export default function Back_To_Top() {
    const [show, setShow] = useState(false)

    const handleScroll = () => {
        if (window.pageYOffset > 200) {
            setShow(true)
        } else {
            setShow(false)
        }
    }

    const handleScrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    useEffect(() => {
        //  lang nghe su kien cuon chuot tu man hinh
        window.addEventListener("scroll", handleScroll)
        //  huy su kien
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])


    return (
        <div>
            {show && (
                <div onClick={handleScrollTop} className="back-top">
                    <UpOutlined />
                </div>
            )}
        </div>
    )
}
