function Products(){
  this.DB = []
  this.categories = []
  
  this.addProduct = ({name, category, price, description, imgSrc, isBestSelling})=>{
    this.DB.push({
      name,
      category,
      price,
      description,
      imgSrc,
      isBestSelling
    })

    this.updateCategories(category)
  }
    this.getRandomProduct = ()=>  this.DB[Math.floor(Math.random() * this.DB.length)]
    this.getAllProducts = ()=> this.DB

    this.getFeaturedProducts = (n) => {
      
      const featuredProducts = []
      for(let i = 0; i < n; i++){
        featuredProducts.push(this.getRandomProduct())
      }

      return featuredProducts

    }

    this.getProductsFromCategory = (category) => this.DB.filter((item)=> item.category == category)
    this.getBestSellingProducts = (category) => this.DB.filter((item)=> item.isBestSelling )

    this.updateCategories = (category)=>{
      if(this.categories.indexOf(category) < 0 ) this.categories.push(category)
    }

    this.getCategories = ()=> this.categories



}

const products = new Products()


// ELETRONICS
products.addProduct({
  name: 'ASUS ROG Strix Scar II',
  category: 'eletronics',
  price: 2556.59,
  description: `ROG Strix Scar II Gaming Laptop, 15.6” 144Hz, 3ms, NVIDIA GeForce RTX 2070 8GB GDDR6, Intel Core i7-8750H, 512GB PCIE NVME SSD, 16GB DDR4.`,
  imgSrc: '/assets/img/eletronics/laptop-1.jpg',
  isBestSelling: false
})


products.addProduct({
  name: 'Crucial 16GB Single DDR4',
  category: 'eletronics',
  price: 96.59,
  description: `CT16G4SFD8266 is a 16GB DDR4 Notebook module that operates at speeds up to 2666 MT/s and has a CL19 latency. It is an Unbuffered SODIMM. 
  It conforms to the industry standard DDR4 SODIMM layout of 260 pins and is compatible with systems that take DDR4 2666MT/s SODIMM memory.`,
  imgSrc: '/assets/img/eletronics/16ram-1.jpg',
  isBestSelling: false
})

products.addProduct({
  name: 'Playstation 5 Digital Edition',
  category: 'eletronics',
  price: 549.99,
  description: `The PS5 design reveal was a shock, and it included the surprise unveiling of the PS5 Digital Edition - a streamlined, all-digital console without a disc drive. 
  It's another sign that console manufacturers have their eye on a future without physical media. 
  While Sony didn't reveal the PS5 price or release date, we now know a lot of what we can expect when the PlayStation 5 launches later this year.`,
  imgSrc: '/assets/img/eletronics/ps5-console-1.jpg',
  isBestSelling: true
})

products.addProduct({
  name: 'Nintendo Switch Lite',
  category: 'eletronics',
  price: 259.96,
  description: `Handheld Nintendo Switch gaming at a great price. 
  For every member of your family, there’s a member of ours. 
  Optimized for personal, handheld play, Nintendo Switch Lite is a small and light Nintendo Switch system. 
  Features a sleek, unibody design with fully integrated controls and a built-in +Control Pad. 
  Compatible with all physical and digital Nintendo Switch games that support Handheld mode`,
  imgSrc: '/assets/img/eletronics/switch-lite-1.jpg',
  isBestSelling: false
})

products.addProduct({
  name: 'Mi 10',
  category: 'eletronics',
  price: 499.95,
  description: `CPU - Snapdragon865 OctaCore
  Screen - 6.67'' 2340x1080
  Camera - 108MP+13MP+2MP+2MP        
  OS - MIUI 11`,
  imgSrc: '/assets/img/eletronics/redmi-10-1.png',
  isBestSelling: false
})

products.addProduct({
  name: 'Logitech F310',
  category: 'eletronics',
  price: 24.99,
  description: `Console-style control for your PC games - Experience the console-style gaming you crave on your PC with the Gamepad F310. 
  Easy to use with its familiar shape and layout, it supports new games and old favorites. 
  Programmable controls allow for a more custom experience, while its floating D-pad enables quick response. 
  Just plug it in and get ready to play the way you like: to win.`,
  imgSrc: '/assets/img/eletronics/logitech-gamepad-1.jpg',
  isBestSelling: false
})



// BOOKS

