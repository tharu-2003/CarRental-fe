import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import Title from './Title'
import CarCard from './CarCard'
import { assets, type Car } from '../assets/assets'
import { getCars } from '../services/user'
import toast from 'react-hot-toast'

const FeaturedSection: React.FC = () => {
  const navigate = useNavigate()

  const [cars, setCars] = useState<Car[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const LIMIT = 3

  const fetchCars = async () => {
    try {
      const data = await getCars(page, LIMIT)

      if (data.success) {
        setCars(data.cars)
        setTotalPages(data.pagination.totalPages)
      } else {
        toast.error(data.message)
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchCars()
  }, [page])

  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32"
    >
      {/* Section Title */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <Title
          title="Featured Vehicles"
          subTitle="Explore our selection of premium vehicles available for your next adventure."
        />
      </motion.div>

      {/* Cars Grid */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18"
      >
        {cars.map((car) => (
          <motion.div
            key={car._id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <CarCard car={car} />
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}
      <div className="flex items-center gap-6 mt-14">
        <button
          disabled={page === 1}
          onClick={() => setPage(prev => prev - 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(prev => prev + 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Explore All Cars */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        onClick={() => {
          navigate('/cars')
          scrollTo(0, 0)
        }}
        className="flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer"
      >
        Explore all cars <img src={assets.arrow_icon} alt="arrow" />
      </motion.button>
    </motion.div>
  )
}

export default FeaturedSection
