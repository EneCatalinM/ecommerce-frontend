import React from 'react';
import styles from './UsersTab.module.scss';

interface UsersTabProps {
  users: any[];
  newUser: { name: string; email: string; password: string };
  setNewUser: (user: { name: string; email: string; password: string }) => void;
  onCreateUser: () => void;
}

const UsersTab: React.FC<UsersTabProps> = ({ users, newUser, setNewUser, onCreateUser }) => {
  return (
    <div className={styles['users-section']}>
      <h2>All Users</h2>
      <div className={styles.userList}>
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <div className={styles.userInfo}>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
              </div>
              <span className={styles.role}>{user.role}</span>
            </li>
          ))}
        </ul>
      </div>
      <h2>Create User</h2>
      <div className={styles.createUser}>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
        <button onClick={onCreateUser}>Create User</button>
      </div>
    </div>
  );
};

export default UsersTab;
