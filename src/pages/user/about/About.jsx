import React from 'react'
import Navbar from '../../../layout/user/navbar/Navbar'
import Footer from '../../../layout/user/footer/Footer'
import Back_To_Top from './../../../base/backtop/Back_To_Top';


export default function About() {
    return (
        <div>
            <Navbar />
            <div
                className="hero-wrap hero-bread"
                style={{ backgroundImage: 'url("images/bg_1.jpg")' }}
            >
                <div className="container">
                    <div className="row no-gutters slider-text align-items-center justify-content-center">
                        <div className="col-md-9 text-center">
                            <p className="breadcrumbs">
                                <span className="mr-2">
                                    <a href="index.html">Home</a>
                                </span>{" "}
                                <span>About us</span>
                            </p>
                            <h1 className="mb-0 bread">About</h1>
                        </div>
                    </div>
                </div>
            </div>
            <section className="ftco-section ftco-no-pb ftco-no-pt bg-light">
                <div className="container">
                    <div className="row">
                        <div
                            className="col-md-5 p-md-5 img img-2 d-flex justify-content-center align-items-center"
                            style={{ backgroundImage: "url(images/about.jpg)" }}
                        >
                            <a
                                className="icon popup-vimeo d-flex justify-content-center align-items-center"
                            >
                                <span className="icon-play" />
                            </a>
                        </div>
                        <div className="col-md-7 py-5 wrap-about pb-md-5">
                            <div className="heading-section-bold mb-4 mt-md-5">
                                <div className="ml-md-0">
                                    <h3 className="mb-4">
                                        Welcome to Vegefoods an eCommerce website
                                    </h3>
                                </div>
                            </div>
                            <div className="pb-md-5">
                                <p>
                                    Far far away, behind the word mountains, far from the countries
                                    Vokalia and Consonantia, there live the blind texts. Separated
                                    they live in Bookmarksgrove right at the coast of the Semantics, a
                                    large language ocean.
                                </p>
                                <p>
                                    But nothing the copy said could convince her and so it didn’t take
                                    long until a few insidious Copy Writers ambushed her, made her
                                    drunk with Longe and Parole and dragged her into their agency,
                                    where they abused her for their.
                                </p><br />
                                <p>
                                    <a href="#" className="btn btn-primary">
                                        Shop now
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="ftco-section ftco-no-pt ftco-no-pb py-5 bg-light">
                <div className="container py-4">
                    <div className="row d-flex justify-content-center py-5">
                        <div className="col-md-6">
                            <h2 style={{ fontSize: 22 }} className="mb-0">
                                Subcribe to our Newsletter
                            </h2>
                            <span>
                                Get e-mail updates about our latest shops and special offers
                            </span>
                        </div>
                        <div className="col-md-6 d-flex align-items-center">
                            <form action="#" className="subscribe-form">
                                <div className="form-group d-flex">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter email address"
                                    />
                                    <input
                                        type="submit"
                                        defaultValue="Subscribe"
                                        className="submit px-3"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <section
                className="ftco-section ftco-counter img"
                id="section-counter"
                style={{ backgroundImage: "url(images/bg_3.jpg)" }}
            >
                <div className="container">
                    <div className="row justify-content-center py-5">
                        <div className="col-md-10">
                            <div className="row">
                                <div className="col-md-3 d-flex justify-content-center counter-wrap 
                                ">
                                    <div className="block-18 text-center">
                                        <div className="text">
                                            <strong className="number" data-number={10000}>
                                                100
                                            </strong>
                                            <span>Happy Customers</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 d-flex justify-content-center counter-wrap 
                                ">
                                    <div className="block-18 text-center">
                                        <div className="text">
                                            <strong className="number" data-number={100}>
                                                200
                                            </strong>
                                            <span>Branches</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 d-flex justify-content-center counter-wrap 
                                ">
                                    <div className="block-18 text-center">
                                        <div className="text">
                                            <strong className="number" data-number={1000}>
                                                300
                                            </strong>
                                            <span>Partner</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-3 d-flex justify-content-center counter-wrap 
                                ">
                                    <div className="block-18 text-center">
                                        <div className="text">
                                            <strong className="number" data-number={100}>
                                                400
                                            </strong>
                                            <span>Awards</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="ftco-section testimony-section">
                <div className="container">
                    <div className="row justify-content-center mb-5 pb-3">
                        <div className="col-md-7 heading-section  text-center">
                            <span className="subheading">Testimony</span>
                            <h2 className="mb-4">Our satisfied customer says</h2>
                            <p>
                                Far far away, behind the word mountains, far from the countries
                                Vokalia and Consonantia, there live the blind texts. Separated they
                                live in
                            </p>
                        </div>
                    </div>
                    <div className="row ftco-animate">
                        <div className="col-md-12">
                            <div className="carousel-testimony owl-carousel">
                                <div className="item">
                                    <div className="testimony-wrap p-4 pb-5">
                                        <div
                                            className="user-img mb-5"
                                            style={{ backgroundImage: "url(images/person_1.jpg)" }}
                                        >
                                            <span className="quote d-flex align-items-center justify-content-center">
                                                <i className="icon-quote-left" />
                                            </span>
                                        </div>
                                        <div className="text text-center">
                                            <p className="mb-5 pl-4 line">
                                                Far far away, behind the word mountains, far from the
                                                countries Vokalia and Consonantia, there live the blind
                                                texts.
                                            </p>
                                            <p className="name">Garreth Smith</p>
                                            <span className="position">Marketing Manager</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="testimony-wrap p-4 pb-5">
                                        <div
                                            className="user-img mb-5"
                                            style={{ backgroundImage: "url(images/person_2.jpg)" }}
                                        >
                                            <span className="quote d-flex align-items-center justify-content-center">
                                                <i className="icon-quote-left" />
                                            </span>
                                        </div>
                                        <div className="text text-center">
                                            <p className="mb-5 pl-4 line">
                                                Far far away, behind the word mountains, far from the
                                                countries Vokalia and Consonantia, there live the blind
                                                texts.
                                            </p>
                                            <p className="name">Garreth Smith</p>
                                            <span className="position">Interface Designer</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="testimony-wrap p-4 pb-5">
                                        <div
                                            className="user-img mb-5"
                                            style={{ backgroundImage: "url(images/person_3.jpg)" }}
                                        >
                                            <span className="quote d-flex align-items-center justify-content-center">
                                                <i className="icon-quote-left" />
                                            </span>
                                        </div>
                                        <div className="text text-center">
                                            <p className="mb-5 pl-4 line">
                                                Far far away, behind the word mountains, far from the
                                                countries Vokalia and Consonantia, there live the blind
                                                texts.
                                            </p>
                                            <p className="name">Garreth Smith</p>
                                            <span className="position">UI Designer</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="testimony-wrap p-4 pb-5">
                                        <div
                                            className="user-img mb-5"
                                            style={{ backgroundImage: "url(images/person_1.jpg)" }}
                                        >
                                            <span className="quote d-flex align-items-center justify-content-center">
                                                <i className="icon-quote-left" />
                                            </span>
                                        </div>
                                        <div className="text text-center">
                                            <p className="mb-5 pl-4 line">
                                                Far far away, behind the word mountains, far from the
                                                countries Vokalia and Consonantia, there live the blind
                                                texts.
                                            </p>
                                            <p className="name">Garreth Smith</p>
                                            <span className="position">Web Developer</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="item">
                                    <div className="testimony-wrap p-4 pb-5">
                                        <div
                                            className="user-img mb-5"
                                            style={{ backgroundImage: "url(images/person_1.jpg)" }}
                                        >
                                            <span className="quote d-flex align-items-center justify-content-center">
                                                <i className="icon-quote-left" />
                                            </span>
                                        </div>
                                        <div className="text text-center">
                                            <p className="mb-5 pl-4 line">
                                                Far far away, behind the word mountains, far from the
                                                countries Vokalia and Consonantia, there live the blind
                                                texts.
                                            </p>
                                            <p className="name">Garreth Smith</p>
                                            <span className="position">System Analyst</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
            <Back_To_Top />
        </div>
    )
}
