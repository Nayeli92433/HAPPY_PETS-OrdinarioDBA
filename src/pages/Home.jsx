import React from 'react';
import '../styles/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';


const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="hero-section text-center text-white">
        <div className="container opacity-container">
          <h1 className="display-4">Happy Pets</h1>
          <h2 className="subtitle">¡Bienvenidos a Happy Pets!</h2>
          <p className="lead">
            Nos alegra tener a tu mascota con nosotros. En Happy Pets nos dedicamos a ofrecer el mejor cuidado y atención para tu compañero, asegurándonos de que siempre esté saludable y feliz. ¡Gracias por confiar en nosotros!
          </p>
          
          {/* Sección de los cuadros para registro e ingreso */}
          <div className="row mt-4">
            {/* Cuadro de Registro */}
            <div className="col-md-6 mb-4">
              <div className="custom-card card">
                <div className="card-body">
                  <h3 className="card-title">¡Regístrate y agenda citas para tu mascota!</h3>
                  <p>
                    Crea una cuenta en Happy Pets para llevar un control detallado de la salud y bienestar de tu mascota. 
                    Accede a un historial médico completo y recibe alertas sobre tus citas y tratamientos recomendados.
                  </p>
                  <a href="/registro" className="btn btn-light">REGÍSTRATE AHORA</a>
                </div>
              </div>
            </div>

            {/* Cuadro de Ingreso */}
            <div className="col-md-6 mb-4">
              <div className="custom-card card">
                <div className="card-body">
                  <h3 className="card-title">Accede y agenda una cita para tu mascota</h3>
                  <p>
                    Si ya tienes una cuenta, ingresa para gestionar las citas de tu mascota. Accede a nuestras opciones de servicios y elige el mejor horario para tu próxima visita.
                  </p>
                  <a href="/ingreso" className="btn btn-light">INGRESA A TU CUENTA</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
