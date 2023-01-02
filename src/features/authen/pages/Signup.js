import React, { useState } from "react"
import {
  Typography,
  Button,
  Form,
  Input,
  Checkbox,
  Divider,
  Col,
  Row,
  message
} from "antd"
import { post } from "../../../api/axios"
import { NavLink, useNavigate } from "react-router-dom"
import { cookiesUtil } from "../../../utilities/cookiesUtils"
import { GoogleOutlined } from "@ant-design/icons"
import URL from "../../../api/config"
import {
  REGEX_INVALID_CHAR,
  REGEX_INVALID_EMAIL,
  REGEX_INVALID_FULLNAME
} from "../../../constant/index.js"
export default function Signup() {
  const navigate = useNavigate()
  const [isSendRequest, setIsSendRequest] = useState(false)

  const onFinish = (values) => {
    console.log(values)
    if (values.repeatPassword !== values.password) {
      message.error("Mật khẩu và mật khẩu nhập lại chưa đúng")
      return
    }
    setIsSendRequest(true)
    post(URL.URL_SIGN_UP, values)
      .then((res) => {
        if (res.data.success) {
          navigate("/sign-otp/" + values.email)
        } else {
          message.error(res.data.errorMessage)
        }
      })
      .catch((err) => {
        console.log("err", err)
      })
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo)
  }

  return (
    <div className="page-content-container font-main h-[calc(100%-32px)] overflow-y-auto mx-[12px]">
      <div className="overflow-x-hidden overflow-y-auto">
        <Row gutter={16} className="h-[100%] overflow-y-hidden">
          <Col span={0} lg={16}>
            <div className="bg-[url('https://media.istockphoto.com/vectors/simple-hand-drawn-notes-and-musical-clef-in-doodle-style-vector-id1269332201?k=20&m=1269332201&s=612x612&w=0&h=j_--Q-8XPzVgUb0BYImhu0URryiV7wM_g_6tnFjtEQw=')] h-[100%] w-[100%] object-contain rounded-[4px]"></div>
          </Col>
          <Col span={24} lg={8} className="overflow-y-auto">
            <div className="mx-[40px] h-[100%] flex flex-col justify-center overflow-y-auto">
              <Typography className="mt-[36px] text-[24px] font-[600] mb-[14px]">
                Chào mừng đến với P2Tunes!
              </Typography>
              <Typography className="text-[15px] mb-[28px]">
                Hành trình trải nghiệm bắt đầu tại đây!
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
                  label="Tên đăng nhập"
                  name="username"
                  rules={[
                    {
                      require: true,
                      pattern: /^[\d,\w,@]{8,50}$/,
                      message:
                        "Tên đăng nhập phải dài hơn 8 ký tự và nhỏ hơn 50 ký tự. Không chứa ký tự đặc biệt nào ngoài @"
                    }
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  labelCol={{ span: 24 }}
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      pattern: REGEX_INVALID_EMAIL,
                      message: "Email không hợp lệ"
                    }
                  ]}
                >
                  <div className="flex">
                    <Input />
                  </div>
                </Form.Item>

                <Form.Item
                  labelCol={{ span: 24 }}
                  label="Họ và tên"
                  name="name"
                  rules={[
                    {
                      required: true,
                      pattern: REGEX_INVALID_FULLNAME,
                      message:
                        "Tên không được để trống, chứa số hay ký tự đặc biệt!"
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  labelCol={{ span: 24 }}
                  label="Mật khẩu"
                  name="password"
                  rules={[
                    {
                      required: true,
                      pattern: /^.{8,50}$/,
                      message:
                        "Mật khẩu không được để trống, phải dài hơn 8 ký tự và ngắn hơn 50 ký tự"
                    }
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  labelCol={{ span: 24 }}
                  label="Nhập lại mật khẩu"
                  name="repeatPassword"
                  rules={[
                    {
                      required: true,
                      message:
                        "Mật khẩu xác nhận không được để trống, phải dài hơn 8 ký tự và ngắn hơn 50 ký tự"
                    }
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <div className="my-[16px]">
                  <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                      {
                        validator: (_, value) =>
                          value
                            ? Promise.resolve()
                            : Promise.reject(
                                new Error("Bạn phải đồng ý để tiếp tục")
                              )
                      }
                    ]}
                    // {...tailFormItemLayout}
                  >
                    <Checkbox>
                      Tôi đã đọc và đồng ý với các{" "}
                      <a href="/agreement" target="_blank">
                        điều khoản
                      </a>
                    </Checkbox>
                  </Form.Item>
                </div>

                <div className="mb-[24px]">
                  <Button
                    disabled={setIsSendRequest}
                    type="primary"
                    htmlType="submit"
                    className="w-[100%]"
                  >
                    Đăng ký
                  </Button>
                </div>
                <p className="text-[14px]">
                  Bạn đã có tài khoản? <NavLink to="/login">Đăng nhập</NavLink>
                </p>
                {/* <Divider plain>or</Divider>
                <Button
                  className="w-[100%] mb-[20px]"
                  icon={<GoogleOutlined className="mt-[-4px]" />}
                >
                  Continue with Google
                </Button> */}
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
