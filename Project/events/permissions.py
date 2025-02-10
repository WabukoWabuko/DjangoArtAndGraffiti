from rest_framework import permissions

class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Only admins can create, update, or delete events.
    Public can view events.
    """
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user.is_staff
