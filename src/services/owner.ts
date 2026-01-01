import api from "./api"


export const addCar = async (formData: FormData) => {

    const resp = await api.post('/owner/add-car', formData)
    return resp.data;
}

export const getDashboardData = async () => {
    
    const resp = await api.get('/owner/dashboard')
    return resp.data;
}

export const getOwnerCars = async () => {
    
    const resp = await api.get('/owner/cars')
    return resp.data;
}

export const toggleCarAvailabilityService = async (carId:string) => {
    
    const resp = await api.post('/owner/toggle-car', {carId})
    return resp.data;
}

export const deleteCarService = async (carId:string) => {
    
    const resp = await api.post('/owner/delete-car', {carId})
    return resp.data;
}

export const changeRoleToOwner = async () => {
    
    const resp = await api.post('/owner/change-role')
    return resp.data;
}

export const updateUserImage = async (formData: FormData) => {
    
    const resp = await api.post('/owner/update-image', formData)
    return resp.data;
}