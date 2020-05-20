import React from "react";

import { AxiosWithAuth } from "./utils/AxiosWithAuth";

class FriendsList extends React.Component {
    state = {
        friends: [],
        friend: {
            name: "",
            age: Number,
            email: "",
        },
    };

    componentDidMount() {
        this.getFriendsList();
    }

    getFriendsList = () => {
        AxiosWithAuth()
            .get("friends")
            .then((res) => {
                this.setState({ friends: res.data });
            })
            .catch((err) =>
                console.error(" Error Loading Friend List ", err)
            );
    };

    handleChange = (e) => {
        this.setState({
            friend: {
                ...this.state.friend,
                [e.target.name]: e.target.value,
            },
        });
    };

    addFriend = (e) => {
        e.preventDefault();
        AxiosWithAuth()
            .post("friends", this.state.friend)
            .then((res) => {
                this.getFriendsList();
            })
            .catch((err) => console.error(err));
    };

    render() {
        console.log("as;friendslist.js;this.state", this.state);
        return (
            <div className="friends-list-wrapper">
                <div className="friend form">
                    <form onSubmit={this.addFriend}>
                        <input
                            type="text"
                            name="name"
                            value={this.state.friend.name}
                            onChange={this.handleChange}
                        />

                        <input
                            type={Number}
                            name="age"
                            value={this.state.friend.age}
                            onChange={this.handleChange}
                        />

                        <input
                            type="email"
                            name="email"
                            value={this.state.friend.email}
                            onChange={this.handleChange}
                        />

                        <button>Add Friend</button>
                    </form>
                </div>

                <div className="friendslist">
                    <h1>Friend's</h1>
                    {this.props.fetchingData && (
                        <div className="key spinner">
                            <p>Loading Data</p>
                        </div>
                    )}
                    {this.state.friends.length > 0 && (
                        <div className="friends">
                            {this.state.friends.map((friend) => {
                                return (
                                    <div
                                        className="friends-list"
                                        key={friend.id}
                                    >
                                        <h1>{friend.name}</h1>
                                        <h3>Age: {friend.age}</h3>
                                        <h3>Email: {friend.email}</h3>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default FriendsList;