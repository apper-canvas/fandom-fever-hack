import React from 'react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { useCallback } from 'react';
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
        question: "What is the name of Ross's second wife?",
        options: ["Emily", "Carol", "Susan", "Janice"],
        correctAnswer: "Emily",
        difficulty: "easy",
        points: 10
      },
      {
        id: 2,
        question: "What is Joey's catchphrase?",
        options: ["We were on a break!", "How you doin'?", "Could I BE any more...", "Oh my God!"],
        correctAnswer: "How you doin'?",
        difficulty: "easy",
        points: 10
      },
      {
        id: 3,
        question: "What is Chandler's job?",
        options: ["Paleontologist", "Chef", "IT Procurement Manager", "Statistical Analysis and Data Reconfiguration"],
        correctAnswer: "Statistical Analysis and Data Reconfiguration",
        difficulty: "medium",
        points: 20
      },
      {
        id: 4,
        question: "Which character says the last line in the series finale?",
        options: ["Ross", "Rachel", "Chandler", "Monica"],
        correctAnswer: "Chandler",
        difficulty: "medium",
        points: 20
      },
      {
        id: 5,
        question: "What is the name of Phoebe's twin sister?",
        options: ["Ursula", "Regina", "Valerie", "Cheryl"],
        correctAnswer: "Ursula",
        difficulty: "easy",
        points: 10
      },
      {
        id: 6,
        question: "What is the name of Ross and Monica's dog when they were growing up?",
        options: ["Rover", "Chi-Chi", "Marcel", "LaPooh"],
        correctAnswer: "Chi-Chi",
        difficulty: "medium",
        points: 20
      },
      {
        id: 7,
        question: "What's the name of the coffee shop where the friends always hang out?",
        options: ["Central Brew", "Coffee Town", "Central Perk", "Daily Grind"],
        correctAnswer: "Central Perk",
        difficulty: "easy",
        points: 10
      },
      {
        id: 8,
        question: "What instrument does Phoebe play?",
        options: ["Guitar", "Drums", "Keyboard", "Tambourine"],
        correctAnswer: "Guitar",
        difficulty: "easy",
        points: 10
      },
      {
        id: 9,
        question: "How many times did Ross get divorced?",
        options: ["1", "2", "3", "4"],
        correctAnswer: "3",
        difficulty: "easy",
        points: 10
      },
      {
        id: 10,
        question: "What's the name of Joey's penguin?",
        options: ["Hugsy", "Waddles", "Snowflake", "Chilly"],
        correctAnswer: "Hugsy",
        difficulty: "medium",
        points: 20
      },
      {
        id: 11,
        question: "What is Monica's biggest pet peeve?",
        options: ["Dirty dishes", "Animals", "People touching her hair", "Messy rooms"],
        correctAnswer: "Animals",
        difficulty: "medium",
        points: 20
      },
      {
        id: 12,
        question: "What does Rachel make for dessert on Thanksgiving that gets mixed up with a traditional English trifle?",
        options: ["Shepherd's Pie", "Cottage Pie", "Beef Wellington", "Custard Pie"],
        correctAnswer: "Shepherd's Pie",
        difficulty: "medium",
        points: 20
      },
      {
        id: 13,
        question: "What is the name of Chandler's TV Guide that's addressed to?",
        options: ["Ms. Chanandler Bong", "Ms. Chanandler Bang", "Mr. Chanandler Bong", "Mrs. Chanandler Bong"],
        correctAnswer: "Ms. Chanandler Bong",
        difficulty: "hard",
        points: 30
      },
      {
        id: 14,
        question: "What's the profession of Rachel's fiancé Barry?",
        options: ["Doctor", "Dentist", "Lawyer", "Orthodontist"],
        correctAnswer: "Orthodontist",
        difficulty: "medium",
        points: 20
      },
      {
        id: 15,
        question: "What is Joey's agent's name?",
        options: ["Estelle", "Stella", "Ellen", "Emma"],
        correctAnswer: "Estelle",
        difficulty: "medium",
        points: 20
      },
      {
        id: 16,
        question: "What did Ross try to teach Rachel in the planetarium on their first date?",
        options: ["About black holes", "How stars are born", "About his dissertation", "How planets rotate"],
        correctAnswer: "About his dissertation",
        difficulty: "hard",
        points: 30
      },
      {
        id: 17,
        question: "What is the name of Chandler's roommate after Joey moves out?",
        options: ["Eddie", "Russ", "Eric", "Gunther"],
        correctAnswer: "Eddie",
        difficulty: "medium",
        points: 20
      },
      {
        id: 18,
        question: "What is Chandler afraid of?",
        options: ["Spiders", "Commitment", "Dogs", "Public speaking"],
        correctAnswer: "Commitment",
        difficulty: "easy",
        points: 10
      },
      {
        id: 19,
        question: "Which friend posed nude for a painting?",
        options: ["Ross", "Joey", "Chandler", "Phoebe"],
        correctAnswer: "Ross",
        difficulty: "medium",
        points: 20
        id: 20,
        question: "What does Phoebe legally change her name to after she gets married?",
        options: ["Phoebe Buffay-Hannigan", "Princess Consuela Banana-Hammock", "Phoebe Hannigan", "Phoebe Princess Consuela"],
        correctAnswer: "Princess Consuela Banana-Hammock",
        difficulty: "hard",
        correctAnswer: "Princess Consuela Banana-Hammock",
      },
      {
      },
      {
        options: ["A pin", "A bracelet", "A necklace", "Earrings"],
        correctAnswer: "A pin",
        difficulty: "hard",
        correctAnswer: "A pin",
      },
      {
      },
      {
        id: 22,
        question: "What is Joey's favorite food?",
        options: ["Pizza", "Sandwiches", "Pasta", "Meatball subs"],
        correctAnswer: "Sandwiches",
        difficulty: "easy",
        points: 10
      },
      {
        id: 23,
        question: "Which character has a brother named Frank Jr.?",
        options: ["Monica", "Rachel", "Phoebe", "Joey"],
        correctAnswer: "Phoebe",
        difficulty: "medium",
        points: 20
      },
      {
        id: 24,
        question: "What was the name of Ross's monkey?",
        options: ["Marcel", "Marvin", "Michael", "Monty"],
        correctAnswer: "Marcel",
        difficulty: "easy",
        points: 10
      },
      {
        id: 25,
        question: "What subject does Ross teach?",
        options: ["Archaeology", "Paleontology", "Geology", "Anthropology"],
        correctAnswer: "Paleontology",
        difficulty: "easy",
        points: 10
      },
      {
        id: 26,
        question: "What is the name of the character Phoebe made up to dump a guy?",
        options: ["Regina Falange", "Ursula Buffay", "Phoebe Abbott", "Princess Consuela"],
        correctAnswer: "Regina Falange",
        difficulty: "hard",
        points: 30
      },
      {
        id: 27,
        question: "What is the name of the self-help book that Rachel and Joey love but Ross hates?",
        options: ["Be Your Own Person", "Be Your Own Windkeeper", "Finding Your Inner Self", "Knowing Your Worth"],
        correctAnswer: "Be Your Own Windkeeper",
        difficulty: "hard",
        points: 30
      },
      {
        id: 28,
        question: "What is Monica's biggest strength according to her job interview?",
        options: ["Cooking", "Competitiveness", "Attention to detail", "Leadership"],
        correctAnswer: "Attention to detail",
        difficulty: "medium",
        points: 20
      },
      {
        id: 29,
        question: "On which soap opera did Joey get his big break?",
        options: ["General Hospital", "Days of Our Lives", "As the World Turns", "The Bold and the Beautiful"],
        correctAnswer: "Days of Our Lives",
        difficulty: "easy",
        points: 10
      },
      {
        id: 30,
        question: "What is the name of Rachel's embarrassing high school nickname?",
        options: ["Big Nose", "Craney", "Spotty", "Big Teeth"],
        correctAnswer: "Big Nose",
        difficulty: "hard",
        points: 30
      },
      {
        id: 31,
        question: "Who marries Monica and Chandler?",
        options: ["Ross", "Joey", "A random priest", "The minister from the Bing wedding"],
        correctAnswer: "Joey",
        difficulty: "medium",
        points: 20
      },
      {
        id: 32,
        question: "What song does Ross's monkey Marcel keep playing on repeat?",
        options: ["With or Without You", "In the Jungle", "The Lion Sleeps Tonight", "Don't Stand So Close to Me"],
        correctAnswer: "The Lion Sleeps Tonight",
        difficulty: "hard",
        points: 30
      },
      {
        id: 33,
        question: "What is Richard's profession?",
        options: ["Doctor", "Dentist", "Optometrist", "Ophthalmologist"],
        correctAnswer: "Ophthalmologist",
        difficulty: "medium",
        points: 20
      },
      {
        id: 34,
        question: "What is Joey's acting catchphrase?",
        options: ["How YOU doin'?", "Smell the fart acting", "It's all in the eyes", "The camera loves me"],
        correctAnswer: "Smell the fart acting",
        difficulty: "hard",
        points: 30
      },
      {
        id: 35,
        question: "What does Ross dress up as for Halloween to scare Chandler?",
        options: ["Vampire", "Zombie", "Spud-nik", "Holiday Armadillo"],
        correctAnswer: "Spud-nik",
        difficulty: "hard",
        points: 30
      },
      {
        id: 36,
        question: "What is the name of Janice's first husband?",
        options: ["Gary", "Gary Litman", "Gary Hosenstein", "Gary Newman"],
        correctAnswer: "Gary Litman",
        difficulty: "hard",
        points: 30
      },
      {
        id: 37,
        question: "What nickname did Monica's father give her when she was younger?",
        options: ["Little Harmonica", "Big Fat Goalie", "Mon", "Little One"],
        correctAnswer: "Little Harmonica",
        difficulty: "hard",
        points: 30
      },
      {
        id: 38,
        question: "What was the name of the coffee shop before it was Central Perk?",
        options: ["Insomnia Cafe", "Manhattan Brew", "Daily Grind", "It was always Central Perk"],
        correctAnswer: "It was always Central Perk",
        difficulty: "hard",
        points: 30
      },
      {
        id: 39,
        question: "What did Carol and Susan name their son?",
        options: ["Ben", "Mark", "Michael", "Robert"],
        correctAnswer: "Ben",
        difficulty: "easy",
        points: 10
      },
      {  
        id: 40,
        question: "What was Phoebe's profession before becoming a masseuse?",
        options: ["Real Estate Agent", "Telemarketer", "Waitress", "Teacher"],
        correctAnswer: "Telemarketer",
        difficulty: "easy",
        points: 10
      },
      {
        id: 41,
        question: "What was Joey's fake stage name when he was trying to be younger?",
        options: ["Joey Tribiani", "Joseph Stalin", "Joseph Tribbiani Jr.", "Joey Dallas"],
        correctAnswer: "Joseph Stalin",
        difficulty: "hard",
        points: 30
      },
      {
        id: 42,
        question: "Which country does Chandler pretend to move to when he's actually hiding to plan a surprise proposal for Monica?",
        options: ["Mexico", "Russia", "Yemen", "Canada"],
        correctAnswer: "Yemen",
        difficulty: "hard",
        points: 30
      },
      {
        id: 43,
        question: "What caused the fire in Phoebe and Rachel's apartment?",
        options: ["A hair straightener", "A candle", "The stove", "Rachel's hair curling iron"],
        correctAnswer: "Rachel's hair curling iron",
        difficulty: "medium",
        points: 20
      },
      {
        id: 44,
        question: "What was the profession of Rachel's assistant Tag?",
        options: ["There was no previous profession mentioned", "Mail carrier", "Waiter", "Bartender"],
        correctAnswer: "There was no previous profession mentioned",
        difficulty: "hard",
        points: 30
      },
      {
        id: 45,
        question: "What was the job Joey had in a department store?",
        options: ["Santa Claus", "Gift wrapper", "Cologne sprayer", "Security guard"],
        correctAnswer: "Cologne sprayer",
        difficulty: "medium",
        points: 20
      },
      {
        id: 46,
        question: "What did Chandler's mother give the group when she visited?",
        options: ["Books she wrote", "Money", "Relationship advice", "Clothes"],
        correctAnswer: "Books she wrote",
        difficulty: "medium",
        points: 20
      },
      {
        id: 47,
        question: "What profession did Rachel's father want her to pursue?",
        options: ["Doctor", "Lawyer", "Dentist", "Businesswoman"],
        correctAnswer: "Doctor",
        difficulty: "hard",
        points: 30
      },
      {
        id: 48,
        question: "In Las Vegas, what word does Ross draw on Rachel's face while she's sleeping?",
        options: ["LOVE", "VEGAS", "LOSER", "ROSS"],
        correctAnswer: "ROSS",
        difficulty: "hard",
        points: 30
      },
      {
        id: 49,
        question: "What is the name of the girl Joey dates who keeps punching him?",
        options: ["Katie", "Kathy", "Kaley", "Kara"],
        correctAnswer: "Katie",
        difficulty: "hard",
        points: 30
      },
      {
        id: 50,
        question: "What was the profession of Rachel's imaginary friend?",
        options: ["Astronaut", "Cowboy", "Pilot", "Stockbroker"],
        correctAnswer: "Stockbroker",
        difficulty: "medium",
        points: 20
        id: 22,
        question: "What is Joey's favorite food?",
        options: ["Pizza", "Sandwiches", "Pasta", "Meatball subs"],
        correctAnswer: "Sandwiches",
        difficulty: "easy",
        points: 10
      {
        id: 23,
        question: "Which character has a brother named Frank Jr.?",
        options: ["Monica", "Rachel", "Phoebe", "Joey"],
        correctAnswer: "Phoebe",
        difficulty: "medium",
        points: 20
        options: ["Real Estate Agent", "Insurance Salesman", "Banker", "Teacher"],
      },
      {
        id: 24,
        question: "What was the name of Ross's monkey?",
        options: ["Marcel", "Marvin", "Michael", "Monty"],
        correctAnswer: "Marcel",
        difficulty: "easy",
        options: ["Colombia", "Mexico", "Venezuela", "Argentina"],
        correctAnswer: "Colombia",
      {
        id: 25,
        question: "What subject does Ross teach?",
        options: ["Archaeology", "Paleontology", "Geology", "Anthropology"],
        correctAnswer: "Paleontology",
        difficulty: "easy",
        points: 10
      },
      {
        id: 26,
        question: "What is the name of the character Phoebe made up to dump a guy?",
        options: ["Regina Falange", "Ursula Buffay", "Phoebe Abbott", "Princess Consuela"],
        correctAnswer: "Regina Falange",
        difficulty: "hard",
        points: 30
      },
      {
        id: 27,
        question: "What is the name of the self-help book that Rachel and Joey love but Ross hates?",
        options: ["Be Your Own Person", "Be Your Own Windkeeper", "Finding Your Inner Self", "Knowing Your Worth"],
        correctAnswer: "Be Your Own Windkeeper",
        difficulty: "hard",
        points: 30
      },
      {
        id: 28,
        question: "What is Monica's biggest strength according to her job interview?",
        options: ["Cooking", "Competitiveness", "Attention to detail", "Leadership"],
        correctAnswer: "Attention to detail",
        difficulty: "medium",
        points: 20
      },
      {
        id: 29,
        question: "On which soap opera did Joey get his big break?",
        options: ["General Hospital", "Days of Our Lives", "As the World Turns", "The Bold and the Beautiful"],
        correctAnswer: "Days of Our Lives",
        difficulty: "easy",
        points: 10
      },
      {
        id: 30,
        question: "What is the name of Rachel's embarrassing high school nickname?",
        options: ["Big Nose", "Craney", "Spotty", "Big Teeth"],
        correctAnswer: "Big Nose",
        difficulty: "hard",
        points: 30
      },
      {
        id: 31,
        question: "Who marries Monica and Chandler?",
        options: ["Ross", "Joey", "A random priest", "The minister from the Bing wedding"],
        correctAnswer: "Joey",
        difficulty: "medium",
        points: 20
      },
      {
        id: 32,
        question: "What song does Ross's monkey Marcel keep playing on repeat?",
        options: ["With or Without You", "In the Jungle", "The Lion Sleeps Tonight", "Don't Stand So Close to Me"],
        correctAnswer: "The Lion Sleeps Tonight",
        difficulty: "hard",
        points: 30
      },
      {
        id: 33,
        question: "What is Richard's profession?",
        options: ["Doctor", "Dentist", "Optometrist", "Ophthalmologist"],
        correctAnswer: "Ophthalmologist",
        difficulty: "medium",
        points: 20
      },
      {
        id: 34,
        question: "What is Joey's acting catchphrase?",
        options: ["How YOU doin'?", "Smell the fart acting", "It's all in the eyes", "The camera loves me"],
        correctAnswer: "Smell the fart acting",
        difficulty: "hard",
        points: 30
      },
      {
        id: 35,
        question: "What does Ross dress up as for Halloween to scare Chandler?",
        options: ["Vampire", "Zombie", "Spud-nik", "Holiday Armadillo"],
        correctAnswer: "Spud-nik",
        difficulty: "hard",
        points: 30
      },
      {
        id: 36,
        question: "What is the name of Janice's first husband?",
        options: ["Gary", "Gary Litman", "Gary Hosenstein", "Gary Newman"],
        correctAnswer: "Gary Litman",
        difficulty: "hard",
        points: 30
      },
      {
        id: 37,
        question: "What nickname did Monica's father give her when she was younger?",
        options: ["Little Harmonica", "Big Fat Goalie", "Mon", "Little One"],
        correctAnswer: "Little Harmonica",
        difficulty: "hard",
        points: 30
      },
      {
        id: 38,
        question: "What was the name of the coffee shop before it was Central Perk?",
        options: ["Insomnia Cafe", "Manhattan Brew", "Daily Grind", "It was always Central Perk"],
        correctAnswer: "It was always Central Perk",
        difficulty: "hard",
        points: 30
      },
      {
        id: 39,
        question: "What did Carol and Susan name their son?",
        options: ["Ben", "Mark", "Michael", "Robert"],
        correctAnswer: "Ben",
        difficulty: "easy",
        points: 10
      },
      {  
        id: 40,
        question: "What was Phoebe's profession before becoming a masseuse?",
        options: ["Real Estate Agent", "Telemarketer", "Waitress", "Teacher"],
        correctAnswer: "Telemarketer",
        difficulty: "easy",
        points: 10
      },
      {
        id: 41,
        question: "What was Joey's fake stage name when he was trying to be younger?",
        options: ["Joey Tribiani", "Joseph Stalin", "Joseph Tribbiani Jr.", "Joey Dallas"],
        correctAnswer: "Joseph Stalin",
        difficulty: "hard",
        points: 30
      },
      {
        id: 42,
        question: "Which country does Chandler pretend to move to when he's actually hiding to plan a surprise proposal for Monica?",
        options: ["Mexico", "Russia", "Yemen", "Canada"],
        correctAnswer: "Yemen",
        difficulty: "hard",
        points: 30
      },
      {
        id: 43,
        question: "What caused the fire in Phoebe and Rachel's apartment?",
        options: ["A hair straightener", "A candle", "The stove", "Rachel's hair curling iron"],
        correctAnswer: "Rachel's hair curling iron",
        difficulty: "medium",
        points: 20
      },
      {
        id: 44,
        question: "What was the profession of Rachel's assistant Tag?",
        options: ["There was no previous profession mentioned", "Mail carrier", "Waiter", "Bartender"],
        correctAnswer: "There was no previous profession mentioned",
        difficulty: "hard",
        points: 30
      },
      {
        id: 45,
        question: "What was the job Joey had in a department store?",
        options: ["Santa Claus", "Gift wrapper", "Cologne sprayer", "Security guard"],
        correctAnswer: "Cologne sprayer",
        difficulty: "medium",
        points: 20
      },
      {
        id: 46,
        question: "What did Chandler's mother give the group when she visited?",
        options: ["Books she wrote", "Money", "Relationship advice", "Clothes"],
        correctAnswer: "Books she wrote",
        difficulty: "medium",
        points: 20
      },
      {
        id: 47,
        question: "What profession did Rachel's father want her to pursue?",
        options: ["Doctor", "Lawyer", "Dentist", "Businesswoman"],
        correctAnswer: "Doctor",
        difficulty: "hard",
        points: 30
      },
      {
        id: 48,
        question: "In Las Vegas, what word does Ross draw on Rachel's face while she's sleeping?",
        options: ["LOVE", "VEGAS", "LOSER", "ROSS"],
        correctAnswer: "ROSS",
        difficulty: "hard",
        points: 30
      },
      {
        id: 49,
        question: "What is the name of the girl Joey dates who keeps punching him?",
        options: ["Katie", "Kathy", "Kaley", "Kara"],
        correctAnswer: "Katie",
        difficulty: "hard",
        points: 30
      },
      {
        id: 50,
        question: "What was the profession of Rachel's imaginary friend?",
        options: ["Astronaut", "Cowboy", "Pilot", "Stockbroker"],
        correctAnswer: "Stockbroker",
        difficulty: "medium",
        points: 20
      }
    ]
  },
  modernfamily: {
    name: "Modern Family",
    icon: "home",
        difficulty: "hard",
    color: "bg-modernfamily-primary",
    textColor: "text-modernfamily-primary",
    borderColor: "border-modernfamily-primary",
    questions: [
      {
        id: 1,
        question: "What is the profession of Phil Dunphy?",
        difficulty: "hard",
        correctAnswer: "Real Estate Agent",
        difficulty: "easy",
        points: 10
      },
      {
        id: 2,
        question: "In which country was Gloria born?",
        difficulty: "hard",
        points: 30
        difficulty: "easy",
        points: 10
      },
      {
        id: 3,
        question: "What is Jay's business?",
        options: ["Restaurants", "Car Dealerships", "Closets", "Real Estate"],
        correctAnswer: "Closets",
        difficulty: "easy",
        points: 10
      },
      {
        id: 4,
        question: "What is the name of Cam and Mitchell's daughter?",
        options: ["Lily", "Lucy", "Daisy", "Rose"],
        correctAnswer: "Lily",
        difficulty: "easy",
        points: 10
      },
      {
        id: 5,
        question: "What is Manny's full first name?",
        options: ["Manuel", "Manfred", "Manuelo", "Manolo"],
        correctAnswer: "Manuel",
        difficulty: "medium",
        points: 20
      },
      {
        id: 6,
        question: "Which university did Haley get accepted to, but then got kicked out of?",
        options: ["UCLA", "USC", "Stanford", "Berkeley"],
        correctAnswer: "UCLA",
        difficulty: "medium",
        points: 20
      },
      {
        id: 7,
        question: "What is the name of the family dog?",
        options: ["Stella", "Bruno", "Rex", "Lola"],
        correctAnswer: "Stella",
        difficulty: "easy",
        points: 10
      },
      {
        id: 8,
        question: "What instrument does Luke play?",
        options: ["Guitar", "Piano", "Drums", "Trumpet"],
        correctAnswer: "Trumpet",
        difficulty: "medium",
        points: 20
      },
      {
        id: 9,
        question: "What is Claire's maiden name?",
        options: ["Pritchett", "Tucker", "Johnson", "Delgado"],
        correctAnswer: "Pritchett",
        difficulty: "easy",
        points: 10
      },
      {
        id: 10,
        question: "What was Cameron's job before becoming a teacher?",
        options: ["Clown", "Football Coach", "Chef", "Music Teacher"],
        correctAnswer: "Music Teacher",
        difficulty: "medium",
        points: 20
      },
      {
        id: 11,
        question: "What is the name of Phil's real estate rival?",
        options: ["Gil Thorpe", "Bill Harper", "Ted Johnson", "Rick Stevens"],
        correctAnswer: "Gil Thorpe",
        difficulty: "medium",
        points: 20
      },
      {
        id: 12,
        question: "What is the name of Cam's clown persona?",
        options: ["Fizbo", "Bozo", "Chuckles", "Giggle"],
        correctAnswer: "Fizbo",
        difficulty: "easy",
        points: 10
      },
      {
        id: 13,
        question: "What is the name of Phil's real estate company?",
        options: ["Dunphy Properties", "Dunphy Real Estate", "Phil's Realty", "Pritchett Realty"],
        correctAnswer: "Dunphy Real Estate",
        difficulty: "medium",
        points: 20
      },
      {
        id: 14,
        question: "What are the names of Jay's and Gloria's dog and son?",
        options: ["Stella and Fulgencio", "Rex and Joe", "Bruno and Manny", "Ralph and Fulgencio"],
        correctAnswer: "Stella and Fulgencio",
        difficulty: "hard",
        points: 30
      },
      {
        id: 15,
        question: "What is Claire's job at her father's company?",
        options: ["CEO", "COO", "CFO", "CTO"],
        correctAnswer: "CEO",
        difficulty: "medium",
        points: 20
      },
      {
        id: 16,
        question: "What is the name of Mitchell and Cameron's cat?",
        options: ["Larry", "Felix", "Whiskers", "There was no cat"],
        correctAnswer: "Larry",
        difficulty: "hard",
        points: 30
      },
      {
        id: 17,
        question: "What college does Alex attend?",
        options: ["Harvard", "Caltech", "Yale", "Princeton"],
        correctAnswer: "Caltech",
        difficulty: "medium",
        points: 20
      },
      {
        id: 18,
        question: "What color was Cam and Mitchell's kitchen before they renovated it?",
        options: ["Green", "Yellow", "Blue", "Orange"],
        correctAnswer: "Yellow",
        difficulty: "hard",
        points: 30
      },
      {
        id: 19,
        question: "What is the name of Gloria's ex-husband?",
        options: ["Javier", "Roberto", "Jesús", "Carlos"],
        correctAnswer: "Javier",
        difficulty: "medium",
        points: 20
      },
      {
        id: 20,
        question: "From which state did Cameron come?",
        options: ["Missouri", "Kansas", "Oklahoma", "Iowa"],
        correctAnswer: "Missouri",
        difficulty: "medium",
        points: 20
      },
      {
        id: 21,
        question: "What was Luke's original name going to be?",
        options: ["Duke", "Lucas", "Liam", "Louis"],
        correctAnswer: "Lucas",
        difficulty: "hard",
        points: 30
      },
      {
        id: 22,
        question: "What did Phil buy Jay for Christmas that he doesn't like?",
        options: ["A TV", "A car", "A robe", "A watch"],
        correctAnswer: "A robe",
        difficulty: "hard",
        points: 30
      },
      {
        id: 23,
        question: "What does Gloria call her grandmother?",
        options: ["Abuela", "Mamacita", "Nana", "Pilar"],
        correctAnswer: "Pilar",
        difficulty: "hard",
        points: 30
      },
      {
        id: 24,
        question: "What is Mitchell's middle name?",
        options: ["Vincent", "Alan", "Scott", "Andrew"],
        correctAnswer: "Vincent",
        difficulty: "hard",
        points: 30
      },
      {
        id: 25,
        question: "What causes Cameron to freak out in the grocery store?",
        options: ["Spilled milk", "A spider", "Someone making fun of Lily", "Someone eating grapes without paying"],
        correctAnswer: "Someone eating grapes without paying",
        difficulty: "hard",
        points: 30
      },
      {
        id: 26,
        question: "What does Phil call his real estate work car?",
        options: ["Philippemobile", "The Property Portal", "The Dunphy Mobile", "The Real Estate Express"],
        correctAnswer: "The Real Estate Express",
        difficulty: "hard",
        points: 30
      },
      {
        id: 27,
        question: "What is the title of Phil's book?",
        options: ["Phil's-osophy", "Dunphy's Thoughts", "Phil's Way", "The Dunphy Files"],
        correctAnswer: "Phil's-osophy",
        difficulty: "medium",
        points: 20
      },
      {
        id: 28,
        question: "What animal did Cameron grow up raising on his farm?",
        options: ["Pigs", "Cows", "Chickens", "Horses"],
        correctAnswer: "Pigs",
        difficulty: "medium",
        points: 20
      },
      {
        id: 29,
        question: "What is the name of Haley's fashion blog?",
        options: ["Haley's Comet", "Fashion Forward", "Haley's Comments", "Dunphy Designs"],
        correctAnswer: "Haley's Comet",
        difficulty: "hard",
        points: 30
      },
      {
        id: 30,
        question: "What is Jay's favorite holiday?",
        options: ["Christmas", "Thanksgiving", "4th of July", "New Year's"],
        correctAnswer: "4th of July",
        difficulty: "hard",
        points: 30
      },
      {
        id: 31,
        question: "Which Dunphy child doesn't wear glasses?",
        options: ["Luke", "Alex", "Haley", "They all wear glasses sometimes"],
        correctAnswer: "Haley",
        difficulty: "medium",
        points: 20
      },
      {
        id: 32,
        question: "What is Phil's father's name?",
        options: ["Frank", "Fred", "Phillip Sr.", "Jim"],
        correctAnswer: "Frank",
        difficulty: "medium",
        points: 20
      },
      {
        id: 33,
        question: "What is Gloria afraid of?",
        options: ["Spiders", "Snakes", "Clowns", "Puppets"],
        correctAnswer: "Puppets",
        difficulty: "hard",
        points: 30
      },
      {
        id: 34,
        question: "What does Claire organize every Halloween?",
        options: ["A haunted house", "A costume contest", "Trick-or-treating", "A scary movie night"],
        correctAnswer: "A haunted house",
        difficulty: "medium",
        points: 20
      },
      {
        id: 35,
        question: "What is the name of Mitchell's law firm?",
        options: ["Pritchett & Associates", "Tucker & Pritchett Law", "Pleger & Babcock", "It's never mentioned"],
        correctAnswer: "Pleger & Babcock",
        difficulty: "hard",
        points: 30
      },
      {
        id: 36,
        question: "What invention did Phil create?",
        options: ["The Dunphy Double", "The Sock Roller", "Sock 'Em Boppers", "The Shoe-Shine Shampoo"],
        correctAnswer: "The Sock Roller",
        difficulty: "hard",
        points: 30
      },
      {
        id: 37,
        question: "What is the name of Cam and Mitchell's upstairs neighbors?",
        options: ["The Longs", "The Johnsons", "The Durants", "The Pattersons"],
        correctAnswer: "The Durants",
        difficulty: "hard",
        points: 30
      },
      {
        id: 38,
        question: "What country does Gloria confuse with Switzerland?",
        options: ["Sweden", "Belgium", "Austria", "Denmark"],
        correctAnswer: "Sweden",
        difficulty: "hard",
        points: 30
      },
      {
        id: 39,
        question: "What instrument did Manny play when he was younger?",
        options: ["Piano", "Violin", "Guitar", "Accordion"],
        correctAnswer: "Accordion",
        difficulty: "hard",
        points: 30
      },
      {
        id: 40,
        question: "What is Lily's middle name?",
        options: ["Mai", "Ling", "Tucker", "Elizabeth"],
        correctAnswer: "Tucker",
        difficulty: "hard",
        points: 30
      },
      {
        id: 41,
        question: "What is Gloria's mother's name?",
        options: ["Pilar", "Sofía", "Maria", "Dora"],
        correctAnswer: "Pilar",
        difficulty: "hard",
        points: 30
      },
      {
        id: 42,
        question: "What color is Jay and Gloria's front door?",
        options: ["Red", "Blue", "Green", "Black"],
        correctAnswer: "Red",
        difficulty: "hard",
        points: 30
      },
      {
        id: 43,
        question: "What is Phil allergic to?",
        options: ["Cats", "Bees", "Peanuts", "Cheese"],
        correctAnswer: "Bees",
        difficulty: "medium",
        points: 20
      },
      {
        id: 44,
        question: "What is the name of Claire's company?",
        options: ["Pritchett's Closets & Blinds", "Pritchett-Tucker Closets", "Pritchett's Closets", "Closet Kingdom"],
        correctAnswer: "Pritchett's Closets & Blinds",
        difficulty: "medium",
        points: 20
      },
      {
        id: 45,
        question: "What university did Claire drop out of?",
        options: ["UCLA", "UC Berkeley", "USC", "Stanford"],
        correctAnswer: "UCLA",
        difficulty: "hard",
        points: 30
      },
      {
        id: 46,
        question: "Where did Jay propose to Gloria?",
        options: ["A restaurant", "On vacation", "At home", "At a football game"],
        correctAnswer: "At a football game",
        difficulty: "hard",
        points: 30
      },
      {
        id: 47,
        question: "What is the name of Haley's boyfriend who is also a magician?",
        options: ["Phil", "Andy", "Dylan", "Rainer"],
        correctAnswer: "Rainer",
        difficulty: "hard",
        points: 30
      },
      {
        id: 48,
        question: "What did Cameron do as a child that earned him the nickname 'Calves of Steel'?",
        options: ["Football", "Ballet", "Soccer", "Catching pigs"],
        correctAnswer: "Catching pigs",
        difficulty: "hard",
        points: 30
      },
      {
        id: 49,
        question: "What is the license plate of the Dunphy family car?",
        options: ["DUNPHY1", "CA4SALE", "LUVWRK", "HOMESALE"],
        correctAnswer: "CA4SALE",
        difficulty: "hard",
        points: 30
      },
      {
        id: 50,
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
        question: "What is Harry Potter's Patronus?",
        options: ["Stag", "Doe", "Wolf", "Otter"],
        correctAnswer: "Stag",
        difficulty: "easy",
        points: 10
      },
      {
        id: 2,
        question: "Which Hogwarts house does Hermione Granger belong to?",
        options: ["Gryffindor", "Ravenclaw", "Hufflepuff", "Slytherin"],
        correctAnswer: "Gryffindor",
        difficulty: "easy",
        points: 10
      },
      {
        id: 3,
        question: "What is the core of Harry Potter's wand?",
        options: ["Dragon Heartstring", "Unicorn Hair", "Phoenix Feather", "Veela Hair"],
        correctAnswer: "Phoenix Feather",
        difficulty: "medium",
        points: 20
      },
      {
        id: 4,
        question: "Who killed Dobby the house-elf?",
        options: ["Bellatrix Lestrange", "Lucius Malfoy", "Voldemort", "Peter Pettigrew"],
        correctAnswer: "Bellatrix Lestrange",
        difficulty: "medium",
        points: 20
      },
      {
        id: 5,
        question: "What position does Harry Potter play in Quidditch?",
        options: ["Keeper", "Chaser", "Beater", "Seeker"],
        correctAnswer: "Seeker",
        difficulty: "easy",
        points: 10
      },
      {
        id: 6,
        question: "Which of these is NOT a Deathly Hallow?",
        options: ["Elder Wand", "Invisibility Cloak", "Resurrection Stone", "Time-Turner"],
        correctAnswer: "Time-Turner",
        difficulty: "medium",
        points: 20
      },
      {
        id: 7,
        question: "What is the name of Harry Potter's owl?",
        options: ["Errol", "Hedwig", "Hermes", "Pigwidgeon"],
        correctAnswer: "Hedwig",
        difficulty: "easy",
        points: 10
      },
      {
        id: 8,
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
        question: "What is the name of Hagrid's pet spider?",
        options: ["Aragog", "Mosag", "Norbert", "Fluffy"],
        correctAnswer: "Aragog",
        difficulty: "medium",
        points: 20
      },
      {
        id: 10,
        question: "What memory does Harry use to conjure his Patronus during his O.W.L. exams?",
        options: [
          "Winning the Quidditch Cup",
          "It wasn't specified in the book",
          "When Gryffindor won the House Cup",
          "When he first rode a broom"
        ],
        correctAnswer: "It wasn't specified in the book",
        difficulty: "hard",
        points: 30
      },
      {
        id: 11,
        question: "What is the name of the wizard prison?",
        options: ["Nurmengard", "Azkaban", "Gringotts", "Durmstrang"],
        correctAnswer: "Azkaban",
        difficulty: "easy",
        points: 10
      },
      {
        id: 12,
        question: "Which is NOT one of the Unforgivable Curses?",
        options: ["Imperius Curse", "Cruciatus Curse", "Killing Curse", "Sectumsempra"],
        correctAnswer: "Sectumsempra",
        difficulty: "medium",
        points: 20
      },
      {
        id: 13,
        question: "What is the name of the ghost who haunts the girls' bathroom?",
        options: ["Nearly Headless Nick", "The Grey Lady", "Moaning Myrtle", "The Bloody Baron"],
        correctAnswer: "Moaning Myrtle",
        difficulty: "easy",
        points: 10
      },
      {
        id: 14,
        question: "What does the spell 'Obliviate' do?",
        options: ["Makes objects fly", "Erases memories", "Creates light", "Inflicts pain"],
        correctAnswer: "Erases memories",
        difficulty: "medium",
        points: 20
      },
      {
        id: 15,
        question: "What is the name of Ron's rat?",
        options: ["Crookshanks", "Scabbers", "Trevor", "Errol"],
        correctAnswer: "Scabbers",
        difficulty: "easy",
        points: 10
      },
      {
        id: 16,
        question: "What is Professor McGonagall's Animagus form?",
        options: ["Tabby cat", "Owl", "Fox", "Wolf"],
        correctAnswer: "Tabby cat",
        difficulty: "medium",
        points: 20
      },
      {
        id: 17,
        question: "What is the name of the Weasleys' house?",
        options: ["The Hobbit Hole", "The Burrow", "Shell Cottage", "The Nest"],
        correctAnswer: "The Burrow",
        difficulty: "easy",
        points: 10
      },
      {
        id: 18,
        question: "What is the core of Voldemort's wand?",
        options: ["Dragon Heartstring", "Unicorn Hair", "Phoenix Feather", "Basilisk Venom"],
        correctAnswer: "Phoenix Feather",
        difficulty: "medium",
        points: 20
      },
      {
        id: 19,
        question: "What creature guards the entrance to the Gryffindor common room?",
        options: ["A knight", "A gargoyle", "The Fat Lady", "A lion statue"],
        correctAnswer: "The Fat Lady",
        difficulty: "easy",
        points: 10
      },
      {
        id: 20,
        question: "What is the name of Hagrid's half-brother?",
        options: ["Graff", "Grawp", "Grut", "Greg"],
        correctAnswer: "Grawp",
        difficulty: "medium",
        points: 20
      },
      {
        id: 21,
        question: "What is the name of the train that takes students to Hogwarts?",
        options: ["Hogwarts Express", "Magic Flyer", "Wizard Rail", "Platform 9¾ Express"],
        correctAnswer: "Hogwarts Express",
        difficulty: "easy",
        points: 10
      },
      {
        id: 22,
        question: "What does the spell 'Expelliarmus' do?",
        options: ["Disarms an opponent", "Creates fire", "Freezes an opponent", "Makes objects float"],
        correctAnswer: "Disarms an opponent",
        difficulty: "easy",
        points: 10
      },
      {
        id: 23,
        question: "What was the name of the Black family's house-elf?",
        options: ["Dobby", "Winky", "Kreacher", "Hokey"],
        correctAnswer: "Kreacher",
        difficulty: "medium",
        points: 20
      },
      {
        id: 24,
        question: "What magical plant helped Harry breathe underwater during the Triwizard Tournament?",
        options: ["Devil's Snare", "Mandrake", "Gillyweed", "Venomous Tentacula"],
        correctAnswer: "Gillyweed",
        difficulty: "medium",
        points: 20
      },
      {
        id: 25,
        question: "What is the name of the Weasley's owl that delivers mail?",
        options: ["Hedwig", "Errol", "Pigwidgeon", "Hermes"],
        correctAnswer: "Errol",
        difficulty: "medium",
        points: 20
      },
      {
        id: 26,
        question: "What position does Ron Weasley play on the Gryffindor Quidditch team?",
        options: ["Seeker", "Chaser", "Beater", "Keeper"],
        correctAnswer: "Keeper",
        difficulty: "medium",
        points: 20
      },
      {
        id: 27,
        question: "What is Tom Riddle's middle name?",
        options: ["Morfin", "Salazar", "Marvolo", "Gaunt"],
        correctAnswer: "Marvolo",
        difficulty: "hard",
        points: 30
      },
      {
        id: 28,
        question: "What is the name of the Weasleys' family ghoul?",
        options: ["It has no name", "Ernie", "Arnold", "Gregory"],
        correctAnswer: "It has no name",
        difficulty: "hard",
        points: 30
      },
      {
        id: 29,
        question: "In what year did Harry Potter start attending Hogwarts?",
        options: ["1990", "1991", "1992", "1993"],
        correctAnswer: "1991",
        difficulty: "hard",
        points: 30
      },
      {
        id: 30,
        question: "What was the name of Dumbledore's sister?",
        options: ["Ariana", "Ariella", "Amelia", "Aurora"],
        correctAnswer: "Ariana",
        difficulty: "hard",
        points: 30
      },
      {
        id: 31,
        question: "What is inscribed on Dumbledore's tomb?",
        options: ["Here lies a great wizard", "The last enemy that shall be destroyed is death", "For the greater good", "Death is but the next great adventure"],
        correctAnswer: "The last enemy that shall be destroyed is death",
        difficulty: "hard",
        points: 30
      },
      {
        id: 32,
        question: "What is Hermione's middle name?",
        options: ["Jane", "Jean", "Joy", "Jennifer"],
        correctAnswer: "Jean",
        difficulty: "hard",
        points: 30
      },
      {
        id: 33,
        question: "What is the first Horcrux that Harry destroys?",
        options: ["Slytherin's Locket", "Hufflepuff's Cup", "Ravenclaw's Diadem", "Tom Riddle's Diary"],
        correctAnswer: "Tom Riddle's Diary",
        difficulty: "medium",
        points: 20
      },
      {
        id: 34,
        question: "What is the model of Harry's first broomstick?",
        options: ["Cleansweep Seven", "Nimbus 2000", "Firebolt", "Nimbus 2001"],
        correctAnswer: "Nimbus 2000",
        difficulty: "medium",
        points: 20
      },
      {
        id: 35,
        question: "What is Professor Trelawney's first name?",
        options: ["Sybil", "Sibyl", "Sylvia", "Sophia"],
        correctAnswer: "Sybil",
        difficulty: "hard",
        points: 30
      },
      {
        id: 36,
        question: "What is the address of the Dursleys' home?",
        options: ["3 Privet Drive", "4 Privet Drive", "5 Privet Drive", "6 Privet Drive"],
        correctAnswer: "4 Privet Drive",
        difficulty: "easy",
        points: 10
      },
      {
        id: 37,
        question: "What is the name of the centaur who teaches Divination at Hogwarts?",
        options: ["Firenze", "Bane", "Magorian", "Ronan"],
        correctAnswer: "Firenze",
        difficulty: "medium",
        points: 20
      },
      {
        id: 38,
        question: "What type of dragon did Harry face in the Triwizard Tournament?",
        options: ["Chinese Fireball", "Swedish Short-Snout", "Common Welsh Green", "Hungarian Horntail"],
        correctAnswer: "Hungarian Horntail",
        difficulty: "medium",
        points: 20
      },
      {
        id: 39,
        question: "What is the name of the pub in Hogsmeade?",
        options: ["The Three Broomsticks", "The Leaky Cauldron", "The Hog's Head", "The Golden Snitch"],
        correctAnswer: "The Three Broomsticks",
        difficulty: "easy",
        points: 10
      },
      {
        id: 40,
        question: "Who founded the Society for the Promotion of Elfish Welfare (S.P.E.W.)?",
        options: ["Hermione Granger", "Luna Lovegood", "Ginny Weasley", "Molly Weasley"],
        correctAnswer: "Hermione Granger",
        difficulty: "easy",
        points: 10
      },
      {
        id: 41,
        question: "What color are the Hogwarts Express train's carriages?",
        options: ["Green", "Blue", "Black", "Red"],
        correctAnswer: "Red",
        difficulty: "medium",
        points: 20
      },
      {
        id: 42,
        question: "What is the password to enter the Prefects' bathroom in Harry's fourth year?",
        options: ["Pine Fresh", "Lemon Drop", "Fizzing Whizbee", "Fortuna Major"],
        correctAnswer: "Pine Fresh",
        difficulty: "hard",
        points: 30
      },
      {
        id: 43,
        question: "Who was Gellert Grindelwald's companion in his youth?",
        options: ["Aberforth Dumbledore", "Albus Dumbledore", "Nicolas Flamel", "Newt Scamander"],
        correctAnswer: "Albus Dumbledore",
        difficulty: "hard",
        points: 30
      },
      {
        id: 44,
        question: "What was the name of the book Hermione gave Harry for his 17th birthday?",
        options: ["Magical Drafts and Potions", "Quidditch Through the Ages", "Twelve Fail-Safe Ways to Charm Witches", "The Tales of Beedle the Bard"],
        correctAnswer: "Twelve Fail-Safe Ways to Charm Witches",
        difficulty: "hard",
        points: 30
      },
      {
        id: 45,
        question: "What subject did Professor Quirrell teach before Defense Against the Dark Arts?",
        options: ["Potions", "Muggle Studies", "Divination", "Astronomy"],
        correctAnswer: "Muggle Studies",
        difficulty: "hard",
        points: 30
      },
      {
        id: 46,
        question: "What is the name of Hagrid's dog?",
        options: ["Fluffy", "Fang", "Padfoot", "Norbert"],
        correctAnswer: "Fang",
        difficulty: "easy",
        points: 10
      },
      {
        id: 47,
        question: "What is the name of the Potions book Harry uses in his sixth year?",
        options: ["Advanced Potion-Making", "Magical Drafts and Potions", "Moste Potente Potions", "Book of Potions"],
        correctAnswer: "Advanced Potion-Making",
        difficulty: "medium",
        points: 20
      },
      {
        id: 48,
        question: "What is the name of the device Hermione uses to attend multiple classes at once?",
        options: ["Time-Turner", "Remembrall", "Sneakoscope", "Pensieve"],
        correctAnswer: "Time-Turner",
        difficulty: "medium",
        points: 20
      },
      {
        id: 49,
        question: "What was the nickname of the four creators of the Marauder's Map?",
        options: ["Moony, Wormtail, Padfoot and Prongs", "Sirius, Remus, Peter and James", "The Hogwarts Four", "The Golden Quartet"],
        correctAnswer: "Moony, Wormtail, Padfoot and Prongs",
        difficulty: "medium",
        points: 20
      },
      {
        id: 50,
        question: "Which of the following was NOT a Horcrux?",
        options: ["Nagini", "The Sorting Hat", "Ravenclaw's Diadem", "The Locket of Slytherin"],
        correctAnswer: "The Sorting Hat",
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
    
    // Get 50 questions, or all if fewer than 50
    const selectedQuestions = shuffleArray(allQuestions).slice(0, Math.min(50, allQuestions.length));
    
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
    }
    
    // Schedule animation reset
    setTimeout(() => {
      setIsCorrect(false);
      setIsWrong(false);
      setShowConfetti(false);
    }, 2000);
    
    // Move to next question after a delay
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
  };
  
  // Restart quiz
  const restartQuiz = () => {
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
    
    // Shuffle questions
    const allQuestions = quizData[selectedCategory].questions;
    const newQuestions = shuffleArray(allQuestions).slice(0, 10);
    setQuizQuestions(newQuestions);
  };
  
  // Go back to category selection
  const goBackToCategories = () => {
    setTimerActive(false);
    setTimeLeft(30);
    setSelectedCategory(null);
    setScore(0);
    setCurrentQuestionIndex(0);
    setGameEnded(false);
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
    } else if (timeLeft === 0 && !showResult && !gameEnded) {
      // Time ran out, handle as wrong answer
      handleAnswerSelect("__TIME_OUT__");
    }
    
    return () => clearInterval(interval);
  }, [timerActive, timeLeft, showResult, gameEnded]);
  
  
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
              <h2 className="text-3xl font-bold mb-4">Choose a Category</h2>
              <p className="text-surface-600 dark:text-surface-300">
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
                        <CategoryIcon className="h-10 w-10 text-white" />
                      </div>
                      <h3 className={`text-xl font-bold mb-2 ${quizData[category].textColor}`}>
                        {quizData[category].name}
                      </h3>
                      <p className="text-sm text-surface-600 dark:text-surface-300 text-center">
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
                <div className={`w-full h-2 rounded-full mb-4 bg-surface-200 dark:bg-surface-700 ${timeLeft < 10 ? 'animate-pulse' : ''}`}>
                  <motion.div
                    className={`h-2 rounded-full ${
                      timeLeft > 20 ? 'bg-green-500' : 
                      timeLeft > 10 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    initial={{ width: `${(timeLeft / 30) * 100}%` }}
                    animate={{ width: `${(timeLeft / 30) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  ></motion.div>
                </div>

              <div>
                <h4 className="text-xl md:text-2xl font-bold mb-6">
                  {getCurrentQuestion().question}
                </h4>
                
                {/* Answer Options */}
                <div className="space-y-3">
                  {getCurrentQuestion().options.map((option, index) => (
                    <motion.div
                      key={index}
                      onClick={() => handleAnswerSelect(option)}
                      className={`w-full text-left p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedAnswer === option
                          ? option === getCurrentQuestion().correctAnswer
                            ? "border-green-500 bg-green-50 dark:bg-green-900/30 correct-answer"
                            : "border-red-500 bg-red-50 dark:bg-red-900/30 wrong-answer"
                          : selectedAnswer && option === getCurrentQuestion().correctAnswer
                            ? "border-green-500 bg-green-50 dark:bg-green-900/30 pulse-correct"
                            : `${getCategoryData().borderColor} bg-white/60 dark:bg-surface-700/60 hover:bg-surface-100 dark:hover:bg-surface-600`
                      } 
                      ${
                        selectedAnswer === option 
                          ? (
                          (isCorrect && option === getCurrentQuestion().correctAnswer)
                            ? "correct-highlight"
                            : (isWrong ? "wrong-highlight" : "border-red-500 bg-red-50 dark:bg-red-900/30")
                          ) : `${getCategoryData().borderColor} bg-white/60 dark:bg-surface-700/60 hover:bg-surface-100 dark:hover:bg-surface-600`
                      }`}
                      whileHover={!selectedAnswer ? { scale: 1.02 } : {}}
                      whileTap={!selectedAnswer ? { scale: 0.98 } : {}}
                      disabled={selectedAnswer !== null}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <span className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 ${
                            selectedAnswer === option
                              ? option === getCurrentQuestion().correctAnswer
                                ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                                : "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
                              : "bg-surface-100 dark:bg-surface-600 text-surface-600 dark:text-surface-300"
                          }`}>
                            {selectedAnswer === option ? (
                              option === getCurrentQuestion().correctAnswer ? (
                                <CheckIcon className="h-5 w-5" />
                              ) : (
                                <motion.div
                                  animate={isWrong ? {
                                    rotate: [-5, 5, -5, 5, -5, 5, -5, 5, 0],
                                    transition: {
                                      duration: 0.5,
                                      ease: "easeInOut"
                                    }
                                  } : {}}
                                  ><XIcon className="h-5 w-5" />
                                </motion.div>
                              )
                            ) : (
                              String.fromCharCode(65 + index) // A, B, C, D
                            )}
                          </span>
                          <span>{option}</span>
                        </div>

                        {/* Difficulty indicator for each option that is the correct answer */}
                        {(selectedAnswer && option === getCurrentQuestion().correctAnswer) && (
                          <span className={`text-sm font-semibold ${difficultyColors[getCurrentQuestion().difficulty || 'medium']}`}>
                            {getCurrentQuestion().difficulty || 'medium'} 
                            {getCurrentQuestion().points && ` (${currentRound.isDoublePoints ? getCurrentQuestion().points * 2 : getCurrentQuestion().points} pts)`}
                          </span>
                        )}
                        
                        {/* Check/X icon for selected answer */}
                        {selectedAnswer === option && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 15 }}
                          >
                            {option === getCurrentQuestion().correctAnswer ? (
                              <CheckIcon className="h-6 w-6 text-green-500" />
                            ) : (
                              <XIcon className="h-6 w-6 text-red-500" />
                            )}
                          </motion.span>
                        )}
                      </div>
                    </motion.div>
                   ))}
                </div>
                
                {/* Score and Points Display */}
                <div className="mt-6 text-center flex justify-between">
                  <p className="text-surface-600 dark:text-surface-300">
                    Score: <span className="font-bold">{score}</span>
                  </p>
                  <p className="text-surface-600 dark:text-surface-300">
                    Points: <span className="font-bold">{points}</span>
                  </p>
                  <p className="text-surface-600 dark:text-surface-300">
                    Time: <span className={`font-bold ${timeLeft <= 10 ? 'text-red-500' : ''}`}>{timeLeft}s</span>
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
              animate={{ scale: 1, rotate: [0, 10, 0] }}
              transition={{ type: "spring", stiffness: 500, damping: 15, delay: 0.2 }}
              className={`w-20 h-20 mx-auto rounded-full ${getCategoryData().color} flex items-center justify-center mb-6`}
            >
              <TrophyIcon className="h-10 w-10 text-white" />
            </motion.div>
            
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Quiz Completed!</h2>
            
            <div className="mb-8">
              <p className="text-xl">
                Your Score: <span className="font-bold">{score}</span> out of {quizQuestions.length}
              </p>
              <p className="text-xl mt-2">
                Total Points: <span className="font-bold">{points}</span>
              </p>
              <p className="text-surface-600 dark:text-surface-300 mt-2">
                {score === quizQuestions.length
                  ? "Perfect! You're a true fan!"
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