import api from "./api"

export const login = async (email: string , password: string) => {
    const resp = await api.post("/user/login" , { email, password})  
    return resp.data
}

export const register = async ( name: string , email:string, password:string ) => {
    const resp = await api.post("/user/register", {name, email, password})
    return resp.data
}

export const getCars = async () => {
    const resp = await api.get("/user/cars");
    return resp.data;
}

export const getUser = async () => {
    const resp = await api.get("/user/data");
    return resp.data;
}

export const refreshTokens = async (refreshToken: string) => {
    const res = await api.post("/user/refresh", {token:refreshToken})
    return res.data
}