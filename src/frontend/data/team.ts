export interface CoreMember {
  name: string;
  rollNo: string;
  post: string;
  image: string; // path relative to /public, e.g. "/assets/team/john.jpg"
}

export interface CoordinatorMember {
  name: string;
  rollNo: string;
  post: string; // "Senior Coordinator" | "Junior Coordinator"
  image: string; // path relative to /public
}


// ─── President ────────────────────────────────────────────────────────────────
export const president: CoreMember = {
  name: "Kishlaya Sinha",
  rollNo: "BTECH/15001/23",
  post: "President",
  image: "/assets/team/Kishlaya-Sinha-BTECH-15001-23.webp",
};

// ─── Vice Presidents ──────────────────────────────────────────────────────────
export const vicePresidents: CoreMember[] = [
  {
    name: "Saumya Kumari",
    rollNo: "BTECH/15014/23",
    post: "Vice President",
    image: "/assets/team/Saumya-Kumari-BTECH-15014-23.webp",
  },
  {
    name: "Aditya Agarwal",
    rollNo: "BTECH/15011/23",
    post: "Vice President",
    image: "/assets/team/Aditya-Agarwal-BTECH-15011-23.webp",
  },
];

// ─── Core Executives (2023 batch) ───────────────────────────────────────────
// Displayed in a 4-column grid. Add/remove entries freely.
export const otherCoreExecutives: CoreMember[] = [

  {
    name: "Kalpana",
    rollNo: "BTECH/15031/23",
    post: "Core Executive",
    image: "/assets/team/Kalpana-BTECH-15031-23.webp",
  },
  {
    name: "Shivam",
    rollNo: "BTECH/15034/23",
    post: "Core Executive",
    image: "/assets/team/Shivam-BTECH-15034-23.webp",
  },
  {
    name: "Nidhi Sinha",
    rollNo: "BTECH/15197/23",
    post: "Core Executive",
    image: "/assets/team/Nidhi-Sinha-BTECH-15197-23.webp",
  },
  {
    name: "Prince Chaturvedi",
    rollNo: "BTECH/15160/23",
    post: "Core Executive",
    image: "/assets/team/Prince-Chaturvedi-BTECH-15160-23.webp",
  },
  {
    name: "Prem Kumar Singh",
    rollNo: "BTECH/15029/23",
    post: "Core Executive",
    image: "/assets/team/Prem-Kumar-Singh-BTECH-15029-23.webp",
  },
];

// ─── Senior Coordinators (2024 batch) ────────────────────────────────────────
// Roll numbers ending in /24 — displayed in paginated gallery.
// Sorted A→Z automatically at render time.

export const seniorCoordinators: CoordinatorMember[] = [
  {
    name: "Daya Shankar",
    rollNo: "BTECH/15203/24",
    post: "Senior Coordinator",
    image: "/assets/team/Daya-Shankar-BTECH-15203-24.webp",
  },
  {
    name: "Rajeev Raj",
    rollNo: "BTECH/15174/24",
    post: "Senior Coordinator",
    image: "/assets/team/Rajeev-Raj-BTECH-15174-24.webp",
  },
  {
    name: "Kshitij Tiwari",
    rollNo: "BTECH/15135/24",
    post: "Senior Coordinator",
    image: "/assets/team/Kshitij-Tiwari-BTECH-15135-24.webp",
  },
  {
    name: "Ashutosh Kumar",
    rollNo: "BTECH/15197/24",
    post: "Senior Coordinator",
    image: "/assets/team/Ashutosh-Kumar-BTECH-15197-24.webp",
  },
  {
    name: "Aayush Arya",
    rollNo: "BTECH/15206/24",
    post: "Senior Coordinator",
    image: "/assets/team/Aayush-Arya-BTECH-15206-24.webp",
  },
];

// ─── Junior Coordinators (2025 batch) ────────────────────────────────────────
// Roll numbers ending in /25 — displayed in paginated gallery.
// Sorted A→Z automatically at render time.

export const juniorCoordinators: CoordinatorMember[] = [
  {
    name: "Aditya Shrivastava",
    rollNo: "BTECH/15036/25",
    post: "Junior Coordinator",
    image: "/assets/team/Aditya-Shrivastava-BTECH-15036-25.webp",
  },
  {
    name: "Puru Saraswat",
    rollNo: "BTECH/15151/25",
    post: "Junior Coordinator",
    image: "/assets/team/Puru-Saraswat-BTECH-15151-25.webp",
  },
  {
    name: "Janmejay Shibaprasad Mahanta",
    rollNo: "BTECH/15123/25",
    post: "Junior Coordinator",
    image: "/assets/team/Janmejay-Shibaprasad-Mahanta-BTECH-15123-25.png",
  },
  {
    name: "Harsh Raj",
    rollNo: "BTECH/15119/25",
    post: "Junior Coordinator",
    image: "/assets/team/Harsh-Raj-BTECH-15119-25.webp",
  },
  {
    name: "Raushan Raj",
    rollNo: "BTECH/15220/25",
    post: "Junior Coordinator",
    image: "/assets/team/Raushan-Raj-BTECH-15220-25.png",
  },
  {
    name: "Kshitiz Tiwari",
    rollNo: "BTECH/15057/25",
    post: "Junior Coordinator",
    image: "/assets/team/Kshitiz-Tiwari-BTECH-15057-25.png",
  },
  {
    name: "Deep Anchal",
    rollNo: "BCA/15015/25",
    post: "Junior Coordinator",
    image: "/assets/team/Deep-Anchal-BCA-15015-25.webp",
  },
  {
    name: "Pranay Anand",
    rollNo: "BTECH/15087/25",
    post: "Junior Coordinator",
    image: "/assets/team/Pranay-Anand-BTECH-15087-25.webp",
  },
  {
    name: "Raj Laxmi",
    rollNo: "BTECH/15023/25",
    post: "Junior Coordinator",
    image: "/assets/team/Raj-Laxmi-BTECH-15023-25.webp",
  },
  {
    name: "Utkarsh Priyadarshi",
    rollNo: "BTECH/15224/25",
    post: "Junior Coordinator",
    image: "/assets/team/Utkarsh-Priyadarshi-BTECH-15224-25.webp",
  },
];
