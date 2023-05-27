
import React from 'react'
import './index.css'
import { useNavigate } from 'react-router'

export const BackNavigate = () => {

    const navigate = useNavigate()
    return (
        <span onClick={() => navigate(-1)} className='navigate-back'> {'<'} Back</span>
    )
}