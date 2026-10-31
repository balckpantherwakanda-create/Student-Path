// Database of Intermediate Colleges with detailed fee structures and information
const COLLEGES_DATA = [
  {
    id: "sri-chaitanya-madhapur",
    name: "Sri Chaitanya Junior College",
    branch: "Madhapur Main Campus",
    city: "Hyderabad",
    district: "Ranga Reddy",
    state: "Telangana",
    type: "Private Residential / Day Scholar",
    gender: "Co-ed",
    established: 1986,
    rating: 4.6,
    reviewCount: 328,
    image: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80"
    ],
    address: "H.No 1-90/2/B, Near Cyber Towers, Madhapur, Hyderabad - 500081",
    phone: "+91 98490 12345",
    whatsapp: "+91 98490 12345",
    email: "admissions.madhapur@srichaitanya.net",
    website: "https://srichaitanya.net",
    streams: ["MPC", "BiPC", "MEC"],
    coachingOffered: ["JEE Main & Advanced", "NEET Medical", "BITSAT", "EAMCET/TG EAPCET", "CA Foundation"],
    batchTypes: ["IPL Super-60", "Neon Star Batch", "Regular Intermediate + Coaching", "Day Scholar Morning-to-Evening"],
    
    // Detailed Fee Structure (Per Annum in INR)
    feeStructure: {
      tuitionFee: 85000,
      admissionFee: 10000,
      coachingFee: 45000,
      labExamFee: 12000,
      booksUniformFee: 8000,
      totalDayScholar: 160000,
      hostelFeeAC: 95000,
      hostelFeeNonAC: 70000,
      busFeeAvg: 22000, // depending on distance
      installmentsAllowed: 3,
      installmentPlan: "1st: ₹60,000 at admission | 2nd: ₹50,000 (Sep) | 3rd: ₹50,000 (Dec)"
    },

    // Scholarship concessions based on 10th GPA/Marks
    scholarships: [
      { minGPA: 10.0, concessionPercentage: 40, desc: "10.0 GPA in 10th Board: 40% Off on Tuition Fee" },
      { minGPA: 9.8, concessionPercentage: 25, desc: "9.8+ GPA: 25% Off on Tuition Fee" },
      { minGPA: 9.5, concessionPercentage: 15, desc: "9.5+ GPA: 15% Off on Tuition Fee" },
      { minGPA: 9.0, concessionPercentage: 10, desc: "9.0+ GPA: 10% Off on Tuition Fee" }
    ],

    facilities: [
      "AC Digital Classrooms",
      "Advanced Physics/Chemistry/Bio Labs",
      "Full-time IIT/AIIMS Qualified Faculty",
      "Air-Conditioned & Non-AC Hostels",
      "Fleet of 35+ GPS-Tracked Buses",
      "Hygienic South & North Indian Mess",
      "Daily Practice Problems (DPP) Cell",
      "Biometric Attendance & Parent SMS"
    ],

    busRoutes: [
      { route: "Kukatpally to Madhapur Campus", fee: 18000, stops: ["KPHB Colony", "JNTU", "Hitec City", "Madhapur"] },
      { route: "Dilsukhnagar - Mehdipatnam to Campus", fee: 24000, stops: ["Dilsukhnagar", "Koti", "Mehdipatnam", "Gachibowli"] },
      { route: "Secunderabad - Begumpet to Campus", fee: 22000, stops: ["Clock Tower", "Paradise", "Begumpet", "Jubilee Hills"] }
    ],

    pastResults: {
      topRankJEE: "All India Rank 14 (JEE Adv)",
      topRankNEET: "All India Rank 38 (NEET)",
      totalIitiansLastYear: "450+",
      stateTopScores: "992/1000 in IPE"
    },
    
    verified: true,
    tag: "Top Rated for JEE/NEET"
  },
  {
    id: "narayana-kphb",
    name: "Narayana Junior College",
    branch: "KPHB Colony Main Branch",
    city: "Hyderabad",
    district: "Medchal-Malkajgiri",
    state: "Telangana",
    type: "Private Residential / Day Scholar",
    gender: "Co-ed",
    established: 1979,
    rating: 4.5,
    reviewCount: 290,
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80"
    ],
    address: "Plot 12, Road No 1, KPHB Colony, Kukatpally, Hyderabad - 500072",
    phone: "+91 98480 54321",
    whatsapp: "+91 98480 54321",
    email: "admissions.kphb@narayanagroup.com",
    website: "https://narayanagroup.com",
    streams: ["MPC", "BiPC", "MEC", "CEC"],
    coachingOffered: ["JEE Main & Advanced", "NEET", "TG EAPCET", "CA Foundation", "CUET"],
    batchTypes: ["CO Spark Batch", "Olympiad Batch", "Medicon Super Batch", "Regular Intermediate"],
    
    feeStructure: {
      tuitionFee: 80000,
      admissionFee: 8000,
      coachingFee: 42000,
      labExamFee: 10000,
      booksUniformFee: 7500,
      totalDayScholar: 147500,
      hostelFeeAC: 90000,
      hostelFeeNonAC: 65000,
      busFeeAvg: 20000,
      installmentsAllowed: 3,
      installmentPlan: "1st: ₹55,000 at admission | 2nd: ₹50,000 (Aug) | 3rd: ₹42,500 (Nov)"
    },

    scholarships: [
      { minGPA: 10.0, concessionPercentage: 35, desc: "10.0 GPA in 10th: 35% Tuition Waiver" },
      { minGPA: 9.8, concessionPercentage: 20, desc: "9.8+ GPA: 20% Tuition Waiver" },
      { minGPA: 9.2, concessionPercentage: 15, desc: "9.2+ GPA: 15% Tuition Waiver" }
    ],

    facilities: [
      "Smart Classrooms with LCD Projection",
      "Special Focus on n-Learn App & Online Tests",
      "Experienced Senior Faculty",
      "Dedicated AC Hostels for Boys & Girls",
      "Extensive Bus Network covering 40+ routes",
      "Nutritious Mess with RO Mineral Water",
      "Weekly Error Analysis & Remedial Sessions"
    ],

    busRoutes: [
      { route: "Miyapur - Chandanagar to KPHB", fee: 16000, stops: ["BHEL", "Chandanagar", "Miyapur", "KPHB"] },
      { route: "Balanagar - Sanathnagar to KPHB", fee: 18000, stops: ["Balanagar", "Moosapet", "Kukatpally", "KPHB"] },
      { route: "Nizampet - Pragathi Nagar to KPHB", fee: 14000, stops: ["Pragathi Nagar", "Nizampet X Roads", "KPHB"] }
    ],

    pastResults: {
      topRankJEE: "AIR 21 (JEE Adv)",
      topRankNEET: "AIR 45 (NEET)",
      totalIitiansLastYear: "410+",
      stateTopScores: "991/1000 in IPE"
    },
    
    verified: true,
    tag: "High Track Record in Competitive Exams"
  },
  {
    id: "little-flower-abids",
    name: "Little Flower Junior College",
    branch: "Uppal Campus",
    city: "Hyderabad",
    district: "Hyderabad",
    state: "Telangana",
    type: "Private Aided / Day Scholar",
    gender: "Co-ed",
    established: 1974,
    rating: 4.7,
    reviewCount: 412,
    image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80"
    ],
    address: "Uppal Main Road, Habsiguda, Hyderabad - 500039",
    phone: "+91 040 2720 1358",
    whatsapp: "+91 94400 67890",
    email: "info@lfjcuppal.ac.in",
    website: "https://lfjcuppal.ac.in",
    streams: ["MPC", "BiPC", "MEC", "CEC"],
    coachingOffered: ["EAMCET/EAPCET", "CUET", "CA Foundation Integrated", "Civil Services Foundation"],
    batchTypes: ["General Academic Batch", "Integrated Foundation Batch"],
    
    feeStructure: {
      tuitionFee: 35000,
      admissionFee: 5000,
      coachingFee: 15000,
      labExamFee: 5000,
      booksUniformFee: 5000,
      totalDayScholar: 60000,
      hostelFeeAC: 0,
      hostelFeeNonAC: 0,
      busFeeAvg: 14000,
      installmentsAllowed: 2,
      installmentPlan: "1st Term: ₹35,000 at admission | 2nd Term: ₹25,000 (October)"
    },

    scholarships: [
      { minGPA: 10.0, concessionPercentage: 50, desc: "10.0 GPA (Need & Merit Based): 50% Tuition Waiver" },
      { minGPA: 9.5, concessionPercentage: 25, desc: "9.5+ GPA: 25% Tuition Waiver" }
    ],

    facilities: [
      "Lush Green 15-Acre Campus",
      "Huge Sports Ground (Cricket, Football, Basketball, Athletics)",
      "Traditional Academic Excellence with Disciplined Atmosphere",
      "State-of-the-Art Science & Computer Labs",
      "Central Library with 25,000+ Books",
      "Cultural & Literary Clubs, NCC & NSS"
    ],

    busRoutes: [
      { route: "Dilsukhnagar - LB Nagar to Uppal", fee: 12000, stops: ["LB Nagar", "Nagole", "Uppal X Roads"] },
      { route: "Secunderabad - Tarnaka to Uppal", fee: 14000, stops: ["Secunderabad", "Sitafalmandi", "Tarnaka", "Habsiguda"] },
      { route: "ECIL - Nacharam to Uppal", fee: 11000, stops: ["ECIL", "Moula Ali", "Mallapur", "Nacharam"] }
    ],

    pastResults: {
      topRankJEE: "State EAMCET Rank 84",
      topRankNEET: "State Rank 112",
      totalIitiansLastYear: "85+",
      stateTopScores: "994/1000 in IPE (Board 1st Mark)"
    },
    
    verified: true,
    tag: "Best for Balanced Academics & Sports"
  },
  {
    id: "page-junior-college",
    name: "PAGE Junior College",
    branch: "Banjara Hills & Kompally",
    city: "Hyderabad",
    district: "Hyderabad",
    state: "Telangana",
    type: "Private Day Scholar / Integrated",
    gender: "Co-ed",
    established: 1988,
    rating: 4.6,
    reviewCount: 184,
    image: "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80"
    ],
    address: "Road No. 2, Banjara Hills, Near Sagar Society, Hyderabad - 500034",
    phone: "+91 91000 45678",
    whatsapp: "+91 91000 45678",
    email: "admissions@pageacademy.com",
    website: "https://pageacademy.com",
    streams: ["MPC", "MEC", "CEC"],
    coachingOffered: ["JEE Mains", "BITSAT", "CLAT (Law)", "IPMAT (IIM Indore/Rohtak)", "NATA / NID / NIFT", "CUET"],
    batchTypes: ["Design & Architecture Integrated", "Law & Management Integrated", "Engineering BITSAT/JEE"],
    
    feeStructure: {
      tuitionFee: 95000,
      admissionFee: 12000,
      coachingFee: 55000,
      labExamFee: 10000,
      booksUniformFee: 8000,
      totalDayScholar: 180000,
      hostelFeeAC: 0,
      hostelFeeNonAC: 0,
      busFeeAvg: 25000,
      installmentsAllowed: 3,
      installmentPlan: "1st: ₹70,000 at admission | 2nd: ₹60,000 (Sep) | 3rd: ₹50,000 (Dec)"
    },

    scholarships: [
      { minGPA: 9.8, concessionPercentage: 30, desc: "9.8+ GPA / PAGE Talent Test: 30% Waiver" },
      { minGPA: 9.0, concessionPercentage: 15, desc: "9.0+ GPA: 15% Waiver" }
    ],

    facilities: [
      "Specialized Mentorship for IPMAT & Design/Architecture",
      "Interactive Smart Classes with Audio-Visual Aids",
      "Small Batch Size (Only 35 students per section)",
      "Dedicated Mock Test Portal with Analytics",
      "AC Classrooms & Modern Discussion Lounges",
      "Career Guidance by Alumni from IIMs & NLUs"
    ],

    busRoutes: [
      { route: "Kukatpally - Jubilee Hills to Banjara Hills", fee: 22000, stops: ["KPHB", "Hitec City", "Jubilee Hills", "Banjara Hills"] },
      { route: "Dilsukhnagar - Koti to Banjara Hills", fee: 20000, stops: ["Chaderghat", "Abids", "Lakdikapul", "Banjara Hills"] }
    ],

    pastResults: {
      topRankJEE: "BITSAT 380/390 (Top Score)",
      topRankNEET: "N/A (Focus on Engg/Law/Mgmt)",
      totalIitiansLastYear: "IIM IPMAT Selections: 34 students, NLU CLAT: 48",
      stateTopScores: "988/1000 in IPE"
    },
    
    verified: true,
    tag: "No. 1 for IPMAT, CLAT & BITSAT"
  },
  {
    id: "st-anns-mehdipatnam",
    name: "St. Ann's Junior College for Girls",
    branch: "Mehdipatnam Main Campus",
    city: "Hyderabad",
    district: "Hyderabad",
    state: "Telangana",
    type: "Private Christian Minority / Girls Only",
    gender: "Girls",
    established: 1983,
    rating: 4.8,
    reviewCount: 356,
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80"
    ],
    address: "Santoshnagar Colony, Mehdipatnam, Hyderabad - 500028",
    phone: "+91 040 2351 3020",
    whatsapp: "+91 93900 11223",
    email: "stannscollege_mehdipatnam@yahoo.co.in",
    website: "https://stannscollegemehdipatnam.edu.in",
    streams: ["MPC", "BiPC", "MEC", "CEC", "HEC"],
    coachingOffered: ["NEET Coaching for Girls", "CA Foundation", "CUET", "Civil Services Orientation"],
    batchTypes: ["Pure Academic Excellence", "Medical Focus Batch", "Commerce & Arts Special"],
    
    feeStructure: {
      tuitionFee: 28000,
      admissionFee: 4000,
      coachingFee: 12000,
      labExamFee: 4000,
      booksUniformFee: 4500,
      totalDayScholar: 52500,
      hostelFeeAC: 0,
      hostelFeeNonAC: 55000,
      busFeeAvg: 15000,
      installmentsAllowed: 2,
      installmentPlan: "Term 1: ₹30,000 | Term 2: ₹22,500 (November)"
    },

    scholarships: [
      { minGPA: 9.8, concessionPercentage: 50, desc: "9.8+ GPA / Economically Backward Girls: 50% Concession" },
      { minGPA: 9.2, concessionPercentage: 25, desc: "9.2+ GPA: 25% Concession" }
    ],

    facilities: [
      "Safe, Secure, 100% CCTV Monitored Girls Campus",
      "Affordable High-Standard Education",
      "State-of-the-Art Biology & Chemistry Labs",
      "Auditorium, Gymnasium & Badminton Court",
      "Dedicated Value Education & Personality Development",
      "Active Career Guidance & Placements Cell"
    ],

    busRoutes: [
      { route: "Attapur - Rajendranagar to Mehdipatnam", fee: 12000, stops: ["Aramghar", "Upperpally", "Attapur", "Mehdipatnam"] },
      { route: "Tolichowki - Gachibowli to Mehdipatnam", fee: 13000, stops: ["Gachibowli", "Shaikpet", "Tolichowki", "Mehdipatnam"] },
      { route: "Banjara Hills - Masab Tank to Mehdipatnam", fee: 14000, stops: ["Panjagutta", "Banjara Hills", "Masab Tank", "Mehdipatnam"] }
    ],

    pastResults: {
      topRankJEE: "State EAMCET Rank 142",
      topRankNEET: "NEET Top Score: 668/720",
      totalIitiansLastYear: "Medical Seats: 42 girls in Govt Medical Colleges",
      stateTopScores: "993/1000 in IPE Board"
    },
    
    verified: true,
    tag: "Top Rated Girls Intermediate College"
  },
  {
    id: "resonance-junior-college",
    name: "Resonance Junior College",
    branch: "Tarnaka & Madhapur",
    city: "Hyderabad",
    district: "Hyderabad",
    state: "Telangana",
    type: "Private Day Scholar / Semi-Residential",
    gender: "Co-ed",
    established: 2001,
    rating: 4.4,
    reviewCount: 165,
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80"
    ],
    address: "Street No. 1, Tarnaka, Secunderabad - 500017",
    phone: "+91 93900 88990",
    whatsapp: "+91 93900 88990",
    email: "hyderabad@resonance.ac.in",
    website: "https://resonance.ac.in",
    streams: ["MPC", "BiPC"],
    coachingOffered: ["JEE Advanced", "JEE Main", "NEET-UG", "KVPY / Olympiad"],
    batchTypes: ["VIKAAS (JEE Adv)", "VIPUL (NEET)", "Regular Coaching"],
    
    feeStructure: {
      tuitionFee: 75000,
      admissionFee: 8000,
      coachingFee: 40000,
      labExamFee: 8000,
      booksUniformFee: 7000,
      totalDayScholar: 138000,
      hostelFeeAC: 85000,
      hostelFeeNonAC: 60000,
      busFeeAvg: 18000,
      installmentsAllowed: 3,
      installmentPlan: "1st: ₹50,000 | 2nd: ₹48,000 (Aug) | 3rd: ₹40,000 (Nov)"
    },

    scholarships: [
      { minGPA: 10.0, concessionPercentage: 35, desc: "ResoNET / 10.0 GPA: Up to 35% fee waiver" },
      { minGPA: 9.5, concessionPercentage: 20, desc: "9.5+ GPA: 20% fee waiver" }
    ],

    facilities: [
      "Kota Methodology Curriculum & Problem Sheets",
      "Concept-oriented Teaching with Doubt Clarification Counters",
      "Bi-weekly Computer Based Testing (CBT)",
      "Air-conditioned Classrooms & Wi-Fi Library"
    ],

    busRoutes: [
      { route: "Uppal - Habsiguda to Tarnaka", fee: 12000, stops: ["Uppal", "Habsiguda", "Tarnaka"] },
      { route: "Malkajgiri - ECIL to Tarnaka", fee: 15000, stops: ["ECIL", "Neredmet", "Malkajgiri", "Tarnaka"] }
    ],

    pastResults: {
      topRankJEE: "AIR 64 (JEE Adv)",
      topRankNEET: "AIR 120 (NEET)",
      totalIitiansLastYear: "180+ IIT Selections",
      stateTopScores: "989/1000 in IPE"
    },
    
    verified: true,
    tag: "Authentic Kota Study System"
  },
  {
    id: "govt-junior-college-khairatabad",
    name: "Government Junior College for Boys & Girls",
    branch: "Khairatabad Model Campus",
    city: "Hyderabad",
    district: "Hyderabad",
    state: "Telangana",
    type: "Government / 100% Free Tuition",
    gender: "Co-ed",
    established: 1968,
    rating: 4.1,
    reviewCount: 120,
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=800&q=80"
    ],
    address: "Near Khairatabad Metro Station, Khairatabad, Hyderabad - 500004",
    phone: "+91 040 2330 4567",
    whatsapp: "+91 040 2330 4567",
    email: "gjc.khairatabad@telangana.gov.in",
    website: "https://tsbie.cgg.gov.in",
    streams: ["MPC", "BiPC", "CEC", "HEC", "Vocational"],
    coachingOffered: ["Free Special EAMCET Coaching by Govt Lecturers"],
    batchTypes: ["English Medium Regular", "Telugu Medium Regular", "Vocational Skills"],
    
    feeStructure: {
      tuitionFee: 0,
      admissionFee: 500,
      coachingFee: 0,
      labExamFee: 1200,
      booksUniformFee: 0,
      totalDayScholar: 1700,
      hostelFeeAC: 0,
      hostelFeeNonAC: 0,
      busFeeAvg: 0,
      installmentsAllowed: 1,
      installmentPlan: "Nominal Registration fee ₹1,700 only at admission"
    },

    scholarships: [
      { minGPA: 0.0, concessionPercentage: 100, desc: "100% Free Education + Free TSRTC Bus Pass + Free Textbooks" }
    ],

    facilities: [
      "Zero Tuition Fees (Funded by Govt of Telangana)",
      "Free Textbooks & Notebooks Distribution",
      "Free Student Bus Pass (TSRTC)",
      "Govt Welfare Hostels (Free Boarding & Lodging for BC/SC/ST/Minority)",
      "Experienced Post-Graduate (JL) Lecturers",
      "Well-equipped Science Labs"
    ],

    busRoutes: [
      { route: "All RTC City Routes (Free Bus Pass Valid)", fee: 0, stops: ["City-wide"] }
    ],

    pastResults: {
      topRankJEE: "State EAMCET Rank 450",
      topRankNEET: "NEET Qualified: 18 students",
      totalIitiansLastYear: "NIT/IIIT Selections: 12",
      stateTopScores: "978/1000 in IPE"
    },
    
    verified: true,
    tag: "100% Free Education & Bus Pass"
  },
  {
    id: "tapasya-commerce-college",
    name: "Tapasya College of Commerce & Management",
    branch: "Lakdikapul & Kukatpally",
    city: "Hyderabad",
    district: "Hyderabad",
    state: "Telangana",
    type: "Private Day Scholar",
    gender: "Co-ed",
    established: 2009,
    rating: 4.5,
    reviewCount: 215,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
    ],
    address: "6-1-1063/B, Raj Bhavan Road, Lakdikapul, Hyderabad - 500004",
    phone: "+91 92461 72222",
    whatsapp: "+91 92461 72222",
    email: "admissions@tapasyaedu.com",
    website: "https://tapasyaedu.com",
    streams: ["MEC", "CEC"],
    coachingOffered: ["CA Foundation", "CMA Foundation", "CS Executive Entrance (CSEET)", "ACCA (UK)", "CUET Commerce"],
    batchTypes: ["CA Integrated Super 50", "CMA Exclusive Batch", "General MEC/CEC"],
    
    feeStructure: {
      tuitionFee: 48000,
      admissionFee: 6000,
      coachingFee: 24000,
      labExamFee: 5000,
      booksUniformFee: 5000,
      totalDayScholar: 88000,
      hostelFeeAC: 80000,
      hostelFeeNonAC: 55000,
      busFeeAvg: 16000,
      installmentsAllowed: 3,
      installmentPlan: "1st: ₹35,000 | 2nd: ₹30,000 (Sep) | 3rd: ₹23,000 (Dec)"
    },

    scholarships: [
      { minGPA: 10.0, concessionPercentage: 30, desc: "10.0 GPA in 10th: 30% Tuition Fee Concession" },
      { minGPA: 9.5, concessionPercentage: 15, desc: "9.5+ GPA: 15% Concession" }
    ],

    facilities: [
      "Specialized 100% Commerce & Professional CA/CMA Campus",
      "Classes by Practicing Chartered Accountants (CAs)",
      "Stock Market & Finance Simulation Workshops",
      "AC Classrooms with Wi-Fi & Digital Library",
      "Tie-ups with Top Auditing & Accounting Firms"
    ],

    busRoutes: [
      { route: "Kukatpally - Panjagutta to Lakdikapul", fee: 16000, stops: ["KPHB", "SR Nagar", "Ameerpet", "Lakdikapul"] },
      { route: "Dilsukhnagar - Koti to Lakdikapul", fee: 14000, stops: ["Malakpet", "Koti", "Abids", "Lakdikapul"] }
    ],

    pastResults: {
      topRankJEE: "N/A (Commerce Exclusive)",
      topRankNEET: "N/A",
      totalIitiansLastYear: "CA Foundation Pass Rate: 78% (Highest in South India)",
      stateTopScores: "990/1000 in MEC Stream"
    },
    
    verified: true,
    tag: "Best for CA & CMA Commerce Careers"
  },
  {
    id: "bhavans-sainikpuri",
    name: "Bhavan's Sri Ramakrishna Junior College",
    branch: "Sainikpuri Campus",
    city: "Secunderabad",
    district: "Medchal-Malkajgiri",
    state: "Telangana",
    type: "Private Composite / Day Scholar",
    gender: "Co-ed",
    established: 1974,
    rating: 4.7,
    reviewCount: 380,
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=800&q=80"
    ],
    address: "Bhavan's Campus, Sainikpuri, Secunderabad - 500094",
    phone: "+91 040 2711 1611",
    whatsapp: "+91 94900 33445",
    email: "bhavans_sainikpuri@yahoo.co.in",
    website: "https://bhavansvc.ac.in",
    streams: ["MPC", "BiPC", "MEC", "CEC"],
    coachingOffered: ["EAMCET Support", "CUET Guidance", "Civil Services Mentoring"],
    batchTypes: ["Day Scholar Regular Comprehensive"],
    
    feeStructure: {
      tuitionFee: 32000,
      admissionFee: 5000,
      coachingFee: 10000,
      labExamFee: 4500,
      booksUniformFee: 4500,
      totalDayScholar: 56000,
      hostelFeeAC: 0,
      hostelFeeNonAC: 0,
      busFeeAvg: 14000,
      installmentsAllowed: 2,
      installmentPlan: "Term 1: ₹32,000 at admission | Term 2: ₹24,000 (October)"
    },

    scholarships: [
      { minGPA: 9.8, concessionPercentage: 25, desc: "9.8+ GPA / Merit Scholars: 25% Tuition Waiver" }
    ],

    facilities: [
      "50-Acre Serene Green Campus in Sainikpuri",
      "Huge Sports Ground, Indoor Badminton & Basketball Courts",
      "Rich Cultural Heritage & Value Based Indian Education",
      "Modern Computer Labs & Digital Library",
      "Active NCC, NSS, and Science Clubs"
    ],

    busRoutes: [
      { route: "ECIL - AS Rao Nagar to Sainikpuri", fee: 10000, stops: ["ECIL", "AS Rao Nagar", "Sainikpuri"] },
      { route: "Alwal - Yapral to Sainikpuri", fee: 12000, stops: ["Alwal", "Lothkunta", "Yapral", "Sainikpuri"] },
      { route: "Secunderabad - Marredpally to Sainikpuri", fee: 15000, stops: ["Paradise", "Marredpally", "Trimulgherry", "Sainikpuri"] }
    ],

    pastResults: {
      topRankJEE: "State EAMCET Rank 95",
      topRankNEET: "NEET Top Score: 645/720",
      totalIitiansLastYear: "65+ Central University / Engg admissions",
      stateTopScores: "991/1000 in IPE"
    },
    
    verified: true,
    tag: "50-Acre Campus & Holistic Growth"
  },
  {
    id: "fiitjee-junior-college",
    name: "FIITJEE Junior College",
    branch: "Saifabad & Kukatpally",
    city: "Hyderabad",
    district: "Hyderabad",
    state: "Telangana",
    type: "Private Intensive Coaching / Day Scholar",
    gender: "Co-ed",
    established: 1992,
    rating: 4.6,
    reviewCount: 230,
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80"
    ],
    address: "5-9-14/B, Saifabad, Opposite Secretariat, Hyderabad - 500063",
    phone: "+91 040 6677 7000",
    whatsapp: "+91 98499 87654",
    email: "hyderabad@fiitjee.com",
    website: "https://fiitjeejrcollege.com",
    streams: ["MPC"],
    coachingOffered: ["JEE Advanced Intensive", "JEE Main", "BITSAT", "International Olympiads"],
    batchTypes: ["PINNACLE Two-Year Integrated Classroom Program", "SUPREME Batch"],
    
    feeStructure: {
      tuitionFee: 110000,
      admissionFee: 15000,
      coachingFee: 85000,
      labExamFee: 15000,
      booksUniformFee: 12000,
      totalDayScholar: 237000,
      hostelFeeAC: 110000,
      hostelFeeNonAC: 75000,
      busFeeAvg: 26000,
      installmentsAllowed: 3,
      installmentPlan: "1st: ₹95,000 | 2nd: ₹75,000 (Aug) | 3rd: ₹67,000 (Nov)"
    },

    scholarships: [
      { minGPA: 10.0, concessionPercentage: 75, desc: "FTRE / Edge Test: Up to 75% Tuition Waiver based on Exam" },
      { minGPA: 9.8, concessionPercentage: 30, desc: "10th Board 9.8+ GPA: 30% Concession on Tuition" }
    ],

    facilities: [
      "Top-tier Faculty from IITs and Top Engineering Colleges",
      "Rigorous All India Test Series (AITS)",
      "Comprehensive Analytical Test Performance Reports",
      "Air-Conditioned Campuses with High-Tech Doubt Clearing Cells",
      "National Level Benchmarking with Pan-India Students"
    ],

    busRoutes: [
      { route: "Kukatpally - SR Nagar to Saifabad", fee: 24000, stops: ["KPHB", "Kukatpally", "SR Nagar", "Saifabad"] },
      { route: "Secunderabad - Tank Bund to Saifabad", fee: 20000, stops: ["Secunderabad", "Ranigunj", "Tank Bund", "Saifabad"] }
    ],

    pastResults: {
      topRankJEE: "All India Rank 3 (JEE Advanced)",
      topRankNEET: "N/A (Pure Engineering focus)",
      totalIitiansLastYear: "620+ IIT Selections Pan-India",
      stateTopScores: "990/1000 in IPE"
    },
    
    verified: true,
    tag: "Premier Institute for IIT-JEE Advanced"
  },
  {
    id: "sri-medha-v-junior-college",
    name: "Sri Medha V Junior College",
    branch: "Vijayawada & Guntur",
    city: "Vijayawada",
    district: "Krishna",
    state: "Andhra Pradesh",
    type: "Private Residential / Day Scholar",
    gender: "Co-ed",
    established: 2005,
    rating: 4.5,
    reviewCount: 198,
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80"
    ],
    address: "Near Benz Circle, MG Road, Vijayawada - 520010",
    phone: "+91 866 247 8899",
    whatsapp: "+91 98855 44332",
    email: "admissions@srimedhav.com",
    website: "https://srimedhav.com",
    streams: ["MEC", "CEC", "MPC"],
    coachingOffered: ["CA Foundation", "CMA", "CS", "AP EAPCET", "Bank PO Foundation"],
    batchTypes: ["Chartered Accountancy Integrated", "General Commerce", "MPC Technology"],
    
    feeStructure: {
      tuitionFee: 42000,
      admissionFee: 5000,
      coachingFee: 20000,
      labExamFee: 5000,
      booksUniformFee: 4500,
      totalDayScholar: 76500,
      hostelFeeAC: 70000,
      hostelFeeNonAC: 48000,
      busFeeAvg: 14000,
      installmentsAllowed: 3,
      installmentPlan: "1st: ₹30,000 | 2nd: ₹25,000 | 3rd: ₹21,500"
    },

    scholarships: [
      { minGPA: 10.0, concessionPercentage: 35, desc: "10.0 GPA in AP SSC: 35% Fee Concession" },
      { minGPA: 9.5, concessionPercentage: 20, desc: "9.5+ GPA: 20% Fee Concession" }
    ],

    facilities: [
      "Pioneer in Coastal Andhra for Commerce & CA Stream",
      "Air-cooled Hostels with Hygienic Andhra Style Mess",
      "Special Focus on Spoken English & Interview Skills",
      "Daily Tests with Instant Parent Portal Updates"
    ],

    busRoutes: [
      { route: "Gannavaram - Ramavarappadu to Benz Circle", fee: 14000, stops: ["Gannavaram", "Ramavarappadu", "Benz Circle"] },
      { route: "Guntur - Mangalagiri to Benz Circle", fee: 18000, stops: ["Guntur Bus Stand", "Mangalagiri", "Benz Circle"] }
    ],

    pastResults: {
      topRankJEE: "AP EAPCET Rank 180",
      topRankNEET: "N/A",
      totalIitiansLastYear: "CA Foundation State 1st Rank",
      stateTopScores: "992/1000 in AP Board IPE"
    },
    
    verified: true,
    tag: "Top Commerce Choice in Andhra Pradesh"
  },
  {
    id: "dr-br-ambedkar-gurukulam",
    name: "Telangana Social Welfare Residential JC (TSWREIS)",
    branch: "Gowlidoddy Centre of Excellence",
    city: "Hyderabad",
    district: "Ranga Reddy",
    state: "Telangana",
    type: "Government Residential / COE (100% Free)",
    gender: "Co-ed (Separate Wings)",
    established: 2014,
    rating: 4.8,
    reviewCount: 310,
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80"
    ],
    address: "Gowlidoddy, Near Financial District, Gachibowli, Hyderabad - 500032",
    phone: "+91 040 2339 1585",
    whatsapp: "+91 040 2339 1585",
    email: "helpdesk-tswreis@telangana.gov.in",
    website: "https://tswreis.ac.in",
    streams: ["MPC", "BiPC", "MEC"],
    coachingOffered: ["Intensive IIT-JEE Advanced", "NEET Medical Coaching", "NDA / Defence"],
    batchTypes: ["Centre of Excellence (COE) Super-Batch"],
    
    feeStructure: {
      tuitionFee: 0,
      admissionFee: 0,
      coachingFee: 0,
      labExamFee: 0,
      booksUniformFee: 0,
      totalDayScholar: 0,
      hostelFeeAC: 0,
      hostelFeeNonAC: 0,
      busFeeAvg: 0,
      installmentsAllowed: 1,
      installmentPlan: "100% Free - Funded fully by Govt of Telangana"
    },

    scholarships: [
      { minGPA: 0.0, concessionPercentage: 100, desc: "100% Free Education, Residential Boarding, IIT Coaching & Laptops for entrance qualifiers" }
    ],

    facilities: [
      "100% Free Premium Residential Coaching",
      "Produced Multiple IIT & AIIMS Rankers from underprivileged backgrounds",
      "Nutritious 4-time diet with Egg, Milk, Fruits, Chicken/Mutton",
      "Free Tabs/Laptops for digital test preparation",
      "Highly qualified resident faculty with 24x7 doubt support"
    ],

    busRoutes: [
      { route: "Residential On-Campus Facility (Travel allowance provided by Govt)", fee: 0, stops: ["Statewide Selection"] }
    ],

    pastResults: {
      topRankJEE: "AIR 114 (IIT JEE Adv - Category 1st)",
      topRankNEET: "680/720 (AIIMS New Delhi Admission)",
      totalIitiansLastYear: "140+ IIT & NIT Admissions in Single Year",
      stateTopScores: "990/1000 in IPE"
    },
    
    verified: true,
    tag: "Govt Center of Excellence (100% Free)"
  }
];

