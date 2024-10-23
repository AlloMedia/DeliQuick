import React from "react";

const Home = () => {
  return (
    <>
      <div className="all">
        <div className="advertisement">
          <div className="overplay">
            <h1 className="title-ad">
              Quick
              <img src="/assets/table.svg" className="inline-img" alt="" />
              able
            </h1>
            <h2 className="sub-ad">Reserve Your Seat Anywhere.</h2>
            <h5 className="types">
              Restaurants, Coffee shops, Barber shops or Hair salons
            </h5>
          </div>
          <div className="slider" id="slider">
            {/* <div className="slide" style={{ backgroundImage: 'url("/path/to/image.jpg")' }}></div> */}
          </div>
        </div>
        <div className="feed" style={{ width: "100%" }}>
          <div className="my-city" id="mycity">
            <div className="nearby">
              <h1>Nearby</h1>
            </div>
            <div className="nearby-option">
              <div className="no-events-nearby">
                <h1>
                  <i className="bi bi-emoji-frown-fill"></i> No Businesses Yet
                </h1>
                <p>Please check later for new businesses</p>
              </div>
            </div>
            <div
              className="business-card"
              style={{
                backgroundImage: 'url("/path/to/background_image.jpg")',
                cursor: "pointer",
              }}
              onClick={() => (window.location.href = "/getBusiness/1")}
            >
              <div className="business-card-overlay"></div>
              <div className="business-card-top"></div>
              <div
                className="business-card-logo"
                style={{ backgroundImage: 'url("/path/to/logo.jpg")' }}
              ></div>
              <div className="business-card-texts">
                <h1 className="business-card-title">Business Name</h1>
                <p className="business-card-description">
                  Business Description
                </p>
              </div>
            </div>
          </div>
          <div className="business-card-bottom">
            <div className="texts">
              <p className="business-card-description">First Last</p>
              <p className="business-card-description">Business Type</p>
            </div>
            <div className="texts">
              <p className="business-card-description">Address</p>
              <p className="business-card-description">Price$ / seat</p>
            </div>
            <div className="texts">
              <p className="business-card-description">email@example.com</p>
              <p className="business-card-description">123-456-7890</p>
            </div>
          </div>
        </div>
      </div>
      <div className="posts">
        <div className="post" data-aos="fade-up">
          <div className="post-header">
            <div className="post-profile">
              <div
                className="post-profile-image"
                style={{
                  backgroundImage: 'url("/path/to/owner_pp.jpg")',
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              ></div>
              <div className="post-profile-texts">
                <span className="post-profile-name">Post Owner</span>
                <span className="post-profile-description">Date and Time</span>
              </div>
            </div>
            <div className="post-buttons">
              <a href="/getBusiness/1" style={{ textDecoration: "none" }}>
                <button className="post-btns-btn">
                  Profile <i className="bi bi-person-check-fill"></i>
                </button>
              </a>
              <button
                className="post-btns-btn"
                onClick={() =>
                  showMore(document.querySelector(".more-dropdown"))
                }
              >
                More <i className="bi bi-three-dots-vertical button-icons"></i>
              </button>
              <div className="more-dropdown">
                <div
                  className="more-option"
                  onClick={() => (window.location.href = "/getPost/1")}
                >
                  <i
                    className="bi bi-bookmark"
                    style={{ fontSize: "15px" }}
                  ></i>
                  <span>More Info</span>
                </div>
                <div
                  className="more-option"
                  onClick={() =>
                    (document.querySelector(".post").style.animationName =
                      "hideEvent")
                  }
                >
                  <i
                    className="bi bi-eye-slash"
                    style={{ fontSize: "15px" }}
                  ></i>
                  <span>Hide</span>
                </div>
                <div
                  className="more-option"
                  onClick={() => (window.location.href = "/getBusiness/1")}
                >
                  <i
                    className="bi bi-exclamation-triangle-fill"
                    style={{ fontSize: "15px" }}
                  ></i>
                  <span>Report</span>
                </div>
              </div>
            </div>
          </div>
          <div className="post-body">
            <div
              className="post-image"
              style={{ backgroundImage: 'url("/path/to/image.jpg")' }}
            ></div>
            <div className="post-side">
              <h3 className="post-title">Post Title</h3>
              <p className="cateogory-event">Business Type</p>
              <p className="post-description">
                Post Description
                <div className="post-side-overlay">
                  <p
                    className="read-more"
                    onClick={() =>
                      readMore(document.querySelector(".post-description"))
                    }
                  >
                    Read More...
                  </p>
                </div>
              </p>
            </div>
          </div>
          <div className="post-footer">
            <div
              className="post-likes"
              onClick={() =>
                likeWithAjax(1, document.querySelector(".post-likes"))
              }
            >
              <i className="bi bi-heart like-btn"></i>
              <span>0</span>
            </div>
          </div>
          <div className="post">
            <div className="no-events">
              <h1>
                <i className="bi bi-emoji-frown-fill"></i> No Events Yet
              </h1>
              <p>Start adding events to your profile</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
