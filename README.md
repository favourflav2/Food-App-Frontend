# Order Food App
- [Order Food App](https://food-app-frontend-cbb2.onrender.com/)
This is a Full-Stack Food Ordering App using React for the frontend and Nodejs for the backend. A user can order food and make a payment using stripe.


# Description
My goal with this application was to showcase my use of tailwind and my ability to save data to my database. While providing a user with a great UI. I didn't come up with the design and or project I used https://direct.chownow.com/order/195/locations/260?order_item_id=1698c5a7-8c02-4461-83b2-c7cbdfb2bcc7 as inspiration.

The project started with me formatting my PostgreSQL tables, after which I was then able to get some food options from google and inserted them in their corresponding tables. After all my data was ready it all just came to me styling my project and making it look good. I had to persist a lot of states to keep my states from updating on refresh, but other than that the frontend was pretty smooth. However there was one issue I had to resolve. With Render where my project is being deployed, some of the free services are slowed down quite a bit. So on the first initial render of my application it would take about 5 minutes before you could see any data. So instead of making requests to my backend for the data, I just used postman and made one big request and copied my whole backend and set it in my redux state. I still have the option in the future to make requests to my backend because I already have all the routes set up.


My frontend and backend are both deployed on Render for free so the first initial call to my backend may take some time. And my database is hosted on CockroachDB.






###### Frontend
- React




### `npm start`

cd into client
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.



