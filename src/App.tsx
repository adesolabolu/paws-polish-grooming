/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import {
  X,
  Check,
  Sparkles,
  Scissors,
  Calendar,
  Phone,
  MapPin,
  Clock,
  ChevronDown,
  ShieldCheck,
  Zap,
  Crown,
  Coffee,
  Home,
  Building2,
  UserCheck,
  ArrowUpRight,
} from 'lucide-react';

interface ServicePackage {
  id: string;
  title: string;
  basePrice: number;
  priceLabel: string;
  duration: string;
  image: string;
  shortDesc: string;
  fullDesc: string;
  featured?: boolean;
  rotationClass: string;
  checklist: string[];
  badge?: string;
}

const formatNaira = (amount: number) => `₦${amount.toLocaleString('en-NG')}`;

const HERO_IMAGE = '/src/assets/images/barber_hero_lagos_1794242267855.jpg';
const LOCS_IMAGE = '/src/assets/images/service_locs_retwist_1794242269799.jpg';

const SERVICES: ServicePackage[] = [
  {
    id: 'executive-cut',
    title: 'Executive Cut & Hot Towel',
    basePrice: 15000,
    priceLabel: 'From ₦15,000',
    duration: '45 – 60 Mins',
    image: HERO_IMAGE,
    shortDesc:
      'Precision skin fade or classic taper, razor-sharp beard sculpting, eucalyptus steam towel, and soothing aftershave balm.',
    fullDesc:
      'Our flagship grooming ritual for Lagos and Abuja professionals. Every session begins with a scalp & hair consultation, followed by zero-gap fade blending, straight-razor line-up with a fresh disposable blade, and a hot eucalyptus towel wrap.',
    featured: false,
    rotationClass:
      'bg-white hover:bg-neutral-background text-brand-primary md:-rotate-3 md:translate-x-6',
    checklist: [
      'Custom skin fade, low taper, buzz, or scissor crop tailored to head shape',
      'Straight-razor hairline & beard sculpting with fresh sealed blade',
      'Double eucalyptus hot-towel facial steam & pore detox',
      'Anti-bump tea-tree & alum block skin seal',
      'Complimentary chilled Chapman, single-origin espresso, or whiskey',
    ],
  },
  {
    id: 'locs-retwist',
    title: 'Locs Detox & Retwist',
    basePrice: 25000,
    priceLabel: 'From ₦25,000',
    duration: '90 – 120 Mins',
    image: LOCS_IMAGE,
    shortDesc:
      'Deep apple-cider & mint scalp detox, neat palm-roll or interlocking retwist, crisp perimeter taper fade, and cold-pressed oil sheen.',
    fullDesc:
      'Keep your crown clean, lightweight, and buildup-free. Our master locticians remove lint and product residue before executing a tension-free retwist and a razor-sharp temple and neck taper.',
    featured: true,
    rotationClass: 'z-10 bg-brand-primary text-white md:rotate-1',
    checklist: [
      'Organic apple-cider vinegar, baking soda & peppermint loc soak',
      'Moisturising shampoo wash & hooded warm air dry',
      'Precision palm-rolling, two-strand twist, or crochet maintenance',
      'Full hairline & temple taper fade with razor finish',
      'Lightweight rosemary & black castor scalp oil infusion',
    ],
  },
  {
    id: 'vip-home-call',
    title: 'Home / Hotel VIP Call-Out',
    basePrice: 50000,
    priceLabel: 'From ₦50,000',
    duration: '60 – 90 Mins (Doorstep)',
    image: HERO_IMAGE,
    shortDesc:
      'Beat Lagos traffic. We dispatch a Senior Master Barber to your home, office, or hotel in Lekki, VI, Ikoyi, Ikeja, or Maitama.',
    fullDesc:
      'When your schedule is tight or privacy is paramount, the lounge comes to you. Our mobile barber arrives with a hospital-sterilised cordless trunk, portable studio ring-lighting, floor drop-cloth, and full facial kit.',
    featured: false,
    rotationClass:
      'bg-white hover:bg-neutral-background text-brand-primary md:rotate-6 md:-translate-x-6',
    checklist: [
      'On-time dispatch across VI, Ikoyi, Lekki Phase 1, Ikeja GRA & Maitama',
      'Full Executive Cut, Beard Sculpt & Hot Towel Facial at your location',
      'Self-contained cordless clippers, studio lighting & zero-mess floor mat',
      'Autoclave-sealed tools opened in your presence',
      'Ideal for executives, groomsmen prep, and Sunday home resets',
    ],
  },
];

const GROOMSMEN_SERVICE: ServicePackage = {
  id: 'owambe-groomsmen',
  title: 'Groom & Groomsmen Suite',
  basePrice: 180000,
  priceLabel: 'From ₦180,000',
  duration: '3 Hours (Up to 5 Men)',
  image: LOCS_IMAGE,
  shortDesc:
    'Private lounge buyout or hotel suite setup for wedding mornings and major Agbada occasions.',
  fullDesc:
    'Look immaculate for the cameras. Whether at your hotel suite or our private VIP room, two Senior Barbers handle the Groom and up to four Groomsmen with fades, beard dye/sculpting, facials, and complimentary top-shelf refreshments.',
  featured: false,
  rotationClass: '',
  checklist: [
    'Dedicated 2 Master Barbers for the Groom + up to 4 Groomsmen',
    'Precision haircuts, beard enhancements, and 24K gold under-eye masks',
    'Shine-control matte facial primer for wedding photography',
    'Complimentary bottle of premium celebratory refreshments & small chops',
  ],
};

type MenuCategory = 'cuts' | 'beard' | 'locs' | 'packages';

interface MenuItem {
  id: string;
  category: MenuCategory;
  name: string;
  duration: string;
  price: number;
  desc: string;
}

const FULL_MENU: MenuItem[] = [
  {
    id: 'm1',
    category: 'cuts',
    name: 'The Executive Fade & Beard Line-Up',
    duration: '45 Mins',
    price: 15000,
    desc: 'Skin fade, taper, or burst fade with straight-razor line-up, wash & hot towel.',
  },
  {
    id: 'm2',
    category: 'cuts',
    name: '360 Waves Deep Wash & Compression Cut',
    duration: '50 Mins',
    price: 16500,
    desc: 'With-the-grain precision cut, shea butter wave pomade, hot towel & durag prep.',
  },
  {
    id: 'm3',
    category: 'cuts',
    name: 'Express Shape-Up & Neck Taper',
    duration: '25 Mins',
    price: 8500,
    desc: 'Sharp hairline, temple taper, and beard edge-up between full haircuts.',
  },
  {
    id: 'm4',
    category: 'cuts',
    name: 'Young Chief Cut (Under 12)',
    duration: '35 Mins',
    price: 10000,
    desc: 'Patient, gentle styling for kids—neat school cut or trendy sponge curls.',
  },
  {
    id: 'm5',
    category: 'beard',
    name: 'Royal Hot Towel Shave & Beard Sculpt',
    duration: '35 Mins',
    price: 10000,
    desc: 'Three-towel aromatic steam ritual, beard conditioning oil, and razor sculpting.',
  },
  {
    id: 'm6',
    category: 'beard',
    name: 'Anti-Bump Ingrown Hair & Razor Relief',
    duration: '40 Mins',
    price: 14000,
    desc: 'High-frequency wand sterilisation, salicylic exfoliation & soothing aloe mask.',
  },
  {
    id: 'm7',
    category: 'beard',
    name: 'Natural Tint & Fuller Beard Enhancement',
    duration: '30 Mins',
    price: 12000,
    desc: 'Water-resistant ammonia-free organic tint for crisp, camera-ready beard density.',
  },
  {
    id: 'm8',
    category: 'locs',
    name: 'Loc Detox, Wash & Palm-Roll Retwist',
    duration: '100 Mins',
    price: 25000,
    desc: 'Deep ACV clarify, scalp massage, clean parting retwist, and perimeter taper fade.',
  },
  {
    id: 'm9',
    category: 'locs',
    name: 'Two-Strand Twist / Barrel Roll Styling',
    duration: '120 Mins',
    price: 30000,
    desc: 'Protective loc styling or natural hair two-strand twists with sharp line-up.',
  },
  {
    id: 'm10',
    category: 'locs',
    name: 'Starter Locs / Comb Coils & Fade',
    duration: '90 Mins',
    price: 28000,
    desc: 'Precision diamond or square grid parting, comb coils, and crisp undercut fade.',
  },
  {
    id: 'm11',
    category: 'packages',
    name: 'The "Odogwu" Total Reset (Cut + Facial + Pedicure)',
    duration: '90 Mins',
    price: 38000,
    desc: 'Executive haircut, charcoal peel-off facial, bright-eye mask & men’s foot scrub.',
  },
  {
    id: 'm12',
    category: 'packages',
    name: 'VIP Home / Hotel Call-Out (Island / Ikeja / Maitama)',
    duration: '60 Mins',
    price: 50000,
    desc: 'Senior Master Barber dispatched to your doorstep with sterile mobile trunk.',
  },
];

