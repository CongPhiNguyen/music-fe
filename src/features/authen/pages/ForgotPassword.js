import React from "react"
import {
  Typography,
  Button,
  Form,
  Input,
  message,
  Checkbox,
  Divider,
  Col,
  Row
} from "antd"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { cookiesUtil } from "../../../utilities/cookiesUtils"
import { GoogleOutlined } from "@ant-design/icons"

export default function Login() {
  const navigate = useNavigate()

  const onFinish = (values) => {
    console.log(values)
    navigate("/reset-password")
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo)
  }
  return (
    <div className="page-content-container font-main h-[calc(100%-32px)] overflow-y-hidden">
      <div className=" h-[100%] overflow-x-hidden overflow-y-auto">
        <Row gutter={16} className="h-[100%]">
          <Col span={0} lg={16}>
            <div className="bg-[url('https://media.istockphoto.com/vectors/simple-hand-drawn-notes-and-musical-clef-in-doodle-style-vector-id1269332201?k=20&m=1269332201&s=612x612&w=0&h=j_--Q-8XPzVgUb0BYImhu0URryiV7wM_g_6tnFjtEQw=')] h-[100%] w-[100%] object-contain rounded-[4px]"></div>
          </Col>
          <Col span={24} lg={8}>
            <div className="mx-[40px] h-[100%] flex flex-col justify-center">
              <Typography className="mt-[36px] text-[24px] font-[600] mb-[14px]">
                Quên mật khẩu?
              </Typography>
              <Typography className="text-[15px] mb-[28px]">
                Nhập email của bạn và mã OTP được gửi về để tiếp tục
              </Typography>
              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  labelCol={{ span: 24 }}
                  label="Tên đăng nhập hoặc mật khẩu"
                  name="findString"
                  rules={[
                    {
                      required: true,
                      message: "Tên đăng nhập hoặc mật khẩu không được để trống"
                    }
                  ]}
                >
                  <div className="flex">
                    <Input />
                    <Button type="primary">Gửi OTP</Button>
                  </div>
                </Form.Item>

                <Form.Item
                  labelCol={{ span: 24 }}
                  label="OTP"
                  name="otp"
                  rules={[
                    { required: true, message: "Mã OTP không được để trống" }
                  ]}
                >
                  <Input className="w-[calc(100%-40px)]" />
                </Form.Item>

                <div className="text-center mb-[16px]">
                  <p
                    className="cursor-pointer text-[blue] hover:opacity-60"
                    onClick={() => navigate("/login")}
                  >
                    &lsaquo; Trở về đăng nhập
                  </p>
                </div>
                <div className="mb-[24px]">
                  <Button type="primary" htmlType="submit" className="w-[100%]">
                    Tiếp tục
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
        {/* <div className="flex-2 overflow-hidden hidden lg:block h-[420px]"></div>
        <div className="main-content flex-1 min-w-[340px] "></div> */}
      </div>
    </div>
  )
}
