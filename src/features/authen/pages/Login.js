import React, { useState } from "react"
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
import { NavLink, useNavigate } from "react-router-dom"
import { cookiesUtil } from "../../../utilities/cookiesUtils"
import { GoogleOutlined } from "@ant-design/icons"
import { post } from "../../../api/axios.js"
import URL from "../../../api/config.js"
import { handleLogin } from "../authenSlice"
import { useDispatch } from "react-redux"
export default function Login() {
  const navigate = useNavigate()
  const [isVerifiedAccount, setIsVerifiedAccount] = useState(true)
  const dispatch = useDispatch()
  const callAPISendSignIn = (value) => {
    // axios
    //   .post(API.API_ROUTE + "/user/login", { ...value })
    //   .then((data) => {
    //     if (!data.data.success) throw Error("Login failed")
    //     message.success("Login success!!", 1)
    //     cookiesUtil.set("_jwt", data.data.token)
    //     navigate("/")
    //   })
    //   .catch((err) => {
    //     console.log("err", err)
    //     message.error("Login failed!!", 1)
    //   })
    post(URL.URL_SIGN_IN, value)
      .then((data) => {
        if (data?.data?.success) {
          message.success("Sign in successfully")
          cookiesUtil.setAccessToken(data?.data?.jwt)
          dispatch(handleLogin({ info: data?.data?.data }))
          navigate("/home")
        } else {
          if (data?.data?.message === "You account is not verified") {
            setIsVerifiedAccount(false)
          }
          message.error(data?.data?.message)
        }
      })
      .catch((err) => {
        console.log("err", err)
      })
  }
  const onFinish = (values) => {
    callAPISendSignIn(values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo)
  }
  return (
    <div className="page-content-container font-main h-[calc(100%-32px)] overflow-y-hidden">
      <div className=" h-[100%] overflow-x-hidden">
        <Row gutter={16} className="h-[100%] overflow-y-hidden">
          <Col span={0} lg={16}>
            <div className="bg-[url('https://media.istockphoto.com/vectors/simple-hand-drawn-notes-and-musical-clef-in-doodle-style-vector-id1269332201?k=20&m=1269332201&s=612x612&w=0&h=j_--Q-8XPzVgUb0BYImhu0URryiV7wM_g_6tnFjtEQw=')] h-[100%] w-[100%] object-contain rounded-[4px]"></div>
          </Col>
          <Col span={24} lg={8}>
            <div className="mx-[40px] h-[100%] flex flex-col justify-center">
              <Typography className="mt-[36px] text-[24px] font-[600] mb-[14px]">
                Ch??o m???ng ?????n v???i P2Tunes!
              </Typography>
              <Typography className="text-[15px] mb-[28px]">
                ????ng nh???p v?? b???t ?????u h??nh tr??nh kh??m ph??
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
                  label="T??n ????ng nh???p"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "T??n ????ng nh???p kh??ng ???????c ????? tr???ng."
                    }
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  labelCol={{ span: 24 }}
                  label="M???t kh???u"
                  name="password"
                  rules={[
                    { required: true, message: "M???t kh???u kh??ng ???????c ????? tr???ng" }
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                {!isVerifiedAccount && (
                  <span className="text-[11px] mt-[-12px] text-[red]">
                    *T??i kho???n c???a b???n ch??a ???????c x??c th???c.
                    <span
                      onClick={() => {
                        navigate("/sign-otp")
                      }}
                      className="text-[blue] hover:opacity-60 ml-[2px] cursor-pointer"
                    >
                      X??c th???c
                    </span>{" "}
                    t??i kho???n
                  </span>
                )}

                <div className="flex justify-between mb-[16px]">
                  <Form.Item
                    name="remember"
                    valuePropName="checked"
                    noStyle
                    className="float-left"
                  >
                    <Checkbox>Ghi nh??? ????ng nh???p</Checkbox>
                  </Form.Item>

                  <p
                    className="float-right cursor-pointer text-[blue] hover:opacity-60 text-[14px]"
                    onClick={() => navigate("/forgot-password")}
                  >
                    Qu??n m???t kh???u
                  </p>
                </div>
                <div className="mb-[24px]">
                  <Button type="primary" htmlType="submit" className="w-[100%]">
                    ????ng nh???p
                  </Button>
                </div>
                <p className="text-[14px]">
                  B???n ch??a c?? t??i kho???n?{" "}
                  <NavLink to="/sign-up">????ng k??</NavLink>
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
