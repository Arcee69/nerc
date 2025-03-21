import React, { useState, useEffect, useRef } from 'react'
import { FaArrowDown } from 'react-icons/fa'
import { IoIosArrowForward } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import { LiaPhoneSolid } from "react-icons/lia";
import Vapi from '@vapi-ai/web';
import { IoIosSend } from 'react-icons/io';
import { BsFillPersonFill } from 'react-icons/bs';
import { BiBot } from 'react-icons/bi';

//PNG
import HomeBg from '../../assets/png/home_bg.png'
import Chatbox from '../../assets/png/chatbox.png'
import Microphone from '../../assets/png/microphone.png'

//SVG
import Bill from '../../assets/svg/bill.svg'
import Service from '../../assets/svg/service.svg'
import General from '../../assets/svg/general.svg'
import Meter from '../../assets/svg/meter.svg'
import Phone from '../../assets/svg/phone.svg'
import Rights from '../../assets/svg/rights.svg'
import { useLocation, useNavigate } from 'react-router-dom';


const Home = () => {
    const [callStatus, setCallStatus] = useState('inactive');
    const [voxData, setVoxData] = useState([]);
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Hi there, this is NERCBot from NERC support! How can I assist you today?' }
      ]);
      const [input, setInput] = useState('');
      const [vapi, setVapi] = useState(null);
    const [loading, setLoading] = useState(false);

    // const vapi = new Vapi("78fc0021-e705-4055-8850-adddabc99333"); // Public key

    const { state } = useLocation()
    const navigate = useNavigate()


    useEffect(() => {
        const vapiInstance = new Vapi("78fc0021-e705-4055-8850-adddabc99333"); // Public key
        setVapi(vapiInstance);

         // Handle text-based conversation updates
         vapiInstance.on('conversation-update', (conversation) => {
            if (conversation?.messages) {
                const lastMessage = conversation.messages[conversation.messages.length - 1];
                if (lastMessage.role === 'assistant') {
                    setMessages(prev => [...prev, { 
                        sender: 'bot', 
                        text: lastMessage.content 
                    }]);
                }
            }
        });

        vapiInstance.on('call-start', () => setCallStatus('active'));
        vapiInstance.on('call-end', () => {
            setCallStatus('inactive');
            setMessages([{ 
                sender: 'bot', 
                text: 'Hi there, this is NERCBot from NERC support! How can I assist you today?' 
            }]);
        });

        // return () => vapiInstance.destroy();
    }, []);

    const startCall = async () => {
        if (callStatus === 'active') return;
        
        setLoading(true);
        try {
            await vapi.start("b5901487-8fc1-4ad3-8baf-497a6f56ed38"); // Assitant ID
        } catch (error) {
            console.error('Error starting call:', error);
        } finally {
            setLoading(false);
        }
    };

    const stopCall = () => {
        if (callStatus === 'inactive') return;
        vapi.stop();
    };

    const handleSend = async () => {
        if (!input.trim() || callStatus !== 'active') return;
        
        // Add user message
        const newMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, newMessage]);
        
        try {
            // Send text message to Vapi
            await vapi.send({
                type: 'text',
                text: input
            });
            setInput('');
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages(prev => [...prev, { 
                sender: 'bot', 
                text: 'Sorry, I encountered an error. Please try again.' 
            }]);
        }
    };

    const aiRef = useRef(null)
    const catRef = useRef(null)

    useEffect(() => {
        if (state?.section === "ai" && aiRef.current) {
            aiRef.current.scrollIntoView({ behavior: "smooth" });
        }
        if (state?.section === "cat" && catRef.current) {
            catRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, [state]);

    const help = [
        {
            img: Bill,
            title: "Billing & Payments",
            content: "Questions about your electricity bill or payment methods",
        },
        {
            img: Service,
            title: "Service Issues",
            content: "Problems with power supply or service quality",
        },
        {
            img: Meter,
            title: "Metering",
            content: "Questions about meter installation, reading, or faults",
        },
        {
            img: Rights,
            title: "Consumer Rights",
            content: "Understanding your rights as an electricity consumer",
        },
        {
            img: Phone,
            title: "Contact & Support",
            content: "Ways to reach NERC or your electricity provider",
        },
        {
            img: General,
            title: "General Inquiries",
            content: "Other questions about electricity regulation",
        },
    ]

  return (
    <div className='w-full'>
        <section
            style={{
                backgroundImage: `url(${HomeBg})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
            className='h-[772px] flex flex-col items-center pt-[140px] justify-center bg-[#02526F]'
        >
            <div className='w-[768px] mx-auto flex items-center  flex-col gap-[14px]'>
                <div
                    className='bg-[#FFFFFF4A] w-[321.5px] h-[36px] rounded-full flex items-center justify-center'
                >
                    <p className='text-[#FFFFFF] font-medium font-roboto leading-5 text-[14px]'>Nigerian Electricity Regulatory Commission</p>
                </div>
                <p className='text-[#fff] text-[60px] font-medium font-roboto leading-[60px] tracking-[-1.5px] text-center'>How can we help you <br /> today?</p>
                <p className='font-roboto text-[#fff]  text-[20px] leading-[28px]'>
                    NERC is committed to providing you with the support and resources <br />
                    you need. Browse our help categories or chat with our virtual assistant.
                </p>
                <div className='flex items-center mt-4 gap-4'>
                    <button
                        className='w-[232px] bg-[#FEDA5E] h-[48px] rounded-full flex items-center justify-center'
                        type='button'
                        onClick={() => navigate("/", {state: {section: "cat"}})}
                    >
                        <p className='text-[#026487] font-roboto font-medium leading-6 text-base'>Browse Help Categories</p>
                    </button>
                    <div 
                        className='flex items-center gap-[6px] cursor-pointer'
                        onClick={() => navigate("/", {state: {section: "ai"}})}
                    >
                        <p className='text-[#fff] font-medium text-base leading-6'>
                            Speak with Assistant
                        </p>
                        <FaArrowDown className='w-4 h-4 text-[#fff]' />
                    </div>
                    {/* <div className='flex items-center gap-[6px] cursor-pointer'>
                        <p className='text-[#fff] font-medium text-base leading-6'>Chat with Assistant</p>
                        <FaArrowDown className='w-4 h-4 text-[#fff]' />
                    </div> */}
                </div>
            </div>

            <div className='bg-[#fff] flex items-center flex-col justify-center w-[40px] h-[40px] rounded-full mt-[78px]'>
                <FaArrowDown className='text-[#026487] w-5 h-5' />
            </div>
        </section>

        <section ref={aiRef} className='bg-[#F5F5F7] py-[80px] flex flex-col items-center gap-[64px] px-[272px]'>
            <div className='flex flex-col gap-[19px] items-center'>
                <p className='font-roboto text-[#1D1D1F] text-[48px] font-medium leading-[48px] tracking-[-1.2px]'>
                    Chat with NERCBot Chatterbox
                </p>
                <p className='font-roboto text-[#86868B] text-base leading-[26px] text-center'>
                    Welcome to NERC's virtual assistant. Ask me anything about electricity regulations, <br />
                    tariffs, or consumer rights.
                </p>
            </div>

                    {/* Vapi section */}
            <div className="w-full max-w-lg mx-auto border relative rounded-lg shadow-lg bg-white flex flex-col h-[300px]">
                <div className="bg-[#02526F] text-white py-3 px-4 text-lg font-medium flex justify-between items-center">
                    NERC Virtual Assistant
                    <div className="flex items-center gap-2">
                        <span className="text-sm">
                            {callStatus === 'active' ? 'Online' : 'Offline'}
                        </span>
                        <div className={`w-3 h-3 rounded-full ${callStatus === 'active' ? 'bg-[#00B259]' : 'bg-[#ccc]'}`} />
                    </div>
                </div>

                    <div 
                        className='flex flex-col items-center absolute inset-x-20 bottom-10 justify-center'
                        onClick={callStatus === 'active' ? stopCall : startCall}
                    >
                        <div
                            className={`
                                w-20 h-20 bg-center bg-no-repeat bg-cover mt-[52px] cursor-pointer 
                                ${callStatus === 'active' ? 'animate-pulse' : ''}
                            `}
                            style={{ backgroundImage: `url(${Microphone})` }}
                        />
                        <p className='text-[#4B5563] text-center font-roboto text-base font-semibold'>
                          {callStatus === 'active' ? 'End Chat' : 'Tap to Speak'}
                        </p>

                        {/* Footer Disclaimer */}
                        <p className="text-[10px] text-[#4B5563] font-roboto font-semibold mt-8">
                            AI can make mistakes. Please double-check responses.
                        </p>
                    </div>
            </div>
        </section>

        <section ref={catRef} className='bg-[#fff] flex items-center flex-col gap-[64px] py-[80px] px-[176px]'>
            <div className='flex flex-col gap-[19px] items-center'>
                <p className='font-roboto text-[#1D1D1F] text-[48px] font-medium leading-[48px] tracking-[-1.2px]'>
                    Help Categories
                </p>
                <p className='font-roboto text-[#86868B] text-base leading-[26px] text-center'>
                    Find answers to your questions by browsing our help categories or searching for <br />
                    specific topics
                </p>
            </div>

            <div className='grid grid-cols-3 gap-[24px]'>
                {help.map((item, index) => (
                    <div key={index} className='flex items-start h-[158px] p-6 shadow-lg gap-6 '>
                        <div className='flex items-start gap-4'>
                            <img src={item.img} alt={item.title} className='w-[48px] h-[48px]' />
                            <div className='flex flex-col items-start gap-[7px]'>
                                <p className='font-roboto text-[#1D1D1F] text-lg leading-[28px] tracking-[-0.45px] font-medium'>{item.title}</p>
                                <p className='font-roboto text-[#86868B] text-base leading-[26px] '>{item.content}</p>
                            </div>
                            <IoIosArrowForward className='text-[#86868B] w-5 h-5' />
                        </div>
                    </div>
                ))}  
            </div>
        </section>


        <section className="bg-[#F5F5F7] py-[80px] flex flex-col items-center mt-10 gap-[64px] px-[172px]">
            {/* Header Section */}
            <div className="flex flex-col gap-[19px] items-center">
                <p className="font-roboto text-[#1D1D1F] text-[48px] font-medium leading-[48px] tracking-[-1.2px]">
                Find Your Distribution Company
                </p>
                <p className="font-roboto text-[#86868B] text-base leading-[26px] text-center">
                Locate your electricity distribution company and service area on the <br /> map
                </p>
            </div>

            {/* Content Section */}
            <div className="flex gap-6 w-full">
                {/* Distribution Companies List */}
                <div className="bg-white rounded-2xl h-[501px] overflow-y-auto shadow p-6 w-2/3 flex flex-col gap-4">
                <h3 className="font-roboto text-[#1D1D1F] text-lg font-medium">Distribution Companies (DISCOs)</h3>
                {['Abuja Electricity Distribution Company (AEDC)', 'Benin Electricity Distribution Company (BEDC)', 'Enugu Electricity Distribution Company (EEDC)', 'Ikeja Electricity Distribution Company (IKEDC)', 'Ibadan Electricity Distribution Company (IBEDC)'].map((company, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-1 cursor-pointer hover:shadow-md">
                        <CiLocationOn className="mr-2 text-[#00984C]" /> 
                        <div className="flex flex-col items-start gap-2">
                            <p className="font-roboto text-[14px] text-[#1D1D1F] font-medium">{company}</p>
                            <p className="text-sm text-[#86868B]">{index === 0 ? 'FCT, Niger, Kogi, Nasarawa' : index === 1 ? 'Edo, Delta, Ondo, Ekiti' : index === 2 ? 'Enugu, Abia, Anambra, Ebonyi, Imo' : index === 3 ? 'Lagos North and Central' : 'Oyo, Ogun, Osun, Kwara, parts of Niger'}</p>
                        </div>
                    </div>
                ))}
                </div>

                {/* Map Section */}
                <div className=" h-[501px] relative rounded-2xl shadow w-2/3 flex flex-col">
                    <iframe
                        title="Google Map"
                        src={`https://www.google.com/maps?q=${encodeURIComponent(
                            "Police Station Road, Opposite Ik Allen Market, Ikeja, Lagos State."
                        )}&output=embed`}
                        className="md:w-[43.438rem] h-[500px] rounded-lg"
                    />
                    <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg flex flex-col">
                        <p className="font-roboto  font-medium">Ikeja Electricity Distribution Company (IKEDC)</p>
                        <p className="flex items-center text-[#86868B]">
                            <CiLocationOn className="mr-2 text-[#00984C]" /> 
                            Police Station Road, Opposite Ik Allen Market, Ikeja, Lagos State.
                        </p>
                        <p className="flex items-center text-[#86868B]">
                            <LiaPhoneSolid className="mr-2 text-[#00984C]" /> 
                            Serving: Lagos North and Central
                        </p>
                    </div>
           
                </div>
            </div>
        </section>
    </div>
  )
}

export default Home