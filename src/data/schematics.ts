import { Schematic, Material } from '../types/pi';

export const MATERIALS: Record<number, Material> = {
  "44": {
    "id": 44,
    "name": "Enriched Uranium",
    "tier": "P2",
    "volume": 0.75,
    "description": "Enriched Uranium is used in many kinds of manufacturing and as a fuel, making it a steady trade commodity. Enriched Uranium is generally manufactured by combining standard semiconductor PVD methods with ionic separation by means of mass spectrometry."
  },
  "2073": {
    "id": 2073,
    "name": "Microorganisms",
    "tier": "P0",
    "volume": 0.005,
    "description": "Any life form too small to be detected by the unaided human eye qualifies as a microorganism, yet as a whole, this classification of biology covers an enormous and diverse spectrum. From parasites and viruses to fungi and insects, the study or industrial application of these creatures is just as broad.",
    "planetTypes": [
      "Barren",
      "Temperate"
    ]
  },
  "2267": {
    "id": 2267,
    "name": "Base Metals",
    "tier": "P0",
    "volume": 0.005,
    "description": "Iron and nickel are two widespread, easily recognized examples of base metals, or those metals that oxidize relatively easily. Their tremendous usefulness in numerous applications ensures that base metals are always in high demand. Thankfully, so is their abundance on most planetary surfaces.",
    "planetTypes": [
      "Barren",
      "Lava",
      "Plasma",
      "Temperate"
    ]
  },
  "2268": {
    "id": 2268,
    "name": "Aqueous Liquids",
    "tier": "P0",
    "volume": 0.005,
    "description": "The abundance of water on terrestrial planets is often a misconception: What many refer to offhandedly as \"water\" is often an amalgamation of many liquids, microscopic particles, and saturated compounds combined with water and other liquids. Aqueous liquids represent those liquids from which pure water can be separated easily from waste or hazardous particles, but only using the proper equipment.",
    "planetTypes": [
      "Gas",
      "Ice",
      "Oceanic",
      "Storm",
      "Temperate"
    ]
  },
  "2270": {
    "id": 2270,
    "name": "Noble Metals",
    "tier": "P0",
    "volume": 0.005,
    "description": "Highly resistant to corrosion and oxidation, noble metals are somewhat rarer than base metals, yet they are just as sought after for their different electrical, material, and chemical attributes. When painstakingly refined and purified, some noble metal ores can produce \"precious metals.\"",
    "planetTypes": [
      "Barren",
      "Plasma",
      "Temperate"
    ]
  },
  "2272": {
    "id": 2272,
    "name": "Heavy Metals",
    "tier": "P0",
    "volume": 0.005,
    "description": "In small quantities, heavy metals are vital to life, providing essential minerals for biological processes. In bulk, they are commonly found in most construction materials, forming the most basic components of computer electronics and reinforced structures.",
    "planetTypes": [
      "Lava",
      "Plasma",
      "Storm"
    ]
  },
  "2286": {
    "id": 2286,
    "name": "Planktic Colonies",
    "tier": "P0",
    "volume": 0.005,
    "description": "Harvested in mass quantities, planktic colonies are used for much more than just a bulk food source that flourishes in water-rich environments. Their cumulative biomass has advanced properties that contribute to some of the most advanced material and medical sciences in New Eden.",
    "planetTypes": [
      "Oceanic",
      "Temperate"
    ]
  },
  "2287": {
    "id": 2287,
    "name": "Complex Organisms",
    "tier": "P0",
    "volume": 0.005,
    "description": "Organic flora and fauna growing on worlds across the cluster technically qualify as “alien life,” though none of it has registered as sentient. However, their usefulness as comestibles or building materials in other areas of industry is invaluable.",
    "planetTypes": [
      "Oceanic",
      "Temperate"
    ]
  },
  "2288": {
    "id": 2288,
    "name": "Carbon Compounds",
    "tier": "P0",
    "volume": 0.005,
    "description": "Often referred to as the building blocks of life, carbon compounds form the basis of most organic material; hence, they are ideally suited for use in the early development of advanced, reactive molecules, such as those used in biofuel and supertensile structures.",
    "planetTypes": [
      "Barren",
      "Ice",
      "Oceanic",
      "Temperate"
    ]
  },
  "2305": {
    "id": 2305,
    "name": "Autotrophs",
    "tier": "P0",
    "volume": 0.005,
    "description": "At the very bottom of the food chain are autotrophs, those organisms that produce carbohydrates, proteins, and fats for higher life forms to consume. When properly gathered and ordered, they can be plied into industrial fibers, which then go on to contribute to advanced material technologies.",
    "planetTypes": [
      "Temperate",
      "Oceanic"
    ]
  },
  "2306": {
    "id": 2306,
    "name": "Non-CS Crystals",
    "tier": "P0",
    "volume": 0.005,
    "description": "The orderly, compact nature of crystals makes them well suited for a staggering array of manufacturing processes, in which they are just as often the product of the factory as they are incorporated into many of the tools and machinery used therein."
  },
  "2307": {
    "id": 2307,
    "name": "Felsic Magma",
    "tier": "P0",
    "volume": 0.005,
    "description": "The churning core of lava planets is rife with felsic magma, or silicate material that is infused with lighter elements, from which basic silicon and other atomic matter may be extracted. Silicon is abundant on many terrestrial planets, but the fastest and easiest way to obtain it, given advances in planetary mining processes, is from felsic magma.",
    "planetTypes": [
      "Lava",
      "Plasma"
    ]
  },
  "2308": {
    "id": 2308,
    "name": "Suspended Plasma",
    "tier": "P0",
    "volume": 0.005,
    "description": "When found in harvestable quantities beyond the unapproachable heat of an active star, plasma is said to be in a “suspended” state. Specialized electronic equipment is used to attract the ionized particles into collection tubes, after which it can be stored, transported, or applied to a variety of technologies.",
    "planetTypes": [
      "Gas",
      "Storm"
    ]
  },
  "2309": {
    "id": 2309,
    "name": "Ionic Solutions",
    "tier": "P0",
    "volume": 0.005,
    "description": "An electrolyte found in a raw, natural form is called an ionic solution, especially in terms of planetary astronomy. Only after a lengthy process of extraction and refining can the resulting fluid go on to be used for medical, industrial, or nutritive applications.",
    "planetTypes": [
      "Gas",
      "Storm"
    ]
  },
  "2310": {
    "id": 2310,
    "name": "Noble Gas",
    "tier": "P0",
    "volume": 0.005,
    "description": "This colorless, odorless, and usually nonflammable substance is one of seven known monoatomic gases, or those that do not easily combine with other atoms. They are thus well suited for a variety of manufacturing implementations.",
    "planetTypes": [
      "Gas",
      "Storm"
    ]
  },
  "2311": {
    "id": 2311,
    "name": "Reactive Gas",
    "tier": "P0",
    "volume": 0.005,
    "description": "Consisting of any number of volatile atomic structures, reactive gases are the most useful when applied to the fields of explosives, molecular restructuring, and electrical conduction. Great care must be taken when storing or transporting any sizeable quantity.",
    "planetTypes": [
      "Gas",
      "Storm"
    ]
  },
  "2312": {
    "id": 2312,
    "name": "Supertensile Plastics",
    "tier": "P2",
    "volume": 0.75,
    "description": "“Hyperoxidation” was the term given to the process of rapidly fossilizing the carbon structures, readily available in the form of biomass, which forms the basic framework of supertensile plastics. The only amorphous solid known to retain the resilience of other such materials while also adopting conductive properties, supertensile plastic is highly sought after for a wide range of industrial applications."
  },
  "2317": {
    "id": 2317,
    "name": "Oxides",
    "tier": "P2",
    "volume": 0.75,
    "description": "Technically, any chemical compound that contains at least one oxygen atom is an oxide, though some are far more valuable than others. Once broken down and separated from waste material, many oxides can be applied to various industrial processes."
  },
  "2319": {
    "id": 2319,
    "name": "Test Cultures",
    "tier": "P2",
    "volume": 0.75,
    "description": "When bacteria are allowed to thrive in a water-based environment, they undergo generational transformations that can be monitored and documented, providing research data invaluable to numerous scientific fields."
  },
  "2321": {
    "id": 2321,
    "name": "Polyaramids",
    "tier": "P2",
    "volume": 0.75,
    "description": "Polyaramid textiles are produced when industrial fibers are harvested from autotrophic life forms and subjected to intense pressure using reactive gas pistons. Able to absorb a startling amount of kinetic energy, sheets of this miraculous material can be form-fitted to just about any structure, protecting it from anything but weapons-grade impact forces."
  },
  "2327": {
    "id": 2327,
    "name": "Microfiber Shielding",
    "tier": "P2",
    "volume": 0.75,
    "description": "Using advanced residual substrate isolation technology, silicon weave is threaded through layers of tough organic fibers. The resulting microfiber shielding is incredibly resilient and retains the microscopic profile required to shield miniaturized electronics."
  },
  "2328": {
    "id": 2328,
    "name": "Water-Cooled CPU",
    "tier": "P2",
    "volume": 0.75,
    "description": "Despite how ancient the technology is, there is still no method more cost-effective for cooling computer processing units than ordinary water, which can be heated and cooled rapidly via any number of proven methods. Most often, thermally conductive tubing makes its way through all of the vital components and over heat sinks, helping to regulate operating temperatures."
  },
  "2329": {
    "id": 2329,
    "name": "Biocells",
    "tier": "P2",
    "volume": 0.75,
    "description": "Similar to an ancient battery, a biocell instead uses biofuels distilled from organic material and precious metals to produce an electrical current in a self-contained, modular unit. However, modern biocells dwarf the capabilities of ancient batteries by several orders of magnitude."
  },
  "2344": {
    "id": 2344,
    "name": "Condensates",
    "tier": "P3",
    "volume": 3,
    "description": "Oxidized coolant is required to produce the temperatures needed to force rare particles to condense out of ordinary matter, which is the most economic way to produce valuable base elements in bulk."
  },
  "2345": {
    "id": 2345,
    "name": "Camera Drones",
    "tier": "P3",
    "volume": 3,
    "description": "Most visibly used in starship development, especially on capsuleer craft, other types of camera drones are also employed in the fields of nano-medicine, surveillance, and entertainment."
  },
  "2346": {
    "id": 2346,
    "name": "Synthetic Synapses",
    "tier": "P3",
    "volume": 3,
    "description": "The wide range of uses for synthetic synapses is largely due to the fact that they are able to serve double duty as electrical conduits and as replacements or additions to biological nervous systems. This allows them to be used in computers, cybernetics, and artificial intelligence equipment."
  },
  "2348": {
    "id": 2348,
    "name": "Gel-Matrix Biopaste",
    "tier": "P3",
    "volume": 3,
    "description": "Gel-matrix biopaste is a highly unstable substance that must be formed from elements that don't combine under normal circumstances. Forcing them to do so requires enormous amounts of energy, but the end product is invaluable to high-end electronics and cybernetic medicine."
  },
  "2349": {
    "id": 2349,
    "name": "Supercomputers",
    "tier": "P3",
    "volume": 3,
    "description": "When an individual computer system incorporates a wide range of networked utilities, layered processors, and redundant memory cores, it is said to have evolved into a supercomputer. Such systems can be put to use managing spaceships, starbases, or even entire planetary administrations."
  },
  "2351": {
    "id": 2351,
    "name": "Smartfab Units",
    "tier": "P3",
    "volume": 3,
    "description": "These tiny cubes form the building blocks of many simple structures, from basic walls and doors to entire homes and even industrial office spaces. Whenever a sufficient number of smartfab units are placed together and have been programmed with the same instructions, they will automatically combine to form some portion of that object and then become inert in their new form. With adequately detailed blueprints, there is theoretically no limit to the complexity of object or structure these clever devices can create."
  },
  "2352": {
    "id": 2352,
    "name": "Nuclear Reactors",
    "tier": "P3",
    "volume": 3,
    "description": "This power core is able to convert heavy elements into electricity by way of nuclear fission, splitting atoms to produce thermal energy on a massive scale. If they are properly shielded and cooled, there are few safer, cleaner ways to power buildings or large vehicles."
  },
  "2354": {
    "id": 2354,
    "name": "Neocoms",
    "tier": "P3",
    "volume": 3,
    "description": "As an essential component of the navigational and tactical interface of spaceships, Neocoms are a small but essential cornerstone of the interstellar economy."
  },
  "2358": {
    "id": 2358,
    "name": "Biotech Research Reports",
    "tier": "P3",
    "volume": 3,
    "description": "As the core fundamentals of organic life constantly evolve and develop on micro and macro levels, the constant production and distribution of biotech research is a mandatory part of ongoing advances in countless scientific disciplines."
  },
  "2360": {
    "id": 2360,
    "name": "Industrial Explosives",
    "tier": "P3",
    "volume": 3,
    "description": "The primary difference between military and industrial explosives is that the latter are effective only when used in bulk, and they are never sold or transported with “ready to use” detonators. As such, they must be carefully installed, primed, and triggered from remote locations before their full destructive force can be applied."
  },
  "2361": {
    "id": 2361,
    "name": "Hermetic Membranes",
    "tier": "P3",
    "volume": 3,
    "description": "How do you make a sheet of material absolutely impermeable to specific particles? Simple: You make the material <i>want</i> to stop those particles. Such is the case with hermetic membranes, supertensile fabrics instilled with living genetic material that actively hunts down and absorbs or repels whatever they were bred to counteract."
  },
  "2366": {
    "id": 2366,
    "name": "Hazmat Detection Systems",
    "tier": "P3",
    "volume": 3,
    "description": "A critical component of space stations, starships, or any other isolated environment, these tiny devices are set to trigger alarms when the genetically engineered viruses inside mutate — which means that they've encountered a significant dose of radiation, natural contaminant, or airborne pathogen, signifying that the surrounding crew is in danger."
  },
  "2367": {
    "id": 2367,
    "name": "Cryoprotectant Solution",
    "tier": "P3",
    "volume": 3,
    "description": "The base elements present in certain synthetic oils can, at extreme temperatures, produce habitable environments for genetically engineered extremophile. The byproduct of their rapid life-death cycle is a highly thermal resistant solution ideal for hybrid electronics."
  },
  "2389": {
    "id": 2389,
    "name": "Plasmoids",
    "tier": "P1",
    "volume": 0.19,
    "description": "In the early days of humanity's return to space flight, scientists Planto and Ginch co-discovered a self-sustaining natural structure made entirely from plasma suspended in a planetary magnetic field. Since then, the term has been applied to any such construct, whether occurring under normal conditions or produced artificially using electrical currents."
  },
  "2390": {
    "id": 2390,
    "name": "Electrolytes",
    "tier": "P1",
    "volume": 0.19,
    "description": "This conductive liquid is able to carry an electrical current due to its unique ionic properties, making it ideal for use as a reactive coolant, a high-energy fuel, or a transference medium for power plants."
  },
  "2392": {
    "id": 2392,
    "name": "Oxidizing Compound",
    "tier": "P1",
    "volume": 0.19,
    "description": "Converting various matter from its basic state to an oxidized form requires an oxidizing compound, the most effective of which is a powerful agent made from pressurized reactive gas. Special containers are required to keep the compound from causing significant damage to common metals and organic life."
  },
  "2393": {
    "id": 2393,
    "name": "Bacteria",
    "tier": "P1",
    "volume": 0.19,
    "description": "The term “bacteria” covers a wide, diverse family of unicellular microorganisms, from those found in almost every climate in New Eden to those that thrive in the bodies of other living beings. Though some bacteria are known to convey diseases, others are more helpful than harmful to humans."
  },
  "2395": {
    "id": 2395,
    "name": "Proteins",
    "tier": "P1",
    "volume": 0.19,
    "description": "One of the most basic components of biological life, proteins form the core DNA structure and are involved in almost every process that sustains a living being. Harvested at the microscopic level, proteins can be put to use in everything from medical genetics to nanite technology."
  },
  "2396": {
    "id": 2396,
    "name": "Biofuels",
    "tier": "P1",
    "volume": 0.19,
    "description": "The most widely used, renewable solid fuel in the cluster, biofuel production is present in some fashion on almost every inhabited world. A steady fuel source can be maintained in a planetary economy by converting living material directly into energy instead of relying on fossil fuels."
  },
  "2397": {
    "id": 2397,
    "name": "Industrial Fibers",
    "tier": "P1",
    "volume": 0.19,
    "description": "The main difference between fibers used in industry and those created for civilian use is the trade-off of comfort for tensile strength and durability. This allows industrial fibers to be used in more severe environments, from electronic component shielding on hostile worlds to solar sails in the frigid void of space."
  },
  "2398": {
    "id": 2398,
    "name": "Reactive Metals",
    "tier": "P1",
    "volume": 0.19,
    "description": "Very dense metals are often called reactive metals, as their ability to conduct electrical currents and absorb heat is unparalleled. Rarely found in a natural solid state, they are instead usually assembled on an atomic level from particulate matter found in other forms."
  },
  "2399": {
    "id": 2399,
    "name": "Precious Metals",
    "tier": "P1",
    "volume": 0.19,
    "description": "A cousin of noble metals, precious metals are named as such because of how infrequently they appear on terrestrial worlds where they were first encountered."
  },
  "2400": {
    "id": 2400,
    "name": "Toxic Metals",
    "tier": "P1",
    "volume": 0.19,
    "description": "Derived from heavy metals, toxic metals are those that have no biological function and are in fact poisonous to most living creatures."
  },
  "2401": {
    "id": 2401,
    "name": "Chiral Structures",
    "tier": "P1",
    "volume": 0.19,
    "description": "A chiral structure is a crystal that is unsymmetrical, which makes it volatile in some situations but ideal for conductivity, especially in micro-circuitry. Using semi-rare chiral structures in electronics has allowed for an unprecedented advancement in the field of miniaturization."
  },
  "2463": {
    "id": 2463,
    "name": "Nanites",
    "tier": "P2",
    "volume": 0.75,
    "description": "Though they are only simple machines and very small, nanites can be used to achieve miraculous medical results in small amounts or astounding feats of engineering in mass quantities."
  },
  "2867": {
    "id": 2867,
    "name": "Broadcast Node",
    "tier": "P4",
    "volume": 50,
    "description": "By integrating transcranial microcontrollers into a circuit made from synthetic synapses, the broadcast node is able to communicate directly with various station functions and with negligible signal loss and latency. The addition of computerized guidance systems, each running independent navigation system software routines, allows a single node to coordinate starship docking procedures, drone operations, and even station defenses."
  },
  "2868": {
    "id": 2868,
    "name": "Integrity Response Drones",
    "tier": "P4",
    "volume": 50,
    "description": "Hull breaches are a constant, serious threat during space travel, as well as a dangerous reality to orbital stations, which are too massive to avoid incoming objects. Integrity response drones help mitigate that threat by providing the automated, immediate application of sealants to any detected impact or pressure fracture in the structure they patrol."
  },
  "2869": {
    "id": 2869,
    "name": "Nano-Factory",
    "tier": "P4",
    "volume": 50,
    "description": "Only the highly advanced Ukomi superconductor can be rendered small enough for use in nano-factories, microscopic devices programmed to absorb and recycle ambient material into useful matter. Each factory is built from reactive metals, ensuring that they interact properly – or not at all – with their environment, while a mote of industrial explosive automatically destroys them when they have completed their task."
  },
  "2870": {
    "id": 2870,
    "name": "Organic Mortar Applicators",
    "tier": "P4",
    "volume": 50,
    "description": "While nanites are ideal for many forms of construction, sealing joints between large structural bulkheads is a job best left to organic mortar, a thick gel that actively permeates every microscopic gap between two parts. Due to the aggressive nature of the genetically engineered bacteria that intelligently guides into place the hardening condensate material, this paste is extremely hazardous to humans and must be applied by robots."
  },
  "2871": {
    "id": 2871,
    "name": "Recursive Computing Module",
    "tier": "P4",
    "volume": 50,
    "description": "Not all automated functions are delicate or complicated enough to warrant advanced computer hardware; relatively mundane tasks are best when assigned to an RCM bank. These sturdy, reliable processing units are able to effectively handle most of the day-to-day operations of stations, starships, and stargates."
  },
  "2872": {
    "id": 2872,
    "name": "Self-Harmonizing Power Core",
    "tier": "P4",
    "volume": 50,
    "description": "Camera drones diligently monitor temperature, radioactivity and electrical output of these advanced nuclear reactions. This allows instant adjustments that result in maximum efficiency. With such advanced automation, no human attention is required whatsoever."
  },
  "2875": {
    "id": 2875,
    "name": "Sterile Conduits",
    "tier": "P4",
    "volume": 50,
    "description": "Sustaining diverse populations of station inhabitants – many of whom come from different worlds with different ecologies – was a medical nightmare until the development of sterile conduits. Each length of flexible, self-repairing tube is powered by breaking down the chemical energy in the water they convey, which itself is laced with smart vaccines able to identify and destroy almost any known antigen."
  },
  "2876": {
    "id": 2876,
    "name": "Wetware Mainframe",
    "tier": "P4",
    "volume": 50,
    "description": "So advanced and energy-demanding are wetware mainframes that they require vehicle-scale power cores and the constant attention of maintenance personnel. When operating at peak performance levels, nothing in New Eden can match the raw computing power of these machines, from calculating warp coordinates to administrating the core functions of an entire space station."
  },
  "3645": {
    "id": 3645,
    "name": "Water",
    "tier": "P1",
    "volume": 0.19,
    "description": "Water is one of the basic conditional elements of human survival. Most worlds have this compound in relative short supply and hence must rely on starship freight."
  },
  "3683": {
    "id": 3683,
    "name": "Oxygen",
    "tier": "P1",
    "volume": 0.19,
    "description": "Oxygen is a commodity in constant demand. While most stations have their own supply units, smaller depots and space crafts rely on imports."
  },
  "3689": {
    "id": 3689,
    "name": "Mechanical Parts",
    "tier": "P2",
    "volume": 0.75,
    "description": "These basic elements of all mechanical hardware can come in virtually any shape and size, although composite or modular functionality is highly advantageous in today's competitive market. Factories and manufacturers take these parts and assemble them into finished products, which are then sold on the market."
  },
  "3691": {
    "id": 3691,
    "name": "Synthetic Oil",
    "tier": "P2",
    "volume": 0.75,
    "description": "Since original oil can be harvested only from a world with a long biological history, synthetic oil has become frequently produced in laboratories all over known space."
  },
  "3693": {
    "id": 3693,
    "name": "Fertilizer",
    "tier": "P2",
    "volume": 0.75,
    "description": "Fertilizer is particularly valued on agricultural worlds, where there is a constant demand for all commodities that boost export value."
  },
  "3695": {
    "id": 3695,
    "name": "Polytextiles",
    "tier": "P2",
    "volume": 0.75,
    "description": "Composite materials, both synthetic and natural, are used in the creation of polytextiles, durable fabrics that see widespread use in the clothing industry, solar sail manufacture, and even classic art."
  },
  "3697": {
    "id": 3697,
    "name": "Silicate Glass",
    "tier": "P2",
    "volume": 0.75,
    "description": "Silicate glass is a common construction material, in constant demand throughout New Eden, whether in planetary structures or reinforced for use in space vessels."
  },
  "3725": {
    "id": 3725,
    "name": "Livestock",
    "tier": "P2",
    "volume": 0.75,
    "description": "Livestock are domestic animals raised for home use or for profit, whether it be for their meat or dairy products."
  },
  "3775": {
    "id": 3775,
    "name": "Viral Agent",
    "tier": "P2",
    "volume": 0.75,
    "description": "The causative agent of an infectious disease, the viral agent is a parasite with a noncellular structure composed mainly of nucleic acid within a protein coat."
  },
  "3779": {
    "id": 3779,
    "name": "Biomass",
    "tier": "P1",
    "volume": 0.19,
    "description": "A catch-all term for composite material obtained from living things, biomass has several unique properties that make it ideal for various industrial, commercial, and personal uses. Its most important attribute is that it retains many of its nutrients even after being harvested, transported, and processed."
  },
  "3828": {
    "id": 3828,
    "name": "Construction Blocks",
    "tier": "P2",
    "volume": 0.75,
    "description": "Metal girders, plasteel concrete, and fiber blocks are all common construction materials used in almost every large-scale building or manufacturing project throughout New Eden."
  },
  "9828": {
    "id": 9828,
    "name": "Silicon",
    "tier": "P1",
    "volume": 0.19,
    "description": "As one of the most common elements in the universe, it's no surprise that silicon has found its way into almost every aspect of manufacturing, resulting in a steady price and perpetual mining operations on most solid planets."
  },
  "9830": {
    "id": 9830,
    "name": "Rocket Fuel",
    "tier": "P2",
    "volume": 0.75,
    "description": "The properties of this carefully refined liquid make it ideal for controlled combustion whether in or outside of atmospheric environments; its severe volatility requires special containers to resist most forms of impact, high temperatures, and electrical activity during storage and transportation."
  },
  "9832": {
    "id": 9832,
    "name": "Coolant",
    "tier": "P2",
    "volume": 0.75,
    "description": "This specially blended fluid is ideal for transferring thermal energy away from sensitive machinery or computer components, rerouting it to heat sinks so it can be eliminated from the system."
  },
  "9834": {
    "id": 9834,
    "name": "Guidance Systems",
    "tier": "P3",
    "volume": 3,
    "description": "An electrical device used in targeting systems and tracking computers."
  },
  "9836": {
    "id": 9836,
    "name": "Consumer Electronics",
    "tier": "P2",
    "volume": 0.75,
    "description": "Consumer electronics encompass a wide variety of individual goods, from entertainment media and personal computers to slave collars and children's toys."
  },
  "9838": {
    "id": 9838,
    "name": "Superconductors",
    "tier": "P2",
    "volume": 0.75,
    "description": "Required for highly advanced technologies too numerous to mention to function properly, these conduits are made from super-cooled materials that function as perfect conductors, having an effective electrical resistance of zero."
  },
  "9840": {
    "id": 9840,
    "name": "Transmitter",
    "tier": "P2",
    "volume": 0.75,
    "description": "This electronic device generates and amplifies a carrier wave, modulates it with a meaningful signal derived from speech or other sources, and radiates the resulting signal from an antenna or some other form of transducer."
  },
  "9842": {
    "id": 9842,
    "name": "Miniature Electronics",
    "tier": "P2",
    "volume": 0.75,
    "description": "Advances in molecular chemistry and nanite-reduced computer chips have made almost every form of miniature electronics possible, from the simple holovid viewer and missile tracking systems to wetware cybernetics and quantum entanglement communications."
  },
  "9846": {
    "id": 9846,
    "name": "Planetary Vehicles",
    "tier": "P3",
    "volume": 3,
    "description": "Tracked, wheeled and hover vehicles used within planetary atmosphere for personal and business use."
  },
  "9848": {
    "id": 9848,
    "name": "Robotics",
    "tier": "P3",
    "volume": 3,
    "description": "These pre-programmed or remote control mechanical tools are commonly used in mass production facilities, hazardous material handling, or dangerous front line military duties such as bomb disarming and disposal."
  },
  "12836": {
    "id": 12836,
    "name": "Transcranial Microcontrollers",
    "tier": "P3",
    "volume": 3,
    "description": "The Transcranial Microcontroller was originally developed by the School of Applied Knowledge with funds from several humanitarian organizations to help catatonics regain consciousness and resume their lives, though in a limited capacity. The microcontroller, which can be used both in humans and machines, proved to be a great success and the Ishukone corporation stepped in and bought the rights to the chip. Since then, further studies by Ishukone technicians have revealed several additional ways the microcontroller can be used, such as control mechanisms in robots for industrial usage. Experts claim that the microchip does not offer higher efficiency in the robots compared to already established methods due to its reliance of a biomechanical host system."
  },
  "15317": {
    "id": 15317,
    "name": "Genetically Enhanced Livestock",
    "tier": "P2",
    "volume": 0.75,
    "description": "Livestock are domestic animals raised for home use or for profit, whether it be for their meat or dairy products. This particular breed of livestock has been genetically enhanced using the very latest technology."
  },
  "17136": {
    "id": 17136,
    "name": "Ukomi Superconductors",
    "tier": "P3",
    "volume": 3,
    "description": "Highly isolated coils with minimal friction, used in high-voltage electrical devices. The Ukomi Superconductors are a new brand developed and manufactured by the Kaalakiota corporation. Today every Caldari station has a stockpile of these highly rated Superconductors, which are in quite high demand in most foreign black markets due to their superior technology."
  },
  "17392": {
    "id": 17392,
    "name": "Data Chips",
    "tier": "P3",
    "volume": 3,
    "description": "A small wafer of semiconductor material that forms the base for an integrated circuit."
  },
  "17898": {
    "id": 17898,
    "name": "High-Tech Transmitters",
    "tier": "P3",
    "volume": 3,
    "description": "An electronic device that generates and amplifies a carrier wave, modulates it with a meaningful signal derived from speech or other sources, and radiates the resulting signal from an antenna. The High-Tech prototype is almost immune to any type of de-scrambling devices, making the transmission more secure."
  },
  "28974": {
    "id": 28974,
    "name": "Vaccines",
    "tier": "P3",
    "volume": 3,
    "description": "Living creatures can be trained to defend themselves from harmful diseases by introducing a minute sample of pathological strains, tremendously improving their immune systems and allowing them to endure prolonged exposure to harmful contagions."
  }
};