// Streams Metadata
const STREAMS_DATA = [
  { id: "MPC", name: "MPC (Maths, Physics, Chemistry)", icon: "fa-calculator", desc: "Best for Engineering (IIT-JEE, BITSAT, State EAPCET), Architecture, Data Science, Defence (NDA)." },
  { id: "BiPC", name: "BiPC (Biology, Physics, Chemistry)", icon: "fa-dna", desc: "Best for Medicine (NEET, MBBS, BDS), Pharmacy, Agriculture, Biotechnology, Nursing." },
  { id: "MEC", name: "MEC (Maths, Economics, Commerce)", icon: "fa-chart-pie", desc: "Best for Chartered Accountancy (CA), CMA, IIM IPMAT, Corporate Finance, Actuarial Science." },
  { id: "CEC", name: "CEC (Civics, Economics, Commerce)", icon: "fa-briefcase", desc: "Best for Commerce, Law (CLAT), Civil Services (UPSC), Banking, Entrepreneurship." },
  { id: "HEC", name: "HEC (History, Economics, Civics)", icon: "fa-landmark", desc: "Best for Civil Services / IAS, Public Administration, Journalism, Humanities, Law." },
  { id: "Vocational", name: "Vocational Courses", icon: "fa-tools", desc: "Direct job-oriented skills in Medical Lab Tech, Computers, Accounting, Automobile." }
];

// Cities
const CITIES_DATA = ["All Cities", "Hyderabad", "Secunderabad", "Vijayawada", "Guntur", "Warangal", "Visakhapatnam"];
