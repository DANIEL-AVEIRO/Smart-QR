export const categories = [
  {
    id: "burgers",
    name: "Burgers",
    description: "Stacked, seared, and built for hungry hands.",
  },
  {
    id: "pizza",
    name: "Pizza",
    description: "Wood-fired crusts with bold, molten toppings.",
  },
  {
    id: "pasta",
    name: "Pasta",
    description: "Fresh noodles tossed in rich, slow sauces.",
  },
  {
    id: "salads",
    name: "Salads",
    description: "Crisp greens and bright, seasonal plates.",
  },
  {
    id: "seafood",
    name: "Seafood",
    description: "Ocean catch, simply cooked and well seasoned.",
  },
  {
    id: "grilled",
    name: "Grilled",
    description: "Charred meats with smoke and deep flavor.",
  },
  {
    id: "sushi",
    name: "Sushi",
    description: "Precise cuts, cool rice, clean finishes.",
  },
  {
    id: "desserts",
    name: "Desserts",
    description: "Sweet endings worth saving room for.",
  },
  {
    id: "drinks",
    name: "Drinks",
    description: "Cold pours, hot cups, and house mixes.",
  },
  {
    id: "breakfast",
    name: "Breakfast",
    description: "Morning plates that start the day right.",
  },
];

const itemsByCategory = {
  burgers: [
    {
      name: "Classic Smash",
      price: 8.5,
      desc: "Double patty, American cheese, pickles, house sauce",
    },
    {
      name: "BBQ Bacon Stack",
      price: 11.0,
      desc: "Smoked bacon, cheddar, onion jam, BBQ glaze",
    },
    {
      name: "Mushroom Swiss",
      price: 10.5,
      desc: "Sautéed mushrooms, Swiss, garlic aioli",
    },
    {
      name: "Spicy Jalapeño",
      price: 10.0,
      desc: "Pepper jack, jalapeños, chipotle mayo",
    },
    {
      name: "Truffle Burger",
      price: 13.5,
      desc: "Truffle mayo, arugula, aged Gruyère",
    },
    {
      name: "Blue Cheese Bite",
      price: 11.5,
      desc: "Blue cheese crumble, caramelized onion",
    },
    {
      name: "Avocado Ranch",
      price: 10.5,
      desc: "Fresh avocado, ranch, tomato, lettuce",
    },
    {
      name: "Kimchi Crunch",
      price: 11.0,
      desc: "Kimchi slaw, gochujang mayo, sesame",
    },
    {
      name: "Sunrise Burger",
      price: 12.0,
      desc: "Fried egg, bacon, cheddar, hash crisp",
    },
    {
      name: "Veggie Garden",
      price: 9.5,
      desc: "Black bean patty, roasted peppers, herb yogurt",
    },
  ],
  pizza: [
    {
      name: "Margherita",
      price: 12.0,
      desc: "San Marzano tomato, mozzarella, basil",
    },
    {
      name: "Pepperoni Heat",
      price: 14.0,
      desc: "Cup pepperoni, chili oil, mozzarella",
    },
    {
      name: "Four Cheese",
      price: 13.5,
      desc: "Mozzarella, fontina, Parmesan, gorgonzola",
    },
    {
      name: "Funghi Forest",
      price: 14.5,
      desc: "Wild mushrooms, thyme, garlic cream",
    },
    {
      name: "Prosciutto Pear",
      price: 15.5,
      desc: "Prosciutto, pear, honey, arugula",
    },
    {
      name: "BBQ Chicken",
      price: 14.0,
      desc: "Smoked chicken, red onion, BBQ base",
    },
    {
      name: "Diavola",
      price: 13.5,
      desc: "Spicy salami, chili flakes, olive oil",
    },
    {
      name: "Pesto Caprese",
      price: 13.0,
      desc: "Basil pesto, cherry tomato, burrata",
    },
    {
      name: "Seafood Marinara",
      price: 16.0,
      desc: "Prawns, mussels, garlic tomato sauce",
    },
    {
      name: "Truffle Bianca",
      price: 15.0,
      desc: "White sauce, mushrooms, truffle oil",
    },
  ],
  pasta: [
    {
      name: "Spaghetti Carbonara",
      price: 13.5,
      desc: "Guanciale, egg yolk, Pecorino, black pepper",
    },
    {
      name: "Penne Arrabbiata",
      price: 11.5,
      desc: "Spicy tomato, garlic, chili, parsley",
    },
    {
      name: "Fettuccine Alfredo",
      price: 12.5,
      desc: "Butter, cream, Parmesan, nutmeg",
    },
    {
      name: "Pesto Genovese",
      price: 12.0,
      desc: "Basil pesto, pine nuts, green beans",
    },
    {
      name: "Bolognese Tagliatelle",
      price: 14.0,
      desc: "Slow beef ragù over fresh tagliatelle",
    },
    {
      name: "Shrimp Aglio Olio",
      price: 15.0,
      desc: "Garlic oil, chili, prawns, parsley",
    },
    {
      name: "Mushroom Risotto",
      price: 14.5,
      desc: "Arborio rice, porcini, Parmesan",
    },
    {
      name: "Lasagna Classica",
      price: 14.0,
      desc: "Layered pasta, beef, béchamel, cheese",
    },
    {
      name: "Cacio e Pepe",
      price: 12.0,
      desc: "Pecorino, cracked pepper, butter finish",
    },
    {
      name: "Lobster Linguine",
      price: 18.5,
      desc: "Lobster, cherry tomato, white wine sauce",
    },
  ],
  salads: [
    {
      name: "Garden Crunch",
      price: 9.0,
      desc: "Mixed greens, cucumber, radish, lemon vinaigrette",
    },
    {
      name: "Caesar Classic",
      price: 10.0,
      desc: "Romaine, Parmesan, croutons, anchovy dressing",
    },
    {
      name: "Greek Village",
      price: 10.5,
      desc: "Tomato, cucumber, feta, olives, oregano",
    },
    {
      name: "Quinoa Bowl",
      price: 11.5,
      desc: "Quinoa, chickpeas, avocado, tahini",
    },
    {
      name: "Beet & Goat",
      price: 11.0,
      desc: "Roasted beets, goat cheese, walnuts",
    },
    {
      name: "Cobb Plate",
      price: 12.5,
      desc: "Chicken, egg, bacon, blue cheese, avocado",
    },
    {
      name: "Asian Sesame",
      price: 11.0,
      desc: "Napa cabbage, edamame, sesame ginger",
    },
    {
      name: "Caprese Fresh",
      price: 10.5,
      desc: "Tomato, mozzarella, basil, balsamic",
    },
    {
      name: "Kale Super",
      price: 10.0,
      desc: "Massaged kale, apple, sunflower seeds",
    },
    {
      name: "Salmon Niçoise",
      price: 14.5,
      desc: "Seared salmon, egg, beans, olives",
    },
  ],
  seafood: [
    {
      name: "Grilled Salmon",
      price: 18.0,
      desc: "Lemon butter, dill, charred lemon",
    },
    {
      name: "Garlic Butter Prawns",
      price: 16.5,
      desc: "Tiger prawns, garlic, parsley bread",
    },
    {
      name: "Fish & Chips",
      price: 14.0,
      desc: "Beer-battered cod, tartar, fries",
    },
    {
      name: "Lobster Roll",
      price: 19.5,
      desc: "Chilled lobster, herb mayo, toasted bun",
    },
    {
      name: "Seared Scallops",
      price: 18.5,
      desc: "Brown butter, cauliflower purée",
    },
    {
      name: "Miso Cod",
      price: 17.5,
      desc: "Black cod, miso glaze, sesame greens",
    },
    { name: "Calamari Fritti", price: 12.0, desc: "Crispy squid, lemon aioli" },
    { name: "Tuna Tataki", price: 15.5, desc: "Seared tuna, ponzu, sesame" },
    {
      name: "Seafood Paella",
      price: 19.0,
      desc: "Saffron rice, mussels, prawns, chorizo",
    },
    {
      name: "Clam Linguine",
      price: 16.0,
      desc: "Littleneck clams, white wine, garlic",
    },
  ],
  grilled: [
    {
      name: "Ribeye Steak",
      price: 28.0,
      desc: "12oz ribeye, herb butter, sea salt",
    },
    {
      name: "Filet Mignon",
      price: 32.0,
      desc: "Center cut, red wine jus, asparagus",
    },
    {
      name: "BBQ Short Ribs",
      price: 22.0,
      desc: "Slow braised, sticky glaze, pickles",
    },
    { name: "Lamb Chops", price: 26.0, desc: "Rosemary garlic, mint yogurt" },
    {
      name: "Chicken Thighs",
      price: 14.5,
      desc: "Charred thighs, chili honey",
    },
    { name: "Pork Chop", price: 18.0, desc: "Bone-in chop, apple mustard" },
    {
      name: "Mixed Grill",
      price: 24.0,
      desc: "Steak, chicken, sausage, peppers",
    },
    { name: "Skirt Steak", price: 21.0, desc: "Chimichurri, grilled onion" },
    {
      name: "Tomahawk Share",
      price: 58.0,
      desc: "For two, smoked salt, bone marrow butter",
    },
    {
      name: "Grilled Veg Plate",
      price: 13.0,
      desc: "Seasonal veg, romesco, herbs",
    },
  ],
  sushi: [
    { name: "Salmon Nigiri", price: 8.0, desc: "Four pieces, wasabi, soy" },
    { name: "Tuna Roll", price: 9.5, desc: "Maguro, nori, sushi rice" },
    {
      name: "Dragon Roll",
      price: 14.0,
      desc: "Eel, avocado, cucumber, eel sauce",
    },
    { name: "Spicy Tuna", price: 11.0, desc: "Spicy mayo, scallion, sesame" },
    {
      name: "Rainbow Roll",
      price: 13.5,
      desc: "Assorted fish over California roll",
    },
    {
      name: "Shrimp Tempura Roll",
      price: 12.0,
      desc: "Crispy shrimp, avocado, spicy mayo",
    },
    {
      name: "Yellowtail Jalapeño",
      price: 12.5,
      desc: "Hamachi, jalapeño, ponzu",
    },
    {
      name: "Sashimi Platter",
      price: 22.0,
      desc: "Chef’s selection, 12 pieces",
    },
    {
      name: "Veggie Maki",
      price: 8.5,
      desc: "Cucumber, avocado, pickled radish",
    },
    { name: "Uni Special", price: 18.0, desc: "Sea urchin, nori, quail egg" },
  ],
  desserts: [
    {
      name: "Chocolate Lava",
      price: 8.5,
      desc: "Warm cake, molten center, vanilla ice cream",
    },
    {
      name: "Berry Cheesecake",
      price: 8.0,
      desc: "New York style, berry compote",
    },
    {
      name: "Tiramisu",
      price: 8.5,
      desc: "Espresso-soaked ladyfingers, mascarpone",
    },
    {
      name: "Crème Brûlée",
      price: 7.5,
      desc: "Vanilla custard, caramelized sugar",
    },
    { name: "Apple Tart", price: 7.5, desc: "Buttery pastry, cinnamon apples" },
    {
      name: "Matcha Panna Cotta",
      price: 7.0,
      desc: "Silky matcha cream, white chocolate",
    },
    {
      name: "Churros Plate",
      price: 7.0,
      desc: "Cinnamon sugar, chocolate dip",
    },
    { name: "Lemon Tart", price: 7.5, desc: "Citrus curd, torched meringue" },
    {
      name: "Ice Cream Trio",
      price: 6.5,
      desc: "Three scoops, rotating flavors",
    },
    {
      name: "Brownie Sundae",
      price: 8.0,
      desc: "Warm brownie, fudge, whipped cream",
    },
  ],
  drinks: [
    { name: "Espresso", price: 3.0, desc: "Double shot, rich crema" },
    { name: "Iced Latte", price: 4.5, desc: "Espresso, cold milk, over ice" },
    {
      name: "Fresh Lemonade",
      price: 4.0,
      desc: "House-squeezed, lightly sweet",
    },
    { name: "Mango Smoothie", price: 5.5, desc: "Mango, yogurt, honey" },
    {
      name: "Matcha Latte",
      price: 5.0,
      desc: "Ceremonial grade, steamed milk",
    },
    { name: "Cold Brew", price: 4.5, desc: "18-hour steep, smooth finish" },
    { name: "Berry Mocktail", price: 5.5, desc: "Berries, citrus, soda" },
    { name: "House Tea", price: 3.5, desc: "Black, green, or herbal" },
    { name: "Craft Cola", price: 3.5, desc: "Spiced cola, citrus peel" },
    { name: "Sparkling Water", price: 2.5, desc: "Chilled, with lemon" },
  ],
  breakfast: [
    {
      name: "Eggs Benedict",
      price: 12.5,
      desc: "Poached eggs, hollandaise, English muffin",
    },
    {
      name: "Avocado Toast",
      price: 10.0,
      desc: "Sourdough, smashed avocado, chili flake",
    },
    {
      name: "Fluffy Pancakes",
      price: 9.5,
      desc: "Stack of three, maple, butter",
    },
    { name: "French Toast", price: 10.0, desc: "Brioche, berry syrup, cream" },
    {
      name: "Breakfast Burrito",
      price: 11.0,
      desc: "Eggs, potato, cheese, salsa",
    },
    { name: "Shakshuka", price: 11.5, desc: "Tomato pepper stew, baked eggs" },
    {
      name: "Granola Bowl",
      price: 8.5,
      desc: "Yogurt, granola, seasonal fruit",
    },
    {
      name: "Smokehouse Plate",
      price: 13.5,
      desc: "Eggs, bacon, sausage, toast",
    },
    {
      name: "Croissant Sandwich",
      price: 9.0,
      desc: "Egg, cheese, ham on butter croissant",
    },
    { name: "Acai Bowl", price: 10.5, desc: "Acai, banana, coconut, seeds" },
  ],
};

