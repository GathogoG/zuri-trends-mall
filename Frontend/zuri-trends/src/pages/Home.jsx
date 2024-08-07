import React from 'react';
import NavigationBar from '../components/NavigationBar';
import Card from '../components/Card';

const Home = () => {
  const cardData = [
    {
      images: [
        'https://tisapthreads.com/cdn/shop/files/DSC01433-Edit_706445e2-b971-4714-aa6d-ff4cface3b2d_375x_crop_center.jpg?v=1716358776',
        'https://tisapthreads.com/cdn/shop/files/DSC01412-Edit_f3b92ce7-9513-4793-bc2a-dc305a7c11bd_770x_crop_center.jpg?v=1716357980'
      ],
      title: 'RAVE SHORTS',
      text: 'KSh1,500.00',
      productId: 1
    },
    {
      images: [
        'https://media1.popsugar-assets.com/files/thumbor/eDpPcum8XEN7TCOEPer_0miQIPc/fit-in/728xorig/filters:format_auto-!!-:strip_icc-!!-/2017/05/30/864/n/24155406/93765e2a4dd599d7_0825031480044NEW_00_001/i/Billabong-Spring-Fever-Long-Sleeve-Springsuit.jpg',
        'https://www.sequence.co.nz/user/images/10751.jpg?t=1912101415'
      ],
      title: 'BIKINI',
      text: 'KSh1,600.00',
      productId: 2
    },
    {
      images: [
        'https://tisapthreads.com/cdn/shop/files/DSC01282-Edit-2_34d8e425-562c-4475-b092-529b38ac1a3a_375x_crop_center.jpg?v=1716358910',
        'https://tisapthreads.com/cdn/shop/files/DSC01300-Edit-2_8738648b-254f-45bd-8939-1a157678414c_375x_crop_center.jpg?v=1716358909'
      ],
      title: 'TISAP SHORTS',
      text: 'KSh2,000.00',
      productId: 3
    },
    {
      images: [
        'https://i.pinimg.com/736x/76/b9/ec/76b9eca569211813052630d50450af3b.jpg',
        'https://i.pinimg.com/originals/de/fa/66/defa6603a295e85e58696f214db1c85c.jpg'
      ],
      title: 'MAMI JEANS',
      text: 'KSh1,600.00',
      productId: 4
    },
  ];

  return (
    <div>
      <NavigationBar />
      <div className="min-h-screen bg-gray-100">
        <div className="relative w-full h-screen mb-8">
          <img
            src="https://imgs.search.brave.com/kx4YYK0k1YZJDtdZ3af-GMA6HDkAxJUh9RhEwXG4bzU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/Y2xvdGhlcy1vbi1h/LXJhY2staW4tYS1j/bG90aGluZy1zdG9y/ZS5qcGc_d2lkdGg9/MTAwMCZmb3JtYXQ9/cGpwZyZleGlmPTAm/aXB0Yz0w"
            alt="Decorative Banner"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="p-4 text-6xl font-bold text-white bg-gray-800 bg-opacity-50 rounded-lg">
              Welcome To Zuri Trends
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 p-4 mb-8 md:grid-cols-2 lg:grid-cols-4">
          {cardData.map((card, index) => (
            <Card
              key={index}
              images={card.images}
              title={card.title}
              text={card.text}
              productId={card.productId}
            />
          ))}
        </div>

        <div className="w-full h-screen">
          <img
            src="https://tisapthreads.com/cdn/shop/files/tisap-48.jpg?v=1710422317"
            alt="Additional Banner"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
