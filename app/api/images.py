from flask import Blueprint, request
from ..models import db, Image
from ..forms.image import ImageForm
from flask_login import current_user, login_required
from .aws_helpers import (
    upload_file_to_s3, get_unique_filename)

images = Blueprint("images", __name__)


@images.route("", methods=["POST"])
@login_required
def upload_image():
    form = ImageForm()

    if form.validate_on_submit():

        image = form.data["image"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        print(upload)

        if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when you tried to upload
        # so you send back that error message (and you printed it above)
            return {"error": "Error with upload to AWS"}

        url = upload["url"]
        new_image = Image()
        db.session.add(new_image)
        db.session.commit()
        return new_image.to_dict()

    if form.errors:
        print(form.errors)
        return {"error": "There were errors in the form."}
