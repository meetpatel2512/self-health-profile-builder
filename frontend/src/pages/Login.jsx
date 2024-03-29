import React, { memo } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { UseContext } from '../Context/index';
import img from '../assets/Login.jpg'
function Login() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'all',
  });

  const { error, Authenticate } = UseContext();

  const onsubmit = async data => {
    await Authenticate('/login', data);
  };

  return (
    // <!-- component -->
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      {/* <!-- Left: Image --> */}
      <div className="w-1/2 h-screen hidden lg:block">
        <img
          src={img}
          alt="Placeholder"
          className="object-cover w-full h-full"
        />
      </div>
      {/* <!-- Right: Login Form --> */}
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 relative">
        {error && (
          <div className="bg-red-400 rounded-md">
            <h1 className="p-2 text-white">{error}</h1>
          </div>
        )}

        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form onSubmit={handleSubmit(onsubmit)}>
          {/* <!-- Username Input --> */}

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600">
              email
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
                {...register('email', {
                  required: 'please provide a email',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'invalid email address',
                  },
                })}
              />
              {(errors.email?.type === 'required' ||
                errors.email?.type === 'pattern') && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </label>
          </div>
          {/* <!-- Password Input --> */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
              <input
                type="password"
                id="password"
                name="password"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="current-password"
                {...register('password', {
                  required: 'please provide a password ',
                })}
              />
              {errors.password?.type === 'required' && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </label>
          </div>
          {/* <Link to="/home"> */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
          >
            Login
          </button>
          {/* </Link> */}
        </form>
        {/* <!-- Sign up  Link --> */}
        <div className="mt-6 capitalize font-semibold text-center">
          don&apos;t have an Account?
          <Link to="/register" className="hover:underline text-blue-500">
            sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default memo(Login);
