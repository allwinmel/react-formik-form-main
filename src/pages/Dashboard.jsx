import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';

function Dashboard() {
  const [photos, setPhotos] = useState([]);
  const name=localStorage.getItem('name');
  const navigate=useNavigate();
  useEffect(()=>{
    const check=localStorage.getItem('isLoggedin');
    
    if (check==='false'){
        navigate('/login');
    }
});

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/photos')
      .then(response => {
        setPhotos(response.data.slice(0, 100));
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  return (
    <div className="container mt-5">
        <h3 className='text-center text-white mb-5'>Hi {name}, Welcome to Formik Validation with Axios API</h3>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {photos.map(photo => (
          <div key={photo.id} className="col text-center">
            <div className="card">
              <img src={photo.url} className="card-img-top p-2 img-fluid" alt={photo.title} />
              <div className="card-body">
                <h5 className="card-title">{photo.title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;