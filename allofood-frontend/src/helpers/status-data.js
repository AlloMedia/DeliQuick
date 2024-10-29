import { MdOutlinePending } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import { BiStopwatch } from "react-icons/bi";
import { FcCancel } from "react-icons/fc";
import { TbBasketCancel } from "react-icons/tb";
import { GrCompliance } from "react-icons/gr";

const statusStyles = {
    Pending: { bgColor: 'bg-yellow-200', icon: <MdOutlinePending /> },
    Rejected: { bgColor: 'bg-red-200 text-red-600', icon: <FcCancel /> },
    Delivered: { bgColor: 'bg-teal-200', icon: <GrCompliance /> },
    Ready: { bgColor: 'bg-green-200', icon: <IoMdDoneAll /> },
    "In Progress": { bgColor: 'bg-purple-200', icon: <BiStopwatch /> },
    Assigned: { bgColor: 'bg-blue-200', icon: <BiStopwatch /> },
    "On the Way": { bgColor: 'bg-green-400', icon: <BiStopwatch /> },
    Cancelled: { bgColor: 'bg-orange-200', icon: <TbBasketCancel /> },
};

export default statusStyles;
