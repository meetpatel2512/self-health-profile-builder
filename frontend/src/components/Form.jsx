import React, { memo } from 'react';
import { useForm } from 'react-hook-form';
import { UseContext } from '../Context';

function Form() {
  const { addReports } = UseContext();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const rawdate = new Date();
  const date = rawdate.toLocaleString();
  const onsubmit = async (data, e) => {
    await addReports({ ...data, date });
    e.target.reset();
  };
  return (
    <div>
      <form
        className="max-w-md flex flex-col gap-5 mx-2 md:mx-auto mt-5"
        onSubmit={handleSubmit(onsubmit)}
      >
        <div className="capitalize gap-5">
          <div>
            <div className="flex flex-col border-b border-teal-500 py-2">
              <label htmlFor="name">name</label>
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                id="name"
                name="name"
                placeholder="enter your name here"
                aria-label="Full name"
                {...register('name', {
                  required: 'please enter name',
                  pattern: {
                    value: '/^[a-zA-Zs]+$/',
                    message: 'Enter a valid name',
                  },
                })}
              />
            </div>
            {(errors.name?.type === 'required' ||
              errors.name?.type === 'pattern') && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div>
              <div className="flex flex-col border-b border-teal-500 py-2">
                <label htmlFor="age">age</label>
                <input
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="number"
                  id="age"
                  name="age"
                  placeholder="enter your age here"
                  min="1"
                  max="100"
                  aria-label="age"
                  {...register('age', {
                    required: 'please enter age',
                    min: {
                      value: 1,
                      message: 'please enter a age between 1 to 100',
                    },
                    max: {
                      value: 100,
                      message: 'please enter a age between 1 to 100',
                    },
                  })}
                />
              </div>
              {(errors.age?.type === 'required' ||
                errors.age?.type === 'min' ||
                errors.age?.type === 'max') && (
                <p className="text-red-500">{errors.age.message}</p>
              )}
            </div>
            <div>
              <div className="flex flex-col gap-2 border-b border-teal-500 py-2">
                <p>gender</p>
                <div className="flex max-md:flex-col md:items-center gap-2">
                  <div className="flex items-center gap-1">
                    <input
                      className=""
                      type="radio"
                      id="male"
                      value="male"
                      name="gender"
                      aria-label="male"
                      {...register('gender', {
                        required: 'please select gender',
                      })}
                    />
                    <label htmlFor="male">male</label>
                  </div>
                  <div className="flex items-center gap-1">
                    <input
                      className=""
                      type="radio"
                      id="female"
                      value="female"
                      name="gender"
                      aria-label="female"
                      {...register('gender', {
                        required: 'please select gender',
                      })}
                    />
                    <label htmlFor="female">female</label>
                  </div>
                </div>
              </div>
              {errors.gender?.type === 'required' && (
                <p className="text-red-500">{errors.gender.message}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div>
              <div className="flex flex-col border-b border-teal-500 py-2">
                <label htmlFor="weight">weight</label>
                <input
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="number"
                  id="weight"
                  name="weight"
                  placeholder="enter your weight in kg"
                  aria-label="weight"
                  {...register('weight', {
                    required: 'please enter weight',
                    pattern: {
                      value: ' /^[1-9]d*$/g/',
                      message: 'Enter a valid weight',
                    },
                  })}
                />
              </div>
              {errors.weight?.type === 'required' && (
                <p className="text-red-500">{errors.weight.message}</p>
              )}
            </div>
            <div>
              <div className="flex flex-col border-b border-teal-500 py-2">
                <p>hight</p>
                <input
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="number"
                  id="hight"
                  name="hight"
                  placeholder="enter your hight in cm"
                  aria-label="hight"
                  {...register('hight', {
                    required: 'please enter hight',
                    pattern: {
                      value: '/d{2,3}.d{,3}/',
                      message: 'Enter valid hight',
                    },
                  })}
                />
              </div>
              {(errors.hight?.type === 'required' ||
                errors.hight?.type === 'pattern') && (
                <p className="text-red-500">{errors.hight.message}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col border-b border-teal-500 py-2">
            <label htmlFor="bp">bp</label>
            <input
              className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="text"
              id="bp"
              name="bp"
              placeholder="enter your blood presure here Ex(120/80)"
              aria-label="blood presure"
              {...register('bp', {
                required: 'please enter bloop presure',
                pattern: {
                  value: '/^d{1,3}/d{1,3}$/',
                  message: 'Enter a valid blood presure',
                },
              })}
            />
          </div>
          {(errors.bp?.type === 'required' ||
            errors.bp?.type === 'pattern') && (
            <p className="text-red-500">{errors.bp.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="ring-1 bg-blue-500 text-white focus:ring-4 font-medium rounded-lg 
           w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default memo(Form);
