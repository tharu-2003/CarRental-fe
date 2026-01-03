import api from "./api"

export const login = async (email: string , password: string) => {
    const resp = await api.post("/user/login" , { email, password})  
    return resp.data
}

export const register = async ( name: string , email:string, password:string ) => {
    const resp = await api.post("/user/register", {name, email, password})
    return resp.data
}

// export const getCars = async () => {
//     const resp = await api.get("/user/cars");
//     return resp.data;
// }
export const getCars = async (page = 1, limit = 6) => {
  const resp = await api.get(`/user/cars?page=${page}&limit=${limit}`)
  return resp.data
}


export const getUser = async () => {
    const resp = await api.get("/user/data");
    return resp.data;
}

export const refreshTokens = async (refreshToken: string) => {
    const res = await api.post("/user/refresh", {token:refreshToken})
    return res.data
}

export const sendPasswordResetEmail = async (email: string) => {
    const resp = await api.post("/user/forget-password" , {email});
    return resp.data
}

export const resetPassword = async (token: string, newPassword: string) => {
    const resp = await api.put(`/user/reset-password`,
        { newPassword },
        { headers: { "x-reset-token": token } }
    );
    return resp.data;
};