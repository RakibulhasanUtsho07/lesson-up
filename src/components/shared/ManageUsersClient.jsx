"use client";

import React, { useState } from "react";
import UserTable from "./AdminManageUsersSection";
// import UserTable from "./UserTable";

export default function ManageUsersClient({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers);

  // Handle Role Update (Promote / Demote)
  const handleUpdateRole = async (userId, newRole) => {
    // Optimistic UI Update
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === userId ? { ...user, role: newRole } : user))
    );
    
    // TODO: Add your Server Action or API route here to persist change in DB
    // await updateServerUserRole(userId, newRole);
    console.log(`User ${userId} role updated to ${newRole}`);
  };

  // Handle User Deletion
  const handleDeleteUser = async (userId) => {
    if (confirm("Are you sure you want to delete this user?")) {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      
      // TODO: Add your Server Action or API route here to delete from DB
      // await deleteServerUser(userId);
      console.log(`User ${userId} deleted`);
    }
  };

  return (
    <div className="bg-content1 rounded-xl shadow-sm border border-divider overflow-hidden">
      <UserTable
        users={users}
        onUpdateRole={handleUpdateRole}
        onDeleteUser={handleDeleteUser}
      />
    </div>
  );
}