import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userServices from "../services/users";
import { Table } from "react-bootstrap";

const Users = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    (async () => {
      let user = await userServices.getAll();
      setUser(user);
    })();
  }, []);

  return (
    <div>
      <h2 className="my-4">Users</h2>

      <Table bordered>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {user
            .sort((b, a) => a.blogs.length - b.blogs.length)
            .map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;
