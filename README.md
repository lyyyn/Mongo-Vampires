# Mongo-Vampires

Title: Mongo Vampires<br>
Type: ~~Homework~~ Lab<br>
Duration: 1 + hours <br>
Creator: WDI-Meeseeks <br>
Adapted by: Zhou Yinsheng<br>


## Inserting Seed Data Using Mongo

Insert into the database using **create** method:


### Add some new vampire data

1. Using the create method, create 4 new vampires with any qualities that you like two should be male and two should be female.


## Querying
### Select by comparison

Write a different query for each of the following:

1. Find all the vampires that that are females
2. have greater than 500 victims
3. have fewer than or equal to 150 victims
4. have a victim count is not equal to 210234
5. have greater than 150 AND fewer than 500 victims


### Select by exists or does not exist
Select all the vampires that:

1. have a key of 'title'
2. do not have a key of 'victims'
3. have a title AND no victims
4. have victims AND the victims they have are greater than 1000


### Select with OR
Select all the vampires that:

1. are from New York, New York, US or New Orleans, Louisiana, US
2. love brooding or being tragic
3. have more than 1000 victims or love marshmallows
4. have red hair or green eyes


### Select objects that match one of several values
Select all the vampires that:

1. love either frilly shirtsleeves or frilly collars
2. love brooding
3. love at least one of the following: appearing innocent, trickery, lurking in rotting mansions, R&B music
4. love fancy cloaks but not if they also love either top hats or virgin blood * Hint-You will also have to use $nin *


### Negative Selection
Select all vampires that:

1. love ribbons but do not have brown eyes
2. are not from Rome
3. do not love any of the following: [fancy cloaks, frilly shirtsleeves, appearing innocent, being tragic, brooding]
5. have not killed more than 200 people


## Replace

1. replace the vampire called 'Claudia' with a vampire called 'Eve'. 'Eve' will have a key called 'portrayed_by' with the value 'Tilda Swinton'
2. replace the first male vampire with another whose name is 'Guy Man', and who has a key 'is_actually' with the value 'were-lizard'


## Update

1. Update 'Guy Man' to have a gender of 'f'
2. Update 'Eve' to have a gender of 'm'
3. Update 'Guy Man' to have an array called 'hates' that includes 'clothes' and 'jobs'
4. Update 'Guy Man's' hates array also to include 'alarm clocks' and 'jackalopes'
5. Rename 'Eve's' name field to 'moniker'
6. We now no longer want to categorize female gender as "f", but rather as **fems**. Update all females so that the they are of gender "fems".


## Remove

1. Remove a single document wherein the hair_color is 'brown'
2. We found out that the vampires with the blue eyes were just fakes! Let's remove all the vampires who have blue eyes from our database.
<hr>

