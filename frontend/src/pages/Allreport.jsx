import React, { memo } from 'react';
import ReportCard from '../components/ReportCard';
import { UseContext } from '../Context';
import Navbar from '../components/Navbar';

const Allreport = () => {
  const { AllReports } = UseContext();
  console.log("report page");
  return (
    
      <div className="flex flex-wrap gap-5 items-center min-h-[calc(100vh_-_64px)] justify-center mx-auto md:max-w-6xl">
        {AllReports.map(x => (
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
        ))}
      </div>

  );
};

export default memo(Allreport);
