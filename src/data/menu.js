// Carte MORNACO — retranscrite depuis le menu imprimé (12 photos client, juillet 2026).
// Les prix sont en millimes (4000 => 4.000 DT). price: null = prix non lisible sur la photo.
// Les prix marqués « sticker » sur le menu imprimé (corrections manuscrites) sont signalés
// dans le README — à confirmer avec le client.

export const fmt = (p) => (p == null ? '—' : (p / 1000).toFixed(3));

export const MENU = [
  {
    id: 'cafes',
    label: 'Cafés',
    sections: [
      {
        title: 'Café',
        items: [
          { name: 'Express', price: 4000 },
          { name: 'Capucin', price: 4500 },
          { name: 'Direct', price: 5000 },
          { name: 'Café Américain', price: 5000 },
          { name: 'Chocolat au Lait', price: 5000 },
          { name: 'Nescafé au Lait', price: 5000 },
          { name: 'Cappuccino', price: 8000 },
          { name: 'Express Spécial', price: 5500 },
          { name: 'Capucin Spécial', price: 6000 },
          { name: 'Direct Spécial', price: 7000 },
          { name: 'Américain Spécial', price: 7500 },
          { name: 'Café Spécial', note: 'chocolat blanc ou noir', price: 8000 },
          { name: 'Cappuccino Spécial', price: 10000 },
          { name: 'Café Aromatisé', note: 'au choix', price: 6000 },
          { name: 'Verre de Lait', price: 2000 },
          { name: 'Café Turc', price: 7000 },
          { name: 'Café Turc MORNACO', note: 'café + kaak warka ou samsa + bkhour', price: 10000, star: true },
        ],
      },
      {
        title: 'Italian Coffee',
        items: [
          { name: 'Expresso', price: 6000 },
          { name: 'Spécial Expresso', price: 7000 },
          { name: 'Expresso Macchiato', price: 7000 },
          { name: 'Spécial Expresso Macchiato', price: 8000 },
          { name: 'Direct', price: 8000 },
          { name: 'Direct Spécial', price: 9000 },
          { name: 'Cappuccino', price: 10000 },
          { name: 'Spécial Cappuccino', price: 12000 },
          { name: 'Cappuccino MORNACO', price: 15000, star: true },
        ],
      },
      {
        title: 'Coffee-In',
        items: [
          { name: 'Café Latte Caramel', price: 8000 },
          { name: 'Café Liégeois Glacé', note: 'express, boule de glace, caramel, chantilly', price: 10000 },
          { name: 'Chocolat Chaud', price: 8000 },
          { name: 'Chocolat Chaud Chantilly', price: 10000 },
          { name: 'Chocolat Liégeois Glacé', note: 'chocolat glacé, boule de glace, caramel, chantilly', price: 12000 },
          { name: 'Chocolat Chaud MORNACO', price: 15000, star: true },
        ],
      },
    ],
  },
  {
    id: 'thes',
    label: 'Thés',
    sections: [
      {
        items: [
          { name: 'Thé à la Menthe', price: 4000 },
          { name: 'Thé à la Menthe', note: 'sirop', price: 5000 },
          { name: 'Thé Infusion', price: 5000 },
          { name: 'Thé aux Amandes', price: 7500 },
          { name: 'Thé aux Pignons', price: 10000 },
          { name: 'Thé Kerfa', note: 'thé, kerfa, miel', price: 6500 },
          { name: 'Thé Baklawa', note: 'thé, fruits secs, kaak warka, miel, bkhour', price: 14000, star: true },
        ],
      },
    ],
  },
  {
    id: 'frappes',
    label: 'Frappés & Milkshakes',
    sections: [
      {
        title: 'Frappuccino',
        items: [
          { name: 'Frappuccino Moka', price: 10000 },
          { name: 'Frappuccino Oreo', price: 12000 },
          { name: 'Frappuccino Caramel', price: 12000 },
          { name: 'Frappuccino Speculoos', price: 12000 },
          { name: 'Frappuccino Snickers', price: 12000 },
          { name: 'Frappuccino Nutella', price: 14000 },
        ],
      },
      {
        title: 'Milk-Shakes',
        items: [
          { name: 'Milk-Shake Nutella', price: 14000 },
          { name: 'Milk-Shake Oreo', price: 14000 },
          { name: 'Milk-Shake Speculoos', price: 14000 },
          { name: 'Milk-Shake Snickers', price: 14000 },
          { name: 'Milk-Shake Kinder', price: 15000 },
          { name: 'Milk-Shake Chocolat Banane', price: 15000 },
          { name: 'Milk-Shake Ferrero Rocher', price: 15000 },
          { name: 'Milk-Shake Oreo & Nutella', price: 15000 },
          { name: 'Milk-Shake MORNACO', price: 18000, star: true },
        ],
      },
    ],
  },
  {
    id: 'glaces',
    label: 'Glaces & Desserts',
    sections: [
      {
        title: 'Glaces',
        items: [
          { name: 'Glaces', note: '2 boules au choix', price: 8000 },
          { name: 'Glaces', note: '2 boules aux fruits secs', price: 11000 },
          { name: 'Glaces', note: '3 boules au choix', price: 11000 },
          { name: 'Glaces', note: '3 boules aux fruits secs', price: 14000 },
          { name: 'Banana Split', note: '3 boules au choix', price: 13000 },
          { name: 'Banana Split', note: '3 boules aux fruits secs', price: 16000 },
          { name: 'Sorbet Citron', price: 7000 },
          { name: 'Glaces MORNACO', price: 18000, star: true },
        ],
      },
      {
        title: 'Desserts',
        items: [
          { name: 'Tiramisu', price: 12000 },
          { name: 'Fondant Chocolat', note: 'fondant, boule de glace', price: 10000 },
          { name: 'CheeseCake', note: 'au choix', price: 12000 },
          { name: 'CheeseCake MORNACO', price: 14000, star: true },
          { name: 'Gâteau', price: 12000 },
        ],
      },
      {
        title: 'Jwejem & Fruits',
        items: [
          { name: 'Jwejem', price: 12000 },
          { name: 'Jwejem MORNACO', price: 14000, star: true },
          { name: 'Assiette de Fruits', price: 23000 },
        ],
      },
    ],
  },
  {
    id: 'jus',
    label: 'Jus & Cocktails',
    sections: [
      {
        title: 'Jus Frais',
        items: [
          { name: 'Citronnade', price: 7500 },
          { name: 'Citronnade à la Menthe', note: 'sirop', price: 8000 },
          { name: 'Citronnade aux Amandes', price: 11000 },
          { name: 'Lait de Poule', price: 8000 },
          { name: 'Lait de Poule Spécial', price: 12000 },
          { name: 'Citron + Boule de Glace', price: 11000 },
          { name: "Jus d'Orange", price: 7500 },
          { name: 'Jus de Fraise', price: 8000 },
          { name: 'Jus de Kiwi', price: 12000 },
          { name: 'Jus de Mangue', price: 12000 },
          { name: 'Jus Ananas', price: 12000 },
        ],
      },
      {
        title: 'Cocktails',
        items: [
          { name: 'Jus Fraise Citron', price: 10000 },
          { name: 'Jus Banane Datte', price: 12000 },
          { name: "Jus d'Orange Banane", price: 12000 },
          { name: 'Jus Fraise Banane', price: 12000 },
          { name: 'Jus Kiwi Fraise', price: 12000 },
          { name: 'Jus Kiwi Banane', price: 12000 },
          { name: 'Fresh Cocktail', note: 'menthe fraîche, citronnade, glace citron', price: 15000 },
          { name: 'Cocktail 4 Étages', price: 16000 },
          { name: 'Sportif MORNACO', note: 'choufen, miel, banane, fruits secs, datte + boule de glace', price: 17000, star: true },
          { name: 'Cocktail MORNACO', price: 20000, star: true },
          { name: 'Trio Cocktail MORNACO', price: 32000, star: true },
        ],
      },
      {
        title: 'Mixte-Jus',
        items: [
          { name: 'Pina Colada', price: 14000 },
          { name: 'Malibu', note: 'kiwi, citronnade, menthe verte, glaçon', price: 14000 },
          { name: 'Blue Drink', note: 'schweppes agrumes, limonada, citron, blue menthe verte', price: 14000 },
          { name: 'Blue Hawaïn', price: 14000 },
          { name: 'Indien', note: 'orange, grenadine, arôme citron, glaçon', price: 14000 },
          { name: 'Blue Pina Colada', note: 'sprite, citron, noix de coco, glaçon, arôme colada', price: 16000 },
          { name: 'Mixte-Jus MORNACO', price: 18000, star: true },
        ],
      },
    ],
  },
  {
    id: 'smoothies',
    label: 'Smoothies & Mojitos',
    sections: [
      {
        title: 'Smoothies',
        items: [
          { name: 'Smoothie Fraise', price: 14000 },
          { name: 'Smoothie Banane', price: 14000 },
          { name: 'Smoothie Framboise', price: 14000 },
          { name: 'Smoothie Fraise Banane', price: 17000 },
          { name: 'Smoothie Framboise Banane', price: 17000 },
          { name: 'Smoothie Fruit de la Passion', price: 14000 },
          { name: 'Smoothie Énergisant', price: 17000 },
          { name: 'Smoothie MORNACO', price: 18000, star: true },
        ],
      },
      {
        title: 'Mojitos',
        items: [
          { name: 'Virgin Mojito', note: 'sprite, menthe verte, citron, glaçon', price: 12000 },
          { name: 'Framboise Mojito', note: 'framboise, menthe verte, arôme, glaçon', price: 12000 },
          { name: 'Apple Mojito', note: 'pomme, menthe verte, arôme, glaçon', price: 12000 },
          { name: 'Fraise Mojito', note: 'fraise, menthe verte, arôme, glaçon', price: 12000 },
          { name: 'Cerise Mojito', note: 'cerise, menthe verte, arôme, glaçon', price: 12000 },
          { name: 'Black Mojito', note: 'citron, menthe verte, arôme, glaçon', price: 14000 },
          { name: 'Énergissant Mojito', note: 'red-bull, menthe verte, arôme, glaçon', price: 16000 },
          { name: 'Mojito Fruit de la Passion', price: 16000 },
          { name: 'Mojito Red Berry', price: 16000 },
          { name: 'Mojito Blue Berry', price: 16000 },
          { name: 'Mojito Pêche', price: 16000 },
          { name: 'Mojito Mangue', price: 16000 },
          { name: 'Mojito Pineapple', price: 16000 },
          { name: 'MORNACO Mojito', price: 18000, star: true },
          { name: 'MORNACO Familial', note: '6 personnes', price: 56000, star: true },
        ],
      },
    ],
  },
  {
    id: 'crepes',
    label: 'Crêpes & Gaufres',
    sections: [
      {
        title: 'Crêpes Sucrées',
        items: [
          { name: 'Crêpe Nutella', price: 12000 },
          { name: 'Crêpe Nutella Fruits Secs', price: 16000 },
          { name: 'Crêpe Nutella Banane', price: 15000 },
          { name: 'Crêpe Speculoos', price: 15000 },
          { name: 'Crêpe Ferrero Rocher', price: 17000 },
          { name: 'Crêpe MORNACO', note: 'nutella, fruits secs, banane, fraise', price: 20000, star: true },
        ],
      },
      {
        title: 'Pancakes',
        items: [
          { name: 'PanCake Nutella', price: 12000 },
          { name: 'PanCake Nutella Banane', price: 15000 },
          { name: 'PanCake Nutella Fruits Secs', price: 15000 },
        ],
      },
      {
        title: 'Gaufres Sucrées',
        items: [
          { name: 'Gaufre Nutella', price: 12000 },
          { name: 'Gaufre Nutella Fruits Secs', price: 15000 },
          { name: 'Gaufre Nutella Banane', price: 14000 },
          { name: 'Gaufre Speculoos', price: 14000 },
          { name: 'Gaufre MORNACO', price: 20000, star: true },
        ],
      },
      {
        title: 'Crêpes Salées',
        items: [
          { name: 'Crêpe Thon Fromage', price: 10000 },
          { name: 'Crêpe Fromage, Jambon Fumé', price: 10000 },
          { name: 'Crêpe Viande Hachée', price: 14000 },
          { name: 'Crêpe au Poulet', price: 14000 },
          { name: 'Crêpe 4 Fromages', price: 15000 },
          { name: 'Crêpe Spéciale', note: 'œuf, thon, fromage', price: 14000 },
          { name: 'Crêpe MORNACO', note: 'œuf, thon, fromage, champignons, jambon fumé', price: 20000, star: true },
        ],
      },
      {
        title: 'Free-Check',
        items: [
          { name: 'Free-Check Pistache', price: 16000 },
          { name: 'Free-Check Fruit', price: 16000 },
          { name: 'Free-Check Nutella', price: 16000 },
          { name: 'Free-Check MORNACO', price: 18000, star: true },
        ],
      },
    ],
  },
  {
    id: 'snacks',
    label: 'Sandwichs & Burgers',
    sections: [
      {
        title: 'Sandwichs',
        items: [
          { name: 'Baguette Farcie', price: 16000 },
          { name: 'Makloub Jambon', price: 12000 },
          { name: 'Makloub Escalope', price: 12000 },
          { name: 'Makloub Mexicain', price: 12000 },
          { name: 'Tacos Poulet', price: 13000 },
          { name: 'Tacos Poulet Panée', price: 13000 },
          { name: 'Tacos Mexicain', price: 13000 },
        ],
      },
      {
        title: 'Paninis',
        items: [
          { name: 'Panini Fromage', price: 7000 },
          { name: 'Panini Thon', price: 8000 },
          { name: 'Panini Jambon', price: 8000 },
          { name: 'Panini Viande Hachée', price: 12000 },
          { name: 'Panini Poulet', price: 9000 },
          { name: 'Panini 4 Fromages', price: 12000 },
        ],
      },
      {
        title: 'Burgers',
        items: [
          { name: 'Chiken Burger', price: 13000 },
          { name: 'Cheese Burger', price: 15000 },
          { name: 'MORNACO Burger', price: 20000, star: true },
        ],
      },
      {
        title: 'Omlettes',
        items: [
          { name: 'Omlette Jambon Fromage', price: 9000 },
          { name: 'Omlette Thon Fromage', price: 10000 },
          { name: 'Omlette Royale', note: 'champignons, jambon', price: 12000 },
        ],
      },
    ],
  },
  {
    id: 'pizzas',
    label: 'Pizzas & Entrées',
    sections: [
      {
        title: 'Pizzas Large',
        items: [
          { name: 'Pizza Margherita', note: 'sauce tomate, mozzarella, basilic frais', price: 14000 },
          { name: 'Pizza Jambon', note: 'sauce tomate, mozzarella, champignon, jambon', price: 15000 },
          { name: 'Pizza Végétarienne', note: 'sauce tomate, mozzarella, légumes grillés, champignon', price: 18000 },
          { name: 'Pizza Pepperoni', price: 18000 },
          { name: 'Pizza Neptune', note: 'sauce tomate, mozzarella, thon, olive, basilic frais', price: 18000 },
          { name: 'Pizza 4 Saisons', note: 'poivron, oignon, courgette, aubergine, champignon, artichaut, thon, jambon', price: 20000 },
          { name: 'Pizza Parisienne', note: 'mozzarella, poulet panné, champignon, oignon, basilic frais', price: 22000 },
          { name: 'Pizza 4 Fromages', note: 'sauce tomate ou sauce blanche, 4 assortiments de fromage', price: 23000 },
          { name: 'Pizza Mexicaine', note: 'mozzarella, viande hachée, olive, oignon, basilic frais', price: 25000 },
          { name: 'Pizza Norvégienne', note: 'mozzarella, parmigiano, fruits de mer, saumon fumé', price: 26000 },
          { name: 'Pizza Fruits de Mer', price: 30000 },
          { name: 'Pizza MORNACO', note: 'mozzarella, parmigiano, cocktail de fruits de mer, thon, champignon, légumes grillés', price: 35000, star: true },
        ],
      },
      {
        title: 'Entrées Froides',
        items: [
          { name: 'Salade Tomate Mozzarella', note: 'tomate, mozzarella, sauce pesto', price: 15000 },
          { name: 'Trio de Salade', note: 'mechouia, houria, tunisienne', price: 15000 },
          { name: 'Salade Burrata', note: 'basilic, burrata, roquette, tomate cerise, sauce pesto', price: 18000 },
          { name: 'Salade Italienne', note: 'jambon, fromage, tomate, cœur de laitue, oignon', price: 18000 },
          { name: 'Salade César', note: 'laitue, poulet, croûtons, parmigiano, sauce césar', price: 22000 },
          { name: 'Salade aux Fruits de Mer', note: 'cocktail de fruits de mer', price: 24000 },
          { name: 'Salade Poulpe', note: 'cœur de laitue, poulpe, mayonnaise, ketchup', price: 24000 },
        ],
      },
      {
        title: 'Entrées Chaudes',
        items: [
          { name: 'Brik Thon Fromage', price: 7000 },
          { name: 'Brik Fruits de Mer', price: 9000 },
          { name: 'Ojja Merguez', price: 17000 },
          { name: 'Ojja Fruits de Mer', price: 23000 },
          { name: 'Calamar Doré', price: 22000 },
          { name: 'Chevrette Panée', price: 22000 },
          { name: "Chevrette Sautée à l'Ail", price: 25000 },
          { name: 'Gratin Fruits de Mer', price: 25000 },
        ],
      },
    ],
  },
  {
    id: 'pates',
    label: 'Pâtes & Plats',
    sections: [
      {
        title: 'Pâtes',
        items: [
          { name: 'Puttanesca', price: 18000 },
          { name: 'Spaghetti Bolonaise', price: 20000 },
          { name: 'Spaghetti Fruits de Mer', price: 30000 },
          { name: 'Ravioli 4 Fromages', price: 20000 },
          { name: 'Tagliatelli Poulet, Champignons', price: 20000 },
          { name: 'Tagliatelli Pesto', price: 20000 },
          { name: 'Tagliatelli 4 Fromages', price: 20000 },
          { name: 'Tagliatelli Saumon', price: 23000 },
          { name: 'Lasagne Bolonaise', price: 25000 },
          { name: 'Lasagne Fruits de Mer', price: 26000 },
          { name: 'Risotto Poulet', price: 20000 },
          { name: 'Risotto aux Fruits de Mer', price: 30000 },
          { name: 'Penne Poulet Fromage', price: 22000 },
          { name: 'Penne Poulet Champignons Gratinée', price: 22000 },
          { name: 'Penne Viande Hachée Gratinée', price: 26000 },
          { name: 'Paella', note: 'pour 1 personne', price: 34000 },
          { name: 'Paella', note: 'pour 2 personnes', price: 62000 },
        ],
      },
      {
        title: 'Plats',
        items: [
          { name: 'Plat Chawarma', price: 20000 },
          { name: 'Escalope Mexicain', price: 20000 },
          { name: 'Escalope Grillée', price: 20000 },
          { name: 'Escalope Panée', price: 20000 },
          { name: 'Escalope Sauce Champignons', price: 22000 },
          { name: 'Cordon Bleu', price: 22000 },
          { name: 'Poisson du Jour', price: 22000 },
          { name: 'Grillade Mixte', price: 38000 },
          { name: 'Filet de Bœuf', price: 40000 },
        ],
      },
    ],
  },
  {
    id: 'boissons',
    label: 'Boissons & Suppléments',
    sections: [
      {
        title: 'Boissons',
        items: [
          { name: 'Eau Minérale 1L', price: 4000 },
          { name: 'Eau Minérale ½L', price: 2500 },
          { name: 'Eau Gazéifiée', price: 4000 },
          { name: 'Soda', price: 6000 },
          { name: 'Energy Drink', price: 10000 },
          { name: 'Pepsi · Miranda · 7Up', price: 8000 },
          { name: 'Schweppes', price: null },
        ],
      },
      {
        title: 'Arômes & Suppléments',
        items: [
          { name: 'Caramel · Noisette · Vanille · Cookies · Chantilly · Nestlé', price: 2500 },
          { name: 'Amandes', price: 4000 },
          { name: 'Pignons', price: 6000 },
        ],
      },
    ],
  },
];

