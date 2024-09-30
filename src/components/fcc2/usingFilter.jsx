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
        const usersOnline = null; // change this
        const renderOnline = null; // change this
        return (
            <div>
                <h1>Current Online Users</h1>
                <ul>{renderOnline}</ul>
            </div>
        );
    }

}