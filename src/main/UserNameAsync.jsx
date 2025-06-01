import React, { useEffect, useState } from 'react';
import UserController from '../services/UserController';

const UserNameAsync = ({userId}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const newUser = await UserController.getUser(userId);
      setUser(newUser);
    };

    fetchUser();
  }, [userId]);

  return (
    <span>
        {user?.name || "Anon..."}
    </span>
  );
};

export default UserNameAsync;