products.addProduct({
  name: 'Neverwhere',
  category: 'books',
  price: 12.86,
  description: `by Neil Gaiman
  Richard Mayhew is a young man with a good heart and an ordinary life, which is changed forever when he stops to help a girl he finds bleeding on a London sidewalk. 
  His small act of kindness propels him into a world he never dreamed existed. There are people who fall through the cracks, and Richard has become one of them. 
  And he must learn to survive in this city of shadows and darkness, monsters and saints, murderers and angels, if he is ever to return to the London that he knew.`,
  imgSrc: '/assets/img/books/neverwhere.jpg',
  isBestSelling: false
})

products.addProduct({
  name: 'The Colour of Magic',
  category: 'books',
  price: 20.00,
  description: `by Terry Pratchett
  The story takes place on the Discworld, a planet-sized flat disc carried through space on the backs of four gargantuan elephants – Berilia, Tubul, Great T'Phon and Jerakeen.
  Who themselves stand on the shell of Great A'Tuin, a gigantic sea turtle. The surface of the disc contains oceans and continents, and with them, civilizations, cities, forests and mountains.`,
  imgSrc: '/assets/img/books/the-colour-of-magic.jpg',
  isBestSelling: true
})

products.addProduct({
  name: 'The Hitchhiker\'s Guide to the Galaxy',
  category: 'books',
  price: 12.48,
  description: `by Douglas Adams
  One Thursday lunchtime the Earth gets unexpectedly demolished to make way for a new hyperspace bypass. 
  For Arthur Dent, who has only just had his house demolished that morning, this seems already to be more than he can cope with. 
  Sadly, however, the weekend has only just begun, and the Galaxy is a very strange and startling place.`,
  imgSrc: '/assets/img/books/douglas-adams.jpg',
  isBestSelling: false
})

products.addProduct({
  name: 'Musashi',
  category: 'books',
  price: 24.00,
  description: `by Eiji Yoshikawa
  Miyamoto Musashi was the child of an era when Japan was emerging from decades of civil strife. Lured to the great Battle of Sekigahara in 1600 by the hope of becoming a samurai--without really knowing what it meant--he regains consciousness after the battle to find himself lying defeated, dazed and wounded among thousands of the dead and dying. On his way home, he commits a rash act, becomes a fugitive and brings life in his own village to a standstill--until he is captured by a weaponless Zen monk.`,
  imgSrc: '/assets/img/books/musashi.jpg',
  isBestSelling: false
})

products.addProduct({
  name: 'The Mists of Avalon',
  category: 'books',
  price: 20.79,
  description: `by Marion Zimmer Bradley
  In Marion Zimmer Bradley's masterpiece, we see the tumult and adventures of Camelot's court through the eyes of the women who bolstered the king's rise and schemed for his fall. 
  From their childhoods through the ultimate fulfillment of their destinies, we follow these women and the diverse cast of characters that surrounds them as the great Arthurian epic unfolds stunningly before us. As Morgaine and Gwenhwyfar struggle for control over the fate of Arthur's kingdom, as the Knights of the Round Table take on their infamous quest, as Merlin and Viviane wield their magics for the future of Old Britain, the Isle of Avalon slips further into the impenetrable mists of memory, until the fissure between old and new worlds' and old and new religions' claims its most famous victim.`,
  imgSrc: '/assets/img/books/the-mist-of-avalon.jpg',
  isBestSelling: false
})

products.addProduct({
  name: 'Eloquent JavaScript, 3rd Edition',
  category: 'books',
  price: 25.49,
  description: `by Marijn Haverbeke
  JavaScript lies at the heart of almost every modern web application, from social apps like Twitter to browser-based game frameworks like Phaser and Babylon. 
  Though simple for beginners to pick up and play with, JavaScript is a flexible, complex language that you can use to build full-scale applications.`,
  imgSrc: '/assets/img/books/eloquent-js.jpg',
  isBestSelling: true
})


//HOBBIES

products.addProduct({
  name: 'Pokemon TCG Trainer Box',
  category: 'hobbies',
  price: 59.99,
  description: `Fiery Battles and Deep Shadows. 
  What strange fires lurk in the shadows? Minions of Team Skull and a cavalcade of new Pokémon stand ready to battle in the dark of night and in the blazing sun. 
  Slug it out with new titans like Necrozma-GX and Tapu Fini-GX, or battle with trusty allies from Machamp-GX and Charizard-GX to Darkrai-GX and Ho-Oh-GX. 
  Fight for what’s right with the Pokémon TCG: Sun and Moon-Burning Shadows expansion. `,
  imgSrc: '/assets/img/hobbies/pokemon.jpg',
  isBestSelling: false
})

