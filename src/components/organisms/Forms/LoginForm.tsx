// TP
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

// BL
import {
    LoginFormData,
    loginFormSchema,
} from "../../../lib/schemas/forms/login";
import { useLogin } from "../../../lib/hooks/queries/useQueryUsers";

// UI
import { Button } from "../../atoms/Buttons/Button";
import { InputWithLabel } from "../../molecules/Inputs/InputWithLabel";

export function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginFormSchema),
    });

    const { login, isLoggingIn } = useLogin();

    const onSubmit = async (data: LoginFormData) => {
        await login(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-4 flex w-[500px] max-w-full flex-col gap-2"
        >
            <h1 className="text-center">Login</h1>

            <InputWithLabel
                label="Email"
                {...register("email")}
                errorMessage={errors.email?.message}
            />

            <InputWithLabel
                type="password"
                label="Password"
                {...register("password")}
                errorMessage={errors.password?.message}
            />

            <Button type="submit" className="mt-8" disabled={isLoggingIn}>
                Login
            </Button>

            <hr />

            <div className="flex items-center justify-center gap-2">
                <p>Don't you have an account?</p>

                <Link
                    to="/register"
                    className="text-sm font-bold hover:underline"
                >
                    Register
                </Link>
            </div>
        </form>
    );
}
