import LiveDate from '../components/LiveDate';
import MainButton from '../components/MainButton';
import Title from '../components/Title';  
import YearinPixels from '../components/YearInPixels'
import '../styles/pages/Home.css';
import '../styles/index.css'; 

const Home = () => {
    return (
        <div className="Home">
          <header className="Home-header">
            <Title/>
            <LiveDate />
            <MainButton />
            <YearinPixels/>
          </header>
          
        </div>
      );
  };
  
  export default Home;