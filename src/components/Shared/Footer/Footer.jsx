import React from "react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* 1. Logo & About Section */}
          <div className="flex flex-col gap-4">
            <Link
              to="/"
              className="text-3xl font-black text-white tracking-tighter"
            >
              Local Chef <span className="text-amber-500">Bazaar</span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              We are committed to delivering high-quality, healthy meals right
              to your doorstep. Our mission is your satisfaction and well-being
              through great food.
            </p>
            {/* Social Media Links */}
            <div className="flex gap-4 mt-4">
              {[
                {
                  icon: <FaFacebookF />,
                  link: "https://web.facebook.com/toukir.ahmad.106",
                },
                { icon: <FaTwitter />, link: "#" },
                {
                  icon: <FaInstagram />,
                  link: "https://www.instagram.com/toukir.ahmad.106/?hl=en",
                },
                {
                  icon: <FaLinkedinIn />,
                  link: "https://www.linkedin.com/in/toukirahammed/",
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-amber-500 hover:text-white transition-all duration-300 shadow-lg"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* 2. Contact Details */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 border-l-4 border-amber-500 pl-3">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 hover:text-amber-500 transition-colors">
                <FaMapMarkerAlt className="text-amber-500 mt-1" />
                <span>Sector 10, Uttara, Dhaka 1230</span>
              </li>
              <li className="flex items-center gap-3 hover:text-amber-500 transition-colors">
                <FaPhoneAlt className="text-amber-500" />
                <span>01609767487</span>
              </li>
              <li className="flex items-center gap-3 hover:text-amber-500 transition-colors">
                <FaEnvelope className="text-amber-500" />
                <span>toukirahammed95@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* 3. Working Hours */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 border-l-4 border-amber-500 pl-3">
              Working Hours
            </h4>
            <ul className="space-y-3">
              <li className="flex justify-between border-b border-gray-800 pb-2">
                <span className="text-gray-400">Sat - Thu:</span>
                <span className="text-amber-500 font-bold">09:00 - 22:00</span>
              </li>
              <li className="flex justify-between border-b border-gray-800 pb-2">
                <span className="text-gray-400">Friday:</span>
                <span className="text-red-400 font-bold">Closed</span>
              </li>
              <li className="text-xs text-gray-500 italic mt-2 uppercase tracking-widest">
                * Delivery times may vary on holidays.
              </li>
            </ul>
          </div>

          {/* 4. Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 border-l-4 border-amber-500 pl-3">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link className="hover:text-amber-500 transition-all hover:pl-2">
                  Our Menu
                </Link>
              </li>
              <li>
                <Link className="hover:text-amber-500 transition-all hover:pl-2">
                  About Us
                </Link>
              </li>
              <li>
                <Link className="hover:text-amber-500 transition-all hover:pl-2">
                  Contact
                </Link>
              </li>
              <li>
                <Link className="hover:text-amber-500 transition-all hover:pl-2">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 5. Copyright Information */}
        <div className="border-t border-gray-800 pt-8 mt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-amber-500 font-black">MealMaster</span>. All
            Rights Reserved.
            <br className="md:hidden" /> Crafted with ❤️ for food lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
