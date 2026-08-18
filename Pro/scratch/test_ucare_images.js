const images = [
  '/kondaveedu_1.jpeg',
  'https://ucarecdn.com/74cb1cad-d427-4eee-994f-16184b530a7a/kondaveedu_2.jpeg',
  'https://ucarecdn.com/7878b810-40ea-449d-b263-d96122cb7288/kondaveedu_3.jpeg',
  'https://ucarecdn.com/62fad105-59ff-47a1-883e-f790f03d6b2a/kondaveedu_4.jpeg',
  'https://ucarecdn.com/a5fa6b17-fb8b-4ef2-a094-d16f99dc8c03/kondaveedu_5.jpeg',
  'https://ucarecdn.com/4fbb7217-10d4-4a59-8fdf-e9e7ccf24ffa/kondaveedu_6.jpeg',
  'https://ucarecdn.com/23252f85-03c5-4a12-a19b-72605dd42a5e/kondaveedu_7.jpeg',
  'https://ucarecdn.com/3c902142-4abc-424c-8397-350833eea661/kondaveedu_8.jpeg',
  'https://ucarecdn.com/6e6632ab-6852-441e-9a83-0d0e5bff3a5d/kondaveedu_9.jpeg',
  'https://ucarecdn.com/42f35c1f-5584-45f4-aad1-f0a2417be46b/kondaveedu_10.jpeg',
  'https://ucarecdn.com/69c59033-4bd6-4ef3-be81-c7e13de105b9/kondaveedu_11.jpeg',
  'https://ucarecdn.com/d383e6a4-9a04-4d6e-bc1f-8f16c90b839e/kondaveedu_13.jpeg',
  'https://ucarecdn.com/68a3f22e-917d-425e-8ef6-ac374d576c56/kondaveedu_14.jpeg',
  'https://ucarecdn.com/aad515b2-883c-4bfa-939b-2031b3519714/kondaveedu_15.jpeg',
  'https://ucarecdn.com/9f75cb29-38eb-4ca3-8d66-9439dee8e193/kondaveedu_16.jpeg',
  'https://ucarecdn.com/42daebd9-087f-4ea4-9c66-21ff97b55d0c/kondaveedu_17.jpeg',
  'https://ucarecdn.com/6a2c5f78-cc23-44ed-a924-63d87ed481f0/kondaveedu_18.jpeg'
];

async function checkImages() {
  for (let i = 0; i < images.length; i++) {
    const url = images[i];
    if (url.startsWith('http')) {
      try {
        const res = await fetch(url);
        console.log(`[${i + 1}] ${res.status} -> ${url}`);
      } catch (err) {
        console.log(`[${i + 1}] ERR: ${err.message} -> ${url}`);
      }
    } else {
      console.log(`[${i + 1}] LOCAL ASSET: ${url}`);
    }
  }
}

checkImages();
