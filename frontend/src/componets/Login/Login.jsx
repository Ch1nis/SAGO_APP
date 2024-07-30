import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // todo
import Swal from 'sweetalert2';
import './Login.css';
import { Button ,Form } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import logo from '../../assets/Iconos/logo.png';

const $login = `${import.meta.env.VITE_APP_RUTA}/login`

const formatRut = (value) => {
  value = value.replace(/\./g, '').replace(/-/g, '');
  if (value.length > 1) {
    value = value.slice(0, -1) + '-' + value.slice(-1);
  }
  if (value.length > 5) {
    value = value.slice(0, -5) + '.' + value.slice(-5);
  }
  if (value.length > 8) {
    value = value.slice(0, -9) + '.' + value.slice(-9);
  }
  return value;
};

const Login = () => {
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRutChange = (e) => {
    const inputRut = e.target.value;
    const cleanedInput = inputRut.replace(/[^0-9kK]/g, '');
    const formattedRut = formatRut(cleanedInput);
    setRut(formattedRut);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch($login, {
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
            type="text"
            placeholder="12.345.678-K"
            value={rut}
            onChange={handleRutChange}
            maxLength={12}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
          <Button type="submit" className="btn-success submit-button">Iniciar Sesión</Button>
      </Form>
    </div>
  );
};

export default Login;