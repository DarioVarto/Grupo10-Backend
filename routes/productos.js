//Guardo en una variable el json obtenido de la api

const jsonData = [{
  "id": 291,

  "title": "Ant-Man (2003) #1",

  "description": "Size does matter. And no one knows this more than Hank Pym - a.k.a. Ant-Man. Got a problem with Galactus? Call the FF. Got a problem with, say, mind-controlled cockroaches? Then Ant-Man's your man! And needless to say, it's done a number on our diminutive hero's self-esteem. When Ant-Man is tapped to infiltrate an international spy ring that has been siphoning secrets out of Washington, he jumps at the chance - unaware that he's being used as a pawn in a larger game of espionage. 32 PGS./PARENTAL ADVISORY...$2.99",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/6/e0/4bc6a2497684e.jpg",

  "price": 2.99

},
{
  "id": 27238,

  "title": "Wolverine Saga (2009) #7",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",

  "price": 0

},
{
  "id": 1003,

  "title": "Sentry, the (Trade Paperback)",

  "description": "",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/f/c0/4bc66d78f1bee.jpg",

  "price": 9.99

},
{
  "id": 428,

  "title": "Ant-Man (2003) #4",

  "description": "Ant-Man digs deeper into finding out who is leaking those dirty little secrets that are threatening our national security. And who's better at uncovering dirty LITTLE secrets than him??",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/4/20/4bc697c680890.jpg",

  "price": 2.99

},
{
  "id": 384,

  "title": "Gun Theory (2003) #3",

  "description": "",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/c/60/4bc69f11baf75.jpg",

  "price": 2.5

},
{
  "id": 183,

  "title": "Startling Stories: The Incorrigible Hulk (2004) #1",

  "description": "For Doctor Bruce Banner life is anything but normal. But what happens when two women get between him and his alter ego, the Incorrigible Hulk? Hulk confused! Indy superstar Peter Bagge (THE MEGALOMANIACAL SPIDER-MAN) takes a satirical jab at the Hulk mythos with a tale of dames, debauchery and destruction. 32 PGS./MARVEL PSR...$2.99",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",

  "price": 2.99

},
{
  "id": 1332,

  "title": "X-Men: Days of Future Past (Trade Paperback)",

  "description": "Re-live the legendary first journey into the dystopian future of 2013 - where Sentinels stalk the Earth, and the X-Men are humanity's only hope...until they die! Also featuring the first appearance of Alpha Flight, the return of the Wendigo, the history of the X-Men from Cyclops himself...and a demon for Christmas!? ",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/9/d0/58b5cfb6d5239.jpg",

  "price": 9.99

},
{
  "id": 376,

  "title": "Ant-Man (2003) #3",

  "description": "",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/d/70/4bc69c7e9b9d7.jpg",

  "price": 2.99

},
{
  "id": 59525,

  "title": "The Amazing Spider-Man (2015) #15 (Panosian Mighty Men Variant)",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",

  "price": 3.99

},
{
  "id": 331,

  "title": "Gun Theory (2003) #4",

  "description": "The phone rings, and killer-for-hire Harvey embarks on another hit. But nothing's going right this job. There's little room for error in the business of killing - so what happens when one occurs? 32 PGS./ PARENTAL ADVISORY ...$2.50",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/c/60/4bc69f11baf75.jpg",

  "price": 2.5

},
{
  "id": 59558,

  "title": "The Totally Awesome Hulk (2015) #8 (Putri Mighty Men Variant)",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",

  "price": 3.99

},
{
  "id": 15878,

  "title": "Hedge Knight II: Sworn Sword (2007) #1 (Yu Variant)",

  "description": "",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/9/50/4bc49463dad62.jpg",

  "price": 0

},
{
  "id": 38002,

  "title": "X-Men: Fall Of The Mutants (2010)",

  "description": "The body count rises higher than ever as the X-Men and their allies face war on every front! The original X-Men have formed X-Factor, and they come up against their deadliest challenge yet in Apocalypse and his Horsemen, including the all-new Archangel! The New Mutants lose one of their own! And after the Marauders slaughter the Morlocks, they take on the X-Men - and the survivors will be asked to sacrifice themselves to stop the evil Adversary! Featuring tie-ins starring Captain America, Daredevil, the Hulk, the Fantastic Four and Power Pack! Collecting NEW MUTANTS (1983) #55-61, UNCANNY X-MEN #220-227, X-FACTOR (1986) #18-26, CAPTAIN AMERICA (1968) #339, DAREDEVIL (1964) #252, FANTASTIC FOUR (1961) #312, INCREDIBLE HULK (1968) #336-337 & #340 and POWER PACK (1984) #35.",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/e/c0/4cbcd33563abd.jpg",

  "price": 0

},
{
  "id": 25582,

  "title": "Kabuki Reflections Vol. 1 (Hardcover)",

  "description": "Collecting the first six art books of Marvel's REFLECTIONS series from multiple Eisner Award-nominated creator David Mack, this gorgeous volume of cover paintings and step-by-step art techniques is being presented in oversized hardcover format to show off Mack's work to full effect. Readers have been waiting for an oversized art-book collection of Mack's work for years, and this monster volume delivers with loads of extras -- including never-before-seen art, new paintings, a cover gallery, figure studies, step-by-step art techniques and commentary, remastered pages, new design pages, a Best of Letters section, and more! A whopping 320 pages with extra features -- all elegantly collected in a high-end oversized hardcover with high-quality paper, embossment, and an all-new introduction and interview! 320PGS./$39.99 ISBN: 978-0-7851-4328-4 Trim size: oversized",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/e/e0/4bac3ad5d17c7.jpg",

  "price": 39.99

},
{
  "id": 37502,

  "title": "Marvels Vol. 1 (1994) #5",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",

  "price": 0

},
{
  "id": 37533,

  "title": "Magician: Apprentice Riftwar Saga (2010) #16",

  "description": "The siege of Crydee! As the massive Tsurani force descends on the castle, it is seemingly only a matter of time before the walls that have safeguarded Crydee fall. Can Prince Arutha save his people in time?",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",

  "price": 0

},
{
  "id": 22582,

  "title": "Civil War (Hardcover)",

  "description": "The landscape of the Marvel Universe is changing, and it's time to choose: Whose side are you on? A conflict has been brewing from more than a year, threatening to pit friend against friend, brother against brother - and all it will take is a single misstep to cost thousands their lives and ignite the fuse! As the war claims its first victims, no one is safe as teams, friendships and families begin to fall apart. The crossover that rewrites the rules, Civil War stars Spider-Man, the New Avengers, the Fantastic Four, the X-Men and the entirety of the Marvel pantheon! Collecting CIVIL WAR #1-7, MARVEL SPOTLIGHT: CIVIL WAR and CIVIL WAR SCRIPT BOOK ",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/8/c0/51dda501724ed.jpg",

  "price": 39.99

},
{
  "id": 59551,

  "title": "Spider-Man (2016) #6 (Anka Mighty Men Variant)",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",

  "price": 3.99

},
{
  "id": 1220,

  "title": "Amazing Spider-Man 500 Covers Slipcase - Book II (Trade Paperback)",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",

  "price": 0

},
{
  "id": 323,

  "title": "Ant-Man (2003) #2",

  "description": "Ant-Man digs deeper to find out who is leaking secret information that threatens our national security. 32 pgs./PARENTAL ADVISORY...$2.99",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/f/20/4bc69f33cafc0.jpg",

  "price": 2.99

},
{
  "id": 84155,

  "title": "Gwen Stacy (2020) #3",

  "description": "Captain George Stacy (A.K.A. Gwen's dad) has been implicated in a murder and it's up to Gwen to clear his name. With Green Goblin and the Crime Master involved, it's not going to be easy! Luckily, Gwen isn't doing it alone. She's got her friend Harry Osborn, and her boyfriend (?!) Darius Scanlon, helping her. Oh, and Harry's dad, Norman Osborn, is helping them out too! Forgot about that good news!",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/a/10/5e9e076819aec.jpg",

  "price": 3.99

},
{
  "id": 78701,

  "title": "Nebula (2020) #3",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/6/e0/5e86538d453bc.jpg",

  "price": 3.99

},
{
  "id": 34423,

  "title": "CIVIL WAR TPB (Trade Paperback)",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/d/00/6467ac5a9f9ea.jpg",

  "price": 24.99

},
{
  "id": 103099,

  "title": "GHOST RIDER VOL. 2: SHADOW COUNTRY TPB (Trade Paperback)",

  "description": "Collects GHOST RIDER (2022) #6-10 and GHOST RIDER: VENGEANCE FOREVER. Ghost Rider vs. Wolverine! 'Nuff said! There's somebody else out there like Johnny Blaze, somebody who knows what it means to suffer - to feel sickened by the pain they've inflicted on the world. His name is Logan. After the motorcycle rally at Hell's Backbone, Wolverine and Ghost Rider are brought together - but are they enemies or allies in the war against the shadow country? Meanwhile, there's a new splinter group within the F.B.I. charged with quelling the rise in supernatural activity, helmed by Agent Talia Warroad. And she's aiming to enlist the dangerous power of the Spirit of Vengeance! Plus: Still reeling from his time in Hayden's Falls, Blaze seeks the counsel of a seer named Necro the Tattooist, who uses his needle to bring dark truths to the surface about the legacy of the Ghost Rider!",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/3/50/643713dc3552f.jpg",

  "price": 19.99

},
{
  "id": 95083,

  "title": "HAWKEYE BY FRACTION & AJA: THE SAGA OF BARTON AND BISHOP TPB ALEX ROSS COVER (Trade Paperback)",

  "description": "Matt Fraction and David Aja's complete, acclaimed run in a single sharpshooting volume! With Young Avenger Kate Bishop by his side, Clint Barton continues his fight for justice - and good rooftop BBQs! He's hoping for some downtime from being one of Earth's Mightiest Heroes - but when the apartment building he's moved into, and the neighbors he's befriended, are threatened by a tracksuit-wearing, dog-abusing gang of Eastern European mobsters who say bro an awful lot, Clint must stand up and defend his new adopted family - any way he can. It's Hawkguy, Katie-Kate, Pizza Dog and friends against the Clown, Madame Masque, the Tracksuit Draculas and more in a fantastic, Eisner Award-winning reinvention of the arrowed Avenger! Bro, you read this book. Okay, bro? Collecting HAWKEYE (2012) #1-22 and ANNUAL #1, and YOUNG AVENGERS PRESENTS #6.",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/d/30/646bde99e82bd.jpg",

  "price": 44.99

},
{
  "id": 98392,

  "title": "SPIDER-PUNK: BATTLE OF THE BANNED TPB (Trade Paperback)",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/1/03/641a11269d625.jpg",

  "price": 15.99

},
{
  "id": 84510,

  "title": "SPIDER-MAN: SPIDER-VERSE - SPIDER-HAM GN-TPB (Trade Paperback)",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/4/10/6478aeb275836.jpg",

  "price": 9.99

},
{
  "id": 107299,

  "title": "Marvel Meow Infinity Comic (2022) #16",

  "description": "",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/6/d0/64663a97aa3f7.jpg",

  "price": 0

},
{
  "id": 106822,

  "title": "Alien (2023) #5",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",

  "price": 4.99

},
{
  "id": 106868,

  "title": "Alpha Flight (2023) #1",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",

  "price": 3.99

},
{
  "id": 103248,

  "title": "STAR WARS: RETURN OF THE JEDI - MAX REBO 1 (2023) #1",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",

  "price": 4.99

},
{
  "id": 105829,

  "title": "Captain Marvel: Dark Tempest (2023) #2",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",

  "price": 3.99

},
{
  "id": 102199,

  "title": "The Amazing Spider-Man (2022) #31",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",

  "price": 9.99

},
{
  "id": 103044,

  "title": "Star Wars (2020) #37",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",

  "price": 4.99

},
{
  "id": 107016,

  "title": "Children of the Vault (2023) #1",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",

  "price": 4.99

},
{
  "id": 104607,

  "title": "Red Goblin (2023) #7",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",

  "price": 3.99

},
{
  "id": 107264,

  "title": "Immortal X-Men (2022) #14",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",

  "price": 3.99

},
{
  "id": 105863,

  "title": "Guardians of the Galaxy (2023) #5",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",

  "price": 3.99

},
{
  "id": 109565,

  "title": "WEREWOLF BY NIGHT 33 FACSIMILE EDITION (2023) #33",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",

  "price": 3.99

},
{
  "id": 101516,

  "title": "Avengers (2023) #4",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",

  "price": 3.99

},
{
  "id": 104984,

  "title": "Silk (2023) #4",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",

  "price": 3.99

},
{
  "id": 103616,

  "title": "Miles Morales: Spider-Man (2022) #9",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",

  "price": 3.99

},
{
  "id": 105945,

  "title": "GHOST RIDER/WOLVERINE: WEAPONS OF VENGEANCE ALPHA 1 (2023) #1",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",

  "price": 4.99

},
{
  "id": 110287,

  "title": "SPIDER-MAN ANNUAL 1 [CHAOS] (2023) #1",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",

  "price": 4.99

},
{
  "id": 110211,

  "title": "Scarlet Witch (2023) #7",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",

  "price": 3.99

},
{
  "id": 108036,

  "title": "WHAT IF...? DARK: VENOM 1 (2023) #1",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",

  "price": 4.99

},
{
  "id": 96878,

  "title": "Star Wars: Yoda (2022) #10",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",

  "price": 4.99

},
{
  "id": 106817,

  "title": "Warlock: Rebirth (2023) #5",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",

  "price": 3.99

},
{
  "id": 102235,

  "title": "X-Men (2021) #25",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",

  "price": 5.99

},
{
  "id": 107252,

  "title": "Astonishing Iceman (2023) #1",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",

  "price": 3.99

},
{
  "id": 105853,

  "title": "Doctor Strange (2023) #6",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",

  "price": 3.99

},
{
  "id": 109054,

  "title": "Magneto (2023) #1",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",

  "price": 4.99

},
{
  "id": 108257,

  "title": "AMAZING SPIDER-MAN ANNUAL 1 (2023) #1",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",

  "price": 4.99

},
{
  "id": 98733,

  "title": "Fantastic Four (2022) #10",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",

  "price": 3.99

},
{
  "id": 106466,

  "title": "Death of the Venomverse (2023) #1",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",

  "price": 4.99

},
{
  "id": 105625,

  "title": "Moon Knight (2021) #26",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",

  "price": 3.99

},
{
  "id": 109975,

  "title": "STRANGE ACADEMY: MILES MORALES 1 (2023) #1",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",

  "price": 4.99

},
{
  "id": 106177,

  "title": "Star Wars: Dark Droids (2023) #1",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg",

  "price": 5.99

},
{
  "id": 107110,

  "title": "Danny Ketch: Ghost Rider (2023) #3",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/5/e0/64b04da6b8071.jpg",

  "price": 3.99

},
{
  "id": 108984,

  "title": "Incredible Hulk (2023) #2",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/b0/64b04da2eeb70.jpg",

  "price": 3.99

},
{
  "id": 107217,

  "title": "Ghost Rider (2022) #16",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/e/c0/64b04decddf01.jpg",

  "price": 3.99

},
{
  "id": 98459,

  "title": "Spider-Man: India (2023) #2",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/e0/64b04ddb46ce1.jpg",

  "price": 3.99

},
{
  "id": 106802,

  "title": "X-MEN: HELLFIRE GALA 2023 1 (2023) #1",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/6/40/64b04d6453dc6.jpg",

  "price": 8.99

},
{
  "id": 106442,

  "title": "Cult of Carnage: Misery (2023) #3",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/f0/64b04dba4bf74.jpg",

  "price": 3.99

},
{
  "id": 108135,

  "title": "WHAT IF…? DARK: SPIDER-GWEN 1 (2023) #1",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/f0/64b04dcf70bc5.jpg",

  "price": 4.99

},
{
  "id": 103952,

  "title": "I Am Iron Man (2023) #5",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/9/e0/64b04d997bcc8.jpg",

  "price": 3.99

},
{
  "id": 107586,

  "title": "Storm (2023) #3",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/3/70/64b04d84813d6.jpg",

  "price": 3.99

},
{
  "id": 93036,

  "title": "Deadpool (2022) #9",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/3/50/64b04db258546.jpg",

  "price": 3.99

},
{
  "id": 102198,

  "title": "The Amazing Spider-Man (2022) #30",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/5/f0/64b04e0f352b7.jpg",

  "price": 3.99

},
{
  "id": 109529,

  "title": "ALL-NEW MARVEL NOW! POINT ONE 1 FACSIMILE EDITION (2023) #1",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/3/10/64b04dc908413.jpg",

  "price": 7.99

},
{
  "id": 102985,

  "title": "Cosmic Ghost Rider (2023) #5",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/c/10/64b04dfc8b3b4.jpg",

  "price": 3.99

},
{
  "id": 106454,

  "title": "Hellcat (2023) #5",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/6/a0/64b04d9ad3866.jpg",

  "price": 3.99

},
{
  "id": 107240,

  "title": "Hallows' Eve (2023) #5",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/8/60/64b04da5d1e10.jpg",

  "price": 3.99

},
{
  "id": 102288,

  "title": "Wolverine (2020) #35",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/2/a0/64b04e13a3246.jpg",

  "price": 3.99

},
{
  "id": 97147,

  "title": "Ultimate Invasion (2023) #2",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/3/20/64b04d6459a04.jpg",

  "price": 5.99

},
{
  "id": 107414,

  "title": "Predator (2023) #5",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/c/d0/64b04d8d97ccf.jpg",

  "price": 3.99

},
{
  "id": 107503,

  "title": "Star Wars: Darth Vader - Black, White & Red (2023) #4",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/9/90/64b04d7fd6b92.jpg",

  "price": 4.99

},
{
  "id": 107445,

  "title": "She-Hulk (2022) #15",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/9/20/64b04d8a05dd7.jpg",

  "price": 3.99

},
{
  "id": 101515,

  "title": "Avengers (2023) #3",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/f/60/64b04dbf9caf6.jpg",

  "price": 3.99

},
{
  "id": 103632,

  "title": "The X-Cellent (2023) #5",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/5/a0/64b04d6450e0a.jpg",

  "price": 3.99

},
{
  "id": 103652,

  "title": "Venom (2021) #23",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/3/30/64b04d645370e.jpg",

  "price": 3.99

},
{
  "id": 101536,

  "title": "Invincible Iron Man (2022) #8",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/c/10/64b04d8b2b6ec.jpg",

  "price": 3.99

},
{
  "id": 107121,

  "title": "Daredevil & Echo (2023) #3",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/b0/64b04db8a01df.jpg",

  "price": 3.99

},
{
  "id": 104982,

  "title": "Silk (2023) #3",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/6/80/64b04d84a47f5.jpg",

  "price": 3.99

},
{
  "id": 108308,

  "title": "Avengers: Beyond (2023) #5",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/9/40/64b04e086dcf3.jpg",

  "price": 3.99

},
{
  "id": 107556,

  "title": "Star Wars: The Mandalorian Season 2 (2023) #2",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/3/00/64b04d645071d.jpg",

  "price": 4.99

},
{
  "id": 105862,

  "title": "Guardians of the Galaxy (2023) #4",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/60/64b04df11cc1b.jpg",

  "price": 3.99

},
{
  "id": 107187,

  "title": "Extreme Venomverse (2023) #5",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/f0/64b04defb22b7.jpg",

  "price": 4.99

},
{
  "id": 106821,

  "title": "Alien (2023) #4",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/b/a0/64b04e0a7be4a.jpg",

  "price": 4.99

},
{
  "id": 107357,

  "title": "Moon Knight: City of the Dead (2023) #1",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/e/60/64b04e1ec1cab.jpg",

  "price": 4.99

},
{
  "id": 103246,

  "title": "STAR WARS: RETURN OF THE JEDI - THE REBELLION 1 (2023) #1",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/6/20/64b04dd6611d7.jpg",

  "price": 4.99

},
{
  "id": 107697,

  "title": "X-Men Red (2022) #13",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/6/00/64b04dcb17356.jpg",

  "price": 3.99

},
{
  "id": 106957,

  "title": "Blade (2023) #1",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/a/03/64b04e0179874.jpg",

  "price": 4.99

},
{
  "id": 104799,

  "title": "Black Panther (2023) #2",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/6/20/64b04e24a578a.jpg",

  "price": 3.99

},
{
  "id": 107389,

  "title": "New Mutants Lethal Legion (2023) #5",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/6/10/64b04de73444a.jpg",

  "price": 3.99

},
{
  "id": 68236,

  "title": "Deadpool: Badder Blood (2023) #2",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/9/80/64b04df4c7a77.jpg",

  "price": 4.99

},
{
  "id": 105956,

  "title": "Spider-Gwen: Shadow Clones (2023) #5",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/5/b0/64b04dd71202f.jpg",

  "price": 3.99

},
{
  "id": 21839,

  "title": "Spider-Man: Kraven's Last Hunt (Trade Paperback)",

  "description": "Writer J.M. DeMatteis and artist Mike Zeck craft the ultimate tale of revenge in this groundbreaking and legendary collection! Kraven the Hunter has stalked and killed every animal known to man. But there is one beast that has eluded him. One quarry that has mocked him at every turn: the wall-crawling web-slinger known as Spider-Man. And to prove that he is the hero's master, he will pull on his costume and become him...after he shoots and buries him six feet under! Collecting WEB OF SPIDER-MAN #32-33",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/4/b0/51dc796798d92.jpg",

  "price": 14.99

},
{
  "id": 103079,

  "title": "Star Wars: Doctor Aphra (2020) #34",

  "description": "null",

  "images": "http://i.annihil.us/u/prod/marvel/i/mg/3/30/64b04dd947123.jpg",

  "price": 3.99

}]