export const SCHEMATICS: Record<number, Schematic> = {
  "65": {
    "id": 65,
    "name": "Superconductors",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2389,
        "quantity": 40
      },
      {
        "materialId": 3645,
        "quantity": 40
      }
    ],
    "output": {
      "materialId": 9838,
      "quantity": 5
    }
  },
  "66": {
    "id": 66,
    "name": "Coolant",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2390,
        "quantity": 40
      },
      {
        "materialId": 3645,
        "quantity": 40
      }
    ],
    "output": {
      "materialId": 9832,
      "quantity": 5
    }
  },
  "67": {
    "id": 67,
    "name": "Rocket Fuel",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2389,
        "quantity": 40
      },
      {
        "materialId": 2390,
        "quantity": 40
      }
    ],
    "output": {
      "materialId": 9830,
      "quantity": 5
    }
  },
  "68": {
    "id": 68,
    "name": "Synthetic Oil",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2390,
        "quantity": 40
      },
      {
        "materialId": 3683,
        "quantity": 40
      }
    ],
    "output": {
      "materialId": 3691,
      "quantity": 5
    }
  },
  "69": {
    "id": 69,
    "name": "Oxides",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2392,
        "quantity": 40
      },
      {
        "materialId": 3683,
        "quantity": 40
      }
    ],
    "output": {
      "materialId": 2317,
      "quantity": 5
    }
  },
  "70": {
    "id": 70,
    "name": "Silicate Glass",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2392,
        "quantity": 40
      },
      {
        "materialId": 9828,
        "quantity": 40
      }
    ],
    "output": {
      "materialId": 3697,
      "quantity": 5
    }
  },
  "71": {
    "id": 71,
    "name": "Transmitter",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2389,
        "quantity": 40
      },
      {
        "materialId": 2401,
        "quantity": 40
      }
    ],
    "output": {
      "materialId": 9840,
      "quantity": 5
    }
  },
  "72": {
    "id": 72,
    "name": "Water-Cooled CPU",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2398,
        "quantity": 40
      },
      {
        "materialId": 3645,
        "quantity": 40
      }
    ],
    "output": {
      "materialId": 2328,
      "quantity": 5
    }
  },
  "73": {
    "id": 73,
    "name": "Mechanical Parts",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2398,
        "quantity": 40
      },
      {
        "materialId": 2399,
        "quantity": 40
      }
    ],
    "output": {
      "materialId": 3689,
      "quantity": 5
    }
  },
  "74": {
    "id": 74,
    "name": "Construction Blocks",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2398,
        "quantity": 40
      },
      {
        "materialId": 2400,
        "quantity": 40
      }
    ],
    "output": {
      "materialId": 3828,
      "quantity": 5
    }
  },
  "75": {
    "id": 75,
    "name": "Enriched Uranium",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2399,
        "quantity": 40
      },
      {
        "materialId": 2400,
        "quantity": 40
      }
    ],
    "output": {
      "materialId": 44,
      "quantity": 5
    }
  },
  "76": {
    "id": 76,
    "name": "Consumer Electronics",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2400,
        "quantity": 40
      },
      {
        "materialId": 2401,
        "quantity": 40
      }
    ],
    "output": {
      "materialId": 9836,
      "quantity": 5
    }
  },
  "77": {
    "id": 77,
    "name": "Miniature Electronics",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2401,
        "quantity": 40
      },
      {
        "materialId": 9828,
        "quantity": 40
      }
    ],
    "output": {
      "materialId": 9842,
      "quantity": 5
    }
  },
  "78": {
    "id": 78,
    "name": "Nanites",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2393,
        "quantity": 40
      },
      {
        "materialId": 2398,
        "quantity": 40
      }
    ],
    "output": {
      "materialId": 2463,
      "quantity": 5
    }
  },
  "79": {
    "id": 79,
    "name": "Biocells",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2396,
        "quantity": 40
      },
      {
        "materialId": 2399,
        "quantity": 40
      }
    ],
    "output": {
      "materialId": 2329,
      "quantity": 5
    }
  },
  "80": {
    "id": 80,
    "name": "Microfiber Shielding",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2397,
        "quantity": 40
      },
      {
        "materialId": 9828,
        "quantity": 40
      }
    ],
    "output": {
      "materialId": 2327,
      "quantity": 5
    }
  },
  "81": {
    "id": 81,
    "name": "Viral Agent",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2393,
        "quantity": 40
      },
      {
        "materialId": 3779,
        "quantity": 40
      }
    ],
    "output": {
      "materialId": 3775,
      "quantity": 5
    }
  },
  "82": {
    "id": 82,
    "name": "Fertilizer",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2393,
        "quantity": 40
      },
      {
        "materialId": 2395,
        "quantity": 40
      }
    ],
    "output": {
      "materialId": 3693,
      "quantity": 5
    }
  },
  "83": {
    "id": 83,
    "name": "Genetically Enhanced Livestock",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2395,
        "quantity": 40
      },
      {
        "materialId": 3779,
        "quantity": 40
      }
    ],
    "output": {
      "materialId": 15317,
      "quantity": 5
    }
  },
  "84": {
    "id": 84,
    "name": "Livestock",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2395,
        "quantity": 40
      },
      {
        "materialId": 2396,
        "quantity": 40
      }
    ],
    "output": {
      "materialId": 3725,
      "quantity": 5
    }
  },
  "85": {
    "id": 85,
    "name": "Polytextiles",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2396,
        "quantity": 40
      },
      {
        "materialId": 2397,
        "quantity": 40
      }
    ],
    "output": {
      "materialId": 3695,
      "quantity": 5
    }
  },
  "86": {
    "id": 86,
    "name": "Test Cultures",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2393,
        "quantity": 40
      },
      {
        "materialId": 3645,
        "quantity": 40
      }
    ],
    "output": {
      "materialId": 2319,
      "quantity": 5
    }
  },
  "87": {
    "id": 87,
    "name": "Supertensile Plastics",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 3683,
        "quantity": 40
      },
      {
        "materialId": 3779,
        "quantity": 40
      }
    ],
    "output": {
      "materialId": 2312,
      "quantity": 5
    }
  },
  "88": {
    "id": 88,
    "name": "Polyaramids",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2392,
        "quantity": 40
      },
      {
        "materialId": 2397,
        "quantity": 40
      }
    ],
    "output": {
      "materialId": 2321,
      "quantity": 5
    }
  },
  "89": {
    "id": 89,
    "name": "Ukomi Superconductor",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 3691,
        "quantity": 10
      },
      {
        "materialId": 9838,
        "quantity": 10
      }
    ],
    "output": {
      "materialId": 17136,
      "quantity": 3
    }
  },
  "90": {
    "id": 90,
    "name": "Condensates",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2317,
        "quantity": 10
      },
      {
        "materialId": 9832,
        "quantity": 10
      }
    ],
    "output": {
      "materialId": 2344,
      "quantity": 3
    }
  },
  "91": {
    "id": 91,
    "name": "Camera Drones",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 3697,
        "quantity": 10
      },
      {
        "materialId": 9830,
        "quantity": 10
      }
    ],
    "output": {
      "materialId": 2345,
      "quantity": 3
    }
  },
  "92": {
    "id": 92,
    "name": "Synthetic Synapses",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2312,
        "quantity": 10
      },
      {
        "materialId": 2319,
        "quantity": 10
      }
    ],
    "output": {
      "materialId": 2346,
      "quantity": 3
    }
  },
  "94": {
    "id": 94,
    "name": "High-Tech Transmitter",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2321,
        "quantity": 10
      },
      {
        "materialId": 9840,
        "quantity": 10
      }
    ],
    "output": {
      "materialId": 17898,
      "quantity": 3
    }
  },
  "95": {
    "id": 95,
    "name": "Gel-Matrix Biopaste",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2317,
        "quantity": 10
      },
      {
        "materialId": 2329,
        "quantity": 10
      },
      {
        "materialId": 9838,
        "quantity": 10
      }
    ],
    "output": {
      "materialId": 2348,
      "quantity": 3
    }
  },
  "96": {
    "id": 96,
    "name": "Supercomputers",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2328,
        "quantity": 10
      },
      {
        "materialId": 9832,
        "quantity": 10
      },
      {
        "materialId": 9836,
        "quantity": 10
      }
    ],
    "output": {
      "materialId": 2349,
      "quantity": 3
    }
  },
  "97": {
    "id": 97,
    "name": "Robotics",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 3689,
        "quantity": 10
      },
      {
        "materialId": 9836,
        "quantity": 10
      }
    ],
    "output": {
      "materialId": 9848,
      "quantity": 3
    }
  },
  "98": {
    "id": 98,
    "name": "Smartfab Units",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 3828,
        "quantity": 10
      },
      {
        "materialId": 9842,
        "quantity": 10
      }
    ],
    "output": {
      "materialId": 2351,
      "quantity": 3
    }
  },
  "99": {
    "id": 99,
    "name": "Nuclear Reactors",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 44,
        "quantity": 10
      },
      {
        "materialId": 2327,
        "quantity": 10
      }
    ],
    "output": {
      "materialId": 2352,
      "quantity": 3
    }
  },
  "100": {
    "id": 100,
    "name": "Guidance Systems",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2328,
        "quantity": 10
      },
      {
        "materialId": 9840,
        "quantity": 10
      }
    ],
    "output": {
      "materialId": 9834,
      "quantity": 3
    }
  },
  "102": {
    "id": 102,
    "name": "Neocoms",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2329,
        "quantity": 10
      },
      {
        "materialId": 3697,
        "quantity": 10
      }
    ],
    "output": {
      "materialId": 2354,
      "quantity": 3
    }
  },
  "103": {
    "id": 103,
    "name": "Planetary Vehicles",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2312,
        "quantity": 10
      },
      {
        "materialId": 3689,
        "quantity": 10
      },
      {
        "materialId": 9842,
        "quantity": 10
      }
    ],
    "output": {
      "materialId": 9846,
      "quantity": 3
    }
  },
  "104": {
    "id": 104,
    "name": "Biotech Research Reports",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2463,
        "quantity": 10
      },
      {
        "materialId": 3725,
        "quantity": 10
      },
      {
        "materialId": 3828,
        "quantity": 10
      }
    ],
    "output": {
      "materialId": 2358,
      "quantity": 3
    }
  },
  "105": {
    "id": 105,
    "name": "Vaccines",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 3725,
        "quantity": 10
      },
      {
        "materialId": 3775,
        "quantity": 10
      }
    ],
    "output": {
      "materialId": 28974,
      "quantity": 3
    }
  },
  "106": {
    "id": 106,
    "name": "Industrial Explosives",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 3693,
        "quantity": 10
      },
      {
        "materialId": 3695,
        "quantity": 10
      }
    ],
    "output": {
      "materialId": 2360,
      "quantity": 3
    }
  },
  "107": {
    "id": 107,
    "name": "Hermetic Membranes",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2321,
        "quantity": 10
      },
      {
        "materialId": 15317,
        "quantity": 10
      }
    ],
    "output": {
      "materialId": 2361,
      "quantity": 3
    }
  },
  "108": {
    "id": 108,
    "name": "Transcranial Microcontroller",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2329,
        "quantity": 10
      },
      {
        "materialId": 2463,
        "quantity": 10
      }
    ],
    "output": {
      "materialId": 12836,
      "quantity": 3
    }
  },
  "109": {
    "id": 109,
    "name": "Data Chips",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2312,
        "quantity": 10
      },
      {
        "materialId": 2327,
        "quantity": 10
      }
    ],
    "output": {
      "materialId": 17392,
      "quantity": 3
    }
  },
  "110": {
    "id": 110,
    "name": "Hazmat Detection Systems",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 3695,
        "quantity": 10
      },
      {
        "materialId": 3775,
        "quantity": 10
      },
      {
        "materialId": 9840,
        "quantity": 10
      }
    ],
    "output": {
      "materialId": 2366,
      "quantity": 3
    }
  },
  "111": {
    "id": 111,
    "name": "Cryoprotectant Solution",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2319,
        "quantity": 10
      },
      {
        "materialId": 3691,
        "quantity": 10
      },
      {
        "materialId": 3693,
        "quantity": 10
      }
    ],
    "output": {
      "materialId": 2367,
      "quantity": 3
    }
  },
  "112": {
    "id": 112,
    "name": "Organic Mortar Applicators",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2344,
        "quantity": 6
      },
      {
        "materialId": 2393,
        "quantity": 40
      },
      {
        "materialId": 9848,
        "quantity": 6
      }
    ],
    "output": {
      "materialId": 2870,
      "quantity": 1
    }
  },
  "113": {
    "id": 113,
    "name": "Sterile Conduits",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2351,
        "quantity": 6
      },
      {
        "materialId": 3645,
        "quantity": 40
      },
      {
        "materialId": 28974,
        "quantity": 6
      }
    ],
    "output": {
      "materialId": 2875,
      "quantity": 1
    }
  },
  "114": {
    "id": 114,
    "name": "Nano-Factory",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2360,
        "quantity": 6
      },
      {
        "materialId": 2398,
        "quantity": 40
      },
      {
        "materialId": 17136,
        "quantity": 6
      }
    ],
    "output": {
      "materialId": 2869,
      "quantity": 1
    }
  },
  "115": {
    "id": 115,
    "name": "Self-Harmonizing Power Core",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2345,
        "quantity": 6
      },
      {
        "materialId": 2352,
        "quantity": 6
      },
      {
        "materialId": 2361,
        "quantity": 6
      }
    ],
    "output": {
      "materialId": 2872,
      "quantity": 1
    }
  },
  "116": {
    "id": 116,
    "name": "Recursive Computing Module",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2346,
        "quantity": 6
      },
      {
        "materialId": 9834,
        "quantity": 6
      },
      {
        "materialId": 12836,
        "quantity": 6
      }
    ],
    "output": {
      "materialId": 2871,
      "quantity": 1
    }
  },
  "117": {
    "id": 117,
    "name": "Broadcast Node",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2354,
        "quantity": 6
      },
      {
        "materialId": 17392,
        "quantity": 6
      },
      {
        "materialId": 17898,
        "quantity": 6
      }
    ],
    "output": {
      "materialId": 2867,
      "quantity": 1
    }
  },
  "118": {
    "id": 118,
    "name": "Integrity Response Drones",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2348,
        "quantity": 6
      },
      {
        "materialId": 2366,
        "quantity": 6
      },
      {
        "materialId": 9846,
        "quantity": 6
      }
    ],
    "output": {
      "materialId": 2868,
      "quantity": 1
    }
  },
  "119": {
    "id": 119,
    "name": "Wetware Mainframe",
    "cycleTime": 3600,
    "inputs": [
      {
        "materialId": 2349,
        "quantity": 6
      },
      {
        "materialId": 2358,
        "quantity": 6
      },
      {
        "materialId": 2367,
        "quantity": 6
      }
    ],
    "output": {
      "materialId": 2876,
      "quantity": 1
    }
  },
  "121": {
    "id": 121,
    "name": "Water",
    "cycleTime": 1800,
    "inputs": [
      {
        "materialId": 2268,
        "quantity": 3000
      }
    ],
    "output": {
      "materialId": 3645,
      "quantity": 20
    }
  },
  "122": {
    "id": 122,
    "name": "Plasmoids",
    "cycleTime": 1800,
    "inputs": [
      {
        "materialId": 2308,
        "quantity": 3000
      }
    ],
    "output": {
      "materialId": 2389,
      "quantity": 20
    }
  },
  "123": {
    "id": 123,
    "name": "Electrolytes",
    "cycleTime": 1800,
    "inputs": [
      {
        "materialId": 2309,
        "quantity": 3000
      }
    ],
    "output": {
      "materialId": 2390,
      "quantity": 20
    }
  },
  "124": {
    "id": 124,
    "name": "Oxygen",
    "cycleTime": 1800,
    "inputs": [
      {
        "materialId": 2310,
        "quantity": 3000
      }
    ],
    "output": {
      "materialId": 3683,
      "quantity": 20
    }
  },
  "125": {
    "id": 125,
    "name": "Oxidizing Compound",
    "cycleTime": 1800,
    "inputs": [
      {
        "materialId": 2311,
        "quantity": 3000
      }
    ],
    "output": {
      "materialId": 2392,
      "quantity": 20
    }
  },
  "126": {
    "id": 126,
    "name": "Reactive Metals",
    "cycleTime": 1800,
    "inputs": [
      {
        "materialId": 2267,
        "quantity": 3000
      }
    ],
    "output": {
      "materialId": 2398,
      "quantity": 20
    }
  },
  "127": {
    "id": 127,
    "name": "Precious Metals",
    "cycleTime": 1800,
    "inputs": [
      {
        "materialId": 2270,
        "quantity": 3000
      }
    ],
    "output": {
      "materialId": 2399,
      "quantity": 20
    }
  },
  "128": {
    "id": 128,
    "name": "Toxic Metals",
    "cycleTime": 1800,
    "inputs": [
      {
        "materialId": 2272,
        "quantity": 3000
      }
    ],
    "output": {
      "materialId": 2400,
      "quantity": 20
    }
  },
  "129": {
    "id": 129,
    "name": "Chiral Structures",
    "cycleTime": 1800,
    "inputs": [
      {
        "materialId": 2306,
        "quantity": 3000
      }
    ],
    "output": {
      "materialId": 2401,
      "quantity": 20
    }
  },
  "130": {
    "id": 130,
    "name": "Silicon",
    "cycleTime": 1800,
    "inputs": [
      {
        "materialId": 2307,
        "quantity": 3000
      }
    ],
    "output": {
      "materialId": 9828,
      "quantity": 20
    }
  },
  "131": {
    "id": 131,
    "name": "Bacteria",
    "cycleTime": 1800,
    "inputs": [
      {
        "materialId": 2073,
        "quantity": 3000
      }
    ],
    "output": {
      "materialId": 2393,
      "quantity": 20
    }
  },
  "132": {
    "id": 132,
    "name": "Biomass",
    "cycleTime": 1800,
    "inputs": [
      {
        "materialId": 2286,
        "quantity": 3000
      }
    ],
    "output": {
      "materialId": 3779,
      "quantity": 20
    }
  },
  "133": {
    "id": 133,
    "name": "Proteins",
    "cycleTime": 1800,
    "inputs": [
      {
        "materialId": 2287,
        "quantity": 3000
      }
    ],
    "output": {
      "materialId": 2395,
      "quantity": 20
    }
  },
  "134": {
    "id": 134,
    "name": "Biofuels",
    "cycleTime": 1800,
    "inputs": [
      {
        "materialId": 2288,
        "quantity": 3000
      }
    ],
    "output": {
      "materialId": 2396,
      "quantity": 20
    }
  },
  "135": {
    "id": 135,
    "name": "Industrial Fibers",
    "cycleTime": 1800,
    "inputs": [
      {
        "materialId": 2305,
        "quantity": 3000
      }
    ],
    "output": {
      "materialId": 2397,
      "quantity": 20
    }
  }
};
