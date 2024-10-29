import logo from "../../assets/images/res-logo.png";
import { Github, Instagram, Linkedin, SendIcon, Twitter } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-red-100 py-8">
      <div className="w-[85%] mx-auto">
        <div className="grid grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img src={logo} alt="Tasty Treat Logo" className="w-12 h-12" />
              <span className="ml-2 text-xl font-bold">Tasty Treat</span>
            </div>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Delivery Time</h4>
            <div className="mb-4">
              <p className="font-semibold">Sunday - Thursday</p>
              <p>10:00 am - 11:00 pm</p>
            </div>

            <div>
              <p className="font-semibold">Friday - Saturday</p>
              <p>Off days</p>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="mb-4">
              <p>Location: 123 Main St, City, Country</p>
            </div>
            <p>Phone: +1 234 567 8900</p>
            <p>Email: example@tastytreat.com</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p>Subscribe to our4newsletter</p>
            <div className="flex border-black border-[1px] bg-white rounded-md p-1 mt-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent outline-none text-sm w-full"
              />
              <button className="bg-red-500 text-sm text-white px-4 py-2 rounded-lg">
                <SendIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 w-full flex items-center justify-between text-[#DF2020]">
          <p className="text-[0.8rem]">{`Copyright-${year}, website created by Echafai Rachid. All rights reserved. `}</p>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/Echaftech23"
              className="bg-black p-2 rounded-full"
            >
              <Instagram className="w-4 h-4 text-white" />
            </a>
            <a
              href="https://github.com/Echaftech23"
              className="bg-black p-2 rounded-full"
            >
              <Github className="w-4 h-4 text-white" />
            </a>
            <a
              href="https://github.com/Echaftech23"
              className="bg-black p-2 rounded-full"
            >
              <Twitter className="w-4 h-4 text-white" />
            </a>
            <a
              href="https://www.linkedin.com/in/rachid-echafai/"
              className="bg-black p-2 rounded-full"
            >
              <Linkedin className="w-4 h-4 text-white" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
