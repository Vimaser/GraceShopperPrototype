// api/index.js
const BASE_URL = "http://localhost:3001/api/users";
const PRODUCTS_BASE_URL = "http://localhost:3001/api/products"; 
const ORDERS_BASE_URL = "http://localhost:3001/api/orders"; 

/* Will need the endpoints for reviews, cart, and ! */

// Register a new user
export const registerUser = async (username, password) => {
    try {
        const response = await fetch(`${BASE_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
};

// Login a user
export const loginUser = async (username, password) => {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
};

// Fetch current user's info
export const fetchCurrentUser = async (token) => {
    try {
        const response = await fetch(`${BASE_URL}/me`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error("Error fetching current user:", error);
        throw error;
    }
};

// Fetch a user's checkout details
export const fetchUserCheckout = async (username, token) => {
    try {
        const response = await fetch(`${BASE_URL}/${username}/checkout`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error("Error fetching user checkout:", error);
        throw error;
    }
};

// Fetch all products
export const fetchAllProducts = async () => {
    try {
        const response = await fetch(PRODUCTS_BASE_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching all products:", error);
        throw error;
    }
};

// Add a new product (admin action)
export const addProduct = async (product, token) => {
    try {
        const response = await fetch(PRODUCTS_BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(product),
        });
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error("Error adding product:", error);
        throw error;
    }
};

// Update a product (admin action)
export const updateProductById = async (id, updatedProduct, token) => {
    try {
        const response = await fetch(`${PRODUCTS_BASE_URL}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(updatedProduct),
        });
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
};

// Delete a product (admin action)
export const deleteProductById = async (id, token) => {
    try {
        const response = await fetch(`${PRODUCTS_BASE_URL}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });
        if (response.ok) {
            return await response.json();
        } else {
            const data = await response.json();
            throw new Error(data.message);
        }
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
};

// Fetch all orders
export const fetchAllOrders = async () => {
    try {
        const response = await fetch(ORDERS_BASE_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching all orders:", error);
        throw error;
    }
};

// Create a new order
export const createNewOrder = async (order) => {
    try {
        const response = await fetch(ORDERS_BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(order),
        });
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.error);
        }
    } catch (error) {
        console.error("Error creating order:", error);
        throw error;
    }
};

// Update an order by ID
export const updateOrderById = async (orderId, totalAmount) => {
    try {
        const response = await fetch(`${ORDERS_BASE_URL}/${orderId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ totalAmount }),
        });
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.error);
        }
    } catch (error) {
        console.error("Error updating order:", error);
        throw error;
    }
};

// Delete an order by ID
export const deleteOrderById = async (orderId) => {
    try {
        const response = await fetch(`${ORDERS_BASE_URL}/${orderId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            return await response.json();
        } else {
            const data = await response.json();
            throw new Error(data.error);
        }
    } catch (error) {
        console.error("Error deleting order:", error);
        throw error;
    }
};


async function fetchWithErrors(endpoint, options) {
    const response = await fetch(endpoint, options);
    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || response.statusText);
    }
    return response.json();
}

// Create a new cart
export async function createCart({userId, guestId}) {
    return await fetchWithErrors(`${BASE_URL}/carts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, guestId })
    });
}

// Add an item to the cart
export async function addItemToCart({userId, cartId, productId, quantity}) {
    return await fetchWithErrors(`${BASE_URL}/carts/${cartId}/items`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, productId, quantity })
    });
}

// Update cart item quantity
export async function updateCartItemQuantity(userId, cartItemId, newQuantity) {
    return await fetchWithErrors(`${BASE_URL}/carts/items/${cartItemId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, newQuantity })
    });
}

// Remove an item from the cart
export async function removeItemFromCart(userId, cartItemId) {
    return await fetchWithErrors(`${BASE_URL}/carts/items/${cartItemId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId })
    });
}

// Get cart by user ID
export async function getCartByUserId(userId) {
    return await fetchWithErrors(`${BASE_URL}/carts/user/${userId}`);
}

// Get all cart items by cart ID
export async function getCartItemsByCartId(cartId) {
    return await fetchWithErrors(`${BASE_URL}/carts/${cartId}/items`);
}

// In ../api/index.js or wherever your API functions are located

export const searchProducts = async (query) => {
    // Make a request to your backend, possibly using fetch
    const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: query })
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
};

async function fetchReviewsByProductId(productId) {
    const response = await fetch(`/api/reviews/${productId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch reviews for product.');
    }
    return await response.json();
}

async function postReview(reviewData) {
    const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
    });

    if (!response.ok) {
        throw new Error('Failed to post review.');
    }
    return await response.json();
}

async function fetchAllReviews() {
    const response = await fetch('/api/reviews');
    if (!response.ok) {
        throw new Error('Failed to fetch all reviews.');
    }
    return await response.json();
}

export {
    fetchReviewsByProductId,
    postReview,
    fetchAllReviews
};
