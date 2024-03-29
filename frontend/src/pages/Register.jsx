import React, { memo } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { UseContext } from '../Context';
import img from '../assets/Login.jpg';

function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'all',
  });

  const { error, Authenticate } = UseContext();

  const onsubmit = async data => {
    await Authenticate('/register', data);
  };

  return (
    <div>
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
        <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
          {error && (
            <div className="bg-red-400 rounded-md">
              <h1 className="p-2 text-white">{error}</h1>
            </div>
          )}
          <h1 className="text-2xl font-semibold mb-4">Register</h1>
          <form onSubmit={handleSubmit(onsubmit)}>
            {/* <!-- Username Input --> */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-600">
                Username
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                  autoComplete="off"
                  {...register('name', {
                    required: 'please provide a username',
                    minLength: {
                      value: 5,
                      message: 'name must be atleast 5 character long',
                    },
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message:
                        "Your Username is not valid. Only characters A-Z, a-z and '-' are  acceptable.",
                    },
                  })}
                />
                {(errors.name?.type === 'required' ||
                  errors.name?.type === 'minLength' ||
                  errors.name?.type === 'pattern') && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </label>
            </div>
            {/* <!-- Email Input --> */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 ">
                email
                <input
                  type="email"
                  id="email"
                  name="email"
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
                  autoComplete="new-password"
                  {...register('password', {
                    required: 'please provide a password',
                  })}
                />
                {errors.password?.type === 'required' && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </label>
            </div>
            {/* <!-- ConfirmPassword Input --> */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600">
                confirm password
                <input
                  type="password"
                  id="cpassword"
                  name="cpassword"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                  autoComplete="off"
                  {...register('cpassword', {
                    required: 'please provide a confirm password',
                    validate: value => {
                      const { password } = getValues();
                      return (
                        password === value ||
                        'password and confirm password not match'
                      );
                    },
                  })}
                />
                {errors.cpassword?.type === 'required' ||
                  (errors.cpassword?.type === 'validate' && (
                    <p className="text-red-500">{errors.cpassword.message}</p>
                  ))}
              </label>
            </div>

            {/* <!-- Login Button --> */}
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
            have an Account?
            <Link to="/login" className="hover:underline text-blue-500">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Register);
