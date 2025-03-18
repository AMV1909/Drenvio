// TP
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

// BL
import {
    RegisterFormData,
    registerFormSchema,
} from "../../../lib/schemas/forms/register";
import { useRegisterUser } from "../../../lib/hooks/queries/useQueryUsers";

// UI
import { Button } from "../../atoms/Buttons/Button";
import { InputWithLabel } from "../../molecules/Inputs/InputWithLabel";

export function RegisterForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerFormSchema),
    });

    const { registerUser, isRegistering } = useRegisterUser();

    const onSubmit = async (data: RegisterFormData) => {
        await registerUser(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mx-4 flex w-[500px] max-w-full flex-col gap-2"
        >
            <h1 className="text-center">Register</h1>

            <InputWithLabel
                label="Name"
                {...register("name")}
                errorMessage={errors.name?.message}
            />

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

            <Button type="submit" className="mt-8" disabled={isRegistering}>
                Register
            </Button>

            <hr />

            <div className="flex items-center justify-center gap-2">
                <p>Do you have an account?</p>

                <Link to="/login" className="text-sm font-bold hover:underline">
                    Login
                </Link>
            </div>
        </form>
    );
}
