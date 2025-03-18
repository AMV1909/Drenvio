export const USERS_ENDPOINTS = {
    get_all: () => "/api/users",
    register: () => "/api/users/register",
    login: () => "/api/users/login",
};

export const PRODUCTS_ENDPOINTS = {
    get_all: () => "/api/products",
};

export const SPECIAL_PRICES_ENDPOINTS = {
    get_all: () => "/api/special-prices",
    create: () => "/api/special-prices",
    update: (id: string) => `/api/special-prices/${id}`,
    delete: (id: string) => `/api/special-prices/${id}`,
};
