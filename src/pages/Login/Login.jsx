import { Link, Navigate, useLocation, useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import useAuth from '../../hooks/useAuth'
import { FcGoogle } from 'react-icons/fc'
import { TbFidgetSpinner } from 'react-icons/tb'
import { saveOrUpdateUser } from '../../utils'

const Login = () => {
  const { signIn, signInWithGoogle, loading, user, setLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state || '/'

  if (loading) return <LoadingSpinner />
  if (user) return <Navigate to={from} replace={true} />

  // form submit handler
  const handleSubmit = async event => {
    event.preventDefault()
    const form = event.target
    const email = form.email.value
    const password = form.password.value

    try {
      // User Login
      const { user } = await signIn(email, password)

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      })

      navigate(from, { replace: true })
      toast.success('Welcome Back! Login Successful')
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  // Handle Google Signin
  const handleGoogleSignIn = async () => {
    try {
      // User Registration using google
      const { user } = await signInWithGoogle()

      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      })
      navigate(from, { replace: true })
      toast.success('Login Successful with Google')
    } catch (err) {
      console.log(err)
      setLoading(false)
      toast.error(err?.message)
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-white'>
      <div className='flex flex-col max-w-md p-6 rounded-[2.5rem] sm:p-10 bg-white text-gray-900 border border-gray-100 shadow-2xl'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-black text-gray-800'>Log In</h1>
          <p className='text-sm text-gray-400 font-medium'>
            Welcome back to <span className='text-amber-500 font-bold'>LocalChefBazaar</span>
          </p>
        </div>
        
        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className='space-y-6'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm font-bold text-gray-700'>
                Email Address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                required
                placeholder='Enter your email'
                className='w-full px-4 py-3 border rounded-2xl border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-50 text-gray-900 transition-all'
              />
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2 font-bold text-gray-700'>
                  Password
                </label>
              </div>
              <input
                type='password'
                name='password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-4 py-3 border rounded-2xl border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-50 text-gray-900 transition-all'
              />
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='bg-amber-500 hover:bg-amber-600 w-full rounded-2xl py-3 text-white font-bold shadow-lg shadow-amber-100 transition-all transform hover:-translate-y-0.5'
            >
              {loading ? (
                <TbFidgetSpinner className='animate-spin m-auto text-2xl' />
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </form>

        <div className='mt-2'>
          <button className='text-xs font-bold hover:text-amber-600 text-gray-400 cursor-pointer transition-colors'>
            Forgot password?
          </button>
        </div>

        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px bg-gray-200'></div>
          <p className='px-3 text-sm text-gray-400 font-medium'>
            Or social login
          </p>
          <div className='flex-1 h-px bg-gray-200'></div>
        </div>

        <div
          onClick={handleGoogleSignIn}
          className='flex justify-center items-center space-x-2 border mt-4 p-3 border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 transition-all group'
        >
          <FcGoogle size={28} />
          <p className='font-bold text-gray-700 group-hover:text-amber-600'>Continue with Google</p>
        </div>

        <p className='px-6 mt-6 text-sm text-center text-gray-400'>
          Don&apos;t have an account yet?{' '}
          <Link
            state={from}
            to='/signup'
            className='font-bold text-amber-500 hover:text-amber-600 hover:underline transition-colors'
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login