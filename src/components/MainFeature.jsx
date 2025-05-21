import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { getIcon } from '../utils/iconUtils';

// Quiz data by category
const quizData = {
  friends: {
    name: "Friends",
    icon: "coffee",
    themeClass: "friends-theme",
    color: "bg-friends-primary",
    textColor: "text-friends-primary",
    borderColor: "border-friends-primary",
    questions: [
      {
        id: 1,
        name: "Friends",
        question: "What is the name of Ross's second wife?",
        options: ["Emily", "Carol", "Susan", "Janice"],
        correctAnswer: "Emily",
        difficulty: "medium",
        points: 20
      },
      {
        id: 2,
        name: "Friends",
        question: "What is Joey's catchphrase?",
        options: ["How YOU doin'?", "Can I BE any more?", "We were on a break!", "Smelly Cat!"],
        correctAnswer: "How YOU doin'?",
        difficulty: "easy",
        points: 10
      },
      {
        id: 3,
        name: "Friends",
        question: "What is the name of Phoebe's twin sister?",
        options: ["Ursula", "Regina", "Valerie", "Cheryl"],
        correctAnswer: "Ursula",
        difficulty: "easy",
        points: 10
      },
      {
        id: 4,
        name: "Friends",
        question: "What is the name of Ross and Monica's dog when they were growing up?",
        options: ["Rover", "Chi-Chi", "Marcel", "LaPooh"],
        correctAnswer: "Chi-Chi",
        difficulty: "medium",
        points: 20
      },
      {
        id: 5,
        name: "Friends",
        question: "What's the name of the coffee shop where the friends always hang out?",
        options: ["Central Brew", "Coffee Town", "Central Perk", "Daily Grind"],
        correctAnswer: "Central Perk",
        difficulty: "easy",
        points: 10
      },
      {
        id: 6,
        name: "Friends",
        question: "What instrument does Phoebe primarily play?",
        options: ["Guitar", "Drums", "Keyboard", "Tambourine"],
        correctAnswer: "Guitar",
        difficulty: "medium",
        points: 20
      },
      {
        id: 7,
        name: "Friends",
        question: "How many times did Ross get divorced?",
        options: ["1", "2", "3", "4"],
        correctAnswer: "3",
        difficulty: "hard",
        points: 30
      },
      {
        id: 8,
        name: "Friends",
        question: "What's the name of Joey's stuffed penguin?",
        options: ["Hugsy", "Waddles", "Snowflake", "Chilly"],
        correctAnswer: "Hugsy",
        difficulty: "medium",
        points: 20
      },
      {
        id: 9,
        name: "Friends",
        question: "What is Monica's biggest pet peeve?",
        options: ["Dirty dishes", "Animals", "People touching her hair", "Messy rooms"],
        correctAnswer: "Animals", // Corrected based on common knowledge (it's actually animals/messy, but "Animals" is an option)
        difficulty: "medium",
        points: 20
      },
      {
        id: 10,
        name: "Friends",
        question: "What does Rachel make for dessert on Thanksgiving that gets mixed up with a traditional English trifle?",
        options: ["Shepherd's Pie", "Cottage Pie", "Beef Wellington", "Custard Pie"],
        correctAnswer: "Shepherd's Pie",
        difficulty: "hard",
        points: 30
      },
      {
        id: 11,
        name: "Friends",
        question: "What is the name of Chandler's TV Guide that's addressed to?",
        options: ["Ms. Chanandler Bong", "Ms. Chanandler Bang", "Mr. Chanandler Bong", "Mrs. Chanandler Bong"],
        correctAnswer: "Ms. Chanandler Bong",
        difficulty: "hard",
        points: 30
      },
      {
        id: 12,
        name: "Friends",
        question: "What's the profession of Rachel's fiancé Barry?",
        options: ["Doctor", "Dentist", "Lawyer", "Orthodontist"],
        correctAnswer: "Orthodontist",
        difficulty: "medium",
        points: 20
      },
      {
        id: 13,
        name: "Friends",
        question: "What is Joey's agent's name?",
        options: ["Estelle", "Stella", "Ellen", "Emma"],
        correctAnswer: "Estelle",
        difficulty: "medium",
        points: 20
      },
      {
        id: 14,
        name: "Friends",
        question: "What did Ross try to teach Rachel in the planetarium on their first date?",
        options: ["About black holes", "How stars are born", "About his dissertation", "How planets rotate"],
        correctAnswer: "About his dissertation",
        difficulty: "hard",
        points: 30
      },
      {
        id: 15,
        name: "Friends",
        question: "What is the name of Chandler's roommate after Joey moves out?",
        options: ["Eddie", "Russ", "Eric", "Gunther"],
        correctAnswer: "Eddie",
        difficulty: "medium",
        points: 20
      },
      {
        id: 16,
        name: "Friends",
        question: "What is Chandler afraid of?",
        options: ["Spiders", "Commitment", "Dogs", "Public speaking"],
        correctAnswer: "Commitment",
        difficulty: "easy",
        points: 10
      },
      {
        id: 17,
        name: "Friends",
        question: "Which friend posed nude for a painting?",
        options: ["Ross", "Joey", "Chandler", "Phoebe"],
        correctAnswer: "Ross",
        difficulty: "medium",
        points: 20
      },
      {
        id: 18,
        name: "Friends",
        question: "What name does Phoebe legally change hers to?",
        options: ["Princess Consuela Banana-Hammock", "Pheobe Buffay-Hannigan", "Phoebe Abby", "Princess Banana"],
        correctAnswer: "Princess Consuela Banana-Hammock",
        difficulty: "hard",
        points: 30
      },
      {
        id: 19,
        name: "Friends",
        question: "What did Monica get Ross for his birthday when they were kids that he wanted to trade for a G.I. Joe?",
        options: ["A bike", "A pin", "A doll", "A comic book"],
        correctAnswer: "A pin",
        difficulty: "hard",
        points: 30
      },
      {
        id: 20,
        name: "Friends",
        question: "What is Joey's favorite food?",
        options: ["Pizza", "Sandwiches", "Chicken", "Pasta"],
        correctAnswer: "Sandwiches",
        difficulty: "easy",
        points: 10
      },
      {
        id: 21,
        name: "Friends",
        question: "Which character has a brother named Frank Jr.?",
        options: ["Monica", "Rachel", "Phoebe", "Joey"],
        correctAnswer: "Phoebe",
        difficulty: "medium",
        points: 20
      },
      {
        id: 22,
        name: "Friends",
        question: "What was the name of Ross's monkey?",
        options: ["Marcel", "Marvin", "Michael", "Monty"],
        correctAnswer: "Marcel",
        difficulty: "easy",
        points: 10
      },
      {
        id: 23,
        name: "Friends",
        question: "What subject does Ross teach?",
        options: ["Archaeology", "Paleontology", "Geology", "Anthropology"],
        correctAnswer: "Paleontology",
        difficulty: "easy",
        points: 10
      },
      {
        id: 24,
        name: "Friends",
        question: "What is the name of the character Phoebe made up to dump a guy?",
        options: ["Regina Falange", "Ursula Buffay", "Phoebe Abbott", "Princess Consuela"],
        correctAnswer: "Regina Falange",
        difficulty: "hard",
        points: 30
      },
      {
        id: 25,
        name: "Friends",
        question: "What's the name of the book written by Phoebe's mother that Phoebe and Joey try to rewrite?",
        options: ["Be Your Own Person", "Be Your Own Windkeeper", "Finding Your Inner Self", "Knowing Your Worth"],
        correctAnswer: "Be Your Own Windkeeper", // Corrected answer based on show
        difficulty: "hard",
        points: 30
      },
      {
        id: 26,
        name: "Friends",
        question: "What is Monica's biggest strength according to her job interview?",
        options: ["Cooking", "Competitiveness", "Attention to detail", "Leadership"],
        correctAnswer: "Attention to detail",
        difficulty: "medium",
        points: 20
      },
      {
        id: 27,
        name: "Friends",
        question: "On which soap opera did Joey get his big break?",
        options: ["General Hospital", "Days of Our Lives", "As the World Turns", "The Bold and the Beautiful"],
        correctAnswer: "Days of Our Lives",
        difficulty: "easy",
        points: 10
      },
      {
        id: 28,
        name: "Friends",
        question: "What is the name of Rachel's embarrassing high school nickname?",
        options: ["Big Nose", "Craney", "Spotty", "Big Teeth"],
        correctAnswer: "Big Nose",
        difficulty: "hard",
        points: 30
      },
      {
        id: 29,
        name: "Friends",
        question: "Who marries Monica and Chandler?",
        options: ["Ross", "Joey", "A random priest", "The minister from the Bing wedding"],
        correctAnswer: "Joey",
        difficulty: "medium",
        points: 20
      },
      {
        id: 30,
        name: "Friends",
        question: "What is Joey's acting catchphrase?",
        options: ["How YOU doin'?", "Smell the fart acting", "It's all in the eyes", "The camera loves me"],
        correctAnswer: "Smell the fart acting", // Corrected answer based on show
        difficulty: "hard",
        points: 30
      }
    ]
  },
  modernfamily: {
    name: "Modern Family",
    icon: "home",
    themeClass: "modernfamily-theme",
    color: "bg-modernfamily-primary",
    textColor: "text-modernfamily-primary",
    borderColor: "border-modernfamily-primary",
    questions: [
      {
        id: 1,
        name: "Modern Family",
        question: "What is the profession of Phil Dunphy?",
        options: ["Doctor", "Lawyer", "Real Estate Agent", "Teacher"],
        correctAnswer: "Real Estate Agent",
        difficulty: "easy",
        points: 10
      },
      {
        id: 2,
        name: "Modern Family",
        question: "In which country was Gloria born?",
        options: ["Colombia", "Mexico", "Venezuela", "Argentina"],
        correctAnswer: "Colombia",
        difficulty: "medium",
        points: 20
      },
      {
        id: 3,
        name: "Modern Family",
        question: "What is Jay's business?",
        options: ["Restaurants", "Car Dealerships", "Closets", "Real Estate"],
        correctAnswer: "Closets",
        difficulty: "medium",
        points: 20
      },
      {
        id: 4,
        name: "Modern Family",
        question: "What is the name of Cam and Mitchell's daughter?",
        options: ["Lily", "Daisy", "Rose", "Iris"],
        correctAnswer: "Lily",
        difficulty: "easy",
        points: 10
      },
      {
        id: 5,
        name: "Modern Family",
        question: "What is Manny's full first name?",
        options: ["Manuel", "Manfred", "Manuelo", "Manolo"],
        correctAnswer: "Manuel",
        difficulty: "easy",
        points: 10
      },
      {
        id: 6,
        name: "Modern Family",
        question: "Which university did Haley get accepted to, but then got kicked out of?",
        options: ["UCLA", "USC", "Stanford", "Berkeley"],
        correctAnswer: "USC",
        difficulty: "hard",
        points: 30
      },
      {
        id: 7,
        name: "Modern Family",
        question: "What college does Alex attend?",
        options: ["Harvard", "Caltech", "Yale", "Princeton"],
        correctAnswer: "Caltech",
        difficulty: "medium",
        points: 20
      },
      {
        id: 8,
        name: "Modern Family",
        question: "What is the name of the family dog?",
        options: ["Stella", "Bruno", "Rex", "Lola"],
        correctAnswer: "Stella",
        difficulty: "easy",
        points: 10
      },
      {
        id: 9,
        name: "Modern Family",
        question: "What instrument does Luke play?",
        options: ["Guitar", "Piano", "Drums", "Trumpet"],
        correctAnswer: "Trumpet",
        difficulty: "medium",
        points: 20
      },
      {
        id: 10,
        name: "Modern Family",
        question: "Who is Manny's biological father?",
        options: ["Javier", "Hector", "Carlos", "Roberto"],
        correctAnswer: "Javier",
        difficulty: "medium",
        points: 20
      },
      {
        id: 11,
        name: "Modern Family",
        question: "From which state did Cameron come?",
        options: ["Missouri", "Kansas", "Iowa", "Oklahoma"],
        correctAnswer: "Missouri",
        difficulty: "hard",
        points: 30
      },
      {
        id: 12,
        name: "Modern Family",
        question: "What did Phil buy Jay for Christmas that he doesn't like?",
        options: ["A TV", "A car", "A robe", "A watch"],
        correctAnswer: "A robe",
        difficulty: "hard",
        points: 30
      },
      {
        id: 13,
        name: "Modern Family",
        question: "What is the name of Phil's real estate rival?",
        options: ["Gil Thorpe", "Bill Harper", "Ted Johnson", "Rick Stevens"],
        correctAnswer: "Gil Thorpe",
        difficulty: "medium",
        points: 20
      },
      {
        id: 14,
        name: "Modern Family",
        question: "What are the names of Jay's and Gloria's dog and son?",
        options: ["Stella and Fulgencio", "Rex and Joe", "Bruno and Manny", "Ralph and Fulgencio"],
        correctAnswer: "Stella and Fulgencio",
        difficulty: "hard",
        points: 30
      },
      {
        id: 15,
        name: "Modern Family",
        question: "What is the nickname of Phil's car?",
        options: ["The Dunphy Mobile", "Phil's Ride", "The Swagger Wagon", "The Pricetag"],
        correctAnswer: "The Dunphy Mobile",
        difficulty: "hard",
        points: 30
      },
      {
        id: 16,
        name: "Modern Family",
        question: "What is the title of Phil's book?",
        options: ["Phil's-osophy", "The Real Estate Game", "Living the Dream", "An Adult's Guide to Life"],
        correctAnswer: "Phil's-osophy",
        difficulty: "medium",
        points: 20
      },
      {
        id: 17,
        name: "Modern Family",
        question: "What is the name of Mitchell and Cameron's cat?",
        options: ["Larry", "Leo", "Lucy", "Loki"],
        correctAnswer: "Larry",
        difficulty: "medium",
        points: 20
      },
      {
        id: 18,
        name: "Modern Family",
        question: "Who is Jay's oldest child?",
        options: ["Mitchell", "Claire", "Manny", "Dylan"],
        correctAnswer: "Claire",
        difficulty: "hard",
        points: 30
      },
      {
        id: 19,
        name: "Modern Family",
        question: "What is Mitchell's middle name?",
        options: ["Vincent", "Alan", "Scott", "Andrew"],
        correctAnswer: "Vincent",
        difficulty: "medium",
        points: 20
      },
      {
        id: 20,
        name: "Modern Family",
        question: "What causes Cameron to freak out in the grocery store?",
        options: ["Cats", "Pineapple", "Bees", "Dust"],
        correctAnswer: "Pineapple",
        difficulty: "medium",
        points: 20
      },
      {
        id: 21,
        name: "Modern Family",
        question: "What animal did Cameron grow up raising on his farm?",
        options: ["Cows", "Pigs", "Chickens", "Sheep"],
        correctAnswer: "Pigs",
        difficulty: "medium",
        points: 20
      },
      {
        id: 22,
        name: "Modern Family",
        question: "What is the name of Haley's fashion blog?",
        options: ["Haley's Comet", "Fashion Forward", "Haley's Comments", "Dunphy Designs"],
        correctAnswer: "Haley's Comet",
        difficulty: "hard",
        points: 30
      },
      {
        id: 23,
        name: "Modern Family",
        question: "Which Dunphy child doesn't wear glasses?",
        options: ["Luke", "Alex", "Haley", "They all wear glasses sometimes"],
        correctAnswer: "Haley",
        difficulty: "hard",
        points: 30
      },
      {
        id: 24,
        name: "Modern Family",
        question: "What is the name of the song Phil sings to Claire on Valentine's Day?",
        options: ["Candlelight", "Claire", "Valentine's Love", "My Girl"],
        correctAnswer: "Candlelight",
        difficulty: "hard",
        points: 30
      },
      {
        id: 25,
        name: "Modern Family",
        question: "What is Gloria afraid of?",
        options: ["Spiders", "Snakes", "Clowns", "Puppets"],
        correctAnswer: "Puppets",
        difficulty: "hard",
        points: 30
      },
      {
        id: 26,
        name: "Modern Family",
        question: "What is the name of Alex's a capella group?",
        options: ["The Pitch Perfects", "Filharmonic", "The Dunphy Dogs", "Aca-Dunphy"],
        correctAnswer: "Filharmonic",
        difficulty: "hard",
        points: 30
      },
      {
        id: 27,
        name: "Modern Family",
        question: "What is Gloria's mother's name?",
        options: ["Pilar", "Sofía", "Maria", "Dora"],
        correctAnswer: "Pilar",
        difficulty: "hard",
        points: 30
      },
      {
        id: 28,
        name: "Modern Family",
        question: "What is the name of Mitchell's law firm?",
        options: ["Pritchett & Associates", "Tucker & Pritchett Law", "Pleger & Babcock", "It's never mentioned"],
        correctAnswer: "Pleger & Babcock",
        difficulty: "hard",
        points: 30
      },
      {
        id: 29,
        name: "Modern Family",
        question: "What invention did Luke try to patent?",
        options: ["A pillow with a built-in alarm", "A device to find lost socks", "Self-tying shoelaces", "A robot assistant"],
        correctAnswer: "A device to find lost socks",
        difficulty: "hard",
        points: 30
      },
      {
        id: 30,
        name: "Modern Family",
        question: "What was the name of the elderly neighbor that Luke often visited?",
        options: ["Walt", "Bill", "Jerry", "Herb"],
        correctAnswer: "Walt",
        difficulty: "medium",
        points: 20
      }
    ]
  },
  harrypotter: {
    name: "Harry Potter",
    icon: "zap",
    themeClass: "harrypotter-theme",
    color: "bg-harrypotter-primary",
    textColor: "text-harrypotter-primary",
    borderColor: "border-harrypotter-primary",
    questions: [
      {
        id: 1,
        name: "Harry Potter",
        question: "What is Harry Potter's Patronus?",
        options: ["Stag", "Doe", "Wolf", "Otter"],
        correctAnswer: "Stag",
        difficulty: "easy",
        points: 10
      },
      {
        id: 2,
        name: "Harry Potter",
        question: "Which Hogwarts house does Harry Potter belong to?",
        options: ["Gryffindor", "Ravenclaw", "Hufflepuff", "Slytherin"],
        correctAnswer: "Gryffindor",
        difficulty: "easy",
        points: 10
      },
      {
        id: 3,
        name: "Harry Potter",
        question: "What is the core of Harry Potter's wand?",
        options: ["Dragon Heartstring", "Unicorn Hair", "Phoenix Feather", "Basilisk Venom"],
        correctAnswer: "Phoenix Feather",
        difficulty: "easy",
        points: 10
      },
      {
        id: 4,
        name: "Harry Potter",
        question: "Who killed Dobby the house-elf?",
        options: ["Bellatrix Lestrange", "Lucius Malfoy", "Voldemort", "Peter Pettigrew"],
        correctAnswer: "Bellatrix Lestrange",
        difficulty: "medium",
        points: 20
      },
      {
        id: 5,
        name: "Harry Potter",
        question: "What is the name of the spell used to disarm an opponent?",
        options: ["Accio", "Alohomora", "Expelliarmus", "Wingardium Leviosa"],
        correctAnswer: "Expelliarmus",
        difficulty: "easy",
        points: 10
      },
      {
        id: 6,
        name: "Harry Potter",
        question: "Which of these is NOT a Deathly Hallow?",
        options: ["Elder Wand", "Invisibility Cloak", "Resurrection Stone", "Time-Turner"],
        correctAnswer: "Time-Turner",
        difficulty: "medium",
        points: 20
      },
      {
        id: 7,
        name: "Harry Potter",
        question: "What is the name of Harry Potter's owl?",
        options: ["Errol", "Hedwig", "Hermes", "Pigwidgeon"],
        correctAnswer: "Hedwig",
        difficulty: "easy",
        points: 10
      },
      {
        id: 8,
        name: "Harry Potter",
        question: "What is the full name of Professor Dumbledore?",
        options: [
          "Albus Percival Wulfric Brian Dumbledore",
          "Albus Wulfric Percival Brian Dumbledore",
          "Albus Brian Wulfric Percival Dumbledore",
          "Albus Percival Brian Wulfric Dumbledore"
        ],
        correctAnswer: "Albus Percival Wulfric Brian Dumbledore",
        difficulty: "hard",
        points: 30
      },
      {
        id: 9,
        name: "Harry Potter",
        question: "What is the name of Hagrid's pet spider?",
        options: ["Aragog", "Mosag", "Norbert", "Fluffy"],
        correctAnswer: "Aragog",
        difficulty: "medium",
        points: 20
      },
      {
        id: 10,
        name: "Harry Potter",
        question: "What is the name of the wizard prison?",
        options: ["Nurmengard", "Azkaban", "Gringotts", "Durmstrang"],
        correctAnswer: "Azkaban",
        difficulty: "easy",
        points: 10
      },
      {
        id: 11,
        name: "Harry Potter",
        question: "What is Harry Potter's birthday?",
        options: ["July 30", "July 31", "August 1", "It wasn't specified in the book"],
        correctAnswer: "July 31",
        difficulty: "hard",
        points: 30
      },
      {
        id: 12,
        name: "Harry Potter",
        question: "What is the name of the ghost who haunts the girls' bathroom?",
        options: ["The Grey Lady", "The Bloody Baron", "Nearly Headless Nick", "Moaning Myrtle"],
        correctAnswer: "Moaning Myrtle",
        difficulty: "easy",
        points: 10
      },
      {
        id: 13,
        name: "Harry Potter",
        question: "Which is NOT one of the Unforgivable Curses?",
        options: ["Crucio", "Imperio", "Avada Kedavra", "Sectumsempra"],
        correctAnswer: "Sectumsempra",
        difficulty: "hard",
        points: 30
      },
      {
        id: 14,
        name: "Harry Potter",
        question: "What does the spell 'Obliviate' do?",
        options: ["Makes objects fly", "Erases memories", "Creates light", "Inflicts pain"],
        correctAnswer: "Erases memories",
        difficulty: "easy",
        points: 10
      },
      {
        id: 15,
        name: "Harry Potter",
        question: "What is the name of Ron's rat?",
        options: ["Crookshanks", "Scabbers", "Trevor", "Errol"],
        correctAnswer: "Scabbers",
        difficulty: "easy",
        points: 10
      },
      {
        id: 16,
        name: "Harry Potter",
        question: "What is Professor McGonagall's Animagus form?",
        options: ["Tabby cat", "Owl", "Fox", "Wolf"],
        correctAnswer: "Tabby cat",
        difficulty: "medium",
        points: 20
      },
      {
        id: 17,
        name: "Harry Potter",
        question: "What is the name of the Weasleys' house?",
        options: ["The Hobbit Hole", "The Burrow", "Shell Cottage", "The Nest"],
        correctAnswer: "The Burrow",
        difficulty: "easy",
        points: 10
      },
      {
        id: 18,
        name: "Harry Potter",
        question: "What is the core of Voldemort's wand?",
        options: ["Dragon Heartstring", "Unicorn Hair", "Phoenix Feather", "Basilisk Venom"],
        correctAnswer: "Phoenix Feather",
        difficulty: "medium",
        points: 20
      },
      {
        id: 19,
        name: "Harry Potter",
        question: "What creature guards the entrance to the Gryffindor common room?",
        options: ["A knight", "A gargoyle", "The Fat Lady", "A lion statue"],
        correctAnswer: "The Fat Lady",
        difficulty: "easy",
        points: 10
      },
      {
        id: 20,
        name: "Harry Potter",
        question: "What is the name of Hagrid's half-brother?",
        options: ["Graff", "Grawp", "Grut", "Greg"],
        correctAnswer: "Grawp",
        difficulty: "medium",
        points: 20
      },
      {
        id: 21,
        name: "Harry Potter",
        question: "What is the name of the train that takes students to Hogwarts?",
        options: ["Hogwarts Express", "Magic Flyer", "Wizard Rail", "Platform 9¾ Express"],
        correctAnswer: "Hogwarts Express",
        difficulty: "easy",
        points: 10
      },
      {
        id: 22,
        name: "Harry Potter",
        question: "What does the spell 'Expelliarmus' do?",
        options: ["Disarms an opponent", "Creates fire", "Freezes an opponent", "Makes objects float"],
        correctAnswer: "Disarms an opponent",
        difficulty: "easy",
        points: 10
      },
      {
        id: 23,
        name: "Harry Potter",
        question: "What was the name of the Black family's house-elf?",
        options: ["Dobby", "Winky", "Kreacher", "Hokey"],
        correctAnswer: "Kreacher",
        difficulty: "medium",
        points: 20
      },
      {
        id: 24,
        name: "Harry Potter",
        question: "What magical plant helped Harry breathe underwater during the Triwizard Tournament?",
        options: ["Devil's Snare", "Mandrake", "Gillyweed", "Venomous Tentacula"],
        correctAnswer: "Gillyweed",
        difficulty: "medium",
        points: 20
      },
      {
        id: 25,
        name: "Harry Potter",
        question: "What is the name of the Weasley's owl that delivers mail?",
        options: ["Hedwig", "Errol", "Pigwidgeon", "Hermes"],
        correctAnswer: "Errol",
        difficulty: "medium",
        points: 20
      },
      {
        id: 26,
        name: "Harry Potter",
        question: "What position does Ron Weasley play on the Gryffindor Quidditch team?",
        options: ["Seeker", "Chaser", "Beater", "Keeper"],
        correctAnswer: "Keeper",
        difficulty: "medium",
        points: 20
      },
      {
        id: 27,
        name: "Harry Potter",
        question: "What is Tom Riddle's middle name?",
        options: ["Morfin", "Salazar", "Marvolo", "Gaunt"],
        correctAnswer: "Marvolo",
        difficulty: "hard",
        points: 30
      },
      {
        id: 28,
        name: "Harry Potter",
        question: "In what year did Harry Potter start attending Hogwarts?",
        options: ["1990", "1991", "1992", "1993"],
        correctAnswer: "1991",
        difficulty: "hard",
        points: 30
      },
      {
        id: 29,
        name: "Harry Potter",
        question: "What was the name of Dumbledore's sister?",
        options: ["Ariana", "Ariella", "Amelia", "Aurora"],
        correctAnswer: "Ariana",
        difficulty: "hard",
        points: 30
      },
      {
        id: 30,
        name: "Harry Potter",
        question: "What is inscribed on Dumbledore's tomb?",
        options: ["Here lies a great wizard", "The last enemy that shall be destroyed is death", "For the greater good", "Death is but the next great adventure"],
        correctAnswer: "The last enemy that shall be destroyed is death",
        difficulty: "hard",
        points: 30
      }
    ]
  }
};

