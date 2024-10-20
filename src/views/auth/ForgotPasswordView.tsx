import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { ForgotPasswordForm } from "../../types";
import ErrorMessage from "@/components/ErrorMessage";
import { forgotPassword } from "@/api/AuthApi";
import { toast } from "react-toastify";

export default function ForgotPasswordView() {
  const initialValues: ForgotPasswordForm = {
    email: ''
  }
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: forgotPassword,
    onError: (error) => {
      toast.error(error.message)
      reset()
    },
    onSuccess: (data) => {
      toast.success(data)
      reset()
    }
  })
  
  const handleForgotPassword = (formData: ForgotPasswordForm) => mutate(formData)


  return (
    <>
      <h1 className="text-5xl font-black text-white">Reestablecer Contraseña</h1>
      <p className="text-2xl font-light text-white mt-5">
        ¿Olvidaste tu contraseña? coloca tu email{''}
        <span className=" text-fuchsia-500 font-bold"> y reestablece tu contraseña</span>
      </p>

      <form
        onSubmit={handleSubmit(handleForgotPassword)}
        className="space-y-8 p-10 mt-10 bg-white"
        noValidate
      >
        <div className="flex flex-col gap-5">
          <label
            className="font-normal text-2xl"
            htmlFor="email"
          >Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full p-3  border-gray-300 border"
            {...register("email", {
              required: "El Email de registro es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
          />
          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value='Enviar Instrucciones'
          className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <p className="text-center text-gray-300 font-normal">¿Ya tienes cuenta?
            <Link 
                to={'/auth/login'}
                className="ml-2 text-fuchsia-500 hover:text-fuchsia-600 hover:cursor-pointer transition-colors font-bold"
            >
                Iniciar Sesión
            </Link>
          </p>

        <p className="text-center text-gray-300 font-normal">¿No tienes cuenta?
            <Link 
                to={'/auth/register'}
                className="ml-2 text-fuchsia-500 hover:text-fuchsia-600 hover:cursor-pointer transition-colors font-bold"
            >
                Crear una
            </Link>
          </p>
      </nav>
    </>
  )
}