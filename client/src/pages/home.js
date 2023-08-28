import { useState,useEffect} from "react";
import axios  from "axios";
import { useGetUserId } from "../hooks/useGetUserId";
import { useCookies} from "react-cookie";
import { Link } from 'react-router-dom';


export const Home = () =>{
    const [recipes, setRecipes] = useState([]);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [cookies,_] = useCookies(["access_token"]);
    const userId = useGetUserId();
    
   useEffect(()=>{
      const fetchRecipes = async()=>{
        try{
           const response = await axios.get("http://localhost:3001/recipes");
           setRecipes(response.data);
           console.log(response.data);
        }catch(err){
            console.log(err);
        }
      }
      const fetchSavedRecipes = async() =>{
        try{
           const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userId}`);
           setSavedRecipes(response.data.savedRecipes);
        }catch(err){
            console.log(err)
        }
      }
      fetchRecipes();
      fetchSavedRecipes();
   },[])

   const saveRecipe = async (recipeId) =>{
    try{
        const response = await axios.put("http://localhost:3001/recipes",{recipeId, userId},{headers: {authorization:cookies.access_token}});
        
        setSavedRecipes(response.data.saveRecipe);
     }catch(err){
         console.log(err);
     }
   }
   const isRecipeSaved = (id) => savedRecipes && savedRecipes.map(recipe => recipe._id).includes(id);
   
    
   
    return (
      <div className ="flex flex-col justify-center items-center" >
        <h1 className="text-4xl mt-5 mb-5">Recipes</h1>
        
         <ul className="list-none p-0 m-0">
            {recipes && recipes.map((recipe)=>(
               
                <li className="border border-black p-10 mb-10" key={recipe._id}>
                    <div>
                        <h2 className="text-2xl">{recipe.name}</h2>
                         <button onClick={() => {
                              if (cookies.access_token) {
                                  saveRecipe(recipe._id);
                              } else {
                                       // Предложите пользователю зарегистрироваться или войти, чтобы сохранить рецепт
                                 alert("Please log in or register to save this recipe.");
                              }
                              }} disabled={!cookies.access_token || !savedRecipes} className={`focus:outline-none text-white ${isRecipeSaved(recipe._id) ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300'} font-medium rounded-lg text-sm px-5 py-2.5 mb-2 ${isRecipeSaved(recipe._id) ? 'dark:bg-gray-600' : 'dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'}`}>
                            {cookies.access_token ? (isRecipeSaved(recipe._id) ? "Saved" : "Save") : <Link to="/auth">Login/Register to Save</Link>}
                            
                        </button>
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

