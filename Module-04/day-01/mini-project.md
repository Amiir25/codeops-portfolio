# API Endpoints For Capstone Project

All paths are versioned under `/api/v1`. Identifiers are in the path and filters are in the query string.

| # | Method | Path | Purpose | Success | Failure |
|---|--------|------|---------|---------|---------|
| 1 | GET | `/api/v1/restaurants` | List restaurants | 200 | 400 (invalid query parameter) |
| 2 | GET | `/api/v1/restaurants/{restaurantId}` | Get one restaurant's details | 200 | 404 (restaurant not found) |
| 3 | PATCH | `/api/v1/restaurants/{restaurantId}` | Update restaurant information (admin) | 200 | 403 (not an admin) |
| 4 | GET | `/api/v1/restaurants/{restaurantId}/menu-items?category=injera&available=true&q=doro` | List and filter a restaurant's menu | 200 | 404 (restaurant not found) |
| 5 | GET | `/api/v1/menu-items/{menuItemId}` | Get one food item's details | 200 | 404 (item not found) |
| 6 | POST | `/api/v1/restaurants/{restaurantId}/menu-items` | Add a menu item (admin) | 201 | 422 (invalid item data) |
| 7 | PATCH | `/api/v1/menu-items/{menuItemId}` | Edit an item or its availability (admin) | 200 | 404 (item not found) |
| 8 | DELETE | `/api/v1/menu-items/{menuItemId}` | Remove a menu item (admin) | 204 | 403 (not an admin) |
| 9 | GET | `/api/v1/categories` | List menu categories | 200 | 400 (invalid query parameter) |
| 10 | POST | `/api/v1/orders` | Place a new order | 201 | 422 (invalid items or quantity) |
| 11 | GET | `/api/v1/orders?status=pending` | List the caller's orders (all orders for admin) | 200 | 401 (not authenticated) |
| 12 | GET | `/api/v1/orders/{orderId}` | Get one order's details | 200 | 404 (order not found) |
| 13 | PATCH | `/api/v1/orders/{orderId}` | Change order status, including cancelling | 200 | 409 (invalid status change) |
| 14 | POST | `/api/v1/orders/{orderId}/payments` | Record a payment for an order | 201 | 409 (order already paid) |
| 15 | GET | `/api/v1/orders/{orderId}/payments` | List payments for an order | 200 | 404 (order not found) |
| 16 | POST | `/api/v1/customers` | Register a customer account | 201 | 409 (email already registered) |
| 17 | GET | `/api/v1/customers/me` | Get the signed-in customer's profile | 200 | 401 (token missing or expired) |
| 18 | POST | `/api/v1/sessions` | Log in (creates a session) | 201 | 401 (wrong credentials) |
| 19 | DELETE | `/api/v1/sessions/current` | Log out (ends the current session) | 204 | 401 (not authenticated) |
