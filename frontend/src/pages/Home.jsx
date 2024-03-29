import React, { memo } from 'react';
import Form from '../components/Form';
import Navbar from '../components/Navbar';
import { UseContext } from '../Context';
import ReportCard from '../components/ReportCard';

function Home() {
  const { AllReports } = UseContext();
  return (
    <>
      <Form />
      <div className='flex flex-wrap gap-5 items-center justify-center'>
        {AllReports.map((x, i) => {
          if (i < 5) {
            return (
              <ReportCard
                key={x._id}
                name={x.name}
                gender={x.gender}
                age={x.age}
                weight={x.weight}
                hight={x.hight}
                bp={x.bp}
                date={x.date}
                id={x._id}
              />
            );
          } else return null;
        })}
      </div>
    </>
  );
}

export default memo(Home);
