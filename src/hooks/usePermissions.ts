import { useAppSelector } from '@/store/hooks';
import { Permission } from '@/types/cms';

export const usePermissions = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { permissions } = useAppSelector((state) => state.cms);

  const hasPermission = (resource: string, action: string): boolean => {
    if (!user) return false;
    
    // Admin has all permissions
    if (user.role === 'admin') return true;

    // Check user's specific permissions
    if (user.permissions) {
      return user.permissions.some((permission: Permission) => 
        permission.resource === resource && 
        permission.actions.includes(action as any)
      );
    }

    // Default role-based permissions
    switch (user.role) {
      case 'editor':
        return ['posts', 'projects', 'media'].includes(resource) && 
               ['create', 'read', 'update', 'publish'].includes(action);
      case 'author':
        return ['posts', 'media'].includes(resource) && 
               ['create', 'read', 'update'].includes(action);
      case 'user':
        return resource === 'posts' && action === 'read';
      default:
        return false;
    }
  };

  const canManagePosts = () => hasPermission('posts', 'create');
  const canManageProjects = () => hasPermission('projects', 'create');
  const canManageUsers = () => hasPermission('users', 'create');
  const canManageMedia = () => hasPermission('media', 'create');
  const canPublish = () => hasPermission('posts', 'publish') || hasPermission('projects', 'publish');

  const getUserRole = () => user?.role || 'user';
  const isAdmin = () => user?.role === 'admin';
  const isEditor = () => user?.role === 'editor' || user?.role === 'admin';
  const isAuthor = () => ['author', 'editor', 'admin'].includes(user?.role || '');

  return {
    hasPermission,
    canManagePosts,
    canManageProjects,
    canManageUsers,
    canManageMedia,
    canPublish,
    getUserRole,
    isAdmin,
    isEditor,
    isAuthor,
    user,
  };
};
