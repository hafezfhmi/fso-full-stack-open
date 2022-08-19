import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import userServices from "../services/users";
import { Table } from "react-bootstrap";

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

  console.log(user);

  return (
    <div>
      <h2 className="my-4">{user.name}</h2>
      <h3>Added blogs:</h3>
      <Table striped>
        <tbody>
          {user.blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default User;
