import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import logo from './logo.svg'
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'
import newDocImage from './DoctorGroup.jpeg'
import Hemant_Photo from './Hemant_Photo.jpg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo,
    newDocImage,
    Hemant_Photo
}

export const specialityData = [
    {
        speciality: 'Weight Training',
        image: General_physician
    },
    {
        speciality: 'Yoga & Meditation',
        image: Gynecologist
    },
    {
        speciality: 'Cardio & Endurance',
        image: Dermatologist
    },
    {
        speciality: 'Nutrition & Diet',
        image: Pediatricians
    },
    {
        speciality: 'Physiotherapy',
        image: Neurologist
    },
    {
        speciality: 'HIIT & CrossFit',
        image: Gastroenterologist
    },
]

export const trainers = [
    {
        _id: 'doc1',
        name: 'Coach Richard James',
        image: doc1,
        speciality: 'Weight Training',
        degree: 'CSCS Certified',
        experience: '4 Years',
        about: 'Coach Richard is passionate about strength and conditioning, helping clients build muscle, improve performance, and reach their peak physical potential through personalized weight training programs.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc2',
        name: 'Coach Emily Larson',
        image: doc2,
        speciality: 'Yoga & Meditation',
        degree: 'RYT-500 Certified',
        experience: '3 Years',
        about: 'Coach Emily brings mindfulness and movement together, offering transformative yoga and meditation sessions for stress relief, flexibility, and holistic well-being.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc3',
        name: 'Coach Sarah Patel',
        image: doc3,
        speciality: 'Cardio & Endurance',
        degree: 'ACSM Certified',
        experience: '1 Years',
        about: 'Coach Sarah specializes in cardiovascular training and endurance building, designing programs that boost stamina, burn fat, and improve overall heart health.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc4',
        name: 'Coach Christopher Lee',
        image: doc4,
        speciality: 'Nutrition & Diet',
        degree: 'ISSA Nutrition Certified',
        experience: '2 Years',
        about: 'Coach Christopher is a certified nutrition expert who creates personalized meal plans and dietary strategies to help clients achieve their weight loss, muscle gain, and wellness goals.',
        fees: 40,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc5',
        name: 'Coach Jennifer Garcia',
        image: doc5,
        speciality: 'Physiotherapy',
        degree: 'DPT Certified',
        experience: '4 Years',
        about: 'Coach Jennifer is a physiotherapy expert helping clients recover from injuries, manage chronic pain, and restore mobility through evidence-based rehabilitation techniques.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc6',
        name: 'Coach Andrew Williams',
        image: doc6,
        speciality: 'HIIT & CrossFit',
        degree: 'CrossFit L2 Certified',
        experience: '4 Years',
        about: 'Coach Andrew brings high-intensity energy to every session, coaching HIIT and CrossFit workouts designed to maximize fat burn, build functional strength, and improve athletic performance.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc7',
        name: 'Coach Christopher Davis',
        image: doc7,
        speciality: 'Weight Training',
        degree: 'NSCA Certified',
        experience: '4 Years',
        about: 'Coach Christopher Davis delivers science-based strength training programs, focusing on progressive overload, proper form, and long-term muscle development for all fitness levels.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc8',
        name: 'Coach Timothy White',
        image: doc8,
        speciality: 'Yoga & Meditation',
        degree: 'RYT-200 Certified',
        experience: '3 Years',
        about: 'Coach Timothy blends traditional yoga philosophy with modern wellness practices, guiding clients through mindful movement, breathwork, and meditation for inner balance.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc9',
        name: 'Coach Ava Mitchell',
        image: doc9,
        speciality: 'Cardio & Endurance',
        degree: 'NASM CPT Certified',
        experience: '1 Years',
        about: 'Coach Ava designs dynamic cardio routines and endurance challenges that keep clients motivated while systematically improving their cardiovascular fitness and stamina.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc10',
        name: 'Coach Jeffrey King',
        image: doc10,
        speciality: 'Nutrition & Diet',
        degree: 'ACE Nutrition Certified',
        experience: '2 Years',
        about: 'Coach Jeffrey helps clients transform their relationship with food through balanced nutrition education, macro tracking, and sustainable diet plans tailored to individual goals.',
        fees: 40,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc11',
        name: 'Coach Zoe Kelly',
        image: doc11,
        speciality: 'Physiotherapy',
        degree: 'MPT Certified',
        experience: '4 Years',
        about: 'Coach Zoe specializes in injury prevention and sports rehabilitation, using targeted physiotherapy techniques to help athletes and everyday clients move pain-free.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc12',
        name: 'Coach Patrick Harris',
        image: doc12,
        speciality: 'HIIT & CrossFit',
        degree: 'CrossFit L1 Certified',
        experience: '4 Years',
        about: 'Coach Patrick pushes clients beyond their comfort zones with intense, results-driven HIIT and CrossFit sessions that build explosive power, agility, and total body fitness.',
        fees: 50,
        address: {
            line1: '57th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc13',
        name: 'Coach Chloe Evans',
        image: doc13,
        speciality: 'Weight Training',
        degree: 'ISSA CPT Certified',
        experience: '4 Years',
        about: 'Coach Chloe empowers clients of all body types with structured weight training programs, emphasizing form, consistency, and progressive results in a supportive environment.',
        fees: 50,
        address: {
            line1: '17th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc14',
        name: 'Coach Ryan Martinez',
        image: doc14,
        speciality: 'Yoga & Meditation',
        degree: 'RYT-300 Certified',
        experience: '3 Years',
        about: 'Coach Ryan creates serene and energizing yoga sessions tailored for stress relief, flexibility improvement, and mental clarity through the art of mindful movement.',
        fees: 60,
        address: {
            line1: '27th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc15',
        name: 'Coach Amelia Hill',
        image: doc15,
        speciality: 'Cardio & Endurance',
        degree: 'NASM CPT Certified',
        experience: '1 Years',
        about: 'Coach Amelia crafts personalized cardio programs that challenge and inspire clients to improve their endurance, lose weight, and build a healthier, more energetic lifestyle.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
]