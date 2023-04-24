import React from 'react';
import "./footer.css"
import expressDeliveryImg from "/assets/images/svg/footer/express-delivery.svg";
import cashOnDeliveryImg from "/assets/images/svg/footer/cash-on-delivery.svg";
import daysReturnImg from "/assets/images/svg/footer/days-return.svg";
import originalProductsImg from "/assets/images/svg/footer/original-products.svg";
import supportImg from "../../../";

function Footer() {
    const footerItems = [
        {
            icon: expressDeliveryImg,
            alt: "express-delivery",
            title: "Express Delivery",
        },
        {
            icon: cashOnDeliveryImg,
            alt: "cash-on-delivery",
            title: "Cash On Delivery",
        },
        {
            icon: daysReturnImg,
            alt: "days-return",
            title: "Days Return",
        },
        {
            icon: originalProductsImg,
            alt: "original-products",
            title: "Original Products",
        },
        {
            icon: supportImg,
            alt: "support",
            title: "24-7 Support",
        },
    ];

    return (
        <footer>
            <section className="footer-items">
                {footerItems.map((item, index) => (
                    <article key={index} className="footer-item">
                        <div className="footer-img-square-56">
                            <img
                                className={`${item.alt}-img`}
                                data-src={item.icon}
                                alt={item.alt}
                            />
                        </div>
                        <p className="text-caption color-700">{item.title}</p>
                    </article>
                ))}
            </section>
            <p className="simple-footer">Baloot @ UT</p>
        </footer>
    );
}

export default Footer;
