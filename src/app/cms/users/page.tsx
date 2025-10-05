'use client';

import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import { usePermissions } from '@/hooks/usePermissions';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { updateUserPermissions } from '@/store/slices/cmsSlice';
import { CMSUser, Permission } from '@/types/cms';

export default function UserManagement() {
  const { permissions } = useAppSelector((state) => state.cms);
  const { isAdmin, user: currentUser } = usePermissions();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [users, setUsers] = useState<CMSUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<CMSUser | null>(null);
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  useEffect(() => {
    if (!isAdmin()) {
      router.push('/cms');
      return;
    }

    // Load users from localStorage (in real app, this would be an API call)
    const savedUsers = localStorage.getItem('cms_users');
    const loadedUsers = savedUsers ? JSON.parse(savedUsers) : [];
    
    // Add current user if not exists
    if (currentUser && !loadedUsers.find((u: CMSUser) => u.id === currentUser.id)) {
      const newUser: CMSUser = {
        id: currentUser.id,
        name: currentUser.name,
        email: currentUser.email,
        role: currentUser.role as any,
        permissions: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isActive: true,
      };
      loadedUsers.push(newUser);
      localStorage.setItem('cms_users', JSON.stringify(loadedUsers));
    }
    
    setUsers(loadedUsers);
  }, [isAdmin, currentUser, router]);

  const handleRoleChange = (userId: string, newRole: CMSUser['role']) => {
    const updatedUsers = users.map(user => 
      user.id === userId 
        ? { ...user, role: newRole, updatedAt: new Date().toISOString() }
        : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('cms_users', JSON.stringify(updatedUsers));
  };

  const handlePermissionUpdate = (userPermissions: Permission[]) => {
    if (!selectedUser) return;
    
    const updatedUsers = users.map(user => 
      user.id === selectedUser.id 
        ? { ...user, permissions: userPermissions, updatedAt: new Date().toISOString() }
        : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('cms_users', JSON.stringify(updatedUsers));
    dispatch(updateUserPermissions({ userId: selectedUser.id, permissions: userPermissions }));
    setShowPermissionModal(false);
    setSelectedUser(null);
  };

  const toggleUserStatus = (userId: string) => {
    const updatedUsers = users.map(user => 
      user.id === userId 
        ? { ...user, isActive: !user.isActive, updatedAt: new Date().toISOString() }
        : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('cms_users', JSON.stringify(updatedUsers));
  };

  const getRoleColor = (role: CMSUser['role']) => {
    switch (role) {
      case 'admin': return 'text-red-400 bg-red-500/20';
      case 'editor': return 'text-blue-400 bg-blue-500/20';
      case 'author': return 'text-green-400 bg-green-500/20';
      case 'user': return 'text-gray-400 bg-gray-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  if (!isAdmin()) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">User Management</h1>
              <p className="text-gray-400">Manage user roles and permissions</p>
            </div>
            <Button
              variant="outline"
              onClick={() => router.push('/cms')}
            >
              Back to CMS
            </Button>
          </div>

          {/* Users List */}
          <div className="space-y-4">
            {users.length === 0 ? (
              <Card variant="glass" className="p-8 text-center">
                <p className="text-gray-400">No users found</p>
              </Card>
            ) : (
              users.map((user) => (
                <Card key={user.id} variant="glass" className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-white">{user.name}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getRoleColor(user.role)}`}>
                          {user.role}
                        </span>
                        {!user.isActive && (
                          <span className="px-2 py-1 rounded text-xs font-medium bg-red-500/20 text-red-400">
                            Inactive
                          </span>
                        )}
                        {user.id === currentUser?.id && (
                          <span className="px-2 py-1 rounded text-xs font-medium bg-blue-500/20 text-blue-400">
                            You
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 mb-3">{user.email}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>Updated {new Date(user.updatedAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{user.permissions?.length || 0} custom permissions</span>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      {/* Role Selector */}
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value as CMSUser['role'])}
                        disabled={user.id === currentUser?.id}
                        className="px-3 py-2 bg-gray-800 border border-gray-600 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                      >
                        <option value="user">User</option>
                        <option value="author">Author</option>
                        <option value="editor">Editor</option>
                        <option value="admin">Admin</option>
                      </select>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedUser(user);
                          setShowPermissionModal(true);
                        }}
                      >
                        Permissions
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleUserStatus(user.id)}
                        disabled={user.id === currentUser?.id}
                        className={user.isActive ? 'text-red-400 border-red-400' : 'text-green-400 border-green-400'}
                      >
                        {user.isActive ? 'Deactivate' : 'Activate'}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Permission Modal */}
      {showPermissionModal && selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <Card variant="glass" className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">
                  Manage Permissions - {selectedUser.name}
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowPermissionModal(false);
                    setSelectedUser(null);
                  }}
                >
                  Close
                </Button>
              </div>

              <div className="space-y-4">
                <p className="text-gray-400 text-sm">
                  Select specific permissions for this user. These will override default role permissions.
                </p>
                
                {permissions.map((permission) => (
                  <div key={permission.id} className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-white">{permission.name}</h3>
                      <input
                        type="checkbox"
                        checked={selectedUser.permissions?.some(p => p.id === permission.id) || false}
                        onChange={(e) => {
                          const currentPermissions = selectedUser.permissions || [];
                          const newPermissions = e.target.checked
                            ? [...currentPermissions, permission]
                            : currentPermissions.filter(p => p.id !== permission.id);
                          setSelectedUser({ ...selectedUser, permissions: newPermissions });
                        }}
                        className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                      />
                    </div>
                    <p className="text-gray-400 text-sm">{permission.description}</p>
                    <div className="flex gap-2 mt-2">
                      {permission.actions.map((action) => (
                        <span key={action} className="px-2 py-1 bg-gray-700 rounded text-xs text-gray-300">
                          {action}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowPermissionModal(false);
                    setSelectedUser(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => handlePermissionUpdate(selectedUser.permissions || [])}
                  className="bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  Save Permissions
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