const variantsByCategory = {
  burgers: [
    {
      id: "size",
      label: "Size",
      type: "single",
      required: true,
      options: [
        { id: "single", name: "Single", priceDelta: 0 },
        { id: "double", name: "Double patty", priceDelta: 3 },
        { id: "triple", name: "Triple patty", priceDelta: 5.5 },
      ],
    },
    {
      id: "bun",
      label: "Bun",
      type: "single",
      required: true,
      options: [
        { id: "sesame", name: "Sesame", priceDelta: 0 },
        { id: "brioche", name: "Brioche", priceDelta: 1 },
        { id: "lettuce", name: "Lettuce wrap", priceDelta: 0 },
      ],
    },
    {
      id: "extras",
      label: "Extras",
      type: "multi",
      required: false,
      options: [
        { id: "cheese", name: "Extra cheese", priceDelta: 1.5 },
        { id: "bacon", name: "Crispy bacon", priceDelta: 2 },
        { id: "egg", name: "Fried egg", priceDelta: 1.5 },
        { id: "avocado", name: "Avocado", priceDelta: 2 },
      ],
    },
  ],
  pizza: [
    {
      id: "size",
      label: "Size",
      type: "single",
      required: true,
      options: [
        { id: "personal", name: 'Personal 8"', priceDelta: 0 },
        { id: "regular", name: 'Regular 12"', priceDelta: 4 },
        { id: "large", name: 'Large 16"', priceDelta: 8 },
      ],
    },
    {
      id: "crust",
      label: "Crust",
      type: "single",
      required: true,
      options: [
        { id: "thin", name: "Thin", priceDelta: 0 },
        { id: "classic", name: "Classic", priceDelta: 0 },
        { id: "cheese", name: "Cheese crust", priceDelta: 3 },
      ],
    },
    {
      id: "extras",
      label: "Add-ons",
      type: "multi",
      required: false,
      options: [
        { id: "olives", name: "Olives", priceDelta: 1 },
        { id: "jalapeno", name: "Jalapeños", priceDelta: 1 },
        { id: "extra-cheese", name: "Extra cheese", priceDelta: 2 },
      ],
    },
  ],
  pasta: [
    {
      id: "portion",
      label: "Portion",
      type: "single",
      required: true,
      options: [
        { id: "regular", name: "Regular", priceDelta: 0 },
        { id: "large", name: "Large", priceDelta: 3.5 },
      ],
    },
    {
      id: "spice",
      label: "Spice level",
      type: "single",
      required: true,
      options: [
        { id: "mild", name: "Mild", priceDelta: 0 },
        { id: "medium", name: "Medium", priceDelta: 0 },
        { id: "hot", name: "Hot", priceDelta: 0 },
      ],
    },
    {
      id: "add",
      label: "Add protein",
      type: "multi",
      required: false,
      options: [
        { id: "chicken", name: "Grilled chicken", priceDelta: 3 },
        { id: "prawns", name: "Prawns", priceDelta: 4 },
        { id: "meatballs", name: "Meatballs", priceDelta: 3.5 },
      ],
    },
  ],
  salads: [
    {
      id: "size",
      label: "Size",
      type: "single",
      required: true,
      options: [
        { id: "side", name: "Side", priceDelta: 0 },
        { id: "regular", name: "Regular", priceDelta: 2 },
        { id: "bowl", name: "Large bowl", priceDelta: 4 },
      ],
    },
    {
      id: "dressing",
      label: "Dressing",
      type: "single",
      required: true,
      options: [
        { id: "lemon", name: "Lemon vinaigrette", priceDelta: 0 },
        { id: "caesar", name: "Caesar", priceDelta: 0 },
        { id: "ranch", name: "Ranch", priceDelta: 0 },
        { id: "sesame", name: "Sesame ginger", priceDelta: 0 },
      ],
    },
    {
      id: "toppings",
      label: "Toppings",
      type: "multi",
      required: false,
      options: [
        { id: "chicken", name: "Grilled chicken", priceDelta: 3 },
        { id: "salmon", name: "Salmon", priceDelta: 4.5 },
        { id: "egg", name: "Soft egg", priceDelta: 1.5 },
        { id: "feta", name: "Feta", priceDelta: 1.5 },
      ],
    },
  ],
  seafood: [
    {
      id: "cook",
      label: "Cooking",
      type: "single",
      required: true,
      options: [
        { id: "grilled", name: "Grilled", priceDelta: 0 },
        { id: "pan", name: "Pan-seared", priceDelta: 0 },
        { id: "butter", name: "Garlic butter", priceDelta: 1.5 },
      ],
    },
    {
      id: "side",
      label: "Side",
      type: "single",
      required: true,
      options: [
        { id: "rice", name: "Steamed rice", priceDelta: 0 },
        { id: "fries", name: "Fries", priceDelta: 1 },
        { id: "salad", name: "Green salad", priceDelta: 1.5 },
      ],
    },
    {
      id: "extras",
      label: "Extras",
      type: "multi",
      required: false,
      options: [
        { id: "sauce", name: "Extra sauce", priceDelta: 1 },
        { id: "lemon", name: "Extra lemon butter", priceDelta: 1.5 },
      ],
    },
  ],
  grilled: [
    {
      id: "doneness",
      label: "Doneness",
      type: "single",
      required: true,
      options: [
        { id: "rare", name: "Rare", priceDelta: 0 },
        { id: "medium-rare", name: "Medium rare", priceDelta: 0 },
        { id: "medium", name: "Medium", priceDelta: 0 },
        { id: "well", name: "Well done", priceDelta: 0 },
      ],
    },
    {
      id: "side",
      label: "Side",
      type: "single",
      required: true,
      options: [
        { id: "fries", name: "Fries", priceDelta: 0 },
        { id: "mash", name: "Mashed potato", priceDelta: 1 },
        { id: "veg", name: "Grilled vegetables", priceDelta: 1.5 },
      ],
    },
    {
      id: "sauce",
      label: "Sauce",
      type: "single",
      required: true,
      options: [
        { id: "pepper", name: "Peppercorn", priceDelta: 0 },
        { id: "chimichurri", name: "Chimichurri", priceDelta: 0 },
        { id: "bbq", name: "BBQ", priceDelta: 0 },
        { id: "none", name: "No sauce", priceDelta: 0 },
      ],
    },
  ],
  sushi: [
    {
      id: "set",
      label: "Set",
      type: "single",
      required: true,
      options: [
        { id: "half", name: "Half (4 pcs)", priceDelta: 0 },
        { id: "full", name: "Full (8 pcs)", priceDelta: 5 },
        { id: "party", name: "Party (12 pcs)", priceDelta: 9 },
      ],
    },
    {
      id: "rice",
      label: "Rice",
      type: "single",
      required: true,
      options: [
        { id: "white", name: "White rice", priceDelta: 0 },
        { id: "brown", name: "Brown rice", priceDelta: 1 },
      ],
    },
    {
      id: "extras",
      label: "Extras",
      type: "multi",
      required: false,
      options: [
        { id: "ginger", name: "Extra ginger", priceDelta: 0.5 },
        { id: "wasabi", name: "Extra wasabi", priceDelta: 0.5 },
        { id: "soy", name: "Low-sodium soy", priceDelta: 0 },
      ],
    },
  ],
  desserts: [
    {
      id: "size",
      label: "Size",
      type: "single",
      required: true,
      options: [
        { id: "regular", name: "Regular", priceDelta: 0 },
        { id: "share", name: "Shareable", priceDelta: 3 },
      ],
    },
    {
      id: "topping",
      label: "Topping",
      type: "single",
      required: true,
      options: [
        { id: "none", name: "No topping", priceDelta: 0 },
        { id: "cream", name: "Whipped cream", priceDelta: 1 },
        { id: "icecream", name: "Vanilla ice cream", priceDelta: 2 },
        { id: "berry", name: "Berry sauce", priceDelta: 1.5 },
      ],
    },
    {
      id: "extras",
      label: "Extras",
      type: "multi",
      required: false,
      options: [
        { id: "chocolate", name: "Chocolate drizzle", priceDelta: 1 },
        { id: "nuts", name: "Toasted nuts", priceDelta: 1 },
      ],
    },
  ],
  drinks: [
    {
      id: "size",
      label: "Size",
      type: "single",
      required: true,
      options: [
        { id: "s", name: "Small", priceDelta: 0 },
        { id: "m", name: "Medium", priceDelta: 1 },
        { id: "l", name: "Large", priceDelta: 2 },
      ],
    },
    {
      id: "ice",
      label: "Ice",
      type: "single",
      required: true,
      options: [
        { id: "normal", name: "Normal ice", priceDelta: 0 },
        { id: "less", name: "Less ice", priceDelta: 0 },
        { id: "no", name: "No ice", priceDelta: 0 },
      ],
    },
    {
      id: "sweet",
      label: "Sweetness",
      type: "single",
      required: true,
      options: [
        { id: "100", name: "100%", priceDelta: 0 },
        { id: "70", name: "70%", priceDelta: 0 },
        { id: "50", name: "50%", priceDelta: 0 },
        { id: "0", name: "No sugar", priceDelta: 0 },
      ],
    },
  ],
  breakfast: [
    {
      id: "eggs",
      label: "Eggs",
      type: "single",
      required: true,
      options: [
        { id: "scrambled", name: "Scrambled", priceDelta: 0 },
        { id: "fried", name: "Fried", priceDelta: 0 },
        { id: "poached", name: "Poached", priceDelta: 0.5 },
        { id: "none", name: "No eggs", priceDelta: 0 },
      ],
    },
    {
      id: "side",
      label: "Side",
      type: "single",
      required: true,
      options: [
        { id: "toast", name: "Toast", priceDelta: 0 },
        { id: "hash", name: "Hash browns", priceDelta: 1 },
        { id: "fruit", name: "Fresh fruit", priceDelta: 1.5 },
      ],
    },
    {
      id: "extras",
      label: "Extras",
      type: "multi",
      required: false,
      options: [
        { id: "bacon", name: "Bacon", priceDelta: 2 },
        { id: "sausage", name: "Sausage", priceDelta: 2 },
        { id: "avocado", name: "Avocado", priceDelta: 2 },
      ],
    },
  ],
};

