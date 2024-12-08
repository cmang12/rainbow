import '../styles/components/Title.css'; 
import logo from '../assets/images/emotion diary.png'

const Title = () => {
    return (
        <div className='Title-div'> 
        
        <h1 className="Title-h1"> My Rainbow Daily </h1>
        <img src={logo} className="Title-logo" alt="logo" />

        </div>
        
    );
};

export default Title; 