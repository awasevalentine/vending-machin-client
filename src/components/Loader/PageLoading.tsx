import './style.css';

type Props = {
  isLoading: boolean
}

const Loader = ({isLoading}: Props) => {
  return (
    <div className={`loader-wrapper ${isLoading ? 'show' : 'hide'}`}>
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
