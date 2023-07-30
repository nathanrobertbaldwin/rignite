from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
from flask_login import current_user


def user_exists(form, field):
    # Checking if email exists
    email = field.data

    all_other_users = User.query.filter(User.id != str(current_user.id)).all()

    for user in all_other_users:
        if email == user.email:
            raise ValidationError('Email is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    #aaa
    username_input = field.data

    all_other_users = User.query.filter(User.id != str(current_user.id)).all()

    for user in all_other_users:
        if username_input == user.username:
            raise ValidationError('Username is already in use.')


class ManageForm(FlaskForm):
    username = StringField('username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists])
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    address = StringField('address', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    zip_code = IntegerField('zip_code', validators=[DataRequired()])
    password = StringField('password', validators=[DataRequired()])
