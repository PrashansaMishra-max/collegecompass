import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL + "&sslmode=no-verify"
    }
  }
})

async function main() {
  await prisma.college.deleteMany()

  const colleges = [
    {
      name: "Indian Institute of Technology Bombay",
      location: "Mumbai",
      state: "Maharashtra",
      fees: 250000,
      rating: 4.8,
      overview: "IIT Bombay is one of India's premier engineering institutions, known for cutting-edge research and world-class faculty.",
      placements: "Average package 18 LPA, highest 1.2 CR. Top recruiters: Google, Microsoft, Goldman Sachs.",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5d/Indian_Institute_of_Technology_Bombay_Logo.svg/1200px-Indian_Institute_of_Technology_Bombay_Logo.svg.png",
      type: "Government",
      courses: ["B.Tech", "M.Tech", "MBA", "PhD", "M.Sc"]
    },
    {
      name: "Indian Institute of Technology Delhi",
      location: "New Delhi",
      state: "Delhi",
      fees: 230000,
      rating: 4.7,
      overview: "IIT Delhi is a world-renowned institution offering top-tier engineering and technology programs.",
      placements: "Average package 16 LPA, highest 2 CR. Top recruiters: Amazon, Flipkart, McKinsey.",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f7/IIT_Delhi_logo.svg/1200px-IIT_Delhi_logo.svg.png",
      type: "Government",
      courses: ["B.Tech", "M.Tech", "MBA", "PhD"]
    },
    {
      name: "BITS Pilani",
      location: "Pilani",
      state: "Rajasthan",
      fees: 450000,
      rating: 4.6,
      overview: "BITS Pilani is a top private engineering university known for its practice school program and industry connections.",
      placements: "Average package 14 LPA, highest 80 LPA. Top recruiters: Microsoft, Google, Qualcomm.",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/BITS_Pilani-Logo.svg/1200px-BITS_Pilani-Logo.svg.png",
      type: "Private",
      courses: ["B.E.", "M.E.", "MBA", "PhD", "M.Sc"]
    },
    {
      name: "National Institute of Technology Trichy",
      location: "Tiruchirappalli",
      state: "Tamil Nadu",
      fees: 150000,
      rating: 4.5,
      overview: "NIT Trichy is consistently ranked among the top NITs in India with excellent placement records.",
      placements: "Average package 12 LPA, highest 60 LPA. Top recruiters: TCS, Infosys, Samsung.",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/6/69/NIT_Trichy_Logo.svg/1200px-NIT_Trichy_Logo.svg.png",
      type: "Government",
      courses: ["B.Tech", "M.Tech", "MBA", "PhD"]
    },
    {
      name: "Vellore Institute of Technology",
      location: "Vellore",
      state: "Tamil Nadu",
      fees: 350000,
      rating: 4.2,
      overview: "VIT is one of India's largest private universities with strong industry partnerships and international collaborations.",
      placements: "Average package 8 LPA, highest 45 LPA. Top recruiters: Wipro, HCL, Cognizant.",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b3/VIT_University_seal_2017.svg/1200px-VIT_University_seal_2017.svg.png",
      type: "Private",
      courses: ["B.Tech", "M.Tech", "MBA", "PhD", "BCA"]
    },
    {
      name: "Delhi Technological University",
      location: "New Delhi",
      state: "Delhi",
      fees: 180000,
      rating: 4.3,
      overview: "DTU is a premier state technical university in Delhi known for strong placements and research output.",
      placements: "Average package 11 LPA, highest 70 LPA. Top recruiters: Amazon, Adobe, Bharti Airtel.",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/8/85/DTU%2C_Delhi_official_logo.png/220px-DTU%2C_Delhi_official_logo.png",
      type: "Government",
      courses: ["B.Tech", "M.Tech", "MBA", "PhD"]
    },
    {
      name: "Manipal Institute of Technology",
      location: "Manipal",
      state: "Karnataka",
      fees: 420000,
      rating: 4.1,
      overview: "MIT Manipal is a top private engineering college with a vibrant campus and strong alumni network.",
      placements: "Average package 7 LPA, highest 42 LPA. Top recruiters: Infosys, Wipro, Oracle.",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/8/8e/Manipal_Institute_of_Technology_logo.png/220px-Manipal_Institute_of_Technology_logo.png",
      type: "Private",
      courses: ["B.Tech", "M.Tech", "MBA", "PhD"]
    },
    {
      name: "Indian Institute of Technology Madras",
      location: "Chennai",
      state: "Tamil Nadu",
      fees: 240000,
      rating: 4.9,
      overview: "IIT Madras is India's top-ranked engineering institution with world-class research facilities.",
      placements: "Average package 20 LPA, highest 1.5 CR. Top recruiters: Google, Apple, DE Shaw.",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/6/69/IIT_Madras_Logo.svg/1200px-IIT_Madras_Logo.svg.png",
      type: "Government",
      courses: ["B.Tech", "M.Tech", "MBA", "PhD", "M.Sc"]
    },
    {
      name: "SRM Institute of Science and Technology",
      location: "Chennai",
      state: "Tamil Nadu",
      fees: 380000,
      rating: 3.9,
      overview: "SRM is one of India's largest private universities with strong industry connections and modern infrastructure.",
      placements: "Average package 6 LPA, highest 35 LPA. Top recruiters: TCS, Infosys, Capgemini.",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/SRM_University_logo.png/220px-SRM_University_logo.png",
      type: "Private",
      courses: ["B.Tech", "M.Tech", "MBA", "BCA", "PhD"]
    },
    {
      name: "Indian Institute of Technology Kharagpur",
      location: "Kharagpur",
      state: "West Bengal",
      fees: 220000,
      rating: 4.7,
      overview: "The first IIT established in India, IIT Kharagpur has a sprawling campus and exceptional research programs.",
      placements: "Average package 17 LPA, highest 1.8 CR. Top recruiters: Microsoft, Google, Tower Research.",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7c/IIT_Kharagpur_Logo.svg/1200px-IIT_Kharagpur_Logo.svg.png",
      type: "Government",
      courses: ["B.Tech", "M.Tech", "MBA", "PhD", "M.Sc", "BArch"]
    },
    {
      name: "Amity University",
      location: "Noida",
      state: "Uttar Pradesh",
      fees: 320000,
      rating: 3.8,
      overview: "Amity is one of India's largest private universities with campuses across India and abroad.",
      placements: "Average package 5 LPA, highest 25 LPA. Top recruiters: HCL, Tech Mahindra, Deloitte.",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Amity_University_logo.svg/1200px-Amity_University_logo.svg.png",
      type: "Private",
      courses: ["B.Tech", "MBA", "BCA", "B.Sc", "LLB", "PhD"]
    },
    {
      name: "Jadavpur University",
      location: "Kolkata",
      state: "West Bengal",
      fees: 50000,
      rating: 4.4,
      overview: "Jadavpur University is a premier state university known for engineering and arts programs.",
      placements: "Average package 9 LPA, highest 45 LPA. Top recruiters: TCS, Infosys, Tata Motors.",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4e/Jadavpur_University_Logo.svg/1200px-Jadavpur_University_Logo.svg.png",
      type: "Government",
      courses: ["B.Tech", "M.Tech", "BA", "MA", "PhD"]
    },
    {
      name: "PSG College of Technology",
      location: "Coimbatore",
      state: "Tamil Nadu",
      fees: 120000,
      rating: 4.3,
      overview: "PSG Tech is one of South India's most reputed engineering colleges with strong industry ties.",
      placements: "Average package 8 LPA, highest 40 LPA. Top recruiters: Zoho, Cognizant, L&T.",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/0/07/PSG_College_of_Technology_logo.png/220px-PSG_College_of_Technology_logo.png",
      type: "Private",
      courses: ["B.E.", "M.E.", "MBA", "MCA", "PhD"]
    },
    {
      name: "Thapar Institute of Engineering",
      location: "Patiala",
      state: "Punjab",
      fees: 400000,
      rating: 4.2,
      overview: "Thapar is a top private engineering institute known for its research culture and placement record.",
      placements: "Average package 10 LPA, highest 55 LPA. Top recruiters: Google, Microsoft, Samsung.",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3c/Thapar_University_wordmark.png/220px-Thapar_University_wordmark.png",
      type: "Private",
      courses: ["B.E.", "M.E.", "MBA", "PhD"]
    },
    {
      name: "Indian Institute of Technology Roorkee",
      location: "Roorkee",
      state: "Uttarakhand",
      fees: 235000,
      rating: 4.6,
      overview: "IIT Roorkee is one of Asia's oldest technical institutes with excellence in engineering and sciences.",
      placements: "Average package 15 LPA, highest 1.2 CR. Top recruiters: Amazon, Microsoft, Qualcomm.",
      image: "https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/IIT_Roorkee_logo.png/220px-IIT_Roorkee_logo.png",
      type: "Government",
      courses: ["B.Tech", "M.Tech", "MBA", "PhD", "M.Sc"]
    },
  ]

  for (const college of colleges) {
    await prisma.college.create({ data: college })
  }

  console.log('✅ Seeded', colleges.length, 'colleges')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())