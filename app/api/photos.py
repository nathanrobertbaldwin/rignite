from flask import Blueprint
from ..models import Photo

photos = Blueprint("photos", __name__)

# Get /api/photos/all
# route to get photos data

@photos.route('/all')
def get_all_photos():
    photos = Photo.query.all()
    return [photo.to_dict() for photo in photos]
