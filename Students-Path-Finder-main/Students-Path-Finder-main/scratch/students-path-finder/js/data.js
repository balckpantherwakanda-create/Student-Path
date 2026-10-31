/**
 * Students Path Finder - Seed College Database
 * Realistic dataset with real photos, transparent fees, ratings & courses
 */

const SEED_COLLEGES_DATA = [
  {
    id: "sri-chaitanya-madhapur",
    code: "SCJC-HYD-01",
    name: "Sri Chaitanya Junior College",
    branch: "Madhapur Hi-Tech Campus",
    city: "Hyderabad",
    district: "Ranga Reddy",
    state: "Telangana",
    type: "Private Residential / Day Scholar",
    gender: "Co-ed",
    established: 1986,
    rating: 4.6,
    reviewCount: 412,
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=80"
    ],
    address: "Plot 12, Near Cyber Towers, Madhapur, Hyderabad - 500081",
    phone: "+91 98490 12345",
    whatsapp: "+91 98490 12345",
    email: "admissions@srichaitanya.net",
    website: "https://srichaitanya.net",
    streams: ["MPC (Maths, Physics, Chem)", "BiPC (Biology, Physics, Chem)", "MEC (Maths, Eco, Comm)"],
    coachingOffered: ["JEE Main & Advanced", "NEET Medical", "BITSAT", "State EAPCET", "CA Foundation"],
    batchTypes: ["IPL Super-60 Batch", "Neon Star Elite", "Regular Intermediate + Coaching", "Day Scholar Morning-Evening"],
    
    // Transparent Fee Structure (Per Annum in INR)
    feeStructure: {
      tuitionFee: 85000,
      admissionFee: 10000,
      coachingFee: 45000,
      labExamFee: 12000,
      booksUniformFee: 8000,
      totalDayScholar: 160000,
      hostelFeeAC: 95000,
      hostelFeeNonAC: 70000,
      busFeeAvg: 22000,
      installmentsAllowed: 3,
      installmentPlan: "1st: ₹60,000 at admission | 2nd: ₹50,000 (Sep) | 3rd: ₹50,000 (Dec)"
    },

    scholarships: [
      { minGPA: 10.0, concessionPercentage: 40, desc: "10.0 GPA in 10th Board: 40% Off on Tuition Fee" },
      { minGPA: 9.8, concessionPercentage: 25, desc: "9.8+ GPA: 25% Off on Tuition Fee" },
      { minGPA: 9.5, concessionPercentage: 15, desc: "9.5+ GPA: 15% Off on Tuition Fee" },
      { minGPA: 9.0, concessionPercentage: 10, desc: "9.0+ GPA: 10% Off on Tuition Fee" }
    ],

    facilities: [
      "Air-Conditioned Digital Smart Classrooms",
      "Advanced Physics, Chemistry & Biology Labs",
      "Full-time IIT & AIIMS Qualified Faculty",
      "Separate AC & Non-AC Hostels with 24/7 Security",
      "Fleet of 35+ GPS-Tracked College Buses",
      "Hygienic South & North Indian Food Court",
      "Daily Practice Problems (DPP) & Doubt Sessions",
      "Weekly All-India Level Mock Tests & Analysis"
    ],
    lastUpdated: "Today at 02:30 PM"
  },
  {
    id: "narayana-junior-college-kukatpally",
    code: "NJC-HYD-04",
    name: "Narayana Junior College & Olympiad Academy",
    branch: "Kukatpally Main Campus",
    city: "Hyderabad",
    district: "Medchal-Malkajgiri",
    state: "Telangana",
    type: "Private Residential / Semi-Residential",
    gender: "Co-ed",
    established: 1979,
    rating: 4.5,
    reviewCount: 388,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=900&q=80"
    ],
    address: "Near KPHB Metro Station, Kukatpally, Hyderabad - 500072",
    phone: "+91 99890 23456",
    whatsapp: "+91 99890 23456",
    email: "admissions.kphb@narayanagroup.com",
    website: "https://narayanagroup.com",
    streams: ["MPC (Maths, Physics, Chem)", "BiPC (Biology, Physics, Chem)", "MEC (Maths, Eco, Comm)", "CEC (Civics, Eco, Comm)"],
    coachingOffered: ["JEE Advanced (CO-Spark)", "NEET Medical", "BITSAT", "TG EAPCET", "CLAT & IPMAT"],
    batchTypes: ["CO-Spark / Medi-Spark", "Champs Batch", "Day Scholar Extensive", "Integrated Board Batch"],
    
    feeStructure: {
      tuitionFee: 80000,
      admissionFee: 8000,
      coachingFee: 42000,
      labExamFee: 10000,
      booksUniformFee: 7500,
      totalDayScholar: 147500,
      hostelFeeAC: 90000,
      hostelFeeNonAC: 68000,
      busFeeAvg: 20000,
      installmentsAllowed: 3,
      installmentPlan: "1st: ₹55,000 at admission | 2nd: ₹47,500 (Oct) | 3rd: ₹45,000 (Jan)"
    },

    scholarships: [
      { minGPA: 10.0, concessionPercentage: 35, desc: "10.0 GPA in 10th: 35% Concession on Tuition" },
      { minGPA: 9.7, concessionPercentage: 20, desc: "9.7+ GPA: 20% Concession on Tuition" },
      { minGPA: 9.3, concessionPercentage: 12, desc: "9.3+ GPA: 12% Concession on Tuition" }
    ],

    facilities: [
      "Micro-Level Concept Teaching Classrooms",
      "Biometric Attendance & Parent SMS Alert",
      "Dedicated Olympiad Faculty & Mentors",
      "Hostels with Resident Wardens & Infirmary",
      "Transport covering 40+ City Routes",
      "Weekly Error Analysis & Special Counseling"
    ],
    lastUpdated: "Yesterday at 04:15 PM"
  },
  {
    id: "page-junior-college-banjara",
    code: "PAGE-HYD-02",
    name: "PAGE Junior College",
    branch: "Banjara Hills Campus",
    city: "Hyderabad",
    district: "Hyderabad",
    state: "Telangana",
    type: "Private Day Scholar (Premium Boutique)",
    gender: "Co-ed",
    established: 1988,
    rating: 4.8,
    reviewCount: 245,
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=900&q=80"
    ],
    address: "Road No. 2, Near Park Hyatt, Banjara Hills, Hyderabad - 500034",
    phone: "+91 92465 52255",
    whatsapp: "+91 92465 52255",
    email: "info@pageacademy.com",
    website: "https://pageacademy.com",
    streams: ["MPC (Maths, Physics, Chem)", "MEC (Maths, Eco, Comm)", "CEC (Civics, Eco, Comm)"],
    coachingOffered: ["JEE Main & Advanced", "Design Architecture (NATA/UCEED)", "CLAT Law", "IPMAT / IIM Indore", "SAT Overseas"],
    batchTypes: ["Small Batch (Max 30 Students)", "Morning Intensive", "Integrated Liberal Arts"],
    
    feeStructure: {
      tuitionFee: 120000,
      admissionFee: 15000,
      coachingFee: 55000,
      labExamFee: 15000,
      booksUniformFee: 10000,
      totalDayScholar: 215000,
      hostelFeeAC: 120000,
      hostelFeeNonAC: 85000,
      busFeeAvg: 25000,
      installmentsAllowed: 2,
      installmentPlan: "50% at Admission | 50% in October"
    },

    scholarships: [
      { minGPA: 10.0, concessionPercentage: 30, desc: "10.0 GPA / 95%+ in 10th: 30% Concession" },
      { minGPA: 9.6, concessionPercentage: 15, desc: "9.6+ GPA: 15% Concession" }
    ],

    facilities: [
      "Air-Conditioned Ergonomic Classrooms",
      "Strict 1:25 Faculty to Student Ratio",
      "Career Guidance for Overseas Admissions",
      "Modern Design Studio & Architecture Lab",
      "Nutritious Cafeteria & Recreation Lounge"
    ],
    lastUpdated: "3 days ago"
  },
  {
    id: "govt-polytechnic-masab-tank",
    code: "GPT-HYD-01",
    name: "Government Polytechnic College",
    branch: "Masab Tank Campus",
    city: "Hyderabad",
    district: "Hyderabad",
    state: "Telangana",
    type: "Government Autonomous",
    gender: "Co-ed",
    established: 1923,
    rating: 4.4,
    reviewCount: 520,
    image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80"
    ],
    address: "Near Mahaveer Hospital, Masab Tank, Hyderabad - 500028",
    phone: "+91 40 2339 1234",
    whatsapp: "+91 94401 23456",
    email: "principal.gpthyd@telangana.gov.in",
    website: "https://polycet.sbtet.telangana.gov.in",
    streams: ["Polytechnic Diploma (Computer Engg)", "Polytechnic Diploma (ECE)", "Polytechnic Diploma (Mechanical)", "Polytechnic Diploma (Civil)"],
    coachingOffered: ["ECET Lateral Entry to 2nd Year B.Tech", "Industry Apprenticeship", "Govt PSU Exams"],
    batchTypes: ["State POLYCET Counseling Batch", "Direct Merit Intake"],
    
    feeStructure: {
      tuitionFee: 3800,
      admissionFee: 500,
      coachingFee: 0,
      labExamFee: 1200,
      booksUniformFee: 1500,
      totalDayScholar: 7000,
      hostelFeeAC: 0,
      hostelFeeNonAC: 8500,
      busFeeAvg: 0, // TSRTC Student Free Bus Pass applicable
      installmentsAllowed: 1,
      installmentPlan: "Full Payment at Counseling (100% Govt RTF Reimbursement for eligible SC/ST/BC/EBC)"
    },

    scholarships: [
      { minGPA: 8.0, concessionPercentage: 100, desc: "Full Govt Tuition Fee Reimbursement (JVD/ePASS) based on income" }
    ],

    facilities: [
      "Historic 100-Year Heritage Campus & Huge Workshops",
      "State-of-the-Art CNC Machinery & CAD/CAM Labs",
      "High-Speed NMEICT Optical Fiber Internet",
      "Government Subsidized Boys & Girls Hostel",
      "TSRTC Student Bus Pass Counter On Campus",
      "Direct Placement Cell with L&T, Tata Motors, DRDO"
    ],
    lastUpdated: "1 week ago"
  },
  {
    id: "loyola-academy-alwal",
    code: "LA-HYD-03",
    name: "Loyola Academy Degree & PG College",
    branch: "Old Alwal Campus",
    city: "Secunderabad",
    district: "Medchal-Malkajgiri",
    state: "Telangana",
    type: "Private Autonomous (NAAC A+ Accredited)",
    gender: "Co-ed",
    established: 1976,
    rating: 4.7,
    reviewCount: 395,
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=80"
    ],
    address: "Father Baliah Nagar, Old Alwal, Secunderabad - 500010",
    phone: "+91 40 2786 2363",
    whatsapp: "+91 98495 67890",
    email: "admissions@loyolaacademy.edu.in",
    website: "https://loyolaacademy.edu.in",
    streams: ["B.Sc Data Science & AI", "B.Com Business Analytics", "BBA Digital Marketing", "B.Sc Agricultural Science"],
    coachingOffered: ["Campus Recruitment Training (CRT)", "Civil Services IAS Academy", "Global Certifications"],
    batchTypes: ["Autonomous Honours Program", "Industry-Partnered Batch"],
    
    feeStructure: {
      tuitionFee: 65000,
      admissionFee: 7500,
      coachingFee: 15000,
      labExamFee: 8500,
      booksUniformFee: 5000,
      totalDayScholar: 101000,
      hostelFeeAC: 75000,
      hostelFeeNonAC: 55000,
      busFeeAvg: 18000,
      installmentsAllowed: 2,
      installmentPlan: "Semester 1: ₹55,000 | Semester 2: ₹46,000"
    },

    scholarships: [
      { minGPA: 9.8, concessionPercentage: 25, desc: "Academic Excellence Scholarship for 9.8+ GPA" },
      { minGPA: 9.0, concessionPercentage: 15, desc: "Merit Sports & Cultural Concession" }
    ],

    facilities: [
      "Sprawling 130-Acre Lush Green Campus",
      "Olympic-Sized Athletic Track & Cricket Pavilion",
      "Central Digital Library with 50,000+ Books",
      "Well-Furnished Campus Hostels",
      "Campus Placement tie-ups with Deloitte, Amazon, TCS"
    ],
    lastUpdated: "5 days ago"
  },
  {
    id: "st-ann-junior-college-mehdipatnam",
    code: "SAJC-HYD-05",
    name: "St. Ann's Junior College for Girls",
    branch: "Mehdipatnam Campus",
    city: "Hyderabad",
    district: "Hyderabad",
    state: "Telangana",
    type: "Private Aided / Un-Aided (Exclusively Girls)",
    gender: "Girls Only",
    established: 1983,
    rating: 4.8,
    reviewCount: 310,
    image: "https://images.unsplash.com/photo-1525921429624-479b6a26d84d?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1525921429624-479b6a26d84d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=900&q=80"
    ],
    address: "Santosh Nagar Colony, Mehdipatnam, Hyderabad - 500028",
    phone: "+91 40 2351 3020",
    whatsapp: "+91 93910 88221",
    email: "stannscollege_hyd@yahoo.co.in",
    website: "https://stannscollege.in",
    streams: ["MPC (Maths, Physics, Chem)", "BiPC (Biology, Physics, Chem)", "MEC (Maths, Eco, Comm)", "CEC (Civics, Eco, Comm)"],
    coachingOffered: ["NEET Medical Focus", "State Board Toppers Track", "CA CPT Foundation"],
    batchTypes: ["Morning General Shift", "Afternoon Intensive Shift"],
    
    feeStructure: {
      tuitionFee: 42000,
      admissionFee: 5000,
      coachingFee: 18000,
      labExamFee: 6000,
      booksUniformFee: 4500,
      totalDayScholar: 75500,
      hostelFeeAC: 0,
      hostelFeeNonAC: 50000,
      busFeeAvg: 16000,
      installmentsAllowed: 2,
      installmentPlan: "Term 1: ₹45,000 at admission | Term 2: ₹30,500 (November)"
    },

    scholarships: [
      { minGPA: 10.0, concessionPercentage: 30, desc: "Toppers Concession for 10.0 GPA Girls" },
      { minGPA: 9.5, concessionPercentage: 15, desc: "9.5+ GPA Merit Concession" }
    ],

    facilities: [
      "Safe, Secure Gated Campus with 24/7 Women Guards & CCTV",
      "Fully Equipped Botany, Zoology, Physics & Chemistry Labs",
      "Indoor Badminton Court & Table Tennis Arena",
      "Affordable On-Campus Sisters of St. Ann Hostel",
      "Dedicated Counselling & Personality Development Cell"
    ],
    lastUpdated: "Just now"
  }
];

if (typeof window !== 'undefined') {
  window.SEED_COLLEGES_DATA = SEED_COLLEGES_DATA;
}
