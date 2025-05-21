import { Link } from 'react-router-dom';
import img from '../assets/images/error.svg';
import Wrapper from '../assets/wrappers/ErrorPage';

const Error = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={img} alt="Page not found" />
        <h3>404 - Page not found</h3>
        <p>A new path is always one click away.</p>
        <Link to="/">back home</Link>
      </div>
    </Wrapper>
  );
};

export default Error;