// Les signatures de la maison — chaque famille de la carte a sa création « MORNACO ».
export const SIGNATURES = [
  {
    name: 'Cappuccino MORNACO',
    cat: 'Italian Coffee',
    desc: 'Le cappuccino signature de la maison, monté à l’italienne.',
    price: 15000,
    icon: 'cup',
  },
  {
    name: 'Thé Baklawa',
    cat: 'Thés',
    desc: 'Thé, fruits secs, kaak warka, miel & bkhour — un rituel tunisien.',
    price: 14000,
    icon: 'tea',
  },
  {
    name: 'MORNACO Mojito',
    cat: 'Mojitos',
    desc: 'Le mojito maison — et sa version familiale à partager à 6.',
    price: 18000,
    icon: 'mojito',
  },
  {
    name: 'Pizza MORNACO',
    cat: 'Pizzas',
    desc: 'Cocktail de fruits de mer, parmigiano, thon & légumes grillés.',
    price: 35000,
    icon: 'pizza',
  },
  {
    name: 'MORNACO Burger',
    cat: 'Burgers',
    desc: 'Le burger généreux de la maison, frites maison à l’appui.',
    price: 20000,
    icon: 'burger',
  },
  {
    name: 'Café Turc MORNACO',
    cat: 'Cafés',
    desc: 'Café turc servi avec kaak warka ou samsa, parfumé au bkhour.',
    price: 10000,
    icon: 'turc',
  },
  {
    name: 'Trio Cocktail MORNACO',
    cat: 'Cocktails',
    desc: 'Trois cocktails de fruits frais dressés en dégradé.',
    price: 32000,
    icon: 'cocktail',
  },
  {
    name: 'Crêpe MORNACO',
    cat: 'Crêpes',
    desc: 'Nutella, fruits secs, banane, fraise — sucrée ou salée.',
    price: 20000,
    icon: 'fruit',
  },
];
