import { Circles } from 'react-loader-spinner'
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


function Spinner() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <Circles
        height="60"
        width="60"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        className='m-auto'
      />
      <p>loading...</p>
    </div>
  )
}

export default Spinner