import { useState,useEffect} from "react";
import axios  from "axios";
import { useGetUserId } from "../hooks/useGetUserId";


export const SavedRecipes = () =>{
    const [savedRecipes, setSavedRecipes] = useState([]);
    const userId = useGetUserId();
   useEffect(()=>{
      const fetchSavedRecipes = async() =>{
        try{
           const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userId}`);
           setSavedRecipes(response.data.savedRecipes);
        }catch(err){
            console.log(err)
        }
      }
      
      fetchSavedRecipes();
   },[])

    return (
      <div className ="flex flex-col justify-center items-center" >
        <h1 className="text-4xl mt-5 mb-5">Saved Recipes</h1>
        <ul className="list-none p-0 m-0">
            {savedRecipes.map((recipe)=>(
                <li className="border border-black p-10 mb-10" key={recipe._id}>
                    <div>
                        <h2 className="text-2xl">{recipe.name}</h2>
                    </div>
                    <div className="">
                        <p>{recipe.instruction}</p>
                    </div>
                    <img className="max-w-full h-auto mb-4 w-400" src={recipe.imageUrl} alt={recipe.name} />
                    <p>Cooking time: {recipe.cookingTime} (minutes)</p>
                </li>
            ))}
        </ul>

      </div>
    )
}