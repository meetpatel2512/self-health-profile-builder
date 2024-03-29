import React, { memo } from 'react';
import Recyclebin from '../assets/recycle-bin-icon.svg';
import { UseContext } from '../Context';

function ReportCard({ name, gender, age, weight, hight, bp, date, id }) {
  const { deleteReport } = UseContext();

  return (
    <div className="flex justify-center gap-10 items-center mt-5 flex-wrap">
      <div className="border-2 border-slate-400 flex  flex-col h-80 aspect-3/4 rounded-lg">
        <div className="flex flex-1 border-slate-400 items-center  justify-center border-b-2">
          <p className="text-2xl capitalize">{name}</p>
        </div>
        <div className="grid flex-[2] border-slate-400  content-between justify-items-center py-5 grid-cols-2 border-b-2">
          <p className="capitalize">gender:-</p> <span>{gender}</span>
          <p className="capitalize">age:-</p> <span>{age}</span>
          <p className="capitalize">weight:-</p> <span>{weight} kg</span>
          <p className="capitalize">hight:-</p> <span>{hight} cm</span>
        </div>
        <div className="px-5 border-slate-400 border-b-2 flex-1 flex  justify-between items-center">
          <p className="uppercase">bp</p> <span>{bp} mm/hg</span>
        </div>
        <div className="flex items-center justify-evenly">
          <p className="py-2">{date}</p>
          <Recyclebin
            className="h-5 cursor-pointer"
            onClick={() => deleteReport(id)}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(ReportCard);
