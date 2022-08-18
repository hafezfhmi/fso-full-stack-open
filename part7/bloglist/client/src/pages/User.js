import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import userServices from "../services/users";

const User = () => {
  const [user, setUser] = useState(null);
  let userId = useParams().userId;

  useEffect(() => {
    (async () => {
      let userData = await userServices.getUser(userId);
      setUser(userData);
    })();
  }, []);

  // Used when userData is still being fetched because otherwise user.name will cause error because user.name is undefined
  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
