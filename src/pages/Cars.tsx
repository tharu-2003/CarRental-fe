import { useEffect, useState } from 'react'
import Title from '../components/Title'
import { assets, type Car } from '../assets/assets'
import CarCard from '../components/CarCard'
import { useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'
import { checkAvailabilityofCar } from '../services/bookings'
import { getCars } from '../services/user'

function Cars() {
  const [searchParams] = useSearchParams()
  const pickupLocation = searchParams.get('pickupLocation')
  const pickupDate = searchParams.get('pickupDate')
  const returnDate = searchParams.get('returnDate')

  const isSearchData = pickupLocation && pickupDate && returnDate

  const [input, setInput] = useState('')
  const [cars, setCars] = useState<Car[]>([])
  const [filteredCars, setFilteredCars] = useState<Car[]>([])

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const LIMIT = 6 // Cars per page

  // ---------------- Fetch Cars ----------------
  const fetchCars = async () => {
    try {
      const data = await getCars(page, LIMIT)
      if (data.success) {
        setCars(data.cars)
        setTotalPages(data.pagination.totalPages)
        if (!isSearchData) setFilteredCars(data.cars)
      } else {
        toast.error(data.message)
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchCars()
  }, [page]) // refetch when page changes

  // ---------------- Search/Filter ----------------
  const applyFilter = () => {
    if (input === '') {
      setFilteredCars(cars)
      return
    }

    const filtered = cars.filter(
      car =>
        car.brand.toLowerCase().includes(input.toLowerCase()) ||
        car.model.toLowerCase().includes(input.toLowerCase()) ||
        car.category.toLowerCase().includes(input.toLowerCase()) ||
        car.transmission.toLowerCase().includes(input.toLowerCase())
    )
    setFilteredCars(filtered)
  }

  useEffect(() => {
    if (!isSearchData) applyFilter()
  }, [input, cars])

  // ---------------- Availability Search ----------------
  const searchCarAvailability = async () => {
    if (!pickupLocation || !pickupDate || !returnDate) return
    try {
      const data = await checkAvailabilityofCar(
        pickupLocation,
        pickupDate,
        returnDate
      )

      if (data.success) {
        setFilteredCars(data.availableCars as Car[])
        if ((data.availableCars as Car[]).length === 0) {
          toast('No cars available')
        }
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (isSearchData) searchCarAvailability()
  }, [isSearchData])

  return (
    <div>
      {/* --------- Header & Search --------- */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='flex flex-col items-center py-20 bg-light max-md:px-4'
      >
        <Title
          title='Available Cars'
          subTitle='Browse our selection of premium vehicles available for your next adventure'
        />

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='flex items-center bg-white px-4 mt-6 max-w-140 w-full h-12 rounded-full shadow'
        >
          <img src={assets.search_icon} alt="" className='w-4.5 h-4.5 mr-2' />
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            type="text"
            placeholder="Search by make, model, or features"
            className="w-full h-full outline-none text-gray-500"
          />
          <img src={assets.filter_icon} alt="" className='w-4.5 h-4.5 ml-2' />
        </motion.div>
      </motion.div>

      {/* --------- Cars Grid --------- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'
      >
        <p className='text-gray-500 xl:px-20 max-w-7xl mx-auto'>
          Showing {filteredCars.length} Cars
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
          {filteredCars.map((car, index) => (
            <motion.div
              key={car._id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <CarCard car={car} />
            </motion.div>
          ))}
        </div>

        {/* --------- Pagination --------- */}
        {!isSearchData && (
          <div className='flex items-center justify-center gap-6 mt-10'>
            <button
              disabled={page === 1}
              onClick={() => setPage(prev => prev - 1)}
              className='px-4 py-2 border rounded disabled:opacity-50'
            >
              Previous
            </button>

            <span className='text-sm'>
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(prev => prev + 1)}
              className='px-4 py-2 border rounded disabled:opacity-50'
            >
              Next
            </button>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default Cars
