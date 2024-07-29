import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // todo
import Swal from 'sweetalert2';
import './Login.css';
import { Button, Form } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import logo from '../../assets/Iconos/logo.png';

const $login = `${import.meta.env.VITE_APP_PRUEBA}/login`

const Login = () => {
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch( $login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rut, password }),
      });
  
      const data = await response.json();
  
      if (data.success) {
          navigate('/home');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Contraseña incorrecta!',
        });
      }
    };
  
  return (
    <div className="Login">   
        <Form onSubmit={handleSubmit}>
          <img src={logo} alt="Logo" className="logo" style={{ marginBottom: '20px' }} />
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Rut</Form.Label>
                <Form.Control 
                    value={rut}
                    onChange={(e) => setRut(e.target.value)}
                    type="text" 
                    placeholder="Ingrese su rut..." />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Ingrese su contraseña..." />
            </Form.Group>
            <Button type="submit" className="btn-success submit-button">
                Iniciar sesión
            </Button>
        </Form>
    </div>
  );
};

export default Login;