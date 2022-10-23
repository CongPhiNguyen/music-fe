import React, { useRef, useState } from "react"
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
import { post } from "../../../api/axios"
import URL from "../../../api/config"
import { useNavigate } from "react-router-dom"

export default function SignOTP() {
  const navigate = useNavigate()

  const [isSendingRequest, setIsSendingRequest] = useState(false)
  const [isSendRequest, setIsSendRequest] = useState(false)
  const [countDownVal, setCountDownVal] = useState(120)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const sendOTP = (email) => {
    if (email.length === 0) {
      message.error("The email can not be blanked")
      return
    }
    setIsSendingRequest(true)

    post(URL.URL_REQUEST_OTP, { email: email })
      .then((data) => {
        console.log("data", data)
        if (data.data.success) {
          setIsSendingRequest(false)
          setIsSendRequest(true)
        } else {
          setIsSendingRequest(false)
          setIsError(true)
          setErrorMessage(data.data.message)
        }
      })
      .catch((err) => {
        message.error("Email not founded")
      })
    //OTP return setIsSendingRequest false
  }
  const verifyOTP = (value) => {
    console.log("value", value)
    post(URL.URL_VERIFY_OTP, value)
      .then((data) => {
        console.log("data", data.data.message)
        if (data.data.success) {
          message.success("Your account was verified")
          navigate("/login")
        } else {
          message.error(data?.data?.message)
        }
      })
      .catch((err) => {
        message.error("Unexpected error")
      })
  }
  const onFinish = (value) => {
    verifyOTP(value)
  }
  const onFinishFailed = (value) => {}

  const emailRef = useRef()

  return (
    <div className="page-content-container font-main h-[calc(100%-32px)] overflow-y-auto mx-[12px]">
      <div className="overflow-x-hidden overflow-y-auto h-[100%]">
        <Row gutter={16} className="h-[100%] overflow-y-hidden">
          <Col span={0} lg={16}>
            <div className="bg-[url('https://media.istockphoto.com/vectors/simple-hand-drawn-notes-and-musical-clef-in-doodle-style-vector-id1269332201?k=20&m=1269332201&s=612x612&w=0&h=j_--Q-8XPzVgUb0BYImhu0URryiV7wM_g_6tnFjtEQw=')] h-[100%] w-[100%] object-contain rounded-[4px]"></div>
          </Col>
          <Col span={24} lg={8} className="overflow-y-auto">
            <div className="mx-[40px] h-[100%] flex flex-col justify-center overflow-y-auto">
              <Typography className="mt-[36px] text-[24px] font-[600] mb-[14px]">
                Verify with OTP!
              </Typography>
              <Typography className="text-[15px] mb-[28px]">
                Verify to access P2Tune!
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
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" }
                  ]}
                >
                  <div className="flex">
                    <Input
                      ref={emailRef}
                      onChange={(value) => {
                        setIsError(false)
                      }}
                    />
                    <Button
                      type="primary"
                      loading={isSendingRequest}
                      disabled={isSendRequest}
                      onClick={() => {
                        sendOTP(emailRef.current.input.value)
                      }}
                    >
                      Send
                    </Button>
                  </div>
                </Form.Item>
                {isError && (
                  <p className="text-[11px] text-[red] mt-[-10px]">
                    * {errorMessage}
                  </p>
                )}
                {isSendRequest && (
                  <Form.Item
                    labelCol={{ span: 24 }}
                    label="Code"
                    name="code"
                    rules={[
                      { required: true, message: "Please input your code!" }
                    ]}
                  >
                    <div className="flex">
                      <Input />
                    </div>
                  </Form.Item>
                )}
                {/* OTP Countdown*/}
                <div className="mb-[24px] mt-[24px]">
                  <Button type="primary" htmlType="submit" className="w-[100%]">
                    Verify
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
