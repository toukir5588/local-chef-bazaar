import Button from '../components/Shared/Button/Button'
import { useNavigate } from 'react-router'

const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <section className='bg-white'>
      <div className='container flex items-center min-h-screen px-6 py-12 mx-auto'>
        <div className='flex flex-col items-center max-w-sm mx-auto text-center'>
          {/* Icon Container with Amber Theme */}
          <p className='p-4 text-sm font-medium text-amber-500 rounded-full bg-amber-50 shadow-sm'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='2'
              stroke='currentColor'
              className='w-8 h-8'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z'
              />
            </svg>
          </p>
          
          <h1 className='mt-6 text-3xl font-black text-gray-900 md:text-4xl'>
            Oops! Page Not Found
          </h1>
          <p className='mt-4 text-gray-500 font-medium'>
            It seems like the dish you're looking for isn't on our menu today.
          </p>

          <div className='flex items-center w-full mt-8 gap-x-4 shrink-0 sm:w-auto'>
            {/* Go Back Button */}
            <button
              onClick={() => navigate(-1)}
              className='flex items-center justify-center w-1/2 px-6 py-2.5 text-sm font-bold text-gray-700 transition-all duration-200 bg-white border-2 border-gray-100 rounded-2xl gap-x-2 sm:w-auto hover:bg-gray-50 hover:border-amber-200 active:scale-95'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='2'
                stroke='currentColor'
                className='w-5 h-5 rtl:rotate-180 text-amber-500'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
                />
              </svg>

              <span>Go Back</span>
            </button>

            {/* Take Me Home Button */}
            <div className="w-1/2 sm:w-auto transform transition-transform hover:-translate-y-1">
                <Button label={'Back to Home'} onClick={() => navigate('/')} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ErrorPage