products.addProduct({
  name: 'Dungeons & Dragons Essentials Kit',
  category: 'hobbies',
  price: 24.99,
  description: `An innovator in providing fantasy entertainment, Dungeons & Dragons is the wellspring for the entire modern game industry, digital as well as tabletop. 
  Fifth edition D&D draws from every prior edition to create a universally compelling play experience, and exemplifies the true spirit of a game that holds captive the hearts and minds of millions of players worldwide. 
  The core rulebook series consists of three books: the Player’s Handbook, the Monster Manual, and the Dungeon Master’s Guide. `,
  imgSrc: '/assets/img/hobbies/dnd.jpg',
  isBestSelling: true
})
products.addProduct({
  name: 'Eldritch Horror',
  category: 'hobbies',
  price: 83.54,
  description: `Across the globe, ancient evil is stirring. 
  Now, you and your trusted circle of colleagues must travel around the world, working against all odds to hold back the approaching horror. 
  Foul monsters, brutal encounters and obscure mysteries will take you to your limit and beyond. 
  All the while, you and your fellow investigators must unravel the otherworldly mysteries scattered around the globe in order to push back the gathering mayhem that threatens to overwhelm humanity. 
  The end draws near. Do you have the courage to prevent global destruction? Eldritch Horror is a cooperative game of terror and adventure in which one to eight players take the roles of globetrotting investigators working to solve mysteries, gather clues and protect the world from an Ancient One - an elder being intent on destroying our world. 
  Each Ancient One comes with its own unique decks of Mystery and Research cards, which draw you deeper into the lore surrounding each loathsome creature. Discover the true name of Azathoth or battle Cthulhu on the high seas. With twelve unique investigators, two hundred-fifty tokens and over three hundred cards, Eldritch Horror presents an epic, world-spanning adventure with each and every game. `,
  imgSrc: '/assets/img/hobbies/ehorror.jpg',
  isBestSelling: false
})



//GAMES

products.addProduct({
  name: 'DOOM Eternal - PS4',
  category: 'games',
  price: 79.96,
  description: `Developed by id software, doom eternal is the direct sequel to the award-winning and best-selling doom (2016). 
  Experience the ultimate combination of speed and power with the next leap in push-forward, first-person combat. As the doom slayer, return to take your vengeance against the forces of hell. 
  Set to an all-new pulse pounding soundtrack composed by mick Gordon, fight across dimensions as you slay new and classic demons with powerful new weapons and abilities. `,
  imgSrc: '/assets/img/games/doom.jpg',
  isBestSelling: true
})

products.addProduct({
  name: 'Dark Souls III - PS4',
  category: 'games',
  price: 39.95,
  description: `As fires fade and the world falls into ruin, developer From Software and director Hidetaka Miyazaki continue their critically-acclaimed and genre-defining series with Dark Souls III. 
  Fans and newcomers alike will get lost in the games hallmark rewarding gameplay and immersive graphics. Now only embers remain... `,
  imgSrc: '/assets/img/games/dsouls3.jpg',
  isBestSelling: false
})

products.addProduct({
  name: 'Tekken 7 Xbox One',
  category: 'games',
  price: 42.29,
  description: `The Day One Edition will feature DLC access to Eliza, the famed vampire character that made her TEKKEN debut in TEKKEN Revolution. 
  Raise your fists and get ready for the ultimate battle on the next generation of home consoles. Powered by the Unreal Engine 4, the storied fighting franchise returns for another round in Tekken 7. 
  With the faithful 3D battle system and gameplay intact, Tekken 7 takes the franchise to the next level with photo-realistic graphics and new and innovative features and fighting mechanics. Tekken 7 resurrects the attitude, competitiveness and showmanship rooted in its arcade DNA to provide the ultimate fighting game experience. `,
  imgSrc: '/assets/img/games/tekken7.jpg',
  isBestSelling: true
})

module.exports = products

// products.addProduct({
  //   name: '',
  //   category: '',
  //   price: 0,
  //   description: ``,
  //   imgSrc: '/assets/category/img',
  //   isBestSelling: false
  // })