const toMMK = (amount) => Math.round(amount * 1000);

export const menuItems = categories.flatMap((category) =>
  itemsByCategory[category.id].map((item, index) => ({
    id: `${category.id}-${index + 1}`,
    categoryId: category.id,
    image: `/menu/${category.id}/${String(index + 1).padStart(2, "0")}.jpg`,
    ...item,
    price: toMMK(item.price),
    variants: (variantsByCategory[category.id] ?? []).map((group) => ({
      ...group,
      options: group.options.map((option) => ({
        ...option,
        priceDelta: toMMK(option.priceDelta),
      })),
    })),
  })),
);

export function formatPrice(price) {
  return `${Math.round(price).toLocaleString("en-US")} MMK`;
}

export function getDefaultSelections(variants) {
  const selections = {};

  for (const group of variants) {
    if (group.type === "single") {
      selections[group.id] = group.options[0]?.id ?? null;
    } else {
      selections[group.id] = [];
    }
  }

  return selections;
}

export function calcItemTotal(basePrice, variants, selections, quantity = 1) {
  let delta = 0;

  for (const group of variants) {
    const selected = selections[group.id];

    if (group.type === "single") {
      const option = group.options.find((o) => o.id === selected);
      delta += option?.priceDelta ?? 0;
    } else if (Array.isArray(selected)) {
      for (const optionId of selected) {
        const option = group.options.find((o) => o.id === optionId);
        delta += option?.priceDelta ?? 0;
      }
    }
  }

  return (basePrice + delta) * quantity;
}

/** Flatten selected variants into labels for cart / kitchen / DB. */
export function getSelectedVariantLabels(variants, selections) {
  const labels = [];

  for (const group of variants) {
    const selected = selections[group.id];

    if (group.type === "single") {
      const option = group.options.find((o) => o.id === selected);
      if (option) labels.push({ group: group.label, name: option.name });
    } else if (Array.isArray(selected)) {
      for (const optionId of selected) {
        const option = group.options.find((o) => o.id === optionId);
        if (option) labels.push({ group: group.label, name: option.name });
      }
    }
  }

  return labels;
}
