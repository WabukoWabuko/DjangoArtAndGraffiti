from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission for plain authentication, allowing users to view any profile
    but only edit their own profile based on user_id passed in the request.
    
    For plain auth without sessions or tokens, checks if the user_id from the request
    matches the object being accessed or edited.
    """
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True  # Allow read-only access for anyone
        # For plain auth, check user_id from query params or data
        user_id = request.query_params.get('user_id') or request.data.get('user_id')
        return str(obj.id) == str(user_id) if user_id else False
