import React, { useEffect, useState } from "react"
import "./Personal.css"
import "./MainHome.css"
import { Form, Button, Input, message } from "antd"
import { AiFillEdit, AiFillSave } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import URL from "../../../api/config"
import { setCurrentUserInfo, handleLogin } from "../../authen/authenSlice"
export default function UserProfile() {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [isEdit, setIsEdit] = useState(false)
  const [uploadSrc, setUploadSrc] = useState("")
  const [uploadUrl, setUploadUrl] = useState("")
  const userInfo = useSelector((state) => {
    return state.authen.currentUserInfo
  })

  console.log("userInfo", userInfo)

  const uploadPicture = async (e) => {
    const formData = new FormData()
    formData.append("file", e.target.files[0])
    formData.append("upload_preset", "phiroud")
    const sleep = (ms) => new Promise((res) => setTimeout(res, ms))
    // await sleep(1000)
    axios
      .post("https://api.cloudinary.com/v1_1/phiroud321/image/upload", formData)
      .then((data) => {
        console.log("data", data)
        setUploadUrl(data.data.url)
      })
      .catch((err) => {
        console.log("err", err)
        message.error("Có lỗi trong quá trình upload ảnh")
      })
    // dispatch(articleActions.uploadArticlePicture(formData))
  }

  const onFinish = (values) => {
    console.log(values)
    console.log(uploadUrl)
    axios
      .post(URL.BASE_API_ENDPOINT + "/user/change-profile", {
        ...values,
        avatarUrl: uploadUrl ? uploadUrl : userInfo.avatarUrl
      })
      .then((data) => {
        console.log(data)
        if (data.data.success) {
          message.success("Lưu profile thành công")
          dispatch(setCurrentUserInfo({ ...data.data.data }))
          setIsEdit(false)
        }
        //
      })
      .catch((err) => {
        message.error("Không thể lưu profile")
      })
  }
  const onFinishFailed = () => {}

  useEffect(() => {
    form.setFieldValue("username", userInfo.username)
    form.setFieldValue("email", userInfo.email)
    form.setFieldValue("fullName", userInfo.fullName)
  }, [form, userInfo])

  return (
    <div className="main-home">
      <div className="px-[40px]">
        <p className="p-0 m-[0 0 20px 0] text-[24px] text-[white] mt-[40px] font-[600] flex justify-between">
          <p>Thông tin cá nhân</p>
        </p>
        <div className="text-center w-[100%]">
          <label
            for="post-image-input"
            onClick={(event) => {
              if (!isEdit) event.preventDefault()
            }}
          >
            <img
              src={uploadSrc || userInfo?.avatarUrl}
              alt="avatar user"
              className={
                "w-[140px] h-[140px] !mt-[-40px] mb-[20px] mx-auto object-cover border-[1px] " +
                (isEdit ? "hover:opacity-40" : "")
              }
            ></img>
          </label>

          <input
            className="hidden"
            type="file"
            id="post-image-input"
            // ref={pageRef.postImageRef}
            onChange={async (e) => {
              var tgt = e.target || window.event.srcElement
              var files = tgt.files
              // FileReader support
              if (FileReader && files && files.length) {
                var fr = new FileReader()
                // const sleep = (ms) => new Promise((res) => setTimeout(res, ms))
                fr.onload = async () => {
                  // document.querySelector('.product-current-upload-img').src = fr.result;
                  // console.log("fr.result", fr.result)
                  // addTempImage(fr.result)
                  setUploadSrc(fr.result)
                  // await sleep(2000)
                  // setTempImage([])
                }
                fr.readAsDataURL(files[0])
                uploadPicture(e)
              }
            }}
          />
        </div>

        <Form
          name="basic"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          initialValues={{
            username: userInfo.username,
            email: userInfo.email,
            fullName: userInfo.fullName
          }}
        >
          <Form.Item
            label={
              <p className="text-[16px] text-[#fff] mt-[14px] w-[120px] text-left">
                Tên đăng nhập:{" "}
              </p>
            }
            name="username"
          >
            {isEdit ? (
              <Input disabled />
            ) : (
              <p className="text-[#fff] text-[16px] mt-[3px] font-[700]">
                {userInfo?.username}
              </p>
            )}
          </Form.Item>
          <Form.Item
            label={
              <p className="text-[16px] text-[#fff] mt-[14px]  w-[120px] text-left">
                Email:{" "}
              </p>
            }
            name="email"
          >
            {isEdit ? (
              <Input disabled />
            ) : (
              <p className="text-[#fff] text-[16px] mt-[3px] font-[700]">
                {userInfo?.email}
              </p>
            )}
          </Form.Item>
          <Form.Item
            label={
              <p className="text-[16px] text-[#fff] mt-[14px]  w-[120px] text-left">
                Tên đầy đủ:{" "}
              </p>
            }
            name="fullName"
          >
            {isEdit ? (
              <Input />
            ) : (
              <p className="text-[16px] text-[#fff] mt-[3px] font-[700]">
                {userInfo?.fullName}
              </p>
            )}
          </Form.Item>
          {!isEdit && (
            <Button
              type="primary"
              onClick={() => {
                setIsEdit(true)
              }}
            >
              Chỉnh sửa
            </Button>
          )}
          <Form.Item className="text-right">
            {!isEdit ? null : (
              <React.Fragment>
                <Button type="primary" htmlType="submit">
                  Lưu chỉnh sửa
                </Button>
                <Button
                  type="primary"
                  className="!bg-[red] !border-[red] !ml-[40px]"
                  onClick={() => {
                    setIsEdit(false)
                  }}
                >
                  Hủy chỉnh sửa
                </Button>
              </React.Fragment>
            )}
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
