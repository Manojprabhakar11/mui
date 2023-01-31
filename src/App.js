import React,{ useState, useEffect} from "react";
import  AppRoute  from './routes/AppRoute';
import  AuthRoute  from './routes/AuthRoute';

function App() {
  return (
    <div>
      <AuthRoute/>
      <AppRoute/>
    </div>
  );
}

export default App;
