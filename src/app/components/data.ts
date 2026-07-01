import annualPackImg from "../../imports/photo_6208741329840316172_y.jpg";
import poojaComboImg from "../../imports/photo_6208741329840316171_y.jpg";

export type Temple = {
  id: string;
  name: string;
  deity: string;
  location: string;
  tag: string;
  image: string;
  // real-world coordinates for the map
  lat: number;
  lng: number;
  status: "Available" | "Coming Soon";
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  original?: number;
  badge?: string;
  image: string;
};

export const temples: Temple[] = [
  {
    id: "vaishno",
    name: "Vaishno Devi",
    deity: "Maa Vaishno · Shakti Peeth",
    location: "Katra, Jammu & Kashmir",
    tag: "Live Darshan",
    image:
      "https://images.unsplash.com/photo-1741003411268-2462dd845d26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    lat: 33.0309,
    lng: 74.9489,
    status: "Available",
  },
  {
    id: "golden-temple",
    name: "Golden Temple",
    deity: "Sri Harmandir Sahib",
    location: "Amritsar, Punjab",
    tag: "360° Sanctum",
    image:
      "https://images.unsplash.com/photo-1557062975-96113e46608b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    lat: 31.62,
    lng: 74.8765,
    status: "Coming Soon",
  },
  {
    id: "kedarnath",
    name: "Kedarnath",
    deity: "Lord Shiva · Jyotirlinga",
    location: "Rudraprayag, Uttarakhand",
    tag: "Coming Soon",
    image:
      "https://images.unsplash.com/photo-1632962237468-0705d7e7b534?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    lat: 30.7352,
    lng: 79.0669,
    status: "Coming Soon",
  },
  {
    id: "kashi",
    name: "Kashi Vishwanath",
    deity: "Lord Shiva · Jyotirlinga",
    location: "Varanasi, Uttar Pradesh",
    tag: "360° Sanctum",
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    lat: 25.3109,
    lng: 83.0107,
    status: "Available",
  },
  {
    id: "somnath",
    name: "Somnath",
    deity: "Lord Shiva · Jyotirlinga",
    location: "Veraval, Gujarat",
    tag: "360° Sanctum",
    image:
      "https://images.unsplash.com/photo-1726501604891-19fb7f7cd37b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    lat: 20.888,
    lng: 70.4012,
    status: "Coming Soon",
  },
  {
    id: "mahakal",
    name: "Mahakaleshwar",
    deity: "Lord Shiva · Jyotirlinga",
    location: "Ujjain, Madhya Pradesh",
    tag: "Bhasma Aarti",
    image:
      "https://images.unsplash.com/photo-1632962237468-0705d7e7b534?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    lat: 23.1828,
    lng: 75.7682,
    status: "Available",
  },
  {
    id: "harsiddhi",
    name: "Harsiddhi Mata",
    deity: "Maa Harsiddhi · Shakti Peeth",
    location: "Ujjain, Madhya Pradesh",
    tag: "Deepmala Aarti",
    image:
      "https://images.unsplash.com/photo-1504448252408-b32799ff32f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    lat: 23.1765,
    lng: 75.7685,
    status: "Available",
  },
  {
    id: "omkareshwar",
    name: "Omkareshwar",
    deity: "Lord Shiva · Jyotirlinga",
    location: "Khandwa, Madhya Pradesh",
    tag: "360° Sanctum",
    image:
      "https://images.unsplash.com/photo-1557062975-96113e46608b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    lat: 22.2447,
    lng: 76.1516,
    status: "Available",
  },
  {
    id: "jagannath",
    name: "Jagannath Puri",
    deity: "Lord Jagannath · Char Dham",
    location: "Puri, Odisha",
    tag: "Coming Soon",
    image:
      "https://images.unsplash.com/photo-1632962237468-0705d7e7b534?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    lat: 19.8048,
    lng: 85.818,
    status: "Coming Soon",
  },
  {
    id: "tirupati",
    name: "Tirupati Balaji",
    deity: "Lord Venkateswara",
    location: "Tirupati, Andhra Pradesh",
    tag: "Coming Soon",
    image:
      "https://images.unsplash.com/photo-1726501604891-19fb7f7cd37b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    lat: 13.6288,
    lng: 79.4192,
    status: "Coming Soon",
  },
  {
    id: "meenakshi",
    name: "Meenakshi Amman",
    deity: "Maa Meenakshi · Shakti Peeth",
    location: "Madurai, Tamil Nadu",
    tag: "Coming Soon",
    image:
      "https://images.unsplash.com/photo-1504448252408-b32799ff32f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    lat: 9.9195,
    lng: 78.1193,
    status: "Coming Soon",
  },
];

