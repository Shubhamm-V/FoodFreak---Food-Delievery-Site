import { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./MealList.module.css";

const MealsList =  () => {
  const [meals, setMeals] = useState([]);
  const [isLoading,setisLoading] = useState(true);
  const [hasError, setHasError] = useState(null);
  useEffect(() => {
      const fetchMeal = async () =>{
        const response = await fetch("https://food-freakks-default-rtdb.firebaseio.com/Meals.json");
        if(!response.ok){
          throw new Error("Something Went Wrong")
        }
        const data = await response.json();
        const mealArray = [];
        for(const key in data){
          mealArray.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price
          })
        }
        setMeals(mealArray);
        setisLoading(false);
      }
      fetchMeal().catch(error => {
        setHasError(error.message);
        setisLoading(false);
      })
  },[]);

  if(isLoading){
    return <section className={classes.loadingMeals}>
      <h4>Loading...</h4>
    </section>
  }
  if(hasError){
    return <section className={classes.loadingMeals}>
      <h4>{hasError}...</h4>
    </section>
  }


  const meallist = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      mealName={meal.name}
      description={meal.description}
      price={meal.price}
      foodID={meal.id.substr(1)}
    >
      {meal.name}
    </MealItem>
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{meallist}</ul>
      </Card>
    </section>
  );
};

export default MealsList;
