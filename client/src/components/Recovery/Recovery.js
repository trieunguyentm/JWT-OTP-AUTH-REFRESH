import React from "react"
import { Button, Divider, Paper } from "@mui/material"
import { useForm } from "react-hook-form"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import "./Recovery.css"

const Recovery = () => {
  // Khai báo useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      gmail: "",
    },
    mode: "onChange",
  })

  return (
    <div className="recovery-container">
      <Paper elevation={10} style={{ borderRadius: "20px", width: "400px" }}>
        {/* Title Page */}
        <div className="recovery-title">
          <AccountCircleIcon style={{ fontSize: "50px" }} />
        </div>
        {/* Form Page */}
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <div className="recovery-form">
            {/* Input gmail */}
            <div className="recovery-form-gmail">
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
                placeholder="Nhập địa chỉ gmail "
              />
            </div>
            <div className="error-gmail">{errors.gmail?.message}</div>
            {/* Button submit */}
            <div className="btn-submit-gmail-container">
              <Button
                type="submit"
                variant="contained"
                className="btn-submit-gmail"
              >
                Lấy lại mật khẩu
              </Button>
            </div>
          </div>
        </form>
        <Divider />
        <div className="return-login">
          <span>Quay lại trang đăng nhập - </span>
          <a href="/" style={{ textDecoration: "underline" }}>
            Tại đây
          </a>
        </div>
      </Paper>
    </div>
  )
}

export default Recovery
