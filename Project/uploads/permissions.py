from rest_framework import permissions

class IsArtistOrReadOnly(permissions.BasePermission):
    """
    Artists can upload/edit their own artwork.
    Public can view all uploads.
    """
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.artist == request.user
