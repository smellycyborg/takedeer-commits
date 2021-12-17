import '../css/App.css';
import { useState, useEffect } from 'react';   
import axios from 'axios';
import { useNavigate } from 'react-router';

const User = () => {

    axios.defaults.withCredentials = true;

    const [name, setName] = useState('');

    const [itemsList, setItemsList] = useState('');

    const [list, setList]= useState({
        item: '',
        spent: 0,
        net: 0,
        date: new Date()
    });
    
    const handleChange = (e) => {
        setList({
            ...list,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    // gets the users items 
    const findItems = () => {
        axios.post('http://localhost:3001/find-items', {
            username: name
        }).then((response) => {
            setItemsList(response.data);
            console.log(response.data);
            console.log(name)
        });
    };
 
    // function sets users name
    useEffect(() => {
        axios.get('http://localhost:3001/login').then((response) => {
            if (response.data.loggedIn === true) {
                setName(response.data.user[0].username);
                console.log(response.data);
            }
        });
    }, []);

    function addItem(e) {
        axios.post('http://localhost:3001/add-item', {
            ...list,
            [e.target.name]: e.target.value,
            username: name
        }).then((response) => {
            console.log(response)
        });
    };

    return (
        <div className='container'>

            <div className='row mt-4'>
                <div className='col'>
                    <label className='pink'>hi {name}</label>
                    <button className='btn-sharp offset-10'>log out</button>
                </div>
            </div>

            <div className='row mt-4'>
                <div className='col offset-1'>
                    <form onSubmit={handleSubmit} className='form-inline'>
                        <div className='form-group'>
                            <label>item</label>
                            <input onChange={handleChange} name='item' type='name' className='input--css2'></input>

                            <label >spent</label>
                            <input onChange={handleChange} name='spent' type='number' step='any' className='input--css2'></input>

                            <label >net</label>
                            <input onChange={handleChange} name='net' type='number' step='any' className='input--css2'></input>

                            <label>date</label>
                            <input onChange={handleChange} name='date' type='date' className='input--css2'></input>

                            <button onClick={addItem} className='btn-sharp'>enter</button>
                            <button onClick={findItems} className='btn-sharp'>find</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className='row mt-4'>
                <table>
                    <thead>
                        <tr className='table--style'>
                            <th className='table--bro' scope='col'>item</th>
                            <th className='table--bro' scope='col'>spent</th>
                            <th className='table--bro' scope='col'>net</th>
                            <th className='table--bro' scope='col'>date</th>
                            <th className='table--bro' scope='col'>edit/del</th>
                        </tr>
                    </thead>
                    <tbody className='tbody'>
                        <tr>
                            <th></th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default User;