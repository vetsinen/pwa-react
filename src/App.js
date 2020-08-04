import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            status: 'offline',
            users: localStorage.getItem('users')
        };
    }

    componentDidMount() {
        fetch("https://yurasgr101.pythonanywhere.com/")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        status: 'online',
                        users: result
                    });
                    localStorage.setItem('users', result)
                },
                // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
                // чтобы не перехватывать исключения из ошибок в самих компонентах.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        status: 'offline',
                        error
                    });
                }
            )
    }

    render() {
        const {error, isLoaded, users, status} = this.state;
        return (
            <span>{users[0].name}|{status}</span>
        );
    }
}

export default App;
