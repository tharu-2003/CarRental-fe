import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

export const AppContext = createContext()

export const AppProvider = ({ children }) => {

    const navigate = useNavigate()
    const currency = import.meta.env.VITE_CURRENCY

    const [accessToken, setAccessToken] = useState(null)
    const [user, setUser] = useState(null)
    const [isOwner, setIsOwner] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const [pickupDate, setPickupDate] = useState('')
    const [returnDate, setReturnDate] = useState('')

    const [cars, setCars] = useState([])

    // Function to check if user is logged in
    const fetchUser = async () => {
        try {
            const {data} = await axios.get('/api/v1/user/data')
            if (data.success) {
                setUser(data.user)
                setIsOwner(data.user.role[0] === 'OWNER')
            }else{
                navigate('/')
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Function to fetch all cars from the server
    const fetchCars = async () => {
        try {
            const {data} = await axios.get('/api/v1/user/cars')
            data.success ? setCars(data.cars) : toast.error(data.message)
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Function to log out the user
    const logout = () => {
        localStorage.removeItem('accessToken')
        setAccessToken(null)
        setUser(null)
        setIsOwner(false)

        // axios.defaults.headers.common['Authorization'] = ''
        delete axios.defaults.headers.common["Authorization"];


        navigate('/')
        toast.success('You have been logged out')
    }

    // useEffect to retrieve the accessToken from localStorage
    useEffect(() => {
        const savedAccessToken = localStorage.getItem('accessToken')
        setAccessToken(savedAccessToken)

        if (accessToken) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        }
        fetchCars()
    },[])

    // useEffect to fetch user data when accessToken is available
    useEffect(() => {
        if(accessToken){
            // axios.defaults.headers.common['Authorization'] = `${accessToken}`
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
            fetchUser()
        }
        
    },[accessToken])

    const value = {
        navigate, currency, axios, user, setUser, 
        accessToken, setAccessToken, isOwner, setIsOwner, fetchUser, 
        showLogin, setShowLogin, logout, fetchCars, cars, setCars,
        pickupDate, setPickupDate, returnDate, setReturnDate
    }

    return (
        <AppContext.Provider value={value}>
            { children }
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}