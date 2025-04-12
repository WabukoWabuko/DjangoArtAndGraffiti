from rest_framework import permissions

class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Custom permission to allow read-only access to all users,
    but restrict write operations to admin users.
    """
    def has_permission(self, request, view):
        # Allow GET, HEAD, or OPTIONS requests for all users
        if request.method in permissions.SAFE_METHODS:
            return True
        # Allow write operations only for admin users
        return request.user and request.user.is_authenticated and request.user.is_staff
