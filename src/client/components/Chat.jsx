import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import config from 'config';

import io from 'socket.io-client';
let socket = io(`${config.api.host}:${config.api.port}`);

import { Messages } from 'components/Messages';

const ChatWrapper = styled.div`
    width: 100%;
    max-width: 720px;
    border-radius: 5px;
    overflow: hidden;
    -webkit-box-shadow: -1px -4px 25px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: -1px -4px 25px 0px rgba(0,0,0,0.75);
    box-shadow: -1px -4px 25px 0px rgba(0,0,0,0.75);
`
const TextEntry = styled.input`
    border: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    width: 100%;
    padding: 2px 5px;
    background: rgba(255, 255, 255, 0.2);
    color: rgba(255, 255, 255, 0.5);
    height: 35px;
    line-height: 35px;
    font-size: 14px;
`

@connect(state => ({ chat: state.chat }))
export class Chat extends Component {

    constructor(props) {
        super(props)
        this.state = {
            message: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this);
    }

    componentDidMount() {
        socket.on('user joined', (name) => {
            this.props.dispatch({ type: 'USER_JOINED', user: name })
            socket.emit('client:joined',
                { type: 'log', value: `${name} has joined to chat` })
        });
    }

    onChange(e) {
        this.setState({ message: e.target.value })
    }

    onKeyUp(e) {
        if (e.key == 'Enter') {
            this.onSubmit();
        }
    }

    onSubmit() {
        if (!this.state.message.length)
            return;

        const data = {
            value: this.state.message,
            user: this.props.chat.user.name,
            time: new Date(),
            type: 'message'
        }

        socket.emit('client:message', data);
        this.setState({ message: '' })
    }

    render() {
        const { messages } = this.props.chat;
        return (
            socket.connected ? <ChatWrapper>
                <Messages />
                <TextEntry type={'text'}
                    value={this.state.message}
                    onKeyUp={this.onKeyUp}
                    onChange={this.onChange}
                    placeholder='Type to chat'
                    autoFocus
                />
            </ChatWrapper> : <div>Chat is disabled.</div>
        );
    }
}