import React from "react"
import { Button, Divider, Paper } from "@mui/material"
import { useForm } from "react-hook-form"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import "./Register.css"

const Username = () => {
  // Khai báo useForm
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      name: "",
      phone: "",
      address: "",
      gmail: "",
    },
    mode: "onChange",
  })

  const checkConfirmPassword = (value) => value === watch("password")

  return (
    <div className="register-container">
      <Paper elevation={10} style={{ borderRadius: "20px", width: "400px" }}>
        {/* Title Page */}
        <div className="register-title">
          <AccountCircleIcon style={{ fontSize: "50px" }} />
        </div>
        {/* Form Page */}
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <div className="register-form">
            {/* Input Username */}
            <div className="register-form-field">
              <input
                {...register("username", {
                  required: {
                    value: true,
                    message: "Vui lòng điền thông tin",
                  },
                })}
                style={{ width: "180px" }}
                className="username"
                placeholder="Nhập tên đăng nhập "
              />
            </div>
            <div className="error-field">{errors.username?.message}</div>
            {/* Input Password */}
            <div className="register-form-field">
              <input
                type="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Vui lòng điền thông tin",
                  },
                  minLength: {
                    value: 6,
                    message: "Mật khẩu cần có độ dài tối thiếu 6 ký tự",
                  },
                })}
                style={{ width: "180px" }}
                className="password"
                placeholder="Nhập mật khẩu "
              />
            </div>
            <div className="error-field">{errors.password?.message}</div>
            {/* Input confirm Password */}
            <div className="register-form-field">
              <input
                type="password"
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "Vui lòng điền thông tin",
                  },
                  validate: (value) =>
                    checkConfirmPassword(value) ||
                    "Mật khẩu xác nhận không chính xác",
                })}
                style={{ width: "180px" }}
                className="confirm-password"
                placeholder="Xác nhận mật khẩu "
              />
            </div>
            <div className="error-field">{errors.confirmPassword?.message}</div>
            {/* Input Name */}
            <div className="register-form-field">
              <input
                {...register("name", {
                  required: {
                    value: true,
                    message: "Vui lòng điền thông tin",
                  },
                })}
                style={{ width: "180px" }}
                className="name"
                placeholder="Nhập tên người dùng "
              />
            </div>
            <div className="error-field">{errors.name?.message}</div>
            {/* Input phone */}
            <div className="register-form-field">
              <input
                {...register("phone", {
                  required: {
                    value: true,
                    message: "Vui lòng điền thông tin",
                  },
                })}
                style={{ width: "180px" }}
                className="phone"
                placeholder="Nhập số điện thoại "
              />
            </div>
            <div className="error-field">{errors.phone?.message}</div>
            {/* Input address */}
            <div className="register-form-field">
              <input
                {...register("address", {
                  required: {
                    value: true,
                    message: "Vui lòng điền thông tin",
                  },
                })}
                style={{ width: "180px" }}
                className="address"
                placeholder="Nhập địa chỉ của bạn "
              />
            </div>
            <div className="error-field">{errors.address?.message}</div>
            {/* Input gmail */}
            <div className="register-form-field">
              <input
                type="email"
                {...register("gmail", {
                  required: {
                    value: true,
                    message: "Vui lòng điền thông tin",
                  },
                })}
                style={{ width: "180px" }}
                className="gmail"
                placeholder="Nhập gmail của bạn "
              />
            </div>
            <div className="error-field">{errors.gmail?.message}</div>
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
