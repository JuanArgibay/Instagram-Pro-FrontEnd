import "./App.css";
import { AuthProviderComponent } from "./context/authContext";
import { Footer } from "./layout/Footer";
import { Header } from "./layout/Header";
import { Main } from "./layout/Main";

function App() {

  
  return (
    <div className="background-screen">
      <div className="App">
        <AuthProviderComponent>
          <Header></Header>
          <Main></Main>
        </AuthProviderComponent>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
