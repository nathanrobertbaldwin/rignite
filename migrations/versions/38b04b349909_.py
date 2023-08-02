"""empty message

Revision ID: 38b04b349909
Revises:
Create Date: 2023-08-02 13:52:47.672656

"""
from alembic import op
import sqlalchemy as sa


import os

environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = '38b04b349909'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('categories',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('photo_url', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE categories SET SCHEMA {SCHEMA};")


    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('first_name', sa.String(length=40), nullable=False),
    sa.Column('last_name', sa.String(length=40), nullable=False),
    sa.Column('address', sa.String(length=100), nullable=False),
    sa.Column('city', sa.String(length=50), nullable=False),
    sa.Column('state', sa.String(length=50), nullable=False),
    sa.Column('zip_code', sa.Integer(), nullable=False),
    sa.Column('is_admin', sa.Boolean(), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")


    op.create_table('products',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('product_name', sa.String(length=50), nullable=False),
    sa.Column('category_id', sa.Integer(), nullable=True),
    sa.Column('price', sa.Numeric(scale=2), nullable=False),
    sa.Column('brand', sa.String(length=50), nullable=False),
    sa.Column('color', sa.String(length=50), nullable=True),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('specs', sa.Text(), nullable=False),
    sa.Column('status', sa.Enum('active', 'sold out', 'deactivated', name='status_enum2'), nullable=False),
    sa.ForeignKeyConstraint(['category_id'], ['categories.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE products SET SCHEMA {SCHEMA};")


    op.create_table('orders',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('product_id', sa.Integer(), nullable=True),
    sa.Column('batch_id', sa.String(length=100), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.Column('order_date', sa.String(length=50), nullable=False),
    sa.Column('status', sa.Enum('pending', 'in transit', 'delivered', name='status_enum'), nullable=False),
    sa.Column('total', sa.Numeric(scale=2), nullable=False),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE orders SET SCHEMA {SCHEMA};")


    op.create_table('photos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=True),
    sa.Column('url', sa.String(length=255), nullable=False),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE photos SET SCHEMA {SCHEMA};")


    op.create_table('reviews',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('product_id', sa.Integer(), nullable=True),
    sa.Column('review', sa.Text(), nullable=False),
    sa.Column('rating', sa.Integer(), nullable=False),
    sa.Column('photo_url', sa.String(length=255), nullable=True),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
            op.execute(f"ALTER TABLE reviews SET SCHEMA {SCHEMA};")

            
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('reviews')
    op.drop_table('photos')
    op.drop_table('orders')
    op.drop_table('products')
    op.drop_table('users')
    op.drop_table('categories')
    # ### end Alembic commands ###
