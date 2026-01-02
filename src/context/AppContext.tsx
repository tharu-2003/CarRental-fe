import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";


import api from "../services/api";             
import { getCars, getUser } from "../services/user";





axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// ----- Frontend interfaces -----
interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string[];
  image?: string;
}

interface ICar {
  _id: string;
  brand: string;
  model: string;
  year: number;
  pricePerDay: number;
  isAvailable: boolean;
  location: string;
  image?: string;
}

interface IAppContext {
  navigate: ReturnType<typeof useNavigate>;
  currency: string;
  axios: typeof axios;
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  isOwner: boolean;
  setIsOwner: React.Dispatch<React.SetStateAction<boolean>>;
  fetchUser: () => Promise<void>;
  showLogin: boolean;
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
  fetchCars: () => Promise<void>;
  cars: ICar[];
  setCars: React.Dispatch<React.SetStateAction<ICar[]>>;
  pickupDate: string;
  setPickupDate: React.Dispatch<React.SetStateAction<string>>;
  returnDate: string;
  setReturnDate: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = createContext<IAppContext | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {

  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [cars, setCars] = useState<ICar[]>([]);

  const [pickupDate, setPickupDate] = useState<string>("");
  const [returnDate, setReturnDate] = useState<string>("");

  const [showLogin, setShowLogin] = useState<boolean>(false);

  const fetchUser = async () => {
    try {
      // const { data } = await axios.get('/api/v1/user/data');
      const data = await getUser();
      if (data?.success) {
        setUser(data.user);
        setIsOwner(data.user.role.includes("OWNER"));
        // setIsOwner(data.user.role[0] === 'OWNER');
      } else {
        navigate('/');
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // ----------------- FETCH CARS -----------------
  const fetchCars = async () => {
    try {
      // const { data } = await axios.get('/api/v1/user/cars');
      const data = await getCars();
      if(data?.success){
        setCars(data.cars);
      }else{
        toast.error(data.message);
      }
    } catch (err:any) {
      toast.error(err?.message || "Failed to load cars");
    }
  };

  // ----------------- LOGOUT -----------------
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    setUser(null);
    setIsOwner(false);
    setAccessToken(null);
    delete axios.defaults.headers.common["Authorization"];

    toast.success("Logged out successfully");
    navigate("/");
  };

  // ----------------- ON APP LOAD -----------------
  useEffect(() => {
    const savedAccessToken = localStorage.getItem('accessToken');
    setAccessToken(savedAccessToken);

    if (savedAccessToken) {
      // axios.defaults.headers.common["Authorization"] = `Bearer ${savedAccessToken}`;
      api.defaults.headers.common["Authorization"] = `Bearer ${savedAccessToken}`;
      fetchUser();
    }

    fetchCars();
  }, []);

  useEffect(() => {
    if (accessToken) {
      // axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      fetchUser();
    }
  }, [accessToken]);

  const value: IAppContext = {
    navigate,
    currency,
    axios,
    user,
    setUser,
    accessToken,
    setAccessToken,
    isOwner,
    setIsOwner,
    fetchUser,
    showLogin,
    setShowLogin,
    logout,
    fetchCars,
    cars,
    setCars,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): IAppContext => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};
