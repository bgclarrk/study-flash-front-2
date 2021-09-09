## Use Cases
As a user,
I want to be able to create multiple flash cards for a course
So that way I can study for specific courses

## Requirements
- A user should be able to Login/Signup
- A user should be able to create a course
- A user should be able to edit/delete a course
- A user should be able to create a card
- A user should have the ability to edit/delete cards

## MVC
### User
has_many :courses
has_many :cards, through: :courses
- Username

### Course
belongs_to :user
has_many :cards
- Title
- Description

### Card
belongs_to :course
- Phrase
- Definition

### Views


### Controllers
- Sessions_controller
- Users_controller
- Courses_controller
- Cards_controller