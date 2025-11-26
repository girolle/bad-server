import { IS_RATE_LIMITED } from "../config"

interface RouteConfig {
    path: string
    rateLimited: boolean
}

export const routesConfig: Record<string, RouteConfig> = {
    // Маршруты продуктов
    Products: {
        path: '/products',
        rateLimited: IS_RATE_LIMITED,
    },
    ProductById: {
        path: '/products/:productId',
        rateLimited: IS_RATE_LIMITED,
    },
    // Маршруты авторизации
    Auth: {
        path: '/auth',
        rateLimited: IS_RATE_LIMITED,
    },
    AuthUser: {
        path: '/auth/user',
        rateLimited: IS_RATE_LIMITED,
    },
    AuthMe: {
        path: '/auth/me',
        rateLimited: IS_RATE_LIMITED,
    },
    AuthRoles: {
        path: '/auth/user/roles',
        rateLimited: IS_RATE_LIMITED,
    },
    AuthLogin: {
        path: '/auth/login',
        rateLimited: IS_RATE_LIMITED,
    },
    AuthToken: {
        path: '/auth/token',
        rateLimited: IS_RATE_LIMITED,
    },
    AuthLogout: {
        path: '/auth/logout',
        rateLimited: IS_RATE_LIMITED,
    },
    AuthRegister: {
        path: '/auth/register',
        rateLimited: IS_RATE_LIMITED,
    },
    // Маршруты заказов
    Orders: {
        path: '/orders',
        rateLimited: IS_RATE_LIMITED,
    },
    OrdersAll: {
        path: '/orders/all',
        rateLimited: IS_RATE_LIMITED,
    },
    OrdersAllMe: {
        path: '/orders/all/me',
        rateLimited: IS_RATE_LIMITED,
    },
    OrderByNumber: {
        path: '/orders/:orderNumber',
        rateLimited: IS_RATE_LIMITED,
    },
    OrderMeByNumber: {
        path: '/orders/me/:orderNumber',
        rateLimited: IS_RATE_LIMITED,
    },
    OrderById: {
        path: '/orders/:id',
        rateLimited: IS_RATE_LIMITED,
    },
    // Маршруты покупателей
    Customers: {
        path: '/customers',
        rateLimited: IS_RATE_LIMITED,
    },
    CustomerById: {
        path: '/customers/:id',
        rateLimited: IS_RATE_LIMITED,
    },
    // Маршруты для файлов
    Upload: {
        path: '/upload',
        rateLimited: IS_RATE_LIMITED,
    },
} as const
