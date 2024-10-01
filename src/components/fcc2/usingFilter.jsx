import React from "react";

export default class UsingArrayFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [
                {
                    username: 'Jeff',
                    online: true
                  },
                  {
                    username: 'Alan',
                    online: false
                  },
                  {
                    username: 'Mary',
                    online: true
                  },
                  {
                    username: 'Jim',
                    online: false
                  },
                  {
                    username: 'Sara',
                    online: true
                  },
                  {
                    username: 'Laura',
                    online: true
                  }
            ]
        };
    }
    render() {
        const usersOnline = this.state.users.filter(user => user.online === true); // change this
        const renderOnline = usersOnline.map(user => {
          return <li key={user.username}>{user.username}</li>

        }); // change this      
        return (
            <div>
                <h1>Current Online Users</h1>
                <ul>{renderOnline}</ul>
            </div>
        );
    }

}