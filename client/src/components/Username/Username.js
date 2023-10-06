import React from "react"
import { Button, Divider, Paper } from "@mui/material"
import "./Username.css"

const Username = () => {
  return (
    <div className="login-container">
      <Paper elevation={10}>
        <div className="login-title">Đăng nhập</div>
        <form>
          <div className="login-form">
            <label className="label-username" htmlFor="username">
              Tên đăng nhập:
            </label>

            <input
              className="username"
              id="username"
              name="username"
              placeholder="Nhập tên đăng nhập "
            />

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

        <div className="no-account">
          <span>Nếu chưa có tài khoản - </span>
          <a href="/register" style={{ textDecoration: "underline" }}>
            Đăng ký tại đây
          </a>
        </div>

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