//Datos cargados en primer petición con img como array
/* [{
    "id": 82967,
    "title": "Marvel Previews (2017)",
    "description": "",
    "images": [{
        "path": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available",
        "extension": "jpg"
      }],
    "prices": [
        {
          "type": "printPrice",
          "price": 0
        }
    ]
},
{
    "id": 59559,
    "title": "Uncanny Avengers (2015) #11 (Hetrick Mighty Men Variant)",
    "description": "",
    "images": [
        {
          "path": "http://i.annihil.us/u/prod/marvel/i/mg/9/03/56f465c004665",
          "extension": "jpg"
        }
      ],
    "prices": [
        {
          "type": "printPrice",
          "price": 4.95
        }
    ]
},
{
    "id": 58587,
    "title": "The Amazing Spider-Man (2015) #21 (Rivera Variant)",
    "description": "",
    "images": [
        {
            "path": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available",
            "extension": "jpg"
        }
      ],
    "prices": [
        {
          "type": "printPrice",
          "price": 7.95
        }
    ]
},
{
    "id": 27238,
    "title": "Wolverine Saga (2009) #7",
    "description": "",
    "images": [
        {
            "path": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available",
            "extension": "jpg"
        }
      ],
    "prices": [
        {
          "type": "printPrice",
          "price": 5.95
        }
    ]
},
{
    "id": 59181,
    "title": "Civil War II (2016) #6 (Gi Connecting Variant H)",
    "description": "",
    "images": [
        {
            "path": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available",
            "extension": "jpg"
        }
      ],
    "prices": [
        {
          "type": "printPrice",
          "price": 3.95
        }
    ]
},
{
    "id": 38008,
    "title": "Incredible Hulks: Dark Son (2010)",
    "description": "Bruce Banner is the Hulk once again, and far from being left alone, he's got a whole family of gamma-charged allies at his side. Son Skaar, daughter Lyra, cousin She-Hulk, friends A-Bomb and Korg, and wife Red She-Hulk or is that EX-wife? Meanwhile, a universe away, Hiro-Kala, the mysterious DARK SON of Hulk, rises to power on the planer K'ai. He has a plan for his long lost family members, and it involves a bigger smash than his father has ever made. Collecting INCREDIBLE HULKS #612-617.",

    "images": [
        {
            "path": "http://i.annihil.us/u/prod/marvel/i/mg/b/70/4cbda1eb06127",
            "extension": "jpg"
        }
      ],
    "prices": [
        {
          "type": "printPrice",
          "price": 10.00
        }
    ]
},
{
    "id": 37500,
    "title": "Marvels Vol. 1 (1994) #4",
    "description": "Bruce Banner is the Hulk once again, and far from being left alone, he's got a whole family of gamma-charged allies at his side. Son Skaar, daughter Lyra, cousin She-Hulk, friends A-Bomb and Korg, and wife Red She-Hulk or is that EX-wife? Meanwhile, a universe away, Hiro-Kala, the mysterious DARK SON of Hulk, rises to power on the planer K'ai. He has a plan for his long lost family members, and it involves a bigger smash than his father has ever made. Collecting INCREDIBLE HULKS #612-617.",

    "images": [
        {
            "path": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available",
            "extension": "jpg"
        }
      ],
    "prices": [
        {
          "type": "printPrice",
          "price": 10.00
        }
    ]
},
{
    "id": 59739,
    "title": "Civil War II: Kingpin (2016) #1 (Noto Character Variant)",
    "description": "",

    "images": [
        {
            "path": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available",
            "extension": "jpg"
        }
      ],
    "prices": [
        {
          "type": "printPrice",
          "price": 10.00
        }
    ]
},
{
    "id": 59739,
    "title": "Civil War II: Kingpin (2016) #1 (Noto Character Variant)",
    "description": "",

    "images": [
        {
            "path": "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available",
            "extension": "jpg"
        }
      ],
    "prices": [
        {
          "type": "printPrice",
          "price": 3.99
        }
    ]
},
{
    "id": 59548,
    "title": "Old Man Logan (2016) #8 (Albuquerque Mighty Men Variant)",
    "description": "Albuquerque Mighty Men Variant",

    "images": [
        {
            "path": "http://i.annihil.us/u/prod/marvel/i/mg/d/00/56f462d8f0eef",
            "extension": "jpg"
        }
      ],
    "prices": [
        {
          "type": "printPrice",
          "price": 2.99
        }
    ]
},
{
    "id": 59539,
    "title": "Doctor Strange (2015) #10 (Henderson Mighty Men Variant)",
    "description": "Henderson Mighty Men Variant",

    "images": [
        {
            "path": "http://i.annihil.us/u/prod/marvel/i/mg/d/00/56f45f95cdd1e",
            "extension": "jpg"
        }
      ],
    "prices": [
        {
          "type": "printPrice",
          "price": 2.99
        }
    ]
} ];*/





jsonData.forEach(item => {
  /* // Verifico si la propiedad "images" existe y contiene al menos un elemento
  if (item.images && item.images.length > 0) {
    const path = item.images[0].path;
    const extension = item.images[0].extension;
    item.images = `${path}.${extension}`;
  } else {
    // Si "images" no existe o está vacía, asigno un valor predeterminado o null
    item.images = null;
  }
 
  // Verifico si la propiedad "prices" existe y contiene al menos un elemento
  if (item.prices && item.prices.length > 0) {
    item.prices = item.prices[0].price;
  } else {
    // Si "prices" no existe o está vacía, asigno un valor predeterminado o null
    item.prices = null;
  } */

  // Agrego la propiedad "stock" con un número aleatorio positivo entre 1 y 100
  item.stock = Math.floor(Math.random() * 100) + 1;
});

const productos = jsonData;
export default productos; //Exporto producto con stock 


