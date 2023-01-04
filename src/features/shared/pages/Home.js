import React, { useEffect, useState } from "react"
import NavUser from "../components/NavUser"
import "../components/MainHome.css"
import { Col, Row, Spin } from "antd"
import "./Home.css"
import { FaChevronRight, FaEye } from "react-icons/fa"
import { useNavigate } from "react-router"
import axios from "axios"
import "./ZingChart.css"
import URL from "../../../api/config"

export default function Home() {
  const [home, setHome] = useState(null)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    axios
      .get(URL.BASE_API_ENDPOINT + `/zing/get-random-song-list`)
      .then((res) => {
        setHome(res.data.home.data.items)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])
  if (isLoading)
    return (
      <div className="main-home text-center mt-[15%]">
        <Spin size="large" />
        <p className="mt-[12px] text-[16px] text-[#fff]">
          Đợi xíu nhé, trang chủ đang được loading...
        </p>
      </div>
    )
  return (
    <div className="main-home home-center">
      <NavUser></NavUser>
      <div className="main-home-personal">
        <div className="overview">
          {home && (
            <div className="overview-option-singer">
              <h1 className="p-0 m-[0 0 20px 0] text-[3rem] text-[white] pb-10 ">
                {home[11].title}
              </h1>
              {home[11].items.map((theme, key) => (
                <React.Fragment key={key}>
                  <div className="overview-option-song__heading flex">
                    <h3 className="p-0 m-[0 0 20px 0] text-[2rem] text-[white] ">
                      {theme.title}
                    </h3>
                    <div className="overview-option-song__right ml-[auto] flex items-center">
                      <div
                        onClick={() => navigate(`/playlist/${theme.encodeId}`)}
                        className="overview-option-song__right-more-list"
                      >
                        <span>Tất cả</span>
                        <div>
                          <FaChevronRight></FaChevronRight>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ul className="overview-option-playlist__list">
                    <Row gutter={[16, 16]}>
                      {theme.artists.map((artist, key) => (
                        <Col key={key} span={6}>
                          <li className="overview-option-playlist__item cursor-pointer">
                            <div
                              onClick={() =>
                                navigate(`/singer?id=${artist.alias}`)
                              }
                              className="overview-option-playlist__item-img-wrapper singer"
                            >
                              <div className="overview-option-playlist__item-img-wrapper-action overview-option-mv__item-wrapper">
                                <div className="overview-option-playlist__item-img-wrapper-action-2">
                                  <FaEye />
                                </div>
                              </div>
                              <div
                                className="overview-option-playlist__item-img overview-option-singer__item-img "
                                style={{
                                  backgroundImage: `url(${artist.thumbnailM})`
                                }}
                              ></div>
                            </div>
                            <div className="overview-option-singer__content">
                              <div className="overview-option-playlist__item-content-name">
                                {artist.name}
                              </div>
                              <div className="overview-option-playlist__item-content-name1">
                                {artist.totalFollow} follow
                              </div>
                            </div>
                          </li>
                        </Col>
                      ))}
                    </Row>
                  </ul>
                </React.Fragment>
              ))}
            </div>
          )}
          {home && (
            <div className="overview-option-singer">
              <h1 className="p-0 m-[0 0 20px 0] text-[3rem] text-[white] ">
                {home[2]?.title}
              </h1>
              {home[2]?.items &&
                home[2]?.items.map((theme, key) => (
                  <React.Fragment key={key}>
                    <div className="overview-option-song__heading flex">
                      <h3 className="p-0 m-[0 0 20px 0] text-[2rem] text-[white] ">
                        {theme.title}
                      </h3>
                      <div className="overview-option-song__right ml-[auto] flex items-center">
                        <div className="overview-option-song__right-more-list">
                          <span>Tất cả</span>
                          <div>
                            <FaChevronRight></FaChevronRight>
                          </div>
                        </div>
                      </div>
                    </div>
                    <ul className="overview-option-playlist__list">
                      <Row gutter={[16, 16]}>
                        {theme.artists.map((artist, key) => (
                          <Col key={key} span={6}>
                            <li className="overview-option-playlist__item cursor-pointer">
                              <div
                                onClick={() =>
                                  navigate(`/singer?id=${artist.alias}`)
                                }
                                className="overview-option-playlist__item-img-wrapper singer"
                              >
                                <div className="overview-option-playlist__item-img-wrapper-action overview-option-mv__item-wrapper">
                                  <div className="overview-option-playlist__item-img-wrapper-action-2">
                                    <FaEye />
                                  </div>
                                </div>
                                <div
                                  className="overview-option-playlist__item-img overview-option-singer__item-img "
                                  style={{
                                    backgroundImage: `url(${artist.thumbnailM})`
                                  }}
                                ></div>
                              </div>
                              <div className="overview-option-singer__content">
                                <div className="overview-option-playlist__item-content-name">
                                  {artist.name}
                                </div>
                                <div className="overview-option-playlist__item-content-name1">
                                  {artist.totalFollow} follow
                                </div>
                              </div>
                            </li>
                          </Col>
                        ))}
                      </Row>
                    </ul>
                  </React.Fragment>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
