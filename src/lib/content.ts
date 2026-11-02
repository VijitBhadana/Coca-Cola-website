export const CONTACT_EMAIL = "hello@example.com"; // where the contact form's message is addressed

export const FLAVOURS = [
  {
    id: "original",
    name: "Original Taste",
    short: "Original",
    chip: "Original",
    line: "The taste everything else is measured against.",
    alt: "Red Coca-Cola Original Taste can covered in cold droplets",
    accent: "#ff2b2b",
    filmPoints: ["Born in Atlanta in 1886", "Full-sugar cola with caramel warmth", "A crisp, bright fizz to the last sip"],
    kicker: "01 / 05 — The classic",
    points: ["A recipe famously kept under lock and key", "Caramel, gentle spice and a citrus lift", "Made for burgers, pizza and long afternoons"],
    facts: { Since: "1886", Sugar: "Full", Notes: "Caramel" },
  },
  {
    id: "zero",
    name: "Zero Sugar",
    short: "Zero",
    chip: "Zero Sugar",
    line: "All of the attitude. None of the sugar.",
    alt: "Black Coca-Cola Zero Sugar can with a red disc and silver script",
    accent: "#ff3b30",
    filmPoints: ["Bold cola character, no sugar", "Black can, unmistakable red heart", "The everyday choice for all-day sipping"],
    kicker: "02 / 05 — The bold one",
    points: ["Launched as Coke Zero in 2005", "Built to stay close to the classic cola taste", "The black can that owns the cooler"],
    facts: { Since: "2005", Sugar: "Zero", Notes: "Bold cola" },
  },
  {
    id: "diet",
    name: "Diet Coke",
    short: "Diet",
    chip: "Diet Coke",
    line: "Silver can. Sharper edge. Its own taste.",
    alt: "Silver Diet Coke can with red lettering, beaded with water",
    accent: "#d7dde3",
    filmPoints: ["On shelves since 1982", "Zero sugar with a taste of its own", "Lighter, sharper, clean on the finish"],
    kicker: "03 / 05 — The sharp one",
    points: ["A different recipe, not a lighter copy", "Crisp, dry and clean on the finish", "A cult favourite for more than four decades"],
    facts: { Since: "1982", Sugar: "Zero", Notes: "Crisp, dry" },
  },
  {
    id: "cherry",
    name: "Cherry Coke",
    short: "Cherry",
    chip: "Cherry",
    line: "Classic cola with a deep red twist.",
    alt: "Purple and red Coca-Cola Cherry can with a cherry graphic",
    accent: "#e23fa8",
    filmPoints: ["Dark cherry layered over classic cola", "First poured in 1985", "Sweet up front, a tart lift behind it"],
    kicker: "04 / 05 — The dark fruit",
    points: ["The first big flavour spin on the original", "Ripe cherry up front, cola underneath", "Bright enough for dessert, bold enough for lunch"],
    facts: { Since: "1985", Sugar: "Full", Notes: "Dark cherry" },
  },
  {
    id: "vanilla",
    name: "Vanilla Coke",
    short: "Vanilla",
    chip: "Vanilla",
    line: "Soft on the edges. Still all cola.",
    alt: "Cream Coca-Cola Vanilla can with a vanilla flower graphic",
    accent: "#f3d9a4",
    filmPoints: ["Introduced in 2002", "Soft vanilla rounds off the cola spice", "A mellow, creamy finish"],
    kicker: "05 / 05 — The smooth one",
    points: ["Warm vanilla folded through classic cola", "A creamy, float-like finish", "The sip that turns a snack into a treat"],
    facts: { Since: "2002", Sugar: "Full", Notes: "Vanilla" },
  },
];

export const MARQUEE = ["Ice cold", "Original", "Zero Sugar", "Diet Coke", "Cherry", "Vanilla"];

export const STATS = [
  { num: "1886", label: "First served in Atlanta" },
  { num: "200+", label: "Countries and territories" },
  { num: "5", label: "Cans in this line-up" },
  { num: "2", label: "With zero sugar" },
];

export const BENTO = [
  {
    img: "detail-pull",
    alt: "Close-up of a chilled ring pull on a black can",
    title: "Crack it cold.",
    text: "Keep it in the fridge until the last second. Cold keeps the fizz tight and the taste sharp.",
    wide: true,
  },
  {
    img: "detail-drops",
    alt: "Water droplets on a silver can",
    title: "Made to go round.",
    text: "Aluminium can be recycled again and again. Finish it, then bin it right.",
    wide: false,
  },
  {
    img: "detail-cherry",
    alt: "Cherry graphic on a wet purple can",
    title: "Flavour with restraint.",
    text: "Every twist adds one idea. The cola always stays in charge.",
    wide: false,
  },
  {
    img: "detail-vanilla",
    alt: "Vanilla flower graphic on a cream can",
    title: "Design you can spot across a room.",
    text: "Colour tells you the flavour. The script tells you the rest.",
    wide: true,
  },
];

export const TIMELINE = [
  {
    year: "1886",
    label: "Original",
    points: ["Created by Dr. John Pemberton", "First served at a pharmacy in Atlanta", "Five cents a glass"],
  },
  {
    year: "1982",
    label: "Diet Coke",
    points: ["Unveiled in New York City", "First new brand to carry the Coke name", "A recipe all of its own"],
  },
  {
    year: "1985",
    label: "Cherry",
    points: ["The first flavour twist on the classic", "Soda-fountain cherry, now in a can", "Same year as the New Coke saga"],
  },
  {
    year: "2002",
    label: "Vanilla",
    points: ["Launched in the United States", "A soda-fountain favourite, canned", "Left in 2005, back by demand in 2007"],
  },
  {
    year: "2005",
    label: "Zero Sugar",
    points: ["Launched as Coca-Cola Zero", "Bold black can, zero sugar", "Later renamed Coca-Cola Zero Sugar"],
  },
];
