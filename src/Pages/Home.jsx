import Avatar from '@mui/material/Avatar';
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";

const Home = () => {
  return (
    <div className="bg-zinc-200">
    <div className="max-w-2xl mx-auto pt-10 bg-black text-white h-fit">
        <div className="pb-6">
            <div className="flex justify-between pb-2">
                <div className="flex items-center gap-2 pl-4">
                    <Avatar alt="john" src="https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg" />
                    <h3>
                        john_davies
                    </h3>
                </div>
                <div className="flex items-center gap-2 pr-4">
                    <h3>
                        12h
                    </h3>
                    <h3>
                        <BsThreeDotsVertical />
                    </h3>
                </div>
            </div>
            <div>
                <img 
                    src="https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_640.jpg" 
                    alt="post image" 
                    className="h-80 w-full"
                />
            </div>
            <div className="flex gap-3 pt-2 pl-4">
                <IoMdHeartEmpty className="font-bold text-xl" />
                <FaRegComment className="font-bold text-xl" />
            </div>
            <div className="pl-4">
                <h2 className="">
                    <span className="font-semibold pr-1">john_davies</span> 
                    This is a sample text to describe the content of the post. You can write something interesting or informative here.
                </h2>
                <p className="text-gray-300">
                    view all comments
                </p>
            </div>
        </div>
        <div className="pb-6">
            <div className="flex justify-between pb-2">
                <div className="flex items-center gap-2 pl-4">
                    <Avatar alt="Dr Dave" src="https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg" />
                    <h3>
                        Dr Dave
                    </h3>
                </div>
                <div className="flex items-center gap-2 pr-4">
                    <h3>
                        2 day
                    </h3>
                    <h3>
                        <BsThreeDotsVertical />
                    </h3>
                </div>
            </div>
            <div>
                <img 
                    src="https://media.istockphoto.com/id/499517325/photo/a-man-speaking-at-a-business-conference.jpg?s=612x612&w=0&k=20&c=gWTTDs_Hl6AEGOunoQ2LsjrcTJkknf9G8BGqsywyEtE=" 
                    alt="post image" 
                    className="h-80 w-full"
                />
            </div>
            <div className="flex gap-3 pt-2 pl-4">
                <IoMdHeartEmpty className="font-bold text-xl" />
                <FaRegComment className="font-bold text-xl" />
            </div>
            <div className="pl-4">
                <h2 className="">
                    <span className="font-semibold pr-1">Dr dave</span> 
                    This is a sample text to describe the content of the post. You can write something interesting or informative here.
                </h2>
                <p className="text-gray-300">
                    view all comments
                </p>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Home