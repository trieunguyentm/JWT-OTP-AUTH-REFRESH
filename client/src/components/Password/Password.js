import React from "react"
import { Button, Divider, Paper } from "@mui/material"
import { useForm } from "react-hook-form"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import "./Password.css"

const Password = () => {
  // Khai báo useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
    },
    mode: "onChange",
  })

  return (
    <div className="login-container">
      <Paper elevation={10} style={{ borderRadius: "20px", width: "400px" }}>
        {/* Title Page */}
        <div className="login-title">
          <AccountCircleIcon style={{ fontSize: "50px" }} />
        </div>
        {/* Form Page */}
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <div className="login-form">
            {/* Input Password */}
            <div className="login-form-password">
              <input
                type="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Vui lòng điền thông tin đăng nhập",
                  },
                })}
                style={{ width: "180px" }}
                className="password"
                placeholder="Nhập mật khẩu"
              />
            </div>
            <div className="error-password">{errors.password?.message}</div>
            {/* Button Login */}
            <div className="btn-submit-password-container">
              <Button
                type="submit"
                variant="contained"
                className="btn-submit-password"
              >
                Đăng nhập
              </Button>
            </div>
          </div>
        </form>
        <Divider />
        {/* If return Password */}
        <div className="return">
          <span>Quay lại trang đăng nhập - </span>
          <a href="/" style={{ textDecoration: "underline" }}>
            Ấn vào đây
          </a>
        </div>
        {/* If forgot password create link recovery */}
      </Paper>
    </div>
  )
}

export default Password
