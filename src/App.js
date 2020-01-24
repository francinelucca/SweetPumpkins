import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route} from "react-router-dom";

//Common
import Header from "./Components/Common/Header";
import Main from "./Screens/Main";
import NotFound from "./Screens/NotFound";
import MovieDetails from "./Screens/MovieDetails";

const App =  () => {
  return (
     <BrowserRouter>
     <div>
       <Header />
       <Switch>
         <Route exact path='/' component={Main} />
         <Route exact path="/movies/:movieId" component={MovieDetails} />
         <Route component={NotFound} />
       </Switch>
     </div>
     </BrowserRouter>
  )
}

export default App;