const MASTER_BARBERS = [
  {
    name: 'Tunde "Blade" Adeyemi',
    role: 'Head Master Barber · Victoria Island',
    specialty: 'Skin Fades, Razor Sculpting & 360 Waves',
    exp: '9 Years Exp · 4,800+ Cuts',
    location: 'Victoria Island, Lagos',
  },
  {
    name: 'Chidi Okafor',
    role: 'Senior Loctician & Stylist · Lekki Phase 1',
    specialty: 'Loc Detox, Two-Strand Twists & Taper Fades',
    exp: '7 Years Exp · 3,200+ Sessions',
    location: 'Lekki Phase 1, Lagos',
  },
  {
    name: 'Ibrahim Danjuma',
    role: 'Executive Groomer · Maitama Studio',
    specialty: 'Classic Scissor Crops, Hot Towel Shaves & VIP Home Calls',
    exp: '8 Years Exp · 3,900+ Cuts',
    location: 'Maitama, Abuja',
  },
];

const MEMBERSHIP_PLANS = [
  {
    id: 'sharp-guy',
    name: 'The Sharp Guy',
    subtitle: 'Bi-Weekly Maintenance',
    monthlyPrice: 28000,
    quarterlyPrice: 72000,
    perks: [
      '2 Executive Cuts & Beard Line-Ups per month',
      '1 Express Mid-Month Shape-Up & Neck Taper',
      'Priority Friday & Saturday slot booking',
      'Complimentary bar refreshments every visit',
    ],
    featured: false,
  },
  {
    id: 'odogwu-club',
    name: 'The Odogwu Pass',
    subtitle: 'Unlimited Weekly Freshness',
    monthlyPrice: 55000,
    quarterlyPrice: 140000,
    perks: [
      'Unlimited Executive Cuts & Razor Line-Ups all month',
      '1 Deep Charcoal & Anti-Bump Facial every month',
      '15% off Loc Detox, Pedicures & Grooming Products',
      'Guaranteed same-day chair reservation at all branches',
    ],
    featured: true,
  },
  {
    id: 'chairman-vip',
    name: 'Chairman Home VIP',
    subtitle: 'Doorstep Concierge',
    monthlyPrice: 120000,
    quarterlyPrice: 310000,
    perks: [
      '3 VIP Home or Office Call-Outs per month (Lagos / Abuja)',
      'Unlimited in-lounge Shape-Ups & Hot Towel Shaves',
      'Dedicated personal clipper blade set stored in your name',
      'Complimentary Groom/Event prep session once a quarter',
    ],
    featured: false,
  },
];

const ROW_1_REVIEWS = [
  {
    stars: 5,
    quote:
      '"Zero razor bumps for the first time in years! They opened a fresh blade right in front of me and the hot towel steam had me sleeping in the chair."',
    author: 'Babajide K. · Victoria Island, Lagos',
    bgClass: 'bg-brand-secondary/20',
  },
  {
    stars: 5,
    quote:
      '"Booked their VIP Home Call to my hotel in Ikoyi before a wedding. Barber arrived 10 minutes early with a full light setup. My Agbada photos came out 10/10."',
    author: 'Emeka N. · Ikoyi, Lagos',
    bgClass: 'bg-white',
  },
  {
    stars: 5,
    quote:
      '"Chidi handled my locs detox and taper fade with mad precision. Cold AC, great Afrobeats playlist, and the iced espresso is top tier."',
    author: 'Seyi O. · Lekki Phase 1',
    bgClass: 'bg-brand-secondary/20',
  },
];

const ROW_2_REVIEWS = [
  {
    quote:
      '"Best grooming lounge in Maitama hands down. You book a 2:00 PM slot and you sit in the chair at 2:00 PM sharp—no waiting behind three people."',
    author: 'Mustapha A. · Maitama, Abuja',
    bgClass: 'bg-white',
  },
  {
    quote:
      '"I signed up for the Odogwu Monthly Pass. Stepping into Monday board meetings with a fresh fade every single week is a complete game changer."',
    author: 'Damilola F. · Ikeja GRA',
    bgClass: 'bg-brand-secondary/20',
  },
  {
    quote:
      '"Brought my groomsmen here on Saturday morning. They treated us like royalty, fixed everyone’s beard line-up, and kept the vibes high."',
    author: 'Tosin & The Groomsmen · Lagos',
    bgClass: 'bg-white',
  },
];

const SERVICE_TIERS = [
  { label: 'In-Lounge (Master Barber)', adder: 0 },
  { label: 'In-Lounge (Creative Director)', adder: 5000 },
  { label: 'Private VIP Suite (In-Studio)', adder: 12000 },
  { label: 'Home / Office Dispatch', adder: 35000 },
];

const ADD_ONS = [
  { id: 'charcoal', name: 'Activated Charcoal Peel-Off Mask & Steam', price: 7500 },
  { id: 'antibump', name: 'High-Frequency Anti-Bump & Ingrown Treatment', price: 6000 },
  { id: 'beard-dye', name: 'Ammonia-Free Natural Beard Enhancement Tint', price: 8000 },
];

const FAQ_ITEMS = [
  {
    q: 'How do you guarantee zero clipper bumps and skin safety?',
    a: 'Every set of clippers goes through a 3-stage hospital-grade sanitation cycle: brush-down, Barbicide immersion, and UV-C cabinet sterilisation. For line-ups and shaves, we use a brand-new, sealed disposable blade opened in front of you, followed by an alum block and tea-tree anti-bump seal.',
  },
  {
    q: 'Which areas do you cover for VIP Home & Hotel Call-Outs?',
    a: 'In Lagos, our mobile barbers cover Victoria Island, Ikoyi, Lekki Phase 1, Oniru, Chevron, Banana Island, and Ikeja GRA. In Abuja, we cover Maitama, Asokoro, Wuse II, and Jabi.',
  },
  {
    q: 'Do I have to wait in line if I book an appointment?',
    a: 'Never. We operate on strict time-slotted reservations. When you book a 4:00 PM chair, your barber is sanitised, prepped, and waiting for you at 4:00 PM.',
  },
  {
    q: 'Can I bring my own personal clipper to the lounge?',
    a: 'Absolutely! While our studio clippers are autoclave- and UV-sterilised between every client, we are happy to use your personal kit—and our barbers will even deep-clean, oil, and zero-gap your personal clippers for free.',
  },
];

const GALLERY_ITEMS = [
  {
    title: 'Razor Skin Fade & Beard Sculpt',
    breed: 'Victoria Island Flagship · Tunde "Blade"',
    image: HERO_IMAGE,
  },
  {
    title: 'Loc Detox, Retwist & Temple Taper',
    breed: 'Lekki Phase 1 Studio · Chidi Okafor',
    image: LOCS_IMAGE,
  },
];

type InfoModalTab = 'story' | 'gallery' | 'faq' | 'policies' | 'contact';

