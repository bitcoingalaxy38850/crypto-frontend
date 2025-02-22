export const items = [
    {
        image: "/Images/bitcoin.png",
        name: "John Doe",
        experience: "I've been using this product for a few months now, and I can't recommend it enough! The quality is fantastic.",
    },
    {
        image: "/Images/bitcoin.png",
        name: "Jane Smith",
        experience: "A game changer for my daily routine. The flavor is excellent, and I feel great using it!",
    },
    {
        image: "/Images/bitcoin.png",
        name: "Michael Johnson",
        experience: "This product exceeded my expectations. The results are amazing, and I will definitely buy again!",
    },
    {
        image: "/Images/bitcoin.png",
        name: "Emily Davis",
        experience: "I love this product! It has made a significant difference in my health and well-being.",
    },
    {
        image: "/Images/bitcoin.png",
        name: "Sarah Wilson",
        experience: "The best investment I've made this year. Highly recommend it to everyone looking for quality!",
    },
    {
        image: "/Images/bitcoin.png",
        name: "David Brown",
        experience: "Exceptional quality and taste. I have recommended it to all my friends and family!",
    },
];

export const partners = [
    {
      mainImage: "/Images/bitlogo.png",
      smallImage: "/Images/checkmark.svg",
 
    },
    {
      mainImage: "/Images/bitman.png",
      smallImage: "/Images/checkmark.svg",
    
    },
    {
      mainImage: "/Images/canan.png",
      smallImage: "/Images/checkmark.svg",
   
    },
    {
      mainImage: "/Images/master.png",
      smallImage: "/Images/checkmark.svg",
     
    },
    {
        mainImage: "/Images/visa.png",
        smallImage: "/Images/checkmark.svg",
       
      },
      {
        mainImage: "/Images/zene.png",
        smallImage: "/Images/checkmark.svg",
       
      },
  ];

  export const SideBarLinks = [
    { label: 'Machines', route: '/machine_listing', imgUrl: '/Images/icons/machine.svg' , role:'USER' },
    // { label: 'Tutorials', route: '/video_section', imgUrl: '/Images/icons/video.svg' , role:'USER' },
    { label: 'Transaction', route: '/transaction', imgUrl: '/Images/icons/deposit.svg' , role:'USER' },
    { label: 'Profile', route: '/profile', imgUrl: '/Images/icons/profile.svg' , role:'USER' },
    // { label: 'Games', route: '/game', imgUrl: '/Images/icons/deposit.svg' , role:'USER' },


    { label: 'Admin', route: '/admin', imgUrl: '/Images/icons/admin.svg', role: 'CARTEL' }, // Role-based link
];



  export const HOST_URL = 'http://localhost:3001';
  // export const HOST_URL = "https://api.cryptomyner.com"
export const secretKey = 'cartel';
