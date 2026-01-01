import api from "./api"

export const getUserBookings = async () => {

    const resp = await api.get('/bookings/user')
    return resp.data;
}

export const getOwnerBookings = async () => {
    
    const resp = await api.get('/bookings/owner')
    return resp.data;
}

export const changeBookingStatusService = async (bookingId:string, status:string) => {
    
    const resp = await api.post('/bookings/change-status', {bookingId, status})
    return resp.data;
}

export const checkAvailabilityofCar = async (pickupLocation:any, pickupDate:any, returnDate:any) => {
    
    const resp = await api.post('/bookings/check-availability', {location: pickupLocation, pickupDate, returnDate})
    return resp.data;
}

export const createBooking = async (id:any, pickupDate:any, returnDate:any) => {
    
    const resp = await api.post('/bookings/create', {car: id,pickupDate,returnDate})
    return resp.data;
}
