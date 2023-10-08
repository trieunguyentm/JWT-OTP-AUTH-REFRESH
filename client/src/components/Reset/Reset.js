import React from "react"
import { Button, Paper } from "@mui/material"
import { useForm } from "react-hook-form"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import "./Reset.css"

const Reset = () => {
  // Khai báo useForm
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    mode: "onChange",
  })

  const checkNewPassword = (value) => value === watch("newPassword")

  return (
    <div className="reset-container">
      <Paper elevation={10} style={{ borderRadius: "20px", width: "400px" }}>
        {/* Title Page */}
        <div className="reset-title">
          <AccountCircleIcon style={{ fontSize: "50px" }} />
        </div>
        {/* Form Page */}
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <div className="reset-form">
            {/* Input newpassword */}
            <div className="reset-form-info">
              <input
                type="password"
                {...register("newPassword", {
                  required: {
                    value: true,
                    message: "Vui lòng điền thông tin",
                  },
                  minLength: {
                    value: 6,
                    message: "Mật khẩu mới tối thiếu 6 ký tự",
                  },
                })}
                style={{ width: "180px" }}
                className="new-password"
                placeholder="Nhập mật khẩu mới "
              />
            </div>
            <div className="error-field">{errors.newPassword?.message}</div>
            {/* Input confirm new password */}
            <div className="reset-form-info">
              <input
                type="password"
                {...register("confirmNewPassword", {
                  required: {
                    value: true,
                    message: "Vui lòng điền thông tin",
                  },
                  validate: (value) =>
                    checkNewPassword(value) || "Mật khẩu xác nhận không hợp lệ",
                })}
                style={{ width: "180px" }}
                className="confirm-new-password"
                placeholder="Xác nhận mật khẩu"
              />
            </div>
            <div className="error-field">
              {errors.confirmNewPassword?.message}
            </div>
            {/* Button Reset */}
            <div className="btn-submit-reset-container">
              <Button
                type="submit"
                variant="contained"
                className="btn-submit-reset"
              >
                Thay đổi mật khẩu
              </Button>
            </div>
          </div>
        </form>
      </Paper>
    </div>
  )
}

export default Reset
