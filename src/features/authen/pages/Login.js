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
import API from "../../../config/API.js"
import { useNavigate } from "react-router-dom"
import { cookiesUtil } from "../../../utilities/cookiesUtils"
import { GoogleOutlined } from "@ant-design/icons"

export default function Login() {
  const navigate = useNavigate()

  const callAPISendSignIn = (value) => {
    axios
      .post(API.API_ROUTE + "/user/login", { ...value })
      .then((data) => {
        if (!data.data.success) throw Error("Login failed")
        message.success("Login success!!", 1)
        cookiesUtil.set("_jwt", data.data.token)
        navigate("/")
      })
      .catch((err) => {
        console.log("err", err)
        message.error("Login failed!!", 1)
      })
  }
  const onFinish = (values) => {
    console.log(values)
    callAPISendSignIn(values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo)
  }
  return (
    <div className="page-content-container font-main h-[calc(100%-32px)] overflow-y-hidden">
      <div className=" h-[100%] overflow-x-hidden overflow-y-auto">
        <Row gutter={16} className="h-[100%]">
          <Col span={0} lg={16}>
            <img
              src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80"
              className="h-[100%] w-[100%] object-cover border-[1px] rounded-[4px]"
            ></img>
          </Col>
          <Col span={24} lg={8}>
            <div className="mx-[40px] h-[100%] flex flex-col justify-center">
              <Typography className="mt-[36px] text-[24px] font-[600] mb-[14px]">
                Welcome to P2Tunes!
              </Typography>
              <Typography className="text-[15px] mb-[28px]">
                Please sign-in to your account and start the adventure
              </Typography>
              <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    { required: true, message: "Please input your username!" }
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" }
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <div className="flex justify-between mb-[16px]">
                  <Form.Item
                    name="remember"
                    valuePropName="checked"
                    noStyle
                    className="float-left"
                  >
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>

                  <a className="login-form-forgot float-right" href="">
                    Forgot password
                  </a>
                </div>
                <div className="mb-[24px]">
                  <Button type="primary" htmlType="submit" className="w-[100%]">
                    Login
                  </Button>
                </div>
                <Divider plain>or</Divider>
                <Button
                  className="w-[100%] mb-[20px]"
                  icon={<GoogleOutlined className="mt-[-4px]" />}
                >
                  Continue with Google
                </Button>
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
