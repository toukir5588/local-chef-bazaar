import { Link, useLocation, useNavigate } from 'react-router'
import { FcGoogle } from 'react-icons/fc'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'
import { useForm } from 'react-hook-form'
import { imageUpload, saveOrUpdateUser } from '../../utils'

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state || '/'

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async data => {
    const { name, image, email, password } = data
    const imageFile = image[0]

    try {
      const imageURL = await imageUpload(imageFile)

      // 1. User Registration
      const result = await createUser(email, password)

      // 2. Save user to DB
      await saveOrUpdateUser({ name, email, image: imageURL })

      // 3. Update profile photo in Firebase
      await updateUserProfile(name, imageURL)

      navigate(from, { replace: true })
      toast.success('Registration Successful! Welcome to MealMaster')
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const { user } = await signInWithGoogle()
      await saveOrUpdateUser({
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      })
      navigate(from, { replace: true })
      toast.success('Signup Successful with Google')
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-white'>
      <div className='flex flex-col max-w-md w-full p-6 rounded-[2.5rem] sm:p-10 bg-white text-gray-900 border border-gray-100 shadow-2xl my-10'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-black text-gray-800'>Sign Up</h1>
          <p className='text-sm text-gray-400 font-medium'>
            Join <span className='text-amber-500 font-bold'>LocalChefBazaar</span> today!
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div className='space-y-4'>
            {/* Name Input */}
            <div>
              <label htmlFor='name' className='block mb-2 text-sm font-bold text-gray-700'>
                Full Name
              </label>
              <input
                type='text'
                id='name'
                placeholder='Enter Your Name'
                className='w-full px-4 py-3 border rounded-2xl border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-50 text-gray-900 transition-all'
                {...register('name', {
                  required: 'Name is required',
                  maxLength: { value: 20, message: 'Name cannot exceed 20 characters' },
                })}
              />
              {errors.name && <p className='text-red-500 text-xs mt-1'>{errors.name.message}</p>}
            </div>

            {/* Image Input */}
            <div>
              <label htmlFor='image' className='block mb-2 text-sm font-bold text-gray-700'>
                Profile Image
              </label>
              <input
                type='file'
                id='image'
                accept='image/*'
                className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100 bg-gray-50 border border-dashed border-amber-200 rounded-2xl cursor-pointer py-2 px-2'
                {...register('image', { required: 'Profile image is required' })}
              />
              {errors.image && <p className='text-red-500 text-xs mt-1'>{errors.image.message}</p>}
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor='email' className='block mb-2 text-sm font-bold text-gray-700'>
                Email Address
              </label>
              <input
                type='email'
                id='email'
                placeholder='Enter Your Email'
                className='w-full px-4 py-3 border rounded-2xl border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-50 text-gray-900 transition-all'
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Please enter a valid email address',
                  },
                })}
              />
              {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>}
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor='password' className='block mb-2 text-sm font-bold text-gray-700'>
                Password
              </label>
              <input
                type='password'
                id='password'
                placeholder='*******'
                className='w-full px-4 py-3 border rounded-2xl border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-50 text-gray-900 transition-all'
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' },
                })}
              />
              {errors.password && <p className='text-red-500 text-xs mt-1'>{errors.password.message}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className='pt-2'>
            <button
              type='submit'
              className='bg-amber-500 hover:bg-amber-600 w-full rounded-2xl py-3 text-white font-bold shadow-lg shadow-amber-100 transition-all transform hover:-translate-y-0.5'
            >
              {loading ? <TbFidgetSpinner className='animate-spin m-auto text-2xl' /> : 'Create Account'}
            </button>
          </div>
        </form>

        <div className='flex items-center pt-6 space-x-1'>
          <div className='flex-1 h-px bg-gray-200'></div>
          <p className='px-3 text-xs text-gray-400 font-bold uppercase tracking-widest'>Or join with</p>
          <div className='flex-1 h-px bg-gray-200'></div>
        </div>

        {/* Google Sign In */}
        <div
          onClick={handleGoogleSignIn}
          className='flex justify-center items-center space-x-2 border mt-4 p-3 border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 transition-all group'
        >
          <FcGoogle size={28} />
          <p className='font-bold text-gray-700 group-hover:text-amber-600'>Sign up with Google</p>
        </div>

        <p className='px-6 mt-6 text-sm text-center text-gray-400'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='font-bold text-amber-500 hover:text-amber-600 hover:underline transition-colors'
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp