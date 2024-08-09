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
      title: 'SWIMMING SUITS',
      text: 'KSh1,600.00',
      productId: 2
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
    // Additional Products
    {
      images: [
        'https://i.pinimg.com/564x/d2/3c/ea/d23ceaa8e1ab5e1ae744cdb47d86979b.jpg',
        'https://i.pinimg.com/564x/9d/7c/ad/9d7cad5ede208c3585a65b40188b2576.jpg'
      ],
      title: 'Grey Sexy Collar Fabric Plain Tank Embellished Slight Stretch Women Clothing',
      text: 'KSh2,500.00',
      productId: 5
    },
    {
      images: [
        'https://i.pinimg.com/736x/c6/4d/4b/c64d4b48394ebdbec3e4cbc688f090bc.jpg',
        'https://i.pinimg.com/564x/ab/16/dd/ab16ddb974fd58cef55f965e48934384.jpg'
      ],
      title: 'EZwear Drop Shoulder Flap Pocket Patched Teddy Jacket & Pants - Women Two-piece Outfits',
      text: 'KSh2,200.00',
      productId: 6
    },
    {
      images: [
        'https://i.pinimg.com/736x/64/1f/57/641f5798356599ea6e09e0b6294542eb.jpg',
        'https://i.pinimg.com/736x/e7/35/3e/e7353e86aa23ed3d52b0a103bd9bc7ac.jpg'
      ],
      title: 'Flared pants',
      text: 'KSh1,800.00',
      productId: 7
    },
    {
      images: [
        'https://i.pinimg.com/564x/87/ad/1f/87ad1f7cb7c9ae3ba687a37e18d89327.jpg',
        'https://i.pinimg.com/564x/97/ea/aa/97eaaafdd757f8c25c452b941e1c24a1.jpg'
      ],
      title: 'Y2K Sweaters Women Long Sleeve Knit Crop Tops Grunge Fairy Gothic Vintage Loose Pullover Sweater Female Distressed Crochet Smock',
      text: 'KSh2,700.00',
      productId: 8
    },
    {
      images: [
        'https://i.pinimg.com/564x/5f/27/c6/5f27c66f1f458307728e6ff6047cf69d.jpg',
        'https://i.pinimg.com/736x/b8/7c/40/b87c40f17dbc9488ceb3de0f7984a765.jpg'
      ],
      title: 'Wide leg jeans in washed black',
      text: 'KSh1,900.00',
      productId: 9
    },
    {
      images: [
        'https://i.pinimg.com/564x/5d/35/a2/5d35a20ad791375f5ee8e4e177242d60.jpg',
        'https://i.pinimg.com/564x/a6/8d/6a/a68d6adbcd27ea9489c83dd3dbccb834.jpg'
      ],
      title: 'Style Notes Men’s knitwear',
      text: 'KSh2,800.00',
      productId: 6
    },
    {
      images: [
        'https://i.pinimg.com/564x/13/2e/cc/132eccbb4d8c4e227abddb6253ce8499.jpg',
        'https://i.pinimg.com/564x/91/2f/14/912f144b7a29e363c5cb6c80322d5640.jpg'
      ],
      title: 'Fitted corset-style tank top with boning integrated through front. Featuring a tapered hemline and crewneck collar.',
      text: 'KSh1,800.00',
      productId: 7
    },
    {
      images: [
        'https://i.pinimg.com/564x/60/ba/8a/60ba8ad04c2575f95ae90d1e677a1d2c.jpg',
        'https://i.pinimg.com/564x/b4/30/70/b43070859f869558d66de18a7ed3c536.jpg'
      ],
      title: 'BOXY HOMME PU BADGE COLLARED VARSITY JACKET',
      text: 'KSh2,700.00',
      productId: 8
    },
    {
      images: [
        'https://i.pinimg.com/564x/93/0a/fe/930afe52596f64a886e4ba1d1a7ba975.jpg',
        'https://i.pinimg.com/736x/c0/65/d1/c065d196796c18c87daf84c6fc45adb6.jpg'
      ],
      title: 'Toloer Women Casual Contrast Slit Sweater Suits O-Neck Knitted Crop Pullover And Wide Leg Pants Female 2 Piece Set Elegant Warm Outfit',
      text: 'KSh1,900.00',
      productId: 9
    }
  ];

  return (
    <div>
      <NavigationBar />
      <div className="min-h-screen bg-gray-100">
        <div className="relative w-full h-screen mb-8">
          <img
            src="https://i.pinimg.com/564x/bb/55/d3/bb55d39a3f0f0f2dc11419c3480a7b4b.jpg"
            alt="Decorative Banner"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="p-4 text-6xl font-extrabold text-white bg-gray-800 bg-opacity-50 rounded-lg shadow-lg">
              Welcome To Zuri Trends
            </div>
          </div>
        </div>

        <div className="p-4 mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-8 drop-shadow-lg">
            TRENDING NOW
          </h1>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {cardData.map((card, index) => (
              <Card
                key={index}
                images={card.images}
                title={
                  <span className="text-lg font-semibold text-gray-900 hover:text-gray-700">
                    {card.title}
                  </span>
                }
                text={
                  <span className="text-xl font-bold text-red-600 hover:text-red-800">
                    {card.text}
                  </span>
                }
                productId={card.productId}
              />
            ))}
          </div>
        </div>

        <div className="w-full h-screen">
          <img
            src="https://i.pinimg.com/564x/f6/cb/0e/f6cb0e7266a9abd37376dc4dd4aadced.jpg"
            alt="Additional Banner"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
