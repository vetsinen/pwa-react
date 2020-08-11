import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            status: 'offline',
            // users:   [{"name": 'jack'}]
            users: JSON.parse(localStorage.getItem('users')) || [{"name": 'jack'}]
        }
        console.log(this.state.users[0]);
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
                    localStorage.setItem('users', JSON.stringify(result));
                    console.log(this.state.users[0]);
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
        const {users, status} = this.state;
        return (
            // <span>good text is here</span>
            <span>{users[0].name}-|{status}</span>
        );
    }
}

export default App;
