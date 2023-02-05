import React, { Component } from 'react';
import '../css/Login.css';
import loginImg from '../assets/login.jpg'
import axios from 'axios';
import md5 from 'md5';
import Cookies from 'universal-cookie';

const baseUrl="http://localhost:3001/usuarios";
const cookies = new Cookies();

class Login extends Component {
    state={
        form:{
            username:'',
            password:''
        }
    }

    handleChange=async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    iniciarSesion=async()=>{
        await axios.get(baseUrl, {params:{username:this.state.form.username, password:md5(this.state.form.password)}})
        .then(response=>{
            return response.data;
        })
        
        .then(response=>{
            if(response.length>0){
                var respuesta=response[0];
                cookies.set('id',respuesta.id, {path:"/"});
                cookies.set('apellido_paterno',respuesta.apellido_paterno, {path:"/"});
                cookies.set('apellido_materno',respuesta.apellido_materno, {path:"/"});
                cookies.set('nombre',respuesta.nombre, {path:"/"});
                cookies.set('username',respuesta.username, {path:"/"});
                alert(`Bienvenido ${respuesta.nombre} ${respuesta.apellido_paterno}`);
                window.location.href="./menu";

            }else{
                alert("El usuario o la contraseña no son correctos");
            }
        })
        .catch(error=>{
            console.log(error);
        })
    }

    componentDidMount(){
        if (cookies.get('username')){
            window.location.href="./menu";
        }
    }

  render() {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
        <div className='hidden sm:block'>
            <img className='w-full h-full object-cover' src={loginImg} alt="" />
        </div>
        <div className='bg-gray-800 flex flex-col justify-center'>
            <form className='max-w-[400px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg'>
                <h2 className='text-4xl text-white font-bold text-center'>INICIAR SESIÓN</h2>
                <div className='flex flex-col text-gray-400 py-2'>
                    <label>Usuario</label>
                    <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" name="username" onChange={this.handleChange} />
                </div>
                <div className='flex flex-col text-gray-400 py-2'>
                    <label>Contraseña</label>
                    <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password" name='password' onChange={this.handleChange}/>
                </div>
                <div className='flex justify-between text-gray-400 py-2'>
                    <p><input type="checkbox" />Recordar mi Usuario</p>
                    <p>Recordar Contraseña</p>
                </div>
                <button className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teak-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg' onClick={()=>this.iniciarSesion()}>Iniciar Sesión</button>
            </form>
        </div>
    </div>
        
    );
  }
}

export default Login;
