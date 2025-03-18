import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { getData, postData } from "../../helpers/requests";
import { USERS_ENDPOINTS } from "../../utils/routes";
import { validateZodSchema } from "../../helpers/zodValidator";
import { loginSchema } from "../../schemas/entities/login";
import { userSchema } from "../../schemas/entities/user";
import { LoginFormData } from "../../schemas/forms/login";
import { RegisterFormData } from "../../schemas/forms/register";
import { useAppStore } from "../../store";

const register = async (data: RegisterFormData) => {
    const endpoint = USERS_ENDPOINTS.register();

    return await postData({ endpoint, data });
};

export const useRegisterUser = () => {
    const navigate = useNavigate();

    const { mutateAsync, isPending, ...rest } = useMutation({
        mutationFn: (data: RegisterFormData) => register(data),
        onMutate: () => toast.loading("Registering...", { id: "loading" }),
        onSuccess: () => {
            toast.success("Registered successfully");

            navigate("/login");
        },
        onError: (error: AxiosError) => {
            if (error.response?.status === 409) {
                toast.error("Email already exists");
            } else {
                toast.error("Registration failed. Please try again.");
            }
        },
        onSettled: () => toast.dismiss("loading"),
    });

    return { registerUser: mutateAsync, isRegistering: isPending, ...rest };
};

const login = async (data: LoginFormData) => {
    const endpoint = USERS_ENDPOINTS.login();
    const response = await postData({ endpoint, data });

    const validation = validateZodSchema(loginSchema, response);

    if (!validation.success) {
        console.error(validation.error.message);

        throw new Error("Data validation failed in 'login'");
    }

    return validation.data;
};

export const useLogin = () => {
    const { setUser } = useAppStore();

    const { mutateAsync, isPending, ...rest } = useMutation({
        mutationFn: (data: LoginFormData) => login(data),
        onMutate: () => toast.loading("Logging in...", { id: "loading" }),
        onSuccess: (data) => {
            toast.success("Logged in successfully");

            localStorage.setItem("token", data.token);
            setUser(data.user);
        },
        onError: () => toast.error("Login failed. Please try again."),
        onSettled: () => toast.dismiss("loading"),
    });

    return { login: mutateAsync, isLoggingIn: isPending, ...rest };
};

const getAllUsers = async () => {
    const endpoint = USERS_ENDPOINTS.get_all();
    const token = localStorage.getItem("token");

    if (!token) return;

    const response = await getData({ endpoint, token });

    const validation = validateZodSchema(userSchema.array(), response.users);

    if (!validation.success) {
        console.error(validation.error.message);

        throw new Error("Data validation failed in 'getAllUsers'");
    }

    return validation.data;
};

export const useGetAllUsers = () => {
    const { data, ...rest } = useQuery({
        queryKey: ["users"],
        queryFn: getAllUsers,
    });

    return { users: data || [], ...rest };
};
