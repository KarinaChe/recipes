import { useState } from "react";
import axios from "axios";
import { useGetUserId } from "../hooks/useGetUserId.js";
import { useNavigate } from "react-router-dom";
import { useCookies} from "react-cookie";

export const CreateRecipe = () =>{
    const userId = useGetUserId();
    const [cookies,_] = useCookies(["access_token"]);
    const [recipe,setRecipe] = useState({
        name:"",
        ingredients: [],
        instruction:"",
        imageUrl:"",
        cookingTime:0,
        userOwner:userId,
    })
    const navigate = useNavigate();
    const handleChange=(e)=>{
       const {name,value}=e.target;
       setRecipe({...recipe,[name]:value})
    }
    const handleIngredientChange = (e,idx)=>{
        const {value} = e.target;
        const ingredients = recipe.ingredients;
        ingredients[idx]=value;
        setRecipe({...recipe,ingredients})
    }
    const addIngredient=()=>{
       setRecipe({...recipe,ingredients:[...recipe.ingredients,""]})
    }
    const onSubmit = async (e) =>{
        e.preventDefault();
        try{
           await axios.post("http://localhost:3001/recipes",recipe,{headers: {authorization:cookies.access_token}});
           alert("Recipe Created");
           navigate("/");
        }catch(err){
            console.log(err)
        }
    }
   
    return (
        <div className="md-flex md:flex-col md:justify-center md:items-center p-5 bg-white rounded shadow-sm m-5 w-400">
           <h2 className="text-4xl mb-5">Create Recipe</h2>
           <form onSubmit={onSubmit} className="flex flex-col">
              <label htmlFor="name">Name</label>
              <input className="border-4 mb-5" type="text" id="name" name="name" onChange={handleChange}/>
              <label htmlFor="ingredients">Ingredients</label>
              {recipe.ingredients.map((ingredient,idx)=>(
                 <input className="border-4 mb-5" key={idx} type="text" name="ingredients" value={ingredient} onChange={(e)=>handleIngredientChange(e,idx)}/>
              ))}
              <button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"  onClick={addIngredient}>Add ingredient</button>
              <label htmlFor="instruction">Instructions</label>
              <textarea className="border-4 mb-5" id="instruction" name="instruction" onChange={handleChange}></textarea>
              <label html="imageUrl">Image Url</label>
              <input className="border-4 mb-5" type="text" id="imageUrl" name="imageUrl" onChange={handleChange}/>
              <label htmlFor="cookingTime">Cooking Time</label>
              <input className="border-4 mb-5" type="number" id="cookingTime" name="cookingTime" onChange={handleChange}/>
              <button className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"  type="submit">Create Recipe</button>
           </form>
        </div>

    )
    
}