// data/poojaris.ts
export type Poojari = {
  name: string;
  image: string;
  poojaTypes: string[];
  location: string;
  experience: string;
};

export const poojaris: Poojari[] = [
  {
    name: "Pandit Ram Sharma",
    image: "/images/1.png",
    poojaTypes: ["Marriage", "Housewarming", "Satyanarayan Pooja"],
    location: "Hyderabad",
    experience: "12 years",
  },
  {
    name: "Guru Raghavendra",
    image: "/images/1.png",
    poojaTypes: ["Baby Naming", "Annaprashana", "Griha Pravesh"],
    location: "Bangalore",
    experience: "9 years",
  },
  {
    name: "Acharya Vishnu Joshi",
    image: "/images/1.png",
    poojaTypes: ["Thread Ceremony", "Navagraha Pooja", "Vastu Shanti"],
    location: "Mumbai",
    experience: "15 years",
  },
];
