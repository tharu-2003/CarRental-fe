import React from 'react'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { login, register, sendPasswordResetEmail } from '../services/user'
import { motion, AnimatePresence } from 'motion/react'

const Login: React.FC = () => {
    const { setShowLogin, setAccessToken, navigate } = useAppContext()

    const [state, setState] = React.useState('login') // 'login', 'register', 'forgot-password'
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [showPassword, setShowPassword] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)

    // const [message , setMessage] = useState("");

    const onSubmitHandler = async (event: any) => {
        try {
            event.preventDefault()
            setIsLoading(true)

            if (state === 'register') {
                const data = await register(name, email, password)

                if (data.success) {
                    setAccessToken(data.accessToken)
                    localStorage.setItem('accessToken', data.accessToken)
                    localStorage.setItem('refreshToken', data.refreshToken)
                    setShowLogin(false)
                    navigate('/')
                    toast.success('Account created successfully!')
                } else {
                    toast.error(data.message)
                }
            }else if (state ==  "forgot-password"){
                 event.preventDefault()
    
                if (!email) {
                    toast.error('Please enter your email address.')
                    return
                }

                setIsLoading(true)
                // setMessage('')
                
                try {
                    const response = await sendPasswordResetEmail(email)
                    
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    
                    if (response.success) {
                        const successMessage = '✅ A password reset link has been sent to your email address.'
                        // setMessage(successMessage)
                        toast.success(successMessage)
                        setEmail('')
                        // navigate('/')
                    } else {
                        toast.error(response.message || 'Failed to send reset link.')
                    }
                
                } catch (error: any) {
                    console.error('Password reset error:', error)
                    toast.error(error.response?.data?.message || 'An error occurred. Please try again.')
                } finally {
                    setIsLoading(false)
                }
            }
            
            else {
                const data = await login(email, password)

                if (data.success) {
                    setAccessToken(data.accessToken)
                    localStorage.setItem('accessToken', data.accessToken)
                    localStorage.setItem('refreshToken', data.refreshToken)
                    setShowLogin(false)
                    navigate('/')
                    toast.success('Welcome back!')
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    const handleForgotPassword = async () => {
        setState('forgot-password')
    }

    const handleBackToLogin = () => {
        setState('login')
        setEmail('')
        setPassword('')
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLogin(false)}
            className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
            <motion.form
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onSubmit={onSubmitHandler}
                onClick={(e) => e.stopPropagation()}
                className="relative flex flex-col gap-6 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
                {/* Decorative Header Background */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-br from-primary via-blue-600 to-purple-600 opacity-10" />
                
                {/* Close Button */}
                <button
                    type="button"
                    onClick={() => setShowLogin(false)}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors group"
                >
                    <svg
                        className="w-5 h-5 text-gray-400 group-hover:text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                <div className="relative p-8 pt-12">
                    {/* Logo/Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        className="w-16 h-16 mx-auto mb-4 bg-linear-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center shadow-lg"
                    >
                        {state === 'forgot-password' ? (
                            <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                                />
                            </svg>
                        ) : (
                            <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                        )}
                    </motion.div>

                    {/* Title */}
                    <motion.h2
                        key={state}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl font-bold text-center mb-2"
                    >
                        {state === 'login' && 'Welcome Back'}
                        {state === 'register' && 'Create Account'}
                        {state === 'forgot-password' && 'Reset Password'}
                    </motion.h2>
                    <motion.p
                        key={`${state}-subtitle`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-center text-gray-500 mb-8"
                    >
                        {state === 'login' && 'Login to access your account'}
                        {state === 'register' && 'Sign up to get started'}
                        {state === 'forgot-password' && 'Enter your email to receive a reset link'}
                    </motion.p>

                    {/* Form Fields */}
                    <div className="flex flex-col gap-5">
                        <AnimatePresence mode="wait">
                            {state === 'register' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0, y: -10 }}
                                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                                    exit={{ opacity: 0, height: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative"
                                >
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <input
                                            onChange={(e) => setName(e.target.value)}
                                            value={name}
                                            placeholder="John Doe"
                                            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                            type="text"
                                            required
                                        />
                                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    placeholder="you@example.com"
                                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                    type="email"
                                    required
                                />
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {state !== 'forgot-password' && (
                            <div className="relative">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    {state === 'login' && (
                                        <button
                                            type="button"
                                            onClick={handleForgotPassword}
                                            className="text-xs font-medium text-primary hover:text-primary-dull transition-colors"
                                        >
                                            Forgot Password?
                                        </button>
                                    )}
                                </div>
                                <div className="relative">
                                    <input
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        placeholder="••••••••"
                                        className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                    />
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                            />
                                        </svg>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ? (
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className="w-full mt-2 py-3 bg-linear-to-r from-primary to-blue-600 hover:from-primary-dull hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <svg
                                        className="animate-spin h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    <span>Processing...</span>
                                </>
                            ) : (
                                <>
                                    <span>
                                        {state === 'register' && 'Create Account'}
                                        {state === 'login' && 'Login'}
                                        {state === 'forgot-password' && 'Send Reset Link'}
                                    </span>
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                                        />
                                    </svg>
                                </>
                            )}
                        </motion.button>

                        {/* Toggle State */}
                        <div className="text-center pt-2">
                            {state === 'forgot-password' ? (
                                <p className="text-sm text-gray-600">
                                    Remember your password?{' '}
                                    <button
                                        type="button"
                                        onClick={handleBackToLogin}
                                        className="font-semibold text-primary hover:text-primary-dull transition-colors"
                                    >
                                        Back to login
                                    </button>
                                </p>
                            ) : state === 'register' ? (
                                <p className="text-sm text-gray-600">
                                    Already have an account?{' '}
                                    <button
                                        type="button"
                                        onClick={() => setState('login')}
                                        className="font-semibold text-primary hover:text-primary-dull transition-colors"
                                    >
                                        Login here
                                    </button>
                                </p>
                            ) : (
                                <p className="text-sm text-gray-600">
                                    Don't have an account?{' '}
                                    <button
                                        type="button"
                                        onClick={() => setState('register')}
                                        className="font-semibold text-primary hover:text-primary-dull transition-colors"
                                    >
                                        Sign up here
                                    </button>
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Decorative Footer */}
                <div className="h-2 bg-linear-to-r from-primary via-blue-600 to-purple-600" />
            </motion.form>
        </motion.div>
    )
}

export default Login