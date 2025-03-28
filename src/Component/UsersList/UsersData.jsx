import { useEffect, useState } from 'react';
import styles from './userdata.module.css';
import axios from 'axios';

const UserData = () => {
    const [users, setUsers] = useState([]); 
    const [newUser, setNewUser] = useState({ first_name: "", last_name: "", email: "" });
    const [editUser, setEditUser] = useState(null);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const res = await axios.get("https://reqres.in/api/users?page=2");
            setUsers(res.data.data);
        } catch (err) {
            console.error("There is an error", err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://reqres.in/api/users/${id}`);
            setUsers(users.filter(user => user.id !== id));
            alert("User deleted successfully");
        } catch (err) {
            console.error("Error deleting user:", err);
        }
    };

    const handleAddUser = async () => {
        try {
            await axios.post("https://reqres.in/api/users", newUser);
            const newUserWithId = { ...newUser, id: Date.now() };
            setUsers([...users, newUserWithId]);
            setNewUser({ first_name: "", last_name: "", email: "" });
        } catch (err) {
            console.error("Error adding user:", err);
        }
    };

    const handleEditUser = (user) => {
        setEditUser(user);
    };

    const handleUpdateUser = async () => {
        try {
            await axios.put(`https://reqres.in/api/users/${editUser.id}`, editUser);
            setUsers(users.map(user => (user.id === editUser.id ? editUser : user))); 
            setEditUser(null);
        } catch (err) {
            console.error("Error updating user:", err);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.userData}>
                <h2>User List</h2>
                <ul>
                    {users.map((userObj) => (
                        <li key={userObj.id} className={styles.userCard}>
                            <img src={userObj.avatar} alt={userObj.first_name} className={styles.avatar} />
                            <h3>{userObj.first_name} {userObj.last_name}</h3>
                            <h4>{userObj.email}</h4>
                            <div className={styles.buttonGroup}>
                                <button className={styles.editBtn} onClick={() => handleEditUser(userObj)}>Edit</button>
                                <button className={styles.deleteBtn} onClick={() => handleDelete(userObj.id)}>Delete</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={styles.formSection}>
                <h2>Add User</h2>
                <input type="text" placeholder="First Name" value={newUser.first_name} onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })} />
                <input type="text" placeholder="Last Name" value={newUser.last_name} onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })} />
                <input type="email" placeholder="Email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
                <button className={styles.addBtn} onClick={handleAddUser}>Add User</button>

                {editUser && (
                    <div>
                        <h2>Edit User</h2>
                        <input type="text" value={editUser.first_name} onChange={(e) => setEditUser({ ...editUser, first_name: e.target.value })} />
                        <input type="text" value={editUser.last_name} onChange={(e) => setEditUser({ ...editUser, last_name: e.target.value })} />
                        <input type="email" value={editUser.email} onChange={(e) => setEditUser({ ...editUser, email: e.target.value })} />
                        <button className={styles.updateBtn} onClick={handleUpdateUser}>Update User</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserData;
