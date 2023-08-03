## Rignite

Rignite sells cool products aimed at pc-builder enthusiasts who want extra style for their rig.
Rignite Users create an account, add items to their shopping cart, and then create orders when finished.
Users can leave reviews with a photo and rating for products.
Users can manage their account information.
Admins are Rignite employees with the power to post additional products, edit their employee accounts,
and see User orders.

## API Docs

# Users

1. GET /api/users/ - Query for all users and returns them in a list of user dictionaries.
2. PUT /api/users/manage - Logged in Users can manage their account on a separate my profile page. User can edit their information.
3. DELETE /api/users/delete - From separate my profile page for User account management. Button opens a modal for confirmation of delete of User account.
4. GET /api/users/<int:id> - Query for a user by id and returns that user in a dictionary.

# Auth
1. GET /api/auth/ -  Authenticates a user.
2. POST /api/auth/login - Logs a user in.
3. GET /api/auth/logout - Logs a user out.
4. POST /api/auth/signup - Creates a new user and logs them in.
5. GET /api/auth/unauthorized - Returns unauthorized JSON when flask-login authentication fails.

# Categories
1. GET /api/categories - Gets all product categories and returns them in a list of user dictionaries.
   
# Products
1. GET /api/products/all - Get all products, associated reviews, and associated photos and returns them in a list of user dictionaries.
2. POST /api/products/new - A user with admin privileges can create a new product. Adds up to four images for a product.
3. POST /api/products/edit/<int:productId> - A user with admin privileges can edit a product, including the addition of extra images.

# Orders
1. POST /api/orders/ - Gets all user order details and returns them in a list of user dictionaries.
2. GET /api/orders/ - Adds a new product order for a user.
3. PUT /api/orders/<string:batchId> - Edits an order for a user.
4. DELETE /api/orders/<string:batchId> - Deletes an order for a user.

# Users
1. GET /api/reviews - Gets all reviews for a user and returns them in a list of user dictionaries.
2. POST /api/reviews/new - Creates a new review from a user on a specific product.
3. PUT /api/reviews/<int:reviewId> - user can edit a review they created.
4. DELETE /api/reviews/<int:reviewId>A user can delete a review they posted.
