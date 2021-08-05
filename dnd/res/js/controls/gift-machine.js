"use strict";
class GiftMachine extends React.Component {
    render() {
        return (React.createElement("div", { className: "bg-dark h-100 w-100 overflow-auto" },
            React.createElement("ul", { className: "list-group list-group-flush" }, this.props.gifts.sort((a, b) => a.name > b.name && 1 || -1).map((gift, index) => React.createElement("li", { className: "list-group-item list-group-item-dark bg-dark text-light border-secondary border-end-0 border-start-0 position-relative pe-5" },
                React.createElement("u", null,
                    React.createElement("b", null, gift.name)),
                " - ",
                gift.description,
                React.createElement("span", { className: "position-absolute top-50 end-0 translate-middle-y me-1 pe-1" },
                    React.createElement("i", null,
                        React.createElement("b", null,
                            gift.cost,
                            "cp"))))))));
    }
}
const GIFTS = [
    {
        id: 1,
        name: "Mineral Water",
        description: "Drawn from the ocean depths and rigorously purified. Ideal for a modern on-the-go public unsatisfied with tap water.",
        cost: 1
    },
    {
        id: 2,
        name: "Kulu Cola",
        description: "A bubbly beverage with a highly stimulating, almost addictive sweetness. Produced in Kuhluhnir by the Devia clan.",
        cost: 1
    },
    {
        id: 3,
        name: "Hensar Coffee",
        description: "Made from coffee grown in the Incosolum region of Paros. It has a powerful fragrance...",
        cost: 1
    },
    {
        id: 4,
        name: "Rose Hip Tea",
        description: "An herbal tea said to promote beauty and wellness. You can somehow sense its essential elegance...",
        cost: 1
    },
    {
        id: 5,
        name: "Sea Salt",
        description: "A basic seasoning produced from the evaporation of seawater. It also sees use as a preservative.",
        cost: 1
    },
    {
        id: 6,
        name: "Stench Kow Jerky",
        description: "Beef jerky made from a stench kow. It smells terrible, but is surprisingly palatable.",
        cost: 2
    },
    {
        id: 7,
        name: "Prismatic Hardtack",
        description: "A tough, long-lasting cracker used mainly as an emergency ration. Each piece contains a full seven different flavors.",
        cost: 2
    },
    {
        id: 8,
        name: "Black Croissant",
        description: "A baked good made from black ingredients. It looks burnt, but it's actually pretty good.",
        cost: 3
    },
    // {
    // 	id: 9,
    // 	name: "Sonic Cup-a-Noodle",
    // 	description: "Instant noodles. Fill it with boiling water and it's ready in 3 seconds. Of course, it also goes bad in like 30...",
    // 	cost: 1
    // },
    {
        id: 10,
        name: "Royal Curry",
        description: "A spicy curry pack made for kids. It's made with expensive, high-quality ingredients you wouldn't expect from a kid's food.",
        cost: 3
    },
    {
        id: 11,
        name: "Ration",
        description: "A set of canned and vacuum-sealed foodstuffs. The taste isn't bad, and certain snakes that enjoy hide-and-go-seek are just crazy about it.",
        cost: 3
    },
    {
        id: 12,
        name: "Flotation Donut",
        description: "A gigantic donut that doubles as a flotation device. And naturally, you can snack on it while floating out to sea. It comes in a variety of styles.",
        cost: 5
    },
    {
        id: 13,
        name: "Overflowing Lunch Box",
        description: "A lunch box stuffed with rice, ginger, carrots, peppers, mushrooms, and more. It's meat-free, so you vegetarians out there are covered, too.",
        cost: 3
    },
    {
        id: 14,
        name: "Sunflower Seeds",
        description: "The seeds of that particular flower that loves facing the sun. They have a flavor somewhat similar to peanuts.",
        cost: 2
    },
    {
        id: 15,
        name: "Birdseed",
        description: "Sprinkle this around outside and watch the birds come flocking. There's nothing stopping you from eating it too, I suppose...",
        cost: 2
    },
    {
        id: 16,
        name: "Kitten Hairclip",
        description: "A hairclip in the shape of a little kitty cat. Properly placed, it can make a girl positively sparkle.",
        cost: 3
    },
    {
        id: 17,
        name: "Everlasting Bracelet",
        description: "A handcrafted item made with needle and thread. They say that once you put it on, it will never come off again.",
        cost: 10
    },
    {
        id: 18,
        name: "Love Status Ring",
        description: "Wear it on your right hand, you're looking for love. On your left, you've found it. On both... well, that's just asking for catastrophe.",
        cost: 10
    },
    {
        id: 19,
        name: "Zoles Diamond",
        description: "A brand-name diamond popularly used in engagement rings. Although... this one's just an imitation...",
        cost: 10
    },
    // {
    // 	id: 20,
    // 	name: "Ascendant Aspirations Ring",
    // 	description: "A school ring emblazoned with the Ascendant Aspirations Academy school crest. It stands as proof of friendship between those who spent their youth together.",
    // 	cost: 1
    // },
    {
        id: 21,
        name: "Blueberry Perfume",
        description: "Very popular with men these days. But to be honest, although it does attract the ladies, most guys hate the smell...",
        cost: 5
    },
    {
        id: 22,
        name: "Scarab Brooch",
        description: "The scarab was considered to be sacred by many ancient societies. It's better known today as... the dung beetle.",
        cost: 10
    },
    {
        id: 23,
        name: "God of War Charm",
        description: "A charm often worn by followers of the protective deity of martial arts, the Great Mortadus.",
        cost: 5
    },
    {
        id: 24,
        name: "Mac's Gloves",
        description: "A pair of boxing gloves infused with a staggering amount of passion and effort. Wearing them makes you want to throw a thousand cross-counters.",
        cost: 10
    },
    {
        id: 25,
        name: "Glasses",
        description: "They say that wearing these while performing incantations will help you better speak with the target of your spell.",
        cost: 10
    },
    // {
    // 	id: 26,
    // 	name: "G-Sick",
    // 	description: "Most people consider it a \"throwaway watch\" due to its poor quality. Still, it enjoys massive popularity thanks to its low price.",
    // 	cost: 1
    // },
    // {
    // 	id: 27,
    // 	name: "Roller Slippers",
    // 	description: "Slippers with a small wheel installed in each heel. They were invented to move easily around the house, but there is absolutely no demand for them.",
    // 	cost: 1
    // },
    // {
    // 	id: 28,
    // 	name: "Red Scarf",
    // 	description: "A scarf belonging to a certain masked hero. It's tattered and worn due to the countless battles it's been through.",
    // 	cost: 1
    // },
    // {
    // 	id: 29,
    // 	name: "Leaf Covering",
    // 	description: "A loincloth meant to emphasize one's manliness. Its simple design features a single leaf overlaid on white cloth.",
    // 	cost: 1
    // },
    // {
    // 	id: 30,
    // 	name: "Torneko's Pants",
    // 	description: "The latest style from premier Gothic Lolita fashion label, Wonder Dungeon.",
    // 	cost: 1
    // },
    // {
    // 	id: 31,
    // 	name: "Bunny Earmuffs",
    // 	description: "One of the most popular items from Gothic Lolita designer Ina Bauer.",
    // 	cost: 1
    // },
    // {
    // 	id: 32,
    // 	name: "Fresh Bindings",
    // 	description: "Strips of cotton cloth. They were once commonly used for underwear and bandages. They say when you wrap it around yourself, both body and soul become taut.",
    // 	cost: 1
    // },
    // {
    // 	id: 33,
    // 	name: "Jimmy Decay T-Shirt",
    // 	description: "A limited-edition shirt featuring legendary punk rocker Jimmy Decay. Only a hundred were ever made.",
    // 	cost: 1
    // },
    // {
    // 	id: 36,
    // 	name: "Waterlover",
    // 	description: "A competition swimsuit for women. Its design concept is to \"become one with the water\" and it claims to increase swimming speed by 10%.",
    // 	cost: 1
    // },
    // {
    // 	id: 37,
    // 	name: "Demon Angel Princess Figure",
    // 	description: "A collectible figure of Princess Piggles, the popular heroine from \"Demon Angel Pretty Pudgy Princess\".",
    // 	cost: 1
    // },
    // {
    // 	id: 38,
    // 	name: "Astral Boy Doll",
    // 	description: "A figurine of the popular TV personality who hosted \"Lost in Forbidden Love Fantasy Outer Space\".",
    // 	cost: 1
    // },
    {
        id: 39,
        name: "Shears",
        description: "Since Ascendant Aspirations Academy doesn't have a barber, the students are responsible for cutting their own hair.",
        cost: 5
    },
    {
        id: 40,
        name: "Layering Shears",
        description: "A specialized set of scissors used to create advanced styling designs. Watch the edges!",
        cost: 5
    },
    // {
    // 	id: 41,
    // 	name: "Quality Chinchilla Cover",
    // 	description: "A dark red seat cover. Its refined design is intended for only the most elite clientele.",
    // 	cost: 1
    // },
    // {
    // 	id: 42,
    // 	name: "Kirlian Camera",
    // 	description: "A camera invented to take pictures of electrical fields surrounding objects. Sadly, there's no film in it...",
    // 	cost: 1
    // },
    {
        id: 43,
        name: "Adorable Creature Collection",
        description: "A book that contains sketches of various cute animals and monsters.",
        cost: 15
    },
    // {
    // 	id: 44,
    // 	name: "Tumbleweed",
    // 	description: "A dried-out plant seen in many Western films. If they pile up around your yard, just toss 'em off a cliff or something.",
    // 	cost: 3
    // },
    // {
    // 	id: 45,
    // 	name: "Unending Dandelion",
    // 	description: "A dandelion toy. You can blow the fluff away, and the attached string will pull it back, so you can do it over and over and over and...",
    // 	cost: 3
    // },
    // {
    // 	id: 46,
    // 	name: "Rose in Vitro",
    // 	description: "A small rose stored inside a test tube. Makes a great gift. It's good for both hellos and farewells. In the language of flowers, a red rose means passionate love.",
    // 	cost: 1
    // },
    // {
    // 	id: 47,
    // 	name: "Cherry Blossom Bouquet",
    // 	description: "A collection of branches from a sakura tree. In the language of flowers, cherry blossoms represent \"a woman of superior beauty\".",
    // 	cost: 1
    // },
    // {
    // 	id: 48,
    // 	name: "Rose Whip",
    // 	description: "A whip made from real roses. Even the most beautiful rose has thorns...",
    // 	cost: 1
    // },
    // {
    // 	id: 49,
    // 	name: "Zantetsuken",
    // 	description: "A sword that can't even cut through iron. Or flesh. Or anything, really. In other words, totally useless...",
    // 	cost: 1
    // },
    // {
    // 	id: 50,
    // 	name: "Muramasa",
    // 	description: "The strongest weapon ever made. It's great for dungeon diving and lets you warp through walls. Of course, it doesn't actually exist in this reality, so...",
    // 	cost: 1
    // },
    // {
    // 	id: 51,
    // 	name: "Raygun Zurion",
    // 	description: "Created with hi-tech future technology. A single shot can melt every molecule in a fully grown human. There aren't any batteries, though, so you can't fire it...",
    // 	cost: 1
    // },
    // {
    // 	id: 52,
    // 	name: "Golden Gun",
    // 	description: "A replica of the gun preferred by a famous assassin. It's not really much good by itself. You can't even cock it...",
    // 	cost: 1
    // },
    // {
    // 	id: 53,
    // 	name: "Berserker Armor",
    // 	description: "Donning this armor bestows the wearer with immense power, but at the cost of their soul and senses.",
    // 	cost: 1
    // },
    // {
    // 	id: 54,
    // 	name: "Self-Destructing Cassette",
    // 	description: "Once you record a message onto this, it sets up a chemical reaction that will destroy the tape after a few seconds after it's played.",
    // 	cost: 1
    // },
    // {
    // 	id: 55,
    // 	name: "Silent Receiver",
    // 	description: "A phone that, for some unknown reason, doesn't let you hear the person on the other end, and doesn't let them hear you.",
    // 	cost: 1
    // },
    {
        id: 56,
        name: "Pretty Hungry Caterpillar",
        description: "A well-worn caterpillar toy that was all the rage years ago. As you pull it, it moves up and down, making it look alive.",
        cost: 5
    },
    // {
    // 	id: 57,
    // 	name: "Old Timey Radio",
    // 	description: "A radio with a retro exterior but state-of-the-art technology inside. Of course, there's no reception in the school, so you can't hear anything anyway.",
    // 	cost: 1
    // },
    // {
    // 	id: 58,
    // 	name: "Mr. Fastball",
    // 	description: "A baseball-shaped velocity measurement machine. Throw it to measure your speed. But, uh...don't throw it at the wall.",
    // 	cost: 1
    // },
    // {
    // 	id: 59,
    // 	name: "Antique Doll",
    // 	description: "A porcelain doll. Due to the exquisite craftsmanship of the doll and its clothing, many people still collect and prize them to this very day.",
    // 	cost: 1
    // },
    // {
    // 	id: 60,
    // 	name: "Crystal Skull",
    // 	description: "A skull carved from pure rock crystal. Some think skulls like this were created hundreds of years ago, perhaps with alien intervention, and consider them \"OOPArt\".",
    // 	cost: 1
    // },
    // {
    // 	id: 61,
    // 	name: "Golden Airplane",
    // 	description: "A golden sculpture said to represent a plane or spaceship. It was found in ruins in Colombia dated to around 1,000 CE, indicating to some that this represents an \"OOPArt\".",
    // 	cost: 1
    // },
    // {
    // 	id: 62,
    // 	name: "Prince Shotoku's Globe",
    // 	description: "A spherical representation of Earth, about the size of a softball. Some believe it to be an \"OOPArt\" since it depicts a round Earth, despite being many centuries old.",
    // 	cost: 1
    // },
    // {
    // 	id: 63,
    // 	name: "Moon Rock",
    // 	description: "A rock taken from the Sea of Tranquility on the moon by the astronauts on Apollo 11. Its composition is apparently unusual for where it was found...",
    // 	cost: 1
    // },
    // {
    // 	id: 64,
    // 	name: "Asura's Tears",
    // 	description: "A jewel treasured by an ancient super-race. \"Even the devil has friends. You..fool\". And then...tears flow.",
    // 	cost: 1
    // },
    // {
    // 	id: 65,
    // 	name: "Secrets of the Omoplata",
    // 	description: "A little-known book about Brazilian jiu-jitsu that teaches high-level shoulder lock techniques. \"Omoplata\" is another word for the scapula, or shoulder blade.",
    // 	cost: 1
    // },
    // {
    // 	id: 66,
    // 	name: "Millennium Prize Problems",
    // 	description: "These seven important mathematical problems were posted by the Clay Mathematics Institute, with a reward of one million dollars for each one solved.",
    // 	cost: 1
    // },
    // {
    // 	id: 67,
    // 	name: "The Funplane",
    // 	description: "The newest popular portable game system. It has a hi-def touchscreen, and can also play music and videos, making for the perfect all-in-one media machine!",
    // 	cost: 1
    // },
    // {
    // 	id: 68,
    // 	name: "Project Zombie",
    // 	description: "A mature game designed for the Funplane, where a former runway model takes zombies as slaves in a post-apocalyptic world. It's been out of print for a while...",
    // 	cost: 1
    // },
    // {
    // 	id: 69,
    // 	name: "Pagan Dancer",
    // 	description: "A mature game designed for the Funplane, which allows you to become a massive god handing out divine punishment to puny mortals. Good luck finding a copy...",
    // 	cost: 1
    // },
    // {
    // 	id: 70,
    // 	name: "Tips & Tips",
    // 	description: "A thick book that has hints and codes for every game ever released. A must-have for any true gaming fanatic.",
    // 	cost: 1
    // },
    // {
    // 	id: 71,
    // 	name: "Maiden's Handbag",
    // 	description: "Available only at the posh Maiden Road, which is geared toward female fanfic fans. Please, PLEASE take me with you next time you go!",
    // 	cost: 1
    // },
    // {
    // 	id: 72,
    // 	name: "Kokeshi Dynamo",
    // 	description: "Flip the switch on the bottom to set the doll shaking. Apparently it's a kid's toy, but I don't really get the point of it...",
    // 	cost: 1
    // },
    // {
    // 	id: 73,
    // 	name: "The Second Button",
    // 	description: "The button from a school uniform which increases in value as graduation approaches. In a few cases, reservations are necessary.",
    // 	cost: 1
    // },
    // {
    // 	id: 74,
    // 	name: "Someone's Graduation Album",
    // 	description: "A Ascendant Aspirations graduation album that someone left behind. The signature pages are all completely blank...",
    // 	cost: 1
    // },
    {
        id: 75,
        name: "Vise",
        description: "A tool used to grip and stabilize materials (like metal) to shape and fix it. Somehow, just the name conveys a strong sense of power...",
        cost: 10
    },
    {
        id: 77,
        name: "Pumice",
        description: "A porous rock formed during violent volcanic eruptions. Use it to scrape off all that old, dry skin on the body.",
        cost: 3
    },
    // {
    // 	id: 78,
    // 	name: "Oblaat",
    // 	description: "A thin, edible film made from starch. It's commonly used as a candy wrapper, but also helps cover up the taste of bitter medicine.",
    // 	cost: 1
    // },
    {
        id: 79,
        name: "Water Flute",
        description: "A unique type of flute. you pour water into the base and blow into the top, which can create a variety of sounds similar to a chirping bird.",
        cost: 15
    },
    // {
    // 	id: 80,
    // 	name: "Bojobo Dolls",
    // 	description: "Made from seeds and coconut fiber, these are used in Buddhist prayers. You determine your wish based on how you position the arms and legs.",
    // 	cost: 1
    // },
    // {
    // 	id: 81,
    // 	name: "Small Light",
    // 	description: "Common wisdom might make you think that shining this light on you will turn you small...but nope. It's just that the light itself is about the size of a matchbox.",
    // 	cost: 1
    // },
    // {
    // 	id: 82,
    // 	name: "Voice-Changing Bowtie",
    // 	description: "This originally belonged to a detective who has the body of a child but the mind of a genius. The bowtie lets its user speak in a variety of voices.",
    // 	cost: 1
    // },
    // {
    // 	id: 83,
    // 	name: "Ancient Tour Tickets",
    // 	description: "Two tickets that advertise \"a whirlwind tour of Mu with the Ancients for four days and three nights!\"",
    // 	cost: 1
    // },
    // {
    // 	id: 84,
    // 	name: "Novelist's Fountain Pen",
    // 	description: "It once belonged to a late, great novelist. They say the writer's soul is sealed within the pen, and any user can only write one sentence: \"I have become something not human\".",
    // 	cost: 1
    // },
    // {
    // 	id: 85,
    // 	name: "\"If\" Fax",
    // 	description: "Used to distribute a full-length novel based on what the world would look like if all of someone's dreams came true.",
    // 	cost: 1
    // },
    {
        id: 86,
        name: "Deca Wine",
        description: "A red artisan wine made by halflings in the southern part of Decapos. Famous for its sweet flavor and slightly spicy aftertaste.",
        cost: 5
    },
    // {
    // 	id: 87,
    // 	name: "Meteorite Arrowhead",
    // 	description: "An arrowhead discovered in some ancient ruins. Fashioned from a meteorite, they say that getting pierced by it will give you the power to see demons.",
    // 	cost: 1
    // },
    // {
    // 	id: 88,
    // 	name: "Chin Drill",
    // 	description: "A fashion accessory that allows you to equip a drill on your chin. It is said to represent the idea of \"spiral energy\".",
    // 	cost: 1
    // },
    // {
    // 	id: 89,
    // 	name: "Green Costume",
    // 	description: "As soon as you put this on, you'll feel like you can take on any challenge. It resembles a stereotypical dinosaur.",
    // 	cost: 1
    // },
    // {
    // 	id: 90,
    // 	name: "Red Costume",
    // 	description: "Jump into this, and you'll feel like you can support the world. It resembles some kind of yeti creature...",
    // 	cost: 1
    // }
];
//# sourceMappingURL=gift-machine.js.map