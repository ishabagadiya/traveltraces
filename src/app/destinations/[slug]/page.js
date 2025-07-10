"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { FaClock, FaMountain, FaUserFriends, FaRupeeSign, FaCalendarAlt, FaMapMarkerAlt, FaWhatsapp, FaPhoneAlt, FaDownload, FaSuitcase, FaStar, FaUtensils, FaBed, FaBus, FaCamera, FaHiking, FaSwimmingPool, FaWifi, FaSnowflake, FaSun, FaLeaf } from 'react-icons/fa';

// Comprehensive trip data
const trips = {
  saputara: {
    name: 'Saputara',
    tagline: "Gujarat's Hidden Hill Station",
    images: [
      '/HeroImages/saputara.jpeg',
      '/HeroImages/saputara.webp',
      '/HeroImages/matheran.jpeg',
      '/HeroImages/andharban.jpeg',
      '/HeroImages/andharban.webp'
    ],
    videos: [],
    description: "Discover the misty mountains and rich tribal culture of Gujarat's only hill station",
    duration: '2 Days 1 Night',
    difficulty: 'Easy',
    ageAllowed: '10+',
    maxGroupSize: 15,
    rating: 4.8,
    reviews: 127,
    about: 'Saputara, meaning "abode of serpents," is Gujarat\'s premier hill station nestled in the Sahyadri range. This picturesque destination offers a perfect blend of natural beauty, tribal culture, and adventure activities. With its cool climate, lush forests, and stunning viewpoints, Saputara provides an ideal escape from the plains.',
    highlights: [
      'Misty mountains & lush forests',
      'Saputara Lake & Sunset Point',
      'Local tribal culture & handicrafts',
      'Pleasant weather year-round',
      'Adventure activities & trekking',
      'Local cuisine & tribal markets'
    ],
    joinUsFrom: [
      { place: 'Mumbai', price: '₹4,500', duration: '2 days', transport: 'AC Bus' },
      { place: 'Surat', price: '₹3,800', duration: '2 days', transport: 'AC Bus' },
      { place: 'Ahmedabad', price: '₹4,200', duration: '2 days', transport: 'AC Bus' },
      { place: 'Vadodara', price: '₹3,900', duration: '2 days', transport: 'AC Bus' }
    ],
    availableDates: ['2024-07-10', '2024-07-24', '2024-08-05', '2024-08-19', '2024-09-02'],
    schedule: [
      { 
        day: 1, 
        heading: 'Arrival & Lake Exploration', 
        description: 'Arrive at Saputara, check-in at hotel. Visit Saputara Lake for boating, explore Sunset Point for breathtaking views, and enjoy tribal dance performance in the evening.',
        activities: ['Hotel Check-in', 'Saputara Lake Boating', 'Sunset Point Visit', 'Tribal Dance Show'],
        images: ['/HeroImages/saputara.jpeg'],
        meals: ['Lunch', 'Dinner']
      },
      { 
        day: 2, 
        heading: 'Trek & Departure', 
        description: 'Early morning trek to Artist Village, visit Tribal Museum, explore local markets for handicrafts, and return journey.',
        activities: ['Morning Trek', 'Tribal Museum', 'Local Market Visit', 'Return Journey'],
        images: [],
        meals: ['Breakfast', 'Lunch']
      }
    ],
    inclusions: [
      'AC accommodation in 3-star hotel',
      'All meals (2 breakfast, 2 lunch, 1 dinner)',
      'AC bus transportation',
      'Professional trek guide',
      'All entry fees and permits',
      'First aid kit and safety equipment',
      'Trip coordinator throughout the journey'
    ],
    exclusions: [
      'Personal expenses',
      'Any additional activities',
      'Travel insurance',
      'GST (5%)',
      'Tips and gratuities'
    ],
    thingsToCarry: [
      'Comfortable trekking shoes',
      'Water bottle (2L)',
      'Raincoat/umbrella',
      'Warm clothes (evenings are cool)',
      'ID proof (mandatory)',
      'Personal medications',
      'Camera and power bank',
      'Snacks and energy bars'
    ],
    accommodation: {
      type: '3-Star Hotel',
      facilities: ['AC Rooms', 'Hot Water', 'WiFi', 'Restaurant', 'Parking'],
      roomType: 'Double/Triple sharing'
    },
    transport: {
      type: 'AC Bus',
      pickup: 'Multiple pickup points in each city',
      departure: 'Early morning (6:00 AM)',
      return: 'Evening (8:00 PM)'
    },
    cancellation: {
      before7days: 'Full refund',
      before3days: '50% refund',
      before1day: '25% refund',
      sameDay: 'No refund'
    },
    brochure: '/brochures/saputara.pdf',
    faq: [
      {
        question: 'Is this trip suitable for beginners?',
        answer: 'Yes, this is an easy-level trip perfect for first-time trekkers and families.'
      },
      {
        question: 'What is the weather like in Saputara?',
        answer: 'Saputara enjoys pleasant weather throughout the year with temperatures ranging from 15-30°C.'
      },
      {
        question: 'Are meals included in the package?',
        answer: 'Yes, all meals including breakfast, lunch, and dinner are included in the package.'
      },
      {
        question: 'What should I wear for the trek?',
        answer: 'Comfortable trekking shoes, light cotton clothes, and a jacket for evenings are recommended.'
      }
    ]
  },
  manali: {
    name: 'Manali',
    tagline: "Queen of Hills",
    images: [
      '/HeroImages/manali.jpeg',
      '/HeroImages/kedarnath.jpeg',
      '/HeroImages/saputara.jpeg',
      '/HeroImages/matheran.jpeg',
      '/HeroImages/andharban.jpeg'
    ],
    videos: [],
    description: "Experience the magic of the Himalayas with snow-capped peaks and adventure activities",
    duration: '4 Days 3 Nights',
    difficulty: 'Moderate',
    ageAllowed: '12+',
    maxGroupSize: 12,
    rating: 4.9,
    reviews: 203,
    about: 'Manali, nestled in the heart of the Himalayas, is a paradise for nature lovers and adventure enthusiasts. With its snow-capped peaks, gushing rivers, and pine forests, Manali offers a perfect blend of tranquility and excitement.',
    highlights: [
      'Snow-capped Himalayan peaks',
      'Adventure activities (rafting, paragliding)',
      'Local Himachali culture',
      'Apple orchards and valleys',
      'Hot springs and temples',
      'Mountain biking and trekking'
    ],
    joinUsFrom: [
      { place: 'Delhi', price: '₹12,500', duration: '4 days', transport: 'AC Bus' },
      { place: 'Chandigarh', price: '₹10,800', duration: '4 days', transport: 'AC Bus' },
      { place: 'Mumbai', price: '₹15,200', duration: '4 days', transport: 'Flight + Bus' }
    ],
    availableDates: ['2024-07-15', '2024-07-29', '2024-08-12', '2024-08-26'],
    schedule: [
      { 
        day: 1, 
        heading: 'Arrival & Mall Road', 
        description: 'Arrive in Manali, check-in at hotel. Evening walk on Mall Road, visit Hadimba Temple.',
        activities: ['Hotel Check-in', 'Mall Road Walk', 'Hadimba Temple', 'Local Market'],
        images: ['/HeroImages/manali.jpeg'],
        meals: ['Dinner']
      },
      { 
        day: 2, 
        heading: 'Solang Valley Adventure', 
        description: 'Full day adventure activities in Solang Valley including zorbing, paragliding, and skiing.',
        activities: ['Solang Valley', 'Adventure Sports', 'Photography', 'Evening Bonfire'],
        images: [],
        meals: ['Breakfast', 'Lunch', 'Dinner']
      },
      { 
        day: 3, 
        heading: 'Rohtang Pass', 
        description: 'Visit Rohtang Pass for snow activities, photography, and breathtaking mountain views.',
        activities: ['Rohtang Pass', 'Snow Activities', 'Mountain Views', 'Local Cuisine'],
        images: [],
        meals: ['Breakfast', 'Lunch', 'Dinner']
      },
      { 
        day: 4, 
        heading: 'Departure', 
        description: 'Morning visit to Vashisht Hot Springs, shopping, and return journey.',
        activities: ['Vashisht Hot Springs', 'Shopping', 'Return Journey'],
        images: [],
        meals: ['Breakfast']
      }
    ],
    inclusions: [
      'AC accommodation in 3-star hotel',
      'All meals (3 breakfast, 3 lunch, 3 dinner)',
      'AC bus transportation',
      'Adventure activity equipment',
      'Professional guides',
      'All entry fees and permits',
      'First aid kit and safety equipment'
    ],
    exclusions: [
      'Personal expenses',
      'Optional adventure activities',
      'Travel insurance',
      'GST (5%)',
      'Tips and gratuities'
    ],
    thingsToCarry: [
      'Warm clothes and jackets',
      'Trekking shoes',
      'Sunglasses and sunscreen',
      'Water bottle',
      'ID proof (mandatory)',
      'Personal medications',
      'Camera and power bank',
      'Thermal wear (for snow activities)'
    ],
    accommodation: {
      type: '3-Star Hotel',
      facilities: ['AC Rooms', 'Hot Water', 'WiFi', 'Restaurant', 'Parking', 'Bonfire'],
      roomType: 'Double/Triple sharing'
    },
    transport: {
      type: 'AC Bus',
      pickup: 'Multiple pickup points in each city',
      departure: 'Evening (8:00 PM)',
      return: 'Morning (8:00 AM)'
    },
    cancellation: {
      before7days: 'Full refund',
      before3days: '50% refund',
      before1day: '25% refund',
      sameDay: 'No refund'
    },
    brochure: '/brochures/manali.pdf',
    faq: [
      {
        question: 'Is Rohtang Pass always accessible?',
        answer: 'Rohtang Pass accessibility depends on weather conditions and may require permits during peak season.'
      },
      {
        question: 'What adventure activities are included?',
        answer: 'Basic adventure activities are included. Premium activities like paragliding may have additional charges.'
      },
      {
        question: 'Is the trip suitable for elderly people?',
        answer: 'Yes, with moderate physical activity. We can customize the itinerary for elderly participants.'
      },
      {
        question: 'What is the best time to visit Manali?',
        answer: 'March to June and September to December are the best months to visit Manali.'
      }
    ]
  },
  kedarnath: {
    name: 'Kedarnath',
    tagline: "Sacred Himalayan Shrine",
    images: [
      '/HeroImages/kedarnath.jpeg',
      '/HeroImages/manali.jpeg',
      '/HeroImages/saputara.jpeg',
      '/HeroImages/matheran.jpeg',
      '/HeroImages/andharban.jpeg'
    ],
    videos: [],
    description: "Embark on a spiritual journey to one of the holiest Hindu shrines in the Himalayas",
    duration: '5 Days 4 Nights',
    difficulty: 'Challenging',
    ageAllowed: '16+',
    maxGroupSize: 10,
    rating: 4.7,
    reviews: 89,
    about: 'Kedarnath, one of the holiest Hindu shrines, is located at an altitude of 3,583 meters in the Garhwal Himalayas. This sacred temple dedicated to Lord Shiva offers a unique blend of spirituality and adventure.',
    highlights: [
      'Sacred Kedarnath Temple',
      'Challenging trek through Himalayas',
      'Spiritual atmosphere',
      'Breathtaking mountain views',
      'Local Garhwali culture',
      'Hot springs at Gaurikund'
    ],
    joinUsFrom: [
      { place: 'Delhi', price: '₹8,500', duration: '5 days', transport: 'AC Bus' },
      { place: 'Haridwar', price: '₹6,800', duration: '5 days', transport: 'AC Bus' },
      { place: 'Rishikesh', price: '₹7,200', duration: '5 days', transport: 'AC Bus' }
    ],
    availableDates: ['2024-07-20', '2024-08-03', '2024-08-17', '2024-09-01'],
    schedule: [
      { 
        day: 1, 
        heading: 'Journey to Rishikesh', 
        description: 'Depart from Delhi, arrive in Rishikesh, evening Ganga Aarti at Triveni Ghat.',
        activities: ['Departure', 'Rishikesh Arrival', 'Ganga Aarti', 'Hotel Check-in'],
        images: ['/HeroImages/kedarnath.jpeg'],
        meals: ['Dinner']
      },
      { 
        day: 2, 
        heading: 'Rishikesh to Guptkashi', 
        description: 'Travel to Guptkashi via Devprayag, Rudraprayag, and enjoy scenic mountain views.',
        activities: ['Mountain Drive', 'River Confluence', 'Local Markets', 'Evening Rest'],
        images: [],
        meals: ['Breakfast', 'Lunch', 'Dinner']
      },
      { 
        day: 3, 
        heading: 'Trek to Kedarnath', 
        description: 'Early morning drive to Gaurikund, begin trek to Kedarnath (16 km uphill).',
        activities: ['Gaurikund', 'Trek Start', 'Mountain Views', 'Temple Visit'],
        images: [],
        meals: ['Breakfast', 'Lunch', 'Dinner']
      },
      { 
        day: 4, 
        heading: 'Kedarnath Darshan', 
        description: 'Morning darshan at Kedarnath Temple, explore surroundings, evening return trek.',
        activities: ['Temple Darshan', 'Local Exploration', 'Return Trek', 'Gaurikund'],
        images: [],
        meals: ['Breakfast', 'Lunch', 'Dinner']
      },
      { 
        day: 5, 
        heading: 'Return Journey', 
        description: 'Return to Rishikesh, evening departure to Delhi.',
        activities: ['Return Journey', 'Rishikesh', 'Delhi Departure'],
        images: [],
        meals: ['Breakfast', 'Lunch']
      }
    ],
    inclusions: [
      'AC accommodation in hotels',
      'All meals during the trip',
      'AC bus transportation',
      'Trek guide and porter services',
      'Temple entry and permits',
      'First aid kit and safety equipment',
      'Trip coordinator throughout'
    ],
    exclusions: [
      'Personal expenses',
      'Pony or helicopter charges',
      'Travel insurance',
      'GST (5%)',
      'Tips and gratuities'
    ],
    thingsToCarry: [
      'Warm clothes and thermal wear',
      'Sturdy trekking shoes',
      'Walking stick',
      'Water bottle and energy drinks',
      'ID proof (mandatory)',
      'Personal medications',
      'Camera and power bank',
      'Raincoat and umbrella'
    ],
    accommodation: {
      type: 'Basic Hotels & Guest Houses',
      facilities: ['Basic Rooms', 'Hot Water', 'Restaurant', 'Parking'],
      roomType: 'Double/Triple sharing'
    },
    transport: {
      type: 'AC Bus',
      pickup: 'Multiple pickup points in each city',
      departure: 'Evening (7:00 PM)',
      return: 'Morning (7:00 AM)'
    },
    cancellation: {
      before7days: 'Full refund',
      before3days: '50% refund',
      before1day: '25% refund',
      sameDay: 'No refund'
    },
    brochure: '/brochures/kedarnath.pdf',
    faq: [
      {
        question: 'Is the trek to Kedarnath difficult?',
        answer: 'Yes, it\'s a challenging 16km uphill trek. Ponies and helicopters are available at additional cost.'
      },
      {
        question: 'What is the best time to visit Kedarnath?',
        answer: 'May to June and September to October are the best months when the temple is open.'
      },
      {
        question: 'Are there medical facilities available?',
        answer: 'Basic medical facilities are available at Gaurikund and Kedarnath. Carry personal medications.'
      },
      {
        question: 'Is photography allowed in the temple?',
        answer: 'Photography is not allowed inside the main temple premises.'
      }
    ]
  }
};