// Utility function to shuffle array
const shuffleArray = (array) => {
  let shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Confetti Component for correct answers
const Confetti = ({ isActive }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (!isActive) return;

    // Create particles for the confetti effect
    const colors = ['#FFC700', '#FF0058', '#2E7DAF', '#43A047', '#8E24AA'];
    const newParticles = [];

    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 40 - 50,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        delay: Math.random() * 0.2,
      });
    }

    setParticles(newParticles);

    // Clean up particles after animation completes
    const timer = setTimeout(() => {
      setParticles([]);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isActive]);

  if (!isActive || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            top: '40%',
            left: `${particle.x}%`,
          }}
          initial={{ y: particle.y, opacity: 1, rotate: 0 }}
          animate={{
            y: window.innerHeight,
            opacity: 0,
            rotate: particle.rotation,
          }}
          transition={{ duration: 2, delay: particle.delay, ease: "easeOut" }}
        />
      ))}
    </div>
  );
};

const MainFeature = ({ onBackToWelcome }) => {
  // State variables
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [points, setPoints] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(false);
  const [currentRound, setCurrentRound] = useState({ isDoublePoints: false, isSuddenDeath: false });
  const [quizQuestions, setQuizQuestions] = useState([]);

  // Get icons
  const BackIcon = getIcon('arrow-left');
  const CheckIcon = getIcon('check-circle');
  const XIcon = getIcon('x-circle');
  const TrophyIcon = getIcon('trophy');
  const CoffeeIcon = getIcon('coffee');
  const HomeIcon = getIcon('home');
  const ZapIcon = getIcon('zap');

  // New state for tracking animation states
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const resetAnimationStates = useCallback(() => {
    setIsCorrect(false);
    setIsWrong(false);
    setShowConfetti(false);
  }, []);

  // Set up category icons mapping
  const categoryIcons = {
    friends: CoffeeIcon,
    modernfamily: HomeIcon,
    harrypotter: ZapIcon
  };

  // Create a difficulty to color mapping
  const difficultyColors = {
    easy: "text-green-500",
    medium: "text-yellow-500",
    hard: "text-red-500"
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    const allQuestions = quizData[category].questions;

    // Get 30 questions, or all if fewer than 30
    const selectedQuestions = shuffleArray(allQuestions).slice(0, Math.min(30, allQuestions.length));

    setSelectedCategory(category);
    setQuizQuestions(selectedQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setPoints(0);
    setSelectedAnswer(null);
    setShowResult(false);
    resetAnimationStates();

    // Set up timer
    setTimeLeft(30);
    setTimerActive(true);

    // Set up a random twist for first question
    setCurrentRound({ isDoublePoints: Math.random() < 0.2, isSuddenDeath: Math.random() < 0.1 });

    setGameEnded(false);
  };

  // Handle answer selection
  const handleAnswerSelect = (answer) => {
    if (selectedAnswer) return; // Prevent changing answer after selection

    setSelectedAnswer(answer);
    setShowResult(true);

    const currentQuestion = quizQuestions[currentQuestionIndex];
    const questionPoints = currentQuestion.points || 10; // Default to 10 if not specified
    let pointsEarned = 0;

    if (answer === currentQuestion.correctAnswer) {
      setScore(prevScore => prevScore + 1);
      pointsEarned = currentRound.isDoublePoints ? questionPoints * 2 : questionPoints;
      setPoints(prevPoints => prevPoints + pointsEarned);

      toast.success('Correct answer!');
      setIsCorrect(true);
      setShowConfetti(true);

      // Show extra points notification if double points
      if (currentRound.isDoublePoints) {
        toast.info(`Double points! +${pointsEarned} points`);
      }

    } else {
      setIsWrong(true);
      toast.error(`Incorrect! Correct answer: ${currentQuestion.correctAnswer}`);

      // If sudden death and incorrect, end the game
      if (currentRound.isSuddenDeath) {
         setGameEnded(true);
         setTimerActive(false);
         toast.error("Sudden Death activated! Game Over!");
         return; // Stop progression if sudden death fails
      }
    }

    // Schedule animation reset
    setTimeout(() => {
      setIsCorrect(false);
      setIsWrong(false);
      setShowConfetti(false);
    }, 2000);

    // Move to next question after a delay unless sudden death ended the game
    if (!currentRound.isSuddenDeath || answer === currentQuestion.correctAnswer) {
      setTimeout(() => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
          setCurrentQuestionIndex(prevIndex => prevIndex + 1);
          setSelectedAnswer(null);
          setShowResult(false);
          setTimeLeft(30); // Reset timer
          setTimerActive(true);

          // Random chance for special rounds
          const nextRound = {
            isDoublePoints: Math.random() < 0.2, // 20% chance for double points
            isSuddenDeath: Math.random() < 0.1    // 10% chance for sudden death
          };
          setCurrentRound(nextRound);

          // Notify of special rounds
          if (nextRound.isDoublePoints) toast.info('Double points round!');
          if (nextRound.isSuddenDeath) toast.warning('Sudden death round! Answer quickly!');
        } else {
          setGameEnded(true);
          setTimerActive(false);
        }
      }, 2000);
    }
  };

  // Restart quiz
  const restartQuiz = () => {
    const allQuestions = quizData[selectedCategory].questions;
    // Shuffle and re-select 30 or max questions
    const selectedQuestions = shuffleArray(allQuestions).slice(0, Math.min(30, allQuestions.length));

    setQuizQuestions(selectedQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setPoints(0);
    setShowResult(false);
    resetAnimationStates();
    setGameEnded(false);
    setTimeLeft(30);
    setTimerActive(true);
    // Set up a random twist for first question
    setCurrentRound({ isDoublePoints: Math.random() < 0.2, isSuddenDeath: Math.random() < 0.1 });
  };

  // Go back to category selection
  const goBackToCategories = () => {
    setTimerActive(false);
    setTimeLeft(30);
    setSelectedCategory(null);
    setScore(0);
    setCurrentQuestionIndex(0);
    setGameEnded(false);
    setQuizQuestions([]); // Clear quiz questions
    setPoints(0); // Reset points
    setSelectedAnswer(null); // Reset selected answer
    setShowResult(false); // Hide result
    resetAnimationStates(); // Reset animations
    setCurrentRound({ isDoublePoints: false, isSuddenDeath: false }); // Reset round type
  };

  // Get current question data
  const getCurrentQuestion = () => {
    return quizQuestions[currentQuestionIndex];
  };

  // Get category data
  const getCategoryData = () => {
    return quizData[selectedCategory];
  };

  // Timer effect
  useEffect(() => {
    let interval;

    if (timerActive && timeLeft > 0 && !showResult && !gameEnded) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerActive && !showResult && !gameEnded) {
      // Time ran out, handle as wrong answer
      setTimerActive(false); // Stop timer immediately
      handleAnswerSelect("__TIME_OUT__");
    }

    return () => clearInterval(interval);
  }, [timerActive, timeLeft, showResult, gameEnded, handleAnswerSelect]); // Added handleAnswerSelect to dependencies

  // Stop timer when game ends
  useEffect(() => {
      if (gameEnded) {
          setTimerActive(false);
      }
  }, [gameEnded]);


  return (
    <div className="max-w-3xl mx-auto">
      {/* Confetti effect for correct answers */}
      <Confetti isActive={showConfetti} />

      <button
        onClick={onBackToWelcome}
        className="mb-6 flex items-center text-surface-600 dark:text-surface-300 hover:text-primary dark:hover:text-primary transition-colors"
      >
        <BackIcon className="h-5 w-5 mr-1" />
        <span>Back to Welcome</span>
      </button>

      <AnimatePresence mode="wait">
        {!selectedCategory ? (
          // Category Selection Screen
          <motion.div
            key="category-selection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 fun-title">Choose a Category</h2>
              <p className="text-surface-600 dark:text-surface-300 fun-text">
                Select your favorite show or movie to begin the quiz!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.keys(quizData).map((category) => {
                const CategoryIcon = categoryIcons[category];

                return (
                  <motion.div
                    key={category}
                    className={`${quizData[category].themeClass} rounded-2xl p-6 shadow-neu-light dark:shadow-neu-dark cursor-pointer hover:scale-105 transition-transform duration-200`}
                    whileHover={{ y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCategorySelect(category)}
                  >
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className={`w-20 h-20 rounded-full ${quizData[category].color} flex items-center justify-center mb-4`}>
                        {CategoryIcon &&
                          React.createElement(CategoryIcon, { className: "h-10 w-10 text-white" })}
                      </div>
                      <h3 className={`text-xl font-bold mb-2 ${quizData[category].textColor}`}>
                        {quizData[category].name}
                      </h3>
                      <p className="text-sm text-surface-600 dark:text-surface-300 text-center fun-text">
                        Test your knowledge of {quizData[category].name}!
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ) : !gameEnded ? (
          // Quiz Screen
          <motion.div
            key="quiz-screen"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`bg-white/90 dark:bg-surface-800/90 rounded-2xl p-6 md:p-8 shadow-card ${getCategoryData().themeClass}`}
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full ${getCategoryData().color} flex items-center justify-center mr-3`}>
                  {categoryIcons[selectedCategory] &&
                    React.createElement(categoryIcons[selectedCategory], { className: "h-5 w-5 text-white" })}
                </div>
                <h3 className="text-xl font-bold">{getCategoryData().name}</h3>
              </div>
              <div className="bg-surface-100 dark:bg-surface-700 rounded-full px-4 py-1 text-sm font-medium">
                Question {currentQuestionIndex + 1}/{quizQuestions.length}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-surface-200 dark:bg-surface-700 rounded-full h-2 mb-6">
              <motion.div
                className={`h-2 rounded-full ${getCategoryData().color}`}
                initial={{ width: `${(currentQuestionIndex / quizQuestions.length) * 100}%` }}
                animate={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              ></motion.div>
            </div>

            {/* Question */}
            {getCurrentQuestion() && (
              <div>
                {/* Special Round Indicators */}
                {(currentRound.isDoublePoints || currentRound.isSuddenDeath) && (
                  <motion.div
                    className="mb-4 p-2 rounded-lg text-center font-bold"
                    initial={{ scale: 0.9, opacity: 0.5 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ yoyo: Infinity, duration: 1 }}
                  >
                    {currentRound.isDoublePoints &&
                      <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100 px-3 py-1 rounded-full mr-2">
                        Double Points Round!
                      </span>
                    }
                    {currentRound.isSuddenDeath &&
                      <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 px-3 py-1 rounded-full">
                        Sudden Death!
                      </span>
                    }
                  </motion.div>
                )}

                {/* Timer Display */}
                <div className="mb-4">
                     <div className="text-sm font-medium text-surface-600 dark:text-surface-300 mb-1 text-right">Time Left: {timeLeft}s</div>
                      <div className={`w-full h-2 rounded-full bg-surface-200 dark:bg-surface-700 ${timeLeft < 10 ? 'animate-pulse' : ''}`}>
                        <motion.div
                          className={`h-2 rounded-full ${
                            timeLeft > 20 ? 'bg-green-500' :
                            timeLeft > 10 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          initial={{ width: `100%` }} // Start from 100%
                          animate={{ width: `${(timeLeft / 30) * 100}%` }} // Animate based on time left
                          transition={{ duration: 1, ease: "linear" }} // Linear transition for smooth timer
                        ></motion.div>
                      </div>
                </div>

              <div>
                <h4 className="text-xl md:text-2xl font-bold mb-6 question-text">
                  {getCurrentQuestion().question}
                </h4>

                {/* Answer Options */}
                <div className="space-y-3">
                  {getCurrentQuestion().options.map((option, index) => (
                    <motion.button // Changed from div to button for accessibility
                      key={index}
                      onClick={() => handleAnswerSelect(option)}
                      className={`w-full text-left p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedAnswer !== null // If an answer is selected, apply feedback styles
                          ? option === getCurrentQuestion().correctAnswer
                            ? "border-green-500 bg-green-50 dark:bg-green-900/30" // Correct answer always highlighted green
                            : selectedAnswer === option
                              ? "border-red-500 bg-red-50 dark:bg-red-900/30" // Selected wrong answer highlighted red
                              : `${getCategoryData().borderColor} bg-white/60 dark:bg-surface-700/60 opacity-60` // Unselected wrong answers dimmed
                          : `${getCategoryData().borderColor} bg-white/60 dark:bg-surface-700/60 hover:bg-surface-100 dark:hover:bg-surface-600` // Default style before selection
                      }
                      ${selectedAnswer === option && isWrong ? "wrong-highlight" : ""}
                      `}
                      whileHover={selectedAnswer === null ? { scale: 1.02 } : {}} // Only scale on hover if no answer is selected
                      whileTap={selectedAnswer === null ? { scale: 0.98 } : {}} // Only scale on tap if no answer is selected
                      disabled={selectedAnswer !== null} // Disable clicking after selection
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 ${
                            selectedAnswer !== null // If an answer is selected, show check/x, otherwise show letter
                              ? option === getCurrentQuestion().correctAnswer
                                ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                                : selectedAnswer === option
                                  ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                                  : "bg-surface-200 dark:bg-surface-600 text-surface-600 dark:text-surface-300" // Unselected answers
                              : "bg-surface-100 dark:bg-surface-600 text-surface-600 dark:text-surface-300" // Before selection
                          }`}>
                            {selectedAnswer !== null ? (
                              option === getCurrentQuestion().correctAnswer ? (
                                <CheckIcon className="h-5 w-5" />
                              ) : selectedAnswer === option ? (
                                <motion.div
                                  animate={isWrong ? { // Only animate X if the selected answer was wrong
                                    rotate: [-5, 5, -5, 5, -5, 5, -5, 5, 0],
                                    transition: {
                                      duration: 0.5,
                                      ease: "easeInOut"
                                    }
                                  } : {}}
                                  ><XIcon className="h-5 w-5" />
                                </motion.div>
                              ) : (
                                String.fromCharCode(65 + index) // Show letter for unselected answers after selection
                              )
                            ) : (
                              String.fromCharCode(65 + index) // Show letter before selection
                            )}
                          </span>
                          <span className="fun-text">{option}</span>
                        </div>

                        {/* Points indicator visible only AFTER an answer is selected, on the correct option */}
                        {selectedAnswer !== null && option === getCurrentQuestion().correctAnswer && (
                          <span className={`text-sm font-semibold ${difficultyColors[getCurrentQuestion().difficulty || 'medium']}`}>
                             {getCurrentQuestion().points && `+${currentRound.isDoublePoints ? getCurrentQuestion().points * 2 : getCurrentQuestion().points} pts`}
                          </span>
                        )}

                      </div>
                    </motion.button>
                   ))}
                </div>

                {/* Score and Points Display */}
                <div className="mt-6 text-center flex justify-between">
                  <p className="text-surface-600 dark:text-surface-300 fun-text">
                    Score: <span className="font-bold">{score}</span> / {quizQuestions.length}
                  </p>
                  <p className="text-surface-600 dark:text-surface-300 fun-text">
                    Total Points: <span className="font-bold">{points}</span>
                  </p>
                </div>
              </div>
              </div>
            )}
          </motion.div>
        ) : (
          // End Game Results Screen
          <motion.div
            key="results-screen"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`bg-white/90 dark:bg-surface-800/90 rounded-2xl p-6 md:p-8 shadow-card text-center ${getCategoryData().themeClass}`}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
              transition={{ type: "spring", stiffness: 500, damping: 15, delay: 0.2 }}
              className={`w-20 h-20 mx-auto rounded-full ${getCategoryData().color} flex items-center justify-center mb-6`}
            >
              <TrophyIcon className="h-10 w-10 text-white" />
            </motion.div>

            <h2 className="text-2xl md:text-3xl font-bold mb-3 fun-title">Quiz Completed!</h2>

            <div className="mb-8 fun-text">
              <p className="text-xl">
                Your Score: <span className="font-bold">{score}</span> out of {quizQuestions.length}
              </p>
              <p className="text-xl mt-2">
                Total Points: <span className="font-bold">{points}</span>
              </p>
              <p className="text-surface-600 dark:text-surface-300 mt-2">
                {score === quizQuestions.length
                  ? "Perfect! You're a true fan!"
                  : score >= quizQuestions.length * 0.9
                  ? "Outstanding! A real expert!"
                  : score >= quizQuestions.length * 0.7
                  ? "Great job! You really know your stuff!"
                  : score >= quizQuestions.length * 0.5
                  ? "Good effort! You know quite a bit!"
                  : "Keep practicing to improve your score!"}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                onClick={restartQuiz}
                className={`btn py-3 px-6 rounded-xl ${getCategoryData().color} text-white font-semibold`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Play Again
              </motion.button>

              <motion.button
                onClick={goBackToCategories}
                className="btn py-3 px-6 rounded-xl bg-surface-200 dark:bg-surface-700 text-surface-800 dark:text-surface-100 font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Choose Another Category
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainFeature;