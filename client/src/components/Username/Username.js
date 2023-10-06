import React from "react"
import { Button, Divider, Paper } from "@mui/material"
import { useForm } from "react-hook-form"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import "./Username.css"

const Username = () => {
  // Khai báo useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
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
            {/* Input Username */}
            <div className="login-form-username">
              <input
                {...register("username", {
                  required: {
                    value: true,
                    message: "Vui lòng điền thông tin đăng nhập",
                  },
                })}
                style={{ width: "180px" }}
                className="username"
                placeholder="Nhập tên đăng nhập "
              />
            </div>
            <div className="error-username">{errors.username?.message}</div>
            {/* Button Login */}
            <div className="btn-submit-username-container">
              <Button
                type="submit"
                variant="contained"
                className="btn-submit-username"
              >
                Đăng nhập
              </Button>
            </div>
          </div>
        </form>
        <Divider />
        {/* If no account create link register */}
        <div className="no-account">
          <span>Nếu chưa có tài khoản - </span>
          <a href="/register" style={{ textDecoration: "underline" }}>
            Đăng ký tại đây
          </a>
        </div>
        {/* If forgot password create link recovery */}
        <div className="forgot-password">
          <span>Quên mật khẩu - </span>
          <a href="/recovery" style={{ textDecoration: "underline" }}>
            Khôi phục tài khoản
          </a>
        </div>
      </Paper>
    </div>
  )
}

export default Username
