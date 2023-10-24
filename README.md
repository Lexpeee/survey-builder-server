# Proform - Survey Builder (Back-end)
A custom survey form builder in which you can create your own with customizable themes and formats. 

> Front-end repo can be found [here](https://github.com/Lexpeee/survey-builder)

## Motivation behind this project
When I got my first job as a Web developer during the pandemic (May 2020), one of my first feature I've built was a custom survey builder form inspired by [Typeform](https://www.typeform.com/), where you can create amazing forms that are way different than the usual norms like Google Forms, and other related programs. I fell in love with how you can add custom themes and colors to your forms, adding logic to some questions when a specific answer, keyword is set. I have dream't of making an app similar to it in my own way


## Things I've learned
- Sharpened more of my [react-hook-form](https://github.com/react-hook-form/react-hook-form) skills
- Using MongoDB as my primary database to store all my surveys, fields, and user-generated answers. 
- Storing user-configured themes to a survey, which is super-fun. 


## Installation 
> Do feel free to try this project locally, as it's still a work in progress.

You might need to have your node version set to 18+.

After downloading the repository, install the following dependencies via `npm` or `yarn`
``` 
  npm install
```
or 
```
  yarn
```

Create an `.env` file consisting of the following. Any values can be accepted

```
  PORT
  MONGO_DB_URI_STRING
```

After going through the steps above, run the api call `{{host}}/surveys/seed` that automatically generates data for you to test. 
```
curl -d '{{host}}/surveys/seed' 'GET'
```

