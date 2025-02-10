from rest_framework import permissions

class IsAuthorOrReadOnly(permissions.BasePermission):
    """
    Only the author of a community post can edit/delete it.
    Public can view all posts.
    """
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.author == request.user