export default function App() {
  // Scroll Animation Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );

    const elements = document.querySelectorAll('[data-animation-on-scroll]');
    elements.forEach((el) => {
      el.classList.add('animate-on-scroll-hidden');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Image error fallback tracking
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const handleImageError = (key: string) => {
    setFailedImages((prev) => ({ ...prev, [key]: true }));
  };

  // Interactive Rate Card Category state
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('cuts');

  // Membership Billing Cycle state
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly'>('monthly');

  // Service Detail Modal state
  const [selectedService, setSelectedService] = useState<ServicePackage | null>(null);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  // Studio Info Modal state
  const [infoModalTab, setInfoModalTab] = useState<InfoModalTab | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(0);

  // Booking Form state
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [studioBranch, setStudioBranch] = useState('Victoria Island, Lagos (Ademola Adetokunbo)');
  const [serviceType, setServiceType] = useState('Executive Cut & Hot Towel (₦15,000)');
  const [preferredBarber, setPreferredBarber] = useState('Any Available Master Barber');
  const [preferredDate, setPreferredDate] = useState('');
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [lastBooking, setLastBooking] = useState<{
    refCode: string;
    clientName: string;
    clientPhone: string;
    studioBranch: string;
    serviceType: string;
    preferredBarber: string;
    preferredDate: string;
  } | null>(null);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'checking' | 'subscribed'>('idle');

  const openServiceDetails = (pkg: ServicePackage) => {
    setSelectedService(pkg);
    setSelectedSizeIndex(0);
    setSelectedAddOns([]);
  };

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const scrollToBookingWithSelection = (serviceLabel: string, barberLabel?: string) => {
    setServiceType(serviceLabel);
    if (barberLabel) {
      setPreferredBarber(barberLabel);
    }
    setSelectedService(null);
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookFromModal = (pkg: ServicePackage) => {
    const mappedOption =
      pkg.id === 'executive-cut'
        ? 'Executive Cut & Hot Towel (₦15,000)'
        : pkg.id === 'locs-retwist'
        ? 'Locs Detox & Retwist (₦25,000)'
        : pkg.id === 'vip-home-call'
        ? 'VIP Home / Hotel Call-Out (₦50,000)'
        : 'Groom & Groomsmen VIP Suite (₦180,000)';
    scrollToBookingWithSelection(mappedOption);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingStatus !== 'idle') return;

    const finalClient = clientName.trim() || 'Executive Guest';
    const finalPhone = clientPhone.trim() || '+234 803 000 0000';
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    const finalDate = preferredDate || tomorrow;

    setBookingStatus('sending');
    setTimeout(() => {
      setBookingStatus('sent');
      setLastBooking({
        refCode: `BP-${Math.floor(1000 + Math.random() * 9000)}`,
        clientName: finalClient,
        clientPhone: finalPhone,
        studioBranch,
        serviceType,
        preferredBarber,
        preferredDate: finalDate,
      });
      setClientName('');
      setClientPhone('');
      setPreferredDate('');
      setTimeout(() => {
        setBookingStatus('idle');
      }, 3000);
    }, 1000);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterStatus !== 'idle' || !newsletterEmail.trim()) return;
    setNewsletterStatus('checking');
    setTimeout(() => {
      setNewsletterStatus('subscribed');
      setNewsletterEmail('');
      setTimeout(() => {
        setNewsletterStatus('idle');
      }, 3000);
    }, 900);
  };

  const calculatedModalPrice = selectedService
    ? selectedService.basePrice +
      SERVICE_TIERS[selectedSizeIndex].adder +
      selectedAddOns.reduce((sum, id) => {
        const found = ADD_ONS.find((a) => a.id === id);
        return sum + (found ? found.price : 0);
      }, 0)
    : 0;

  const filteredMenu = FULL_MENU.filter((item) => item.category === activeCategory);

  return (
    <div className="font-secondary bg-neutral-background text-text-primary overflow-x-hidden min-h-screen flex flex-col w-full relative">
      {/* Top Header (3-Zone Top Bar Contract) */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-brand-primary">
        <nav className="max-w-[1440px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between gap-8">
          <a
            href="#"
            className="druk-font text-2xl md:text-3xl font-bold tracking-tighter text-brand-primary whitespace-nowrap shrink-0"
          >
            BLADE &amp; POLISH
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-brand-primary">
            <a
              href="#services"
              className="hover:text-brand-secondary transition-colors whitespace-nowrap shrink-0"
            >
              Services
            </a>
            <a
              href="#rate-card"
              className="hover:text-brand-secondary transition-colors whitespace-nowrap shrink-0"
            >
              Rate Card
            </a>
            <a
              href="#standards"
              className="hover:text-brand-secondary transition-colors whitespace-nowrap shrink-0"
            >
              The Lounge
            </a>
            <a
              href="#memberships"
              className="hover:text-brand-secondary transition-colors whitespace-nowrap shrink-0"
            >
              Memberships
            </a>
            <a
              href="#testimonials"
              className="hover:text-brand-secondary transition-colors whitespace-nowrap shrink-0"
            >
              Reviews
            </a>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <a
              href="#booking"
              className="bg-brand-primary text-white druk-font text-xs md:text-sm uppercase px-6 md:px-10 py-3 rounded-full hover:bg-brand-secondary hover:text-brand-primary transition-all shadow-sm whitespace-nowrap shrink-0"
            >
              Book Chair
            </a>
          </div>
        </nav>
      </header>

      <main className="pt-20 flex-grow">
        {/* Section 1: Hero Split + Proof Metrics Strip */}
        <section className="w-full min-h-[82vh] flex flex-col items-center justify-center p-6 md:p-12 bg-neutral-background">
          <div className="w-full flex flex-col lg:flex-row items-stretch max-w-[1440px] mx-auto border-[1.6px] border-brand-primary overflow-hidden bg-white shadow-neo">
            {/* Left Column: Content */}
            <div
              className="w-full lg:w-1/2 flex flex-col items-center justify-center text-center px-8 py-16 lg:p-20 stagger-children"
              data-animation-on-scroll=""
            >
              <div className="mb-8 text-xs font-bold druk-font uppercase tracking-widest text-brand-primary">
                Victoria Island · Lekki Phase 1 · Maitama Abuja
              </div>

              <div className="mb-10 max-w-[540px]">
                <h1
                  data-editable="text"
                  data-path="hero.title"
                  className="druk-font text-[40px] lg:text-[60px] font-bold text-brand-primary uppercase mb-6 leading-[0.92]"
                >
                  The Sharpest <span className="text-brand-secondary">Cuts</span> in the City.
                </h1>
                <p
                  data-editable="text"
                  data-path="hero.description"
                  className="text-[17px] leading-[28px] text-text-secondary"
                >
                  From zero-gap skin fades and hot-towel beard sculpting to VIP doorstep call-outs,
                  our master barbers deliver executive grooming with hospital-grade sterilisation and
                  unmatched lounge comfort.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a
                  href="#booking"
                  className="group relative flex items-center justify-center w-[250px] h-[56px] whitespace-nowrap shrink-0"
                >
                  <div className="absolute inset-0 border-[2px] border-brand-primary rounded-full bg-brand-primary transition-all group-hover:bg-brand-secondary group-hover:border-brand-primary"></div>
                  <span className="relative druk-font text-[16px] font-bold text-white group-hover:text-brand-primary uppercase tracking-[0.32px] leading-none pt-0.5 transition-colors">
                    Book Chair Now
                  </span>
                </a>
                <a
                  href="#rate-card"
                  className="px-7 h-[56px] flex items-center justify-center rounded-full border-2 border-brand-primary druk-font text-[14px] uppercase text-brand-primary hover:bg-neutral-background transition-colors whitespace-nowrap shrink-0"
                >
                  View Rate Card
                </a>
              </div>
            </div>

            {/* Right Column: Image */}
            <div className="w-full lg:w-1/2 relative bg-brand-primary lg:rounded-bl-hero-corner overflow-hidden lg:border-l-[1.6px] border-brand-primary min-h-[460px] lg:min-h-[600px] flex items-center justify-center">
              {!failedImages['hero'] ? (
                <img
                  src={HERO_IMAGE}
                  alt="Master barber performing a precision line-up in our Lagos grooming lounge"
                  referrerPolicy="no-referrer"
                  onError={() => handleImageError('hero')}
                  className="absolute w-full h-full object-cover scale-105 transition-transform duration-700 hover:scale-110"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-white p-12 text-center">
                  <Scissors className="w-20 h-20 text-brand-secondary mb-4" />
                  <span className="druk-font text-2xl uppercase">Blade &amp; Polish Lounge</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 right-6 left-6 lg:left-24 flex items-center justify-between text-white z-10">
                <div>
                  <div className="druk-font text-xs uppercase text-brand-secondary">
                    Zero Wait Time Guarantee
                  </div>
                  <div className="text-sm font-semibold">
                    Complimentary Espresso, Chapman or Single Malt With Every Cut
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Full-Width 4-Column Proof & Studio Metrics Strip Below Hero */}
          <div className="w-full max-w-[1440px] mx-auto mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-white border-2 border-brand-primary p-6 rounded-2xl shadow-neo-sm">
              <div className="druk-font text-2xl md:text-3xl text-brand-primary tabular-nums">
                14,800+
              </div>
              <div className="text-xs font-bold text-text-secondary mt-1">
                Executive Cuts &amp; Beard Sculpting Sessions (Lagos &amp; Abuja)
              </div>
            </div>
            <div className="bg-white border-2 border-brand-primary p-6 rounded-2xl shadow-neo-sm">
              <div className="druk-font text-2xl md:text-3xl text-brand-secondary tabular-nums">
                100%
              </div>
              <div className="text-xs font-bold text-text-secondary mt-1">
                Autoclave &amp; UV-C Sterilised Clippers · Zero-Bump Protocol
              </div>
            </div>
            <div className="bg-white border-2 border-brand-primary p-6 rounded-2xl shadow-neo-sm">
              <div className="druk-font text-2xl md:text-3xl text-brand-primary tabular-nums">
                45 Mins
              </div>
              <div className="text-xs font-bold text-text-secondary mt-1">
                VIP Mobile Barber Dispatch Across VI, Ikoyi, Lekki &amp; Maitama
              </div>
            </div>
            <div className="bg-white border-2 border-brand-primary p-6 rounded-2xl shadow-neo-sm">
              <div className="druk-font text-2xl md:text-3xl text-brand-secondary tabular-nums">
                4.9 / 5.0
              </div>
              <div className="text-xs font-bold text-text-secondary mt-1">
                Verified Rating Across 1,200+ Nigerian Executives &amp; Creatives
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Signature Fanned Services Section */}
        <section id="services" className="py-24 px-6 md:px-12 bg-white border-t-2 border-brand-primary">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div className="max-w-2xl" data-animation-on-scroll="">
                <div className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-3">
                  01 · Signature Grooming Packages
                </div>
                <h2 className="druk-font text-4xl md:text-6xl text-brand-primary uppercase mb-4 leading-none">
                  Our Core Services
                </h2>
                <p className="text-xl text-text-secondary font-medium italic">
                  Precision fades, loc maintenance, and private home call-outs crafted for the modern
                  Nigerian gentleman.
                </p>
              </div>
              <div className="hidden md:block">
                <div className="w-24 h-1 bg-brand-secondary"></div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 md:gap-0 py-12">
              {SERVICES.map((service) => {
                const isDark = Boolean(service.featured);
                return (
                  <div
                    key={service.id}
                    className={`group relative w-full md:w-1/3 p-8 border-2 border-brand-primary rounded-card shadow-neo transition-all duration-300 ease-out flex flex-col stagger-children ${service.rotationClass} hover:rotate-0 hover:z-30 hover:-translate-y-12 md:hover:scale-105`}
                    data-animation-on-scroll=""
                  >
                    <div className="mb-6">
                      {!failedImages[service.id] ? (
                        <img
                          src={service.image}
                          alt={service.title}
                          referrerPolicy="no-referrer"
                          onError={() => handleImageError(service.id)}
                          className={`w-full h-52 object-cover rounded-xl mb-5 transition-all ${
                            isDark
                              ? 'grayscale contrast-125 group-hover:grayscale-0'
                              : 'border border-brand-primary group-hover:grayscale-0'
                          }`}
                        />
                      ) : (
                        <div className="w-full h-52 rounded-xl mb-5 border border-brand-primary bg-brand-secondary/20 flex items-center justify-center">
                          <Scissors className="w-12 h-12 text-brand-secondary" />
                        </div>
                      )}
                      <div className="text-xs font-semibold opacity-75 mb-1">
                        {service.duration} · Hospital-Grade Sterile
                      </div>
                      <h3
                        className={`druk-font text-2xl uppercase ${
                          isDark ? 'text-white' : 'text-brand-primary'
                        }`}
                      >
                        {service.title}
                      </h3>
                    </div>
                    <p className={`${isDark ? 'text-gray-300' : 'text-text-secondary'} mb-8`}>
                      {service.shortDesc}
                    </p>
                    <div className="mt-auto flex justify-between items-center pt-4 border-t border-current/10">
                      <span className="druk-font font-bold text-xl text-brand-secondary tabular-nums">
                        {service.priceLabel}
                      </span>
                      <button
                        type="button"
                        onClick={() => openServiceDetails(service)}
                        className={`font-bold uppercase text-xs border-b-2 pb-1 cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
                          isDark
                            ? 'text-white border-brand-secondary hover:text-brand-secondary'
                            : 'text-brand-primary border-brand-primary hover:text-brand-secondary hover:border-brand-secondary'
                        }`}
                      >
                        Customize &amp; Price
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 3 (NEW): Interactive Naira Rate Card & Full Grooming Menu */}
        <section
          id="rate-card"
          className="py-24 px-6 md:px-12 bg-neutral-background border-t-2 border-brand-primary"
        >
          <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-3">
                  02 · Transparent Naira Pricing
                </div>
                <h2 className="druk-font text-4xl md:text-6xl text-brand-primary uppercase leading-none">
                  Studio <span className="text-brand-secondary">Rate Card</span>
                </h2>
                <p className="text-lg text-text-secondary mt-3 max-w-xl">
                  Select any category below to explore our full menu or click a service to pre-load
                  your appointment.
                </p>
              </div>

              {/* Interactive Filter Tabs */}
              <div className="flex flex-wrap gap-2 bg-white p-2 rounded-2xl border-2 border-brand-primary shadow-neo-sm">
                {(
                  [
                    { id: 'cuts', label: 'Haircuts & Fades' },
                    { id: 'beard', label: 'Beard & Hot Towel' },
                    { id: 'locs', label: 'Locs & Natural Hair' },
                    { id: 'packages', label: 'VIP & Home Packages' },
                  ] as { id: MenuCategory; label: string }[]
                ).map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveCategory(tab.id)}
                    className={`px-5 py-3 rounded-xl druk-font text-xs uppercase transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      activeCategory === tab.id
                        ? 'bg-brand-primary text-white'
                        : 'bg-transparent text-brand-primary hover:bg-brand-secondary/20'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMenu.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border-2 border-brand-primary rounded-2xl p-6 md:p-8 shadow-neo-sm flex flex-col justify-between hover:border-brand-secondary transition-colors"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="druk-font text-xl text-brand-primary uppercase">
                        {item.name}
                      </h3>
                      <span className="druk-font text-xl text-brand-secondary tabular-nums shrink-0">
                        {formatNaira(item.price)}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-text-secondary mb-3">
                      Duration: {item.duration} · Includes Wash &amp; Refreshment
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed mb-6">{item.desc}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-brand-primary/10">
                    <span className="text-xs font-bold text-brand-primary">
                      Available in VI, Lekki &amp; Maitama
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        scrollToBookingWithSelection(`${item.name} (${formatNaira(item.price)})`)
                      }
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-primary text-white hover:bg-brand-secondary hover:text-brand-primary text-xs druk-font uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <span>Select Service</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4 (NEW): The Blade & Polish Standard + Master Barbers Roster */}
        <section
          id="standards"
          className="py-24 px-6 md:px-12 bg-white border-t-2 border-brand-primary"
        >
          <div className="max-w-[1440px] mx-auto">
            <div className="max-w-3xl mb-16">
              <div className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-3">
                03 · Why Top Executives Switch To Us
              </div>
              <h2 className="druk-font text-4xl md:text-6xl text-brand-primary uppercase leading-none mb-4">
                Built For <span className="text-brand-secondary">Zero Compromise.</span>
              </h2>
              <p className="text-lg text-text-secondary">
                We solved every frustration of the traditional barbershop—no clipper bumps, no
                generator blackouts mid-haircut, and no waiting two hours for your turn.
              </p>
            </div>

            {/* Asymmetric Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
              <div className="lg:col-span-2 bg-brand-primary text-white border-2 border-brand-primary rounded-card p-8 md:p-12 shadow-neo flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-brand-secondary text-brand-primary flex items-center justify-center mb-6">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="druk-font text-2xl md:text-4xl uppercase mb-4">
                    01. The Zero-Bump Hospital Sterilisation Protocol
                  </h3>
                  <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-2xl mb-8">
                    Skin irritation and razor bumps come from uncleaned blades. Before any clipper
                    touches your skin, it undergoes ultrasonic cleaning, Barbicide immersion, and
                    UV-C medical sterilisation. Every razor line-up uses a fresh sealed blade
                    cracked open in front of you.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/15 text-sm">
                  <div>
                    <div className="druk-font text-brand-secondary uppercase text-xs">Step 1</div>
                    <div className="font-bold mt-1">Autoclave &amp; UV-C Cycle</div>
                  </div>
                  <div>
                    <div className="druk-font text-brand-secondary uppercase text-xs">Step 2</div>
                    <div className="font-bold mt-1">Single-Use Sealed Razor</div>
                  </div>
                  <div>
                    <div className="druk-font text-brand-secondary uppercase text-xs">Step 3</div>
                    <div className="font-bold mt-1">Tea-Tree &amp; Alum Skin Seal</div>
                  </div>
                </div>
              </div>

              <div className="bg-neutral-background border-2 border-brand-primary rounded-card p-8 md:p-10 shadow-neo flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-brand-primary text-brand-secondary flex items-center justify-center mb-6">
                    <Coffee className="w-6 h-6" />
                  </div>
                  <h3 className="druk-font text-2xl uppercase text-brand-primary mb-4">
                    02. Uninterrupted Lounge &amp; Espresso Bar
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-6">
                    Enjoy 24/7 solar-inverter &amp; twin generator power, ice-cold AC, high-speed
                    Starlink Wi-Fi, live Premier League &amp; Champions League screenings, and a
                    complimentary drink with every appointment.
                  </p>
                </div>
                <div className="p-4 bg-white rounded-xl border border-brand-primary text-xs font-bold text-brand-primary">
                  On The House: Fresh Chapman · Double Espresso · Cold Malt · Aged Single Malt
                </div>
              </div>
            </div>

            {/* Lead Master Barbers Roster */}
            <div className="pt-8 border-t-2 border-brand-primary/15">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                <div>
                  <h3 className="druk-font text-3xl md:text-4xl text-brand-primary uppercase">
                    Meet The Lead Master Barbers
                  </h3>
                  <p className="text-text-secondary text-sm mt-1">
                    Reserve your preferred specialist directly with one click.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {MASTER_BARBERS.map((barber) => (
                  <div
                    key={barber.name}
                    className="bg-neutral-background border-2 border-brand-primary rounded-2xl p-6 shadow-neo-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-semibold text-text-secondary mb-3">
                        <span>{barber.location}</span>
                        <span>·</span>
                        <span className="tabular-nums">{barber.exp}</span>
                      </div>
                      <h4 className="druk-font text-xl text-brand-primary uppercase mb-1">
                        {barber.name}
                      </h4>
                      <div className="text-xs font-bold text-brand-secondary uppercase mb-4">
                        {barber.role}
                      </div>
                      <p className="text-sm text-text-secondary mb-6">
                        <strong className="text-brand-primary">Specialty:</strong>{' '}
                        {barber.specialty}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        scrollToBookingWithSelection(serviceType, `${barber.name} (${barber.location})`)
                      }
                      className="w-full py-3 rounded-xl border-2 border-brand-primary bg-white hover:bg-brand-secondary text-brand-primary druk-font text-xs uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      Book With {barber.name.split(' ')[0]}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 5 (NEW): Executive Memberships ("The Odogwu Club") */}
        <section
          id="memberships"
          className="py-24 px-6 md:px-12 bg-neutral-background border-t-2 border-brand-primary"
        >
          <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-8">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-3">
                  04 · Monthly &amp; Quarterly Grooming Retainers
                </div>
                <h2 className="druk-font text-4xl md:text-6xl text-brand-primary uppercase leading-none">
                  The <span className="text-brand-secondary">Chairman&apos;s</span> Club
                </h2>
                <p className="text-lg text-text-secondary mt-3 max-w-xl">
                  Stay camera-ready 365 days a year. Lock in priority weekend slots and save up to
                  25% with a membership plan.
                </p>
              </div>

              {/* Monthly / Quarterly Segmented Toggle */}
              <div className="inline-flex items-center bg-white p-1.5 rounded-full border-2 border-brand-primary shadow-neo-sm self-start">
                <button
                  type="button"
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-5 py-2.5 rounded-full druk-font text-xs uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    billingCycle === 'monthly'
                      ? 'bg-brand-primary text-white'
                      : 'text-brand-primary hover:bg-neutral-background'
                  }`}
                >
                  Monthly Plan
                </button>
                <button
                  type="button"
                  onClick={() => setBillingCycle('quarterly')}
                  className={`px-5 py-2.5 rounded-full druk-font text-xs uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    billingCycle === 'quarterly'
                      ? 'bg-brand-secondary text-brand-primary'
                      : 'text-brand-primary hover:bg-neutral-background'
                  }`}
                >
                  Quarterly (Save 15%)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {MEMBERSHIP_PLANS.map((plan) => {
                const price =
                  billingCycle === 'monthly' ? plan.monthlyPrice : plan.quarterlyPrice;
                const periodLabel = billingCycle === 'monthly' ? '/ month' : '/ quarter';
                const isDark = plan.featured;
                return (
                  <div
                    key={plan.id}
                    className={`border-2 border-brand-primary rounded-card p-8 md:p-10 shadow-neo flex flex-col justify-between ${
                      isDark ? 'bg-brand-primary text-white' : 'bg-white text-brand-primary'
                    }`}
                  >
                    <div>
                      <div
                        className={`text-xs font-bold uppercase tracking-widest mb-2 ${
                          isDark ? 'text-brand-secondary' : 'text-text-secondary'
                        }`}
                      >
                        {plan.subtitle}
                      </div>
                      <h3 className="druk-font text-3xl uppercase mb-4">{plan.name}</h3>
                      <div className="flex items-baseline gap-2 mb-8">
                        <span className="druk-font text-4xl text-brand-secondary tabular-nums">
                          {formatNaira(price)}
                        </span>
                        <span className={`text-xs font-semibold ${isDark ? 'text-gray-300' : 'text-text-secondary'}`}>
                          {periodLabel}
                        </span>
                      </div>

                      <ul className="space-y-3.5 mb-8">
                        {plan.perks.map((perk, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm">
                            <Check className="w-4 h-4 text-brand-secondary shrink-0 mt-0.5" />
                            <span className={isDark ? 'text-gray-200' : 'text-text-secondary'}>
                              {perk}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        scrollToBookingWithSelection(
                          `Membership: ${plan.name} (${formatNaira(price)} ${periodLabel})`
                        )
                      }
                      className={`w-full py-4 rounded-xl druk-font text-sm uppercase border-2 border-brand-primary transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                        isDark
                          ? 'bg-brand-secondary text-brand-primary hover:bg-white'
                          : 'bg-brand-primary text-white hover:bg-brand-secondary hover:text-brand-primary'
                      }`}
                    >
                      Join {plan.name}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 6: Testimonials Marquee */}
        <section
          id="testimonials"
          className="py-24 overflow-hidden bg-white border-t-2 border-brand-primary"
        >
          <div
            className="max-w-[1440px] mx-auto px-6 mb-16 stagger-children"
            data-animation-on-scroll=""
          >
            <div className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-3">
              05 · Verified Client Reviews
            </div>
            <h2 className="druk-font text-4xl md:text-7xl text-brand-primary uppercase leading-none">
              The City <span className="text-brand-secondary">Speaks</span>
            </h2>
            <p className="text-xl text-text-secondary mt-4 italic font-medium">
              Real words from executives, founders, and creatives across Lagos and Abuja.
            </p>
          </div>

          <div className="testimonial-pause flex flex-col gap-8 md:gap-12">
            {/* Row 1: Moving Left */}
            <div className="flex whitespace-nowrap">
              <div className="flex gap-6 md:gap-8 animate-scroll-left">
                {[...ROW_1_REVIEWS, ...ROW_1_REVIEWS].map((item, idx) => (
                  <div
                    key={`r1-${idx}`}
                    className={`w-[320px] md:w-[380px] ${item.bgClass} border-2 border-brand-primary shadow-neo p-8 flex flex-col justify-between shrink-0 rounded-xl`}
                  >
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: item.stars }).map((_, sIdx) => (
                        <svg
                          key={sIdx}
                          className="w-5 h-5 fill-brand-primary"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <p className="font-secondary text-base md:text-lg font-bold leading-snug text-brand-primary whitespace-normal flex-1 mb-6 italic">
                      {item.quote}
                    </p>
                    <p className="druk-font text-xs uppercase font-bold text-brand-primary">
                      {item.author}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2: Moving Right */}
            <div className="flex whitespace-nowrap">
              <div className="flex gap-6 md:gap-8 animate-scroll-right">
                {[...ROW_2_REVIEWS, ...ROW_2_REVIEWS].map((item, idx) => (
                  <div
                    key={`r2-${idx}`}
                    className={`w-[320px] md:w-[380px] ${item.bgClass} border-2 border-brand-primary shadow-neo p-8 flex flex-col justify-between shrink-0 rounded-xl`}
                  >
                    <p className="font-secondary text-base md:text-lg font-bold leading-snug text-brand-primary whitespace-normal flex-1 mb-6 italic">
                      {item.quote}
                    </p>
                    <p className="druk-font text-xs uppercase font-bold text-brand-primary">
                      {item.author}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 7: Booking CTA */}
        <section id="booking" className="py-24 px-6 md:px-12 bg-brand-primary text-white border-t-2 border-brand-primary">
          <div className="max-w-[1440px] mx-auto text-center">
            <div className="mb-12 stagger-children" data-animation-on-scroll="">
              <h2 className="druk-font text-5xl md:text-8xl mb-6 leading-none">
                Ready to <span className="text-brand-secondary italic">Step Out Sharp?</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Lock in your chair at our Victoria Island, Lekki Phase 1, Ikeja GRA, or Maitama
                Abuja lounge—or request a VIP Home Call-Out.
              </p>
            </div>

            <div
              className="bg-white p-8 md:p-12 rounded-card border-2 border-brand-secondary max-w-4xl mx-auto text-brand-primary"
              data-animation-on-scroll=""
            >
              {lastBooking && (
                <div className="mb-8 p-6 rounded-xl bg-brand-secondary/15 border-2 border-brand-primary text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="druk-font text-xs uppercase text-brand-primary mb-1">
                      Chair Reservation Confirmed · Ref #{lastBooking.refCode}
                    </div>
                    <p className="text-sm font-semibold text-brand-primary">
                      {lastBooking.serviceType} with{' '}
                      <span className="underline">{lastBooking.preferredBarber}</span> at{' '}
                      <strong>{lastBooking.studioBranch}</strong> on{' '}
                      <span className="tabular-nums">{lastBooking.preferredDate}</span> for{' '}
                      {lastBooking.clientName} ({lastBooking.clientPhone}).
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLastBooking(null)}
                    className="druk-font text-xs uppercase px-4 py-2 bg-white border-2 border-brand-primary rounded-lg hover:bg-brand-secondary transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
              )}

              <form
                id="booking-form"
                onSubmit={handleBookingSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left stagger-children"
                data-animation-on-scroll=""
              >
                <div className="space-y-2">
                  <label htmlFor="client-name" className="druk-font text-xs uppercase font-bold block">
                    Your Full Name
                  </label>
                  <input
                    id="client-name"
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Tunde Bakare"
                    className="w-full p-4 bg-neutral-background border-2 border-brand-primary rounded-xl focus:outline-none focus:border-brand-secondary"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="client-phone" className="druk-font text-xs uppercase font-bold block">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    id="client-phone"
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="e.g. 0803 123 4567"
                    className="w-full p-4 bg-neutral-background border-2 border-brand-primary rounded-xl focus:outline-none focus:border-brand-secondary"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="studio-branch" className="druk-font text-xs uppercase font-bold block">
                    Lounge Branch or Home Service
                  </label>
                  <select
                    id="studio-branch"
                    value={studioBranch}
                    onChange={(e) => setStudioBranch(e.target.value)}
                    className="w-full p-4 bg-neutral-background border-2 border-brand-primary rounded-xl focus:outline-none focus:border-brand-secondary appearance-none"
                  >
                    <option value="Victoria Island, Lagos (Ademola Adetokunbo)">
                      Victoria Island, Lagos (Ademola Adetokunbo)
                    </option>
                    <option value="Lekki Phase 1, Lagos (Admiralty Way)">
                      Lekki Phase 1, Lagos (Admiralty Way)
                    </option>
                    <option value="Ikeja GRA, Lagos (Isaac John St)">
                      Ikeja GRA, Lagos (Isaac John St)
                    </option>
                    <option value="Maitama, Abuja (Gana Street)">
                      Maitama, Abuja (Gana Street)
                    </option>
                    <option value="VIP Home / Hotel Call-Out (Mobile Dispatch)">
                      VIP Home / Hotel Call-Out (Mobile Dispatch)
                    </option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="service-type" className="druk-font text-xs uppercase font-bold block">
                    Selected Service / Package
                  </label>
                  <select
                    id="service-type"
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full p-4 bg-neutral-background border-2 border-brand-primary rounded-xl focus:outline-none focus:border-brand-secondary appearance-none"
                  >
                    <option value="Executive Cut & Hot Towel (₦15,000)">
                      Executive Cut &amp; Hot Towel (₦15,000)
                    </option>
                    <option value="Locs Detox & Retwist (₦25,000)">
                      Locs Detox &amp; Retwist (₦25,000)
                    </option>
                    <option value="VIP Home / Hotel Call-Out (₦50,000)">
                      VIP Home / Hotel Call-Out (₦50,000)
                    </option>
                    <option value="The Odogwu Total Reset (₦38,000)">
                      The &quot;Odogwu&quot; Total Reset (₦38,000)
                    </option>
                    <option value="Royal Hot Towel Shave & Beard Sculpt (₦10,000)">
                      Royal Hot Towel Shave &amp; Beard Sculpt (₦10,000)
                    </option>
                    <option value="Groom & Groomsmen VIP Suite (₦180,000)">
                      Groom &amp; Groomsmen VIP Suite (₦180,000)
                    </option>
                    {![
                      'Executive Cut & Hot Towel (₦15,000)',
                      'Locs Detox & Retwist (₦25,000)',
                      'VIP Home / Hotel Call-Out (₦50,000)',
                      'The Odogwu Total Reset (₦38,000)',
                      'Royal Hot Towel Shave & Beard Sculpt (₦10,000)',
                      'Groom & Groomsmen VIP Suite (₦180,000)',
                    ].includes(serviceType) && (
                      <option value={serviceType}>{serviceType}</option>
                    )}
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="preferred-barber" className="druk-font text-xs uppercase font-bold block">
                    Preferred Master Barber
                  </label>
                  <select
                    id="preferred-barber"
                    value={preferredBarber}
                    onChange={(e) => setPreferredBarber(e.target.value)}
                    className="w-full p-4 bg-neutral-background border-2 border-brand-primary rounded-xl focus:outline-none focus:border-brand-secondary appearance-none"
                  >
                    <option value="Any Available Master Barber">Any Available Master Barber</option>
                    <option value='Tunde "Blade" Adeyemi (Victoria Island, Lagos)'>
                      Tunde &quot;Blade&quot; Adeyemi (Victoria Island, Lagos)
                    </option>
                    <option value="Chidi Okafor (Lekki Phase 1, Lagos)">
                      Chidi Okafor (Lekki Phase 1, Lagos)
                    </option>
                    <option value="Ibrahim Danjuma (Maitama, Abuja)">
                      Ibrahim Danjuma (Maitama, Abuja)
                    </option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="preferred-date" className="druk-font text-xs uppercase font-bold block">
                    Preferred Date
                  </label>
                  <input
                    id="preferred-date"
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full p-4 bg-neutral-background border-2 border-brand-primary rounded-xl focus:outline-none focus:border-brand-secondary"
                  />
                </div>

                <button
                  type="submit"
                  disabled={bookingStatus === 'sending'}
                  className={`md:col-span-2 w-full text-white druk-font py-6 rounded-xl text-xl md:text-2xl transition-all shadow-neo mt-4 cursor-pointer ${
                    bookingStatus === 'sent'
                      ? 'bg-green-600'
                      : 'bg-brand-primary hover:bg-brand-secondary hover:text-brand-primary'
                  }`}
                >
                  {bookingStatus === 'sending'
                    ? 'LOCKING IN YOUR CHAIR...'
                    : bookingStatus === 'sent'
                    ? 'SLOT CONFIRMED!'
                    : 'Confirm Appointment'}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-neutral-background text-brand-primary py-20 border-t-2 border-brand-primary overflow-hidden">
        <div
          className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 items-start stagger-children"
          data-animation-on-scroll=""
        >
          {/* Left Column: Newsletter & Logo */}
          <div className="flex flex-col gap-10 stagger-children" data-animation-on-scroll="">
            <div className="space-y-6 stagger-children" data-animation-on-scroll="">
              <div className="druk-font text-3xl font-bold tracking-tighter text-brand-primary">
                BLADE &amp; POLISH
              </div>
              <h2 className="text-[16px] font-secondary leading-relaxed text-text-secondary max-w-[290px]">
                Join the Executive List for priority festive-season slots, grooming tips, and
                members-only lounge invites across Lagos &amp; Abuja.
              </h2>

              <form
                id="footer-newsletter"
                onSubmit={handleNewsletterSubmit}
                className="space-y-4 max-w-[300px]"
              >
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full h-[58px] px-5 border-2 border-brand-primary rounded-xl bg-white text-[16px] focus:outline-none focus:border-brand-secondary transition-colors"
                  required
                />
                <button
                  type="submit"
                  className={`w-full h-[58px] flex items-center justify-center border-2 border-brand-primary rounded-xl text-brand-primary druk-font font-bold text-[16px] shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all uppercase tracking-wider cursor-pointer ${
                    newsletterStatus === 'subscribed' ? 'bg-white' : 'bg-brand-secondary'
                  }`}
                >
                  {newsletterStatus === 'checking'
                    ? 'JOINING...'
                    : newsletterStatus === 'subscribed'
                    ? "YOU'RE ON THE LIST!"
                    : 'Join VIP List'}
                </button>
              </form>
            </div>

            <div className="flex flex-col gap-2">
              <small className="text-[14px] text-text-secondary font-secondary font-bold uppercase tracking-widest">
                © 2026 Blade &amp; Polish Grooming Lounge Ltd.
              </small>
              <div className="text-[12px] text-text-secondary/60">
                Victoria Island · Lekki Phase 1 · Ikeja GRA · Maitama Abuja
              </div>
            </div>
          </div>

          {/* Right Column: Main Content & Navigation */}
          <div className="flex flex-col stagger-children" data-animation-on-scroll="">
            {/* Text & CTA Block */}
            <div className="mb-16 stagger-children" data-animation-on-scroll="">
              <div className="druk-font text-[34px] md:text-[50px] leading-[1.05] text-brand-primary font-bold uppercase max-w-[720px] mb-10 tracking-tighter">
                Executive <span className="text-brand-secondary">Precision</span> for men who lead
                from the front.
              </div>
              <div className="flex flex-wrap gap-5">
                <a
                  href="#booking"
                  className="h-[64px] px-10 flex items-center justify-center bg-brand-primary border-2 border-brand-primary rounded-full text-white druk-font font-bold text-[16px] shadow-neo hover:shadow-none transition-all uppercase whitespace-nowrap shrink-0"
                >
                  Book A Chair
                </a>
                <a
                  href="tel:+2348035550194"
                  className="h-[64px] px-10 flex items-center justify-center bg-white border-2 border-brand-primary rounded-full text-brand-primary druk-font font-bold text-[16px] shadow-neo hover:shadow-none transition-all uppercase whitespace-nowrap shrink-0"
                >
                  Call Concierge
                </a>
              </div>
            </div>

            {/* Links Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
              {/* Services */}
              <div className="flex flex-col gap-5">
                <h3 className="druk-font text-[14px] font-bold text-brand-primary uppercase tracking-[0.2em]">
                  Services
                </h3>
                <ul className="flex flex-col gap-4 text-[15px] font-secondary font-semibold text-text-secondary">
                  <li>
                    <button
                      type="button"
                      onClick={() => openServiceDetails(SERVICES[0])}
                      className="hover:text-brand-secondary transition-colors cursor-pointer text-left"
                    >
                      Executive Cut
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => openServiceDetails(SERVICES[1])}
                      className="hover:text-brand-secondary transition-colors cursor-pointer text-left"
                    >
                      Locs &amp; Retwist
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => openServiceDetails(SERVICES[2])}
                      className="hover:text-brand-secondary transition-colors cursor-pointer text-left"
                    >
                      VIP Home Call
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => openServiceDetails(GROOMSMEN_SERVICE)}
                      className="hover:text-brand-secondary transition-colors cursor-pointer text-left"
                    >
                      Groomsmen Suite
                    </button>
                  </li>
                </ul>
              </div>

              {/* Studio */}
              <div className="flex flex-col gap-5">
                <h3 className="druk-font text-[14px] font-bold text-brand-primary uppercase tracking-[0.2em]">
                  Lounge
                </h3>
                <ul className="flex flex-col gap-4 text-[15px] font-secondary font-semibold text-text-secondary">
                  <li>
                    <button
                      type="button"
                      onClick={() => setInfoModalTab('story')}
                      className="hover:text-brand-secondary transition-colors cursor-pointer text-left"
                    >
                      Our Story
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => setInfoModalTab('gallery')}
                      className="hover:text-brand-secondary transition-colors cursor-pointer text-left"
                    >
                      Lookbook
                    </button>
                  </li>
                  <li>
                    <a
                      href="#memberships"
                      className="hover:text-brand-secondary transition-colors"
                    >
                      Memberships
                    </a>
                  </li>
                </ul>
              </div>

              {/* Support */}
              <div className="flex flex-col gap-5">
                <h3 className="druk-font text-[14px] font-bold text-brand-primary uppercase tracking-[0.2em]">
                  Info
                </h3>
                <ul className="flex flex-col gap-4 text-[15px] font-secondary font-semibold text-text-secondary">
                  <li>
                    <button
                      type="button"
                      onClick={() => setInfoModalTab('faq')}
                      className="hover:text-brand-secondary transition-colors cursor-pointer text-left"
                    >
                      Hygiene &amp; FAQ
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => setInfoModalTab('contact')}
                      className="hover:text-brand-secondary transition-colors cursor-pointer text-left"
                    >
                      Locations &amp; Hours
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => setInfoModalTab('policies')}
                      className="hover:text-brand-secondary transition-colors cursor-pointer text-left"
                    >
                      Booking Policy
                    </button>
                  </li>
                </ul>
              </div>

              {/* Socials */}
              <div className="flex flex-col gap-5">
                <h3 className="druk-font text-[14px] font-bold text-brand-primary uppercase tracking-[0.2em]">
                  Connect
                </h3>
                <div className="flex gap-4">
                  <button
                    type="button"
                    aria-label="Lookbook Gallery"
                    onClick={() => setInfoModalTab('gallery')}
                    className="w-10 h-10 border-2 border-brand-primary rounded-full flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    aria-label="Lounge Locations"
                    onClick={() => setInfoModalTab('contact')}
                    className="w-10 h-10 border-2 border-brand-primary rounded-full flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all cursor-pointer"
                  >
                    <MapPin className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Service Details & Interactive Naira Price Estimator Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 bg-brand-primary/70 backdrop-blur-xs flex items-center justify-center p-4 md:p-6"
          onClick={() => setSelectedService(null)}
        >
          <div
            className="bg-white border-2 border-brand-primary rounded-card shadow-neo max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-10 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close service details"
              onClick={() => setSelectedService(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full border-2 border-brand-primary flex items-center justify-center hover:bg-brand-secondary transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs font-bold uppercase tracking-widest text-text-secondary mb-2">
              Service Breakdown · {selectedService.duration}
            </div>
            <h3 className="druk-font text-3xl md:text-4xl text-brand-primary uppercase mb-4">
              {selectedService.title}
            </h3>
            <p className="text-text-secondary mb-6 leading-relaxed">{selectedService.fullDesc}</p>

            {/* Checklist */}
            <div className="bg-neutral-background border-2 border-brand-primary rounded-xl p-5 mb-6">
              <div className="druk-font text-xs uppercase text-brand-primary mb-3">
                What&apos;s Included
              </div>
              <ul className="space-y-2.5">
                {selectedService.checklist.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-brand-primary">
                    <Check className="w-4 h-4 text-brand-secondary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Interactive Experience Tier Selector */}
            <div className="mb-6">
              <div className="druk-font text-xs uppercase text-brand-primary mb-3">
                1. Select Experience Tier
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SERVICE_TIERS.map((tier, idx) => (
                  <button
                    key={tier.label}
                    type="button"
                    onClick={() => setSelectedSizeIndex(idx)}
                    className={`p-3 rounded-xl border-2 text-left text-xs font-bold transition-all cursor-pointer ${
                      selectedSizeIndex === idx
                        ? 'border-brand-primary bg-brand-secondary text-brand-primary'
                        : 'border-brand-primary/30 bg-white text-text-secondary hover:border-brand-primary'
                    }`}
                  >
                    <div>{tier.label}</div>
                    <div className="text-[11px] opacity-80 tabular-nums">
                      {tier.adder === 0 ? 'Standard Rate' : `+${formatNaira(tier.adder)}`}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Optional Add-ons */}
            <div className="mb-8">
              <div className="druk-font text-xs uppercase text-brand-primary mb-3">
                2. Optional Executive Add-Ons
              </div>
              <div className="space-y-2">
                {ADD_ONS.map((addon) => {
                  const active = selectedAddOns.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddOn(addon.id)}
                      className={`w-full p-3 rounded-xl border-2 flex items-center justify-between text-xs font-bold transition-all cursor-pointer ${
                        active
                          ? 'border-brand-primary bg-brand-secondary/20 text-brand-primary'
                          : 'border-brand-primary/20 bg-white text-text-secondary hover:border-brand-primary'
                      }`}
                    >
                      <span>{addon.name}</span>
                      <span className="tabular-nums font-bold text-brand-primary">
                        +{formatNaira(addon.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t-2 border-brand-primary">
              <div>
                <div className="text-xs text-text-secondary font-semibold">Estimated Total</div>
                <div className="druk-font text-3xl text-brand-primary tabular-nums">
                  {formatNaira(calculatedModalPrice)}
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleBookFromModal(selectedService)}
                className="px-8 py-4 bg-brand-primary text-white druk-font text-sm uppercase rounded-full hover:bg-brand-secondary hover:text-brand-primary border-2 border-brand-primary transition-all shadow-neo-sm cursor-pointer whitespace-nowrap shrink-0"
              >
                Book This Package
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lounge Info Modal (Our Story, Lookbook, FAQ, Policies, Locations) */}
      {infoModalTab && (
        <div
          className="fixed inset-0 z-50 bg-brand-primary/70 backdrop-blur-xs flex items-center justify-center p-4 md:p-6"
          onClick={() => setInfoModalTab(null)}
        >
          <div
            className="bg-white border-2 border-brand-primary rounded-card shadow-neo max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-10 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close studio info modal"
              onClick={() => setInfoModalTab(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full border-2 border-brand-primary flex items-center justify-center hover:bg-brand-secondary transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Navigation Tabs */}
            <div className="flex flex-wrap gap-2 mb-8 pr-12">
              {(
                [
                  { id: 'story', label: 'Our Story' },
                  { id: 'gallery', label: 'Lookbook' },
                  { id: 'faq', label: 'Hygiene & FAQ' },
                  { id: 'policies', label: 'Policies' },
                  { id: 'contact', label: 'Locations' },
                ] as { id: InfoModalTab; label: string }[]
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setInfoModalTab(tab.id)}
                  className={`px-4 py-2 rounded-full border-2 border-brand-primary text-xs druk-font uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    infoModalTab === tab.id
                      ? 'bg-brand-secondary text-brand-primary'
                      : 'bg-neutral-background text-brand-primary hover:bg-brand-secondary/30'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {infoModalTab === 'story' && (
              <div className="space-y-4">
                <h3 className="druk-font text-3xl text-brand-primary uppercase">
                  Redefining Nigerian Men&apos;s Grooming
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  Founded in Victoria Island in 2021, Blade &amp; Polish was created to bridge the
                  gap between traditional neighbourhood barbershops and five-star hospitality.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  We pair medical-grade clipper sterilisation with master barbers trained in
                  African hair textures—from crisp skin fades and 360 waves to loc maintenance and
                  razor-bump-free beard sculpting.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  <div className="p-4 rounded-xl border-2 border-brand-primary bg-neutral-background">
                    <div className="druk-font text-2xl text-brand-secondary tabular-nums">4</div>
                    <div className="text-xs font-bold text-brand-primary mt-1">
                      Lounges in Lagos &amp; Abuja
                    </div>
                  </div>
                  <div className="p-4 rounded-xl border-2 border-brand-primary bg-neutral-background">
                    <div className="druk-font text-2xl text-brand-secondary tabular-nums">
                      14,800+
                    </div>
                    <div className="text-xs font-bold text-brand-primary mt-1">
                      Executive Cuts Delivered
                    </div>
                  </div>
                  <div className="p-4 rounded-xl border-2 border-brand-primary bg-neutral-background">
                    <div className="druk-font text-2xl text-brand-secondary tabular-nums">100%</div>
                    <div className="text-xs font-bold text-brand-primary mt-1">
                      Solar &amp; Generator Backed
                    </div>
                  </div>
                </div>
              </div>
            )}

            {infoModalTab === 'gallery' && (
              <div>
                <h3 className="druk-font text-3xl text-brand-primary uppercase mb-6">
                  Signature Cuts Lookbook
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {GALLERY_ITEMS.map((item, idx) => (
                    <div
                      key={idx}
                      className="border-2 border-brand-primary rounded-xl overflow-hidden bg-neutral-background shadow-neo-sm"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-56 object-cover border-b-2 border-brand-primary"
                      />
                      <div className="p-4">
                        <div className="druk-font text-sm uppercase text-brand-primary">
                          {item.title}
                        </div>
                        <div className="text-xs text-text-secondary mt-1">{item.breed}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {infoModalTab === 'faq' && (
              <div>
                <h3 className="druk-font text-3xl text-brand-primary uppercase mb-6">
                  Hygiene &amp; Grooming FAQ
                </h3>
                <div className="space-y-3">
                  {FAQ_ITEMS.map((item, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div
                        key={idx}
                        className="border-2 border-brand-primary rounded-xl overflow-hidden bg-neutral-background"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                          className="w-full p-4 text-left font-bold text-brand-primary flex items-center justify-between gap-4 cursor-pointer"
                        >
                          <span>{item.q}</span>
                          <ChevronDown
                            className={`w-5 h-5 shrink-0 transition-transform ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 text-sm text-text-secondary leading-relaxed border-t border-brand-primary/15 pt-3">
                            {item.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {infoModalTab === 'policies' && (
              <div className="space-y-4">
                <h3 className="druk-font text-3xl text-brand-primary uppercase mb-2">
                  Lounge Policies
                </h3>
                <div className="p-4 rounded-xl border-2 border-brand-primary bg-neutral-background">
                  <div className="druk-font text-xs uppercase text-brand-primary mb-1">
                    15-Minute Grace Period
                  </div>
                  <p className="text-sm text-text-secondary">
                    To ensure zero waiting time for all guests, we hold reserved chairs for 15
                    minutes before releasing the slot or adjusting to an Express Cut.
                  </p>
                </div>
                <div className="p-4 rounded-xl border-2 border-brand-primary bg-neutral-background">
                  <div className="druk-font text-xs uppercase text-brand-primary mb-1">
                    VIP Home Call-Out Security &amp; Access
                  </div>
                  <p className="text-sm text-text-secondary">
                    For gated estates in Lekki, Ikoyi, VI, Ikeja GRA, and Maitama, please generate
                    an estate access code for your assigned Master Barber 30 minutes prior to
                    arrival.
                  </p>
                </div>
              </div>
            )}

            {infoModalTab === 'contact' && (
              <div className="space-y-6">
                <h3 className="druk-font text-3xl text-brand-primary uppercase">
                  Flagship Lounge Locations
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-xl border-2 border-brand-primary bg-neutral-background flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-brand-secondary shrink-0 mt-1" />
                    <div>
                      <div className="druk-font text-xs uppercase text-brand-primary">
                        Victoria Island &amp; Lekki
                      </div>
                      <div className="text-sm text-text-secondary mt-1">
                        24 Ademola Adetokunbo St, VI
                        <br />
                        18 Admiralty Way, Lekki Phase 1
                      </div>
                    </div>
                  </div>
                  <div className="p-5 rounded-xl border-2 border-brand-primary bg-neutral-background flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-brand-secondary shrink-0 mt-1" />
                    <div>
                      <div className="druk-font text-xs uppercase text-brand-primary">
                        Ikeja GRA &amp; Maitama Abuja
                      </div>
                      <div className="text-sm text-text-secondary mt-1">
                        42 Isaac John Street, Ikeja GRA
                        <br />
                        11 Gana Street, Maitama, Abuja
                      </div>
                    </div>
                  </div>
                  <div className="p-5 rounded-xl border-2 border-brand-primary bg-neutral-background flex items-start gap-3">
                    <Clock className="w-5 h-5 text-brand-secondary shrink-0 mt-1" />
                    <div>
                      <div className="druk-font text-xs uppercase text-brand-primary">
                        Opening Hours
                      </div>
                      <div className="text-sm text-text-secondary mt-1">
                        Mon – Sat: 8:00 AM – 9:00 PM
                        <br />
                        Sunday: 11:00 AM – 8:00 PM
                      </div>
                    </div>
                  </div>
                  <div className="p-5 rounded-xl border-2 border-brand-primary bg-neutral-background flex items-start gap-3">
                    <Phone className="w-5 h-5 text-brand-secondary shrink-0 mt-1" />
                    <div>
                      <div className="druk-font text-xs uppercase text-brand-primary">
                        Concierge Desk
                      </div>
                      <div className="text-sm text-text-secondary mt-1 tabular-nums">
                        +234 803 555 0194 · concierge@bladeandpolish.ng
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