export type ShopItem = {
  id: string;
  name: string;
  category: "Rudraksha" | "Pooja Kits" | "Idols & Murti" | "VR Kits";
  price: number;
  original?: number;
  rating: number;
  badge?: string;
  image: string;
};

export const shopItems: ShopItem[] = [
  {
    id: "rudraksha-5",
    name: "Abhimantrit 5 Mukhi Rudraksha",
    category: "Rudraksha",
    price: 499,
    original: 799,
    rating: 4.8,
    badge: "Blessed",
    image:
      "https://images.unsplash.com/photo-1633368516165-f7b04d6428d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "rudraksha-mala",
    name: "108-Bead Rudraksha Japa Mala",
    category: "Rudraksha",
    price: 1299,
    original: 1899,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1605455021703-13b57dcb9efa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "rudra-abhishek",
    name: "Rudra Abhishek Pooja Kit",
    category: "Pooja Kits",
    price: 899,
    original: 1199,
    rating: 4.7,
    badge: "Bestseller",
    image:
      "https://images.unsplash.com/photo-1699637568981-4a79d177e025?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "aarti-thali",
    name: "Brass Aarti Thali Set",
    category: "Pooja Kits",
    price: 749,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1605302977545-3a09913be1dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "shivling",
    name: "Narmadeshwar Shivling",
    category: "Idols & Murti",
    price: 1599,
    original: 2099,
    rating: 4.9,
    badge: "Sacred",
    image:
      "https://images.unsplash.com/photo-1741003411268-2462dd845d26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "ganesh-murti",
    name: "Brass Ganesha Murti",
    category: "Idols & Murti",
    price: 1249,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1557062975-96113e46608b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "vr-kit-shop",
    name: "Pawan Darshan VR Headset",
    category: "VR Kits",
    price: 2499,
    original: 3499,
    rating: 4.7,
    badge: "Popular",
    image:
      "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "vr-annual",
    name: "Devotee Annual VR Pack",
    category: "VR Kits",
    price: 5999,
    original: 8999,
    rating: 5.0,
    badge: "Best Value",
    image:
      "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
];

export const shopCategories = [
  "All",
  "Rudraksha",
  "Pooja Kits",
  "Idols & Murti",
  "VR Kits",
] as const;

export const products: Product[] = [
  {
    id: "kit-basic",
    name: "Durlabh Darshan VR Kit",
    description:
      "VR Headset + 1 Month App Subscription. Step into the sanctum from home.",
    price: 2499,
    original: 3499,
    badge: "Bestseller",
    image:
      "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  },
  {
    id: "kit-annual",
    name: "Devotee Annual Pack",
    description:
      "VR Headset + 1 Year App Subscription + Complimentary Abhimantrit Rudraksha.",
    price: 5999,
    original: 8999,
    badge: "Best Value",
    image: annualPackImg,
  },
  {
    id: "kit-pooja",
    name: "Pooja Combo Kit",
    description:
      "Rudra Abhishek Pooja Kit + VR Headset + 1 Month App Subscription.",
    price: 3299,
    original: 4299,
    image: poojaComboImg,
  },
];