export default function TripDetailsPage() {
  const params = useParams();
  const slug = params?.slug;
  const trip = trips[slug] || trips['saputara'];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] bg-black">
        <Image 
          src={trip.images[0]} 
          alt={trip.name} 
          fill 
          className="object-cover" 
        />
      </section>

      {/* Trip Header Content */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-4">{trip.name}</h1>
            <p className="text-xl md:text-2xl font-light text-gray-600 mb-6">{trip.tagline}</p>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto">{trip.description}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full border border-blue-200">
                <FaClock className="text-blue-600" />
                <span className="font-semibold">{trip.duration}</span>
              </div>
              <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full border border-green-200">
                <FaMountain className="text-green-600" />
                <span className="font-semibold">{trip.difficulty}</span>
              </div>
              <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full border border-purple-200">
                <FaUserFriends className="text-purple-600" />
                <span className="font-semibold">Age {trip.ageAllowed}+</span>
              </div>
              <div className="flex items-center gap-2 bg-yellow-50 text-yellow-700 px-4 py-2 rounded-full border border-yellow-200">
                <FaStar className="text-yellow-600" />
                <span className="font-semibold">{trip.rating} ({trip.reviews} reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky CTA Buttons */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-3 md:hidden">
        <a href="tel:8460146012" className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-full font-semibold shadow-lg hover:bg-blue-700 transition">
          <FaPhoneAlt />
        </a>
        <a href="https://wa.me/918460146012" target="_blank" rel="noopener" className="flex items-center gap-2 px-4 py-3 bg-green-500 text-white rounded-full font-semibold shadow-lg hover:bg-green-600 transition">
          <FaWhatsapp />
        </a>
        <a href={trip.brochure} download className="flex items-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-full font-semibold shadow-lg hover:bg-purple-700 transition">
          <FaDownload />
        </a>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center gap-3 mb-3">
              <FaCalendarAlt className="text-blue-600 text-xl" />
              <h3 className="font-semibold text-gray-800">Duration</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{trip.duration}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center gap-3 mb-3">
              <FaMountain className="text-green-600 text-xl" />
              <h3 className="font-semibold text-gray-800">Difficulty</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{trip.difficulty}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center gap-3 mb-3">
              <FaUserFriends className="text-purple-600 text-xl" />
              <h3 className="font-semibold text-gray-800">Group Size</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">Max {trip.maxGroupSize}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border">
            <div className="flex items-center gap-3 mb-3">
              <FaStar className="text-yellow-600 text-xl" />
              <h3 className="font-semibold text-gray-800">Rating</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{trip.rating}/5</p>
          </div>
        </div>

        {/* Image Gallery */}
        <section className="bg-white rounded-xl p-8 shadow-sm border mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {trip.images.map((image, index) => (
              <div key={index} className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                <Image 
                  src={image} 
                  alt={`${trip.name} - Image ${index + 1}`}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
              </div>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="bg-white rounded-xl p-8 shadow-sm border mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">About This Trip</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">{trip.about}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trip.highlights.map((highlight, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700">{highlight}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Join Us From */}
        <section className="bg-white rounded-xl p-8 shadow-sm border mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Us From</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trip.joinUsFrom.map((option, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition">
                <div className="flex items-center gap-3 mb-4">
                  <FaMapMarkerAlt className="text-blue-600 text-xl" />
                  <h3 className="font-semibold text-gray-900 text-lg">{option.place}</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-semibold text-green-600">{option.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-semibold text-gray-900">{option.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Transport:</span>
                    <span className="font-semibold text-gray-900">{option.transport}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Available Dates */}
        <section className="bg-white rounded-xl p-8 shadow-sm border mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Available Dates</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {trip.availableDates.map((date, index) => (
              <div key={index} className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <div className="text-sm text-blue-600 font-medium">Date</div>
                <div className="text-lg font-semibold text-gray-900">{date}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Schedule Timeline */}
        <section className="bg-white rounded-xl p-8 shadow-sm border mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Day-wise Schedule</h2>
          <div className="space-y-8">
            {trip.schedule.map((day, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {day.day}
                  </div>
                </div>
                <div className="flex-1 bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{day.heading}</h3>
                  <p className="text-gray-700 mb-4">{day.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Activities:</h4>
                      <ul className="space-y-1">
                        {day.activities.map((activity, actIndex) => (
                          <li key={actIndex} className="flex items-center gap-2 text-gray-700">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Meals:</h4>
                      <div className="flex flex-wrap gap-2">
                        {day.meals.map((meal, mealIndex) => (
                          <span key={mealIndex} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                            {meal}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Inclusions & Exclusions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <section className="bg-white rounded-xl p-8 shadow-sm border">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What's Included</h2>
            <ul className="space-y-3">
              {trip.inclusions.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="bg-white rounded-xl p-8 shadow-sm border">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What's Not Included</h2>
            <ul className="space-y-3">
              {trip.exclusions.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  </div>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Accommodation & Transport */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <section className="bg-white rounded-xl p-8 shadow-sm border">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Accommodation</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Type: {trip.accommodation.type}</h3>
                <p className="text-gray-700 mb-3">Room Type: {trip.accommodation.roomType}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Facilities:</h4>
                <div className="flex flex-wrap gap-2">
                  {trip.accommodation.facilities.map((facility, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {facility}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <section className="bg-white rounded-xl p-8 shadow-sm border">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Transport</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Type: {trip.transport.type}</h3>
                <p className="text-gray-700 mb-3">Pickup: {trip.transport.pickup}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Departure</h4>
                  <p className="text-gray-700">{trip.transport.departure}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Return</h4>
                  <p className="text-gray-700">{trip.transport.return}</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Things to Carry */}
        <section className="bg-white rounded-xl p-8 shadow-sm border mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Things to Carry</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trip.thingsToCarry.map((item, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <FaSuitcase className="text-blue-600" />
                <span className="text-gray-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Cancellation Policy */}
        <section className="bg-white rounded-xl p-8 shadow-sm border mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Cancellation Policy</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-sm text-green-600 font-medium">Before 7 days</div>
              <div className="text-lg font-bold text-green-800">{trip.cancellation.before7days}</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-sm text-yellow-600 font-medium">Before 3 days</div>
              <div className="text-lg font-bold text-yellow-800">{trip.cancellation.before3days}</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-sm text-orange-600 font-medium">Before 1 day</div>
              <div className="text-lg font-bold text-orange-800">{trip.cancellation.before1day}</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-sm text-red-600 font-medium">Same day</div>
              <div className="text-lg font-bold text-red-800">{trip.cancellation.sameDay}</div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white rounded-xl p-8 shadow-sm border mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {trip.faq.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex gap-6 justify-center mt-12">
          <a href="tel:8460146012" className="flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-full font-semibold shadow-lg hover:bg-blue-700 transition text-lg">
            <FaPhoneAlt />
            Call Now
          </a>
          <a href="https://wa.me/918460146012" target="_blank" rel="noopener" className="flex items-center gap-3 px-8 py-4 bg-green-500 text-white rounded-full font-semibold shadow-lg hover:bg-green-600 transition text-lg">
            <FaWhatsapp />
            WhatsApp
          </a>
          <a href={trip.brochure} download className="flex items-center gap-3 px-8 py-4 bg-purple-600 text-white rounded-full font-semibold shadow-lg hover:bg-purple-700 transition text-lg">
            <FaDownload />
            Download Brochure
          </a>
        </div>
      </div>
    </main>
  );
} 