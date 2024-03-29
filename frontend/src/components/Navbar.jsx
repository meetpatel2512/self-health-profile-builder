import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { UseContext } from '../Context';

function Navbar() {
  const { username, Logout } = UseContext();
  return (
    <nav className=" capitalize flex py-4 shadow-lg justify-between items-center px-4">
      <div />
      <div>
        <ul className="flex gap-5 items-center">
          <Link to="/">
            <li>home</li>
          </Link>
          <Link to="/reports">
            <li>all report</li>
          </Link>
        </ul>
      </div>
      <div className="flex gap-5 items-center">
        <p>{username}</p>
        <Link to="/login">
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-1 rounded-md"
            onClick={Logout}
          >
            logout
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default memo(Navbar);
