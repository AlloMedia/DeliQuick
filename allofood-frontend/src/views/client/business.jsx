import React from 'react';
import Swiper from 'swiper';

const BusinessProfile = () => {
    React.useEffect(() => {
        new Swiper('.swiper', {
            direction: 'horizontal',
            loop: true,
            pagination: {
                el: '.swiper-pagination',
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            scrollbar: {
                el: '.swiper-scrollbar',
            },
        });
    }, []);
    };

    return (
        <>
        <section className="all">
            <section className="profile">
                <div className="user-banner" style={{ backgroundImage: 'url(static_background_image_url)' }}>
                    <div className="user-overlay"></div>
                </div>
                <div className="user-info" style={{ position: 'relative' }}>
                    <div className="user-pp" style={{ backgroundImage: 'url(static_pp_url)', height: '150px', minWidth: '150px' }}></div>
                    <div className="user-texts">
                        <h1 className="user-name">Static Business Name <i className="bi bi-patch-check-fill verified"></i></h1>
                        <p style={{ fontSize: '11px' }}>Owner: Static Firstname Static Lastname</p>
                        <p className="user-description">Static business description</p>
                    </div>
                    <div className="user-status">
                        <div className="user-status-item">
                            <h1>Business Type</h1>
                            <span>Static Business Type</span>
                        </div>
                        <div className="user-status-item">
                            <h1>Posts</h1>
                            <span>0</span>
                        </div>
                        <div className="user-status-item">
                            <h1>Reservations</h1>
                            <span>0</span>
                        </div>
                    </div>
                </div>
            </section>
            <section className="edit-profile-section">
                <p>Reservator</p>
                <div className="edit-btns">
                    <button className="post-btns-btn" onClick={() => alert('Report Business')}>Report <i className="bi bi-exclamation-diamond-fill"></i></button>
                    <button className="post-btns-btn" onClick={() => alert('Reserve A Table')} style={{ width: '190px' }}>Reserve A Table <i className="bi bi-ticket-perforated-fill"></i></button>
                </div>
            </section>
            <section className="under-profile" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
                <section className="swippers" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
                    <div className="swiper-section" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
                        <div className="swiper-title">
                            <h1>Static Slider 1 Title</h1>
                        </div>
                        <div className="swiper">
                            <div className="swiper-wrapper">
                                <img className="swiper-slide" src="static_image_url_1" alt="" />
                                <img className="swiper-slide" src="static_image_url_2" alt="" />
                            </div>
                            <div className="swiper-pagination"></div>
                            <div className="swiper-button-prev"></div>
                            <div className="swiper-button-next"></div>
                            <div className="swiper-scrollbar"></div>
                        </div>
                    </div>
                </section>
                <div className="swiper-section" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
                    <div className="swiper-title">
                        <h1>Static Slider 2 Title</h1>
                    </div>
                    <div className="swiper">
                        <div className="swiper-wrapper">
                            <img className="swiper-slide" src="static_image_url_3" alt="" />
                            <img className="swiper-slide" src="static_image_url_4" alt="" />
                        </div>
                        <div className="swiper-pagination"></div>
                        <div className="swiper-button-prev"></div>
                        <div className="swiper-button-next"></div>
                        <div className="swiper-scrollbar"></div>
                    </div>
                </div>
            </section>
            <div className="under-profile-menu" style={{ fontFamily: "'Reem Kufi', sans-serif !important" }} data-aos="fade-up" data-aos-anchor-placement="top-bottom">
                <div className="menu-header">
                    <h1>Menu</h1>
                </div>
                <div className="no-events" style={{ height: '90%' }}>
                    <h1><i className="bi bi-emoji-frown-fill"></i> No Items Yet</h1>
                    <p>Start adding items to your menu</p>
                </div>
            </div>
        </section>
        <section className="feed" style={{ width: '100%' }} data-aos="fade-up" data-aos-anchor-placement="top-bottom">
            <section className="posts">
                <div className="post" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
                    <div className="post-header">
                        <div className="post-profile">
                            <div className="post-profile-image" style={{ backgroundImage: 'url(static_pp_url)', backgroundPosition: 'center', backgroundSize: 'cover' }}></div>
                            <div className="post-profile-texts">
                                <span className="post-profile-name">Static Business Name</span>
                                <span className="post-profile-description">Owner: Static Firstname Static Lastname</span>
                            </div>
                        </div>
                        <div className="post-buttons">
                            <button className="post-btns-btn" onClick={() => alert('More')}>More <i className="bi bi-three-dots-vertical button-icons"></i></button>
                            <div className="more-dropdown">
                                <div className="more-option" onClick={() => alert('More Info')}>
                                    <i className="bi bi-bookmark" style={{ fontSize: '15px' }}></i>
                                    <span>More Info</span>
                                </div>
                                <div className="more-option" onClick={() => alert('Hide')}>
                                    <i className="bi bi-eye-slash" style={{ fontSize: '15px' }}></i>
                                    <span>Hide</span>
                                </div>
                                <div className="more-option" onClick={() => alert('Report')}>
                                    <i className="bi bi-exclamation-triangle-fill" style={{ fontSize: '15px' }}></i>
                                    <span>Report</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="post-body">
                        <div className="post-image" style={{ backgroundImage: 'url(static_post_image_url)' }}></div>
                        <div className="post-side">
                            <h3 className="post-title">Static Post Title</h3>
                            <p className="cateogory-event">Static Business Type</p>
                            <p className="post-description">
                                Static post description
                            </p>
                        </div>
                    </div>
                    <div className="post-footer">
                        <div className="post-likes" onClick={() => alert('Like')}>
                            <i className="bi bi-heart like-btn"></i>
                            <span>0</span>
                        </div>
                    </div>
                </div>
                <div className="post" data-aos="fade-up" data-aos-anchor-placement="top-bottom">
                    <div className="no-events">
                        <h1><i className="bi bi-emoji-frown-fill"></i> No Posts Yet</h1>
                        <p>Look somewhere else for posts</p>
                    </div>
                </div>
            </section>
        </section>
    </>
);

export default BusinessProfile